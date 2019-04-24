/**
 * Copyright Codejago
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Globals
var AnalysisType;
var ServiceLocator;
var Aylien;
var Style;
(function() {
  AnalysisType = new AnalysisTypeService();
  Style = new StyleService();
  Aylien = new AylienService();
  ServiceLocator = new ServiceLocatorService();
  ServiceLocator.bind(AnalysisType.SUMMARY, new SummaryService());
  ServiceLocator.bind(AnalysisType.ENTITY, new EntityService());
  ServiceLocator.bind(AnalysisType.SENTIMENT, new SentimentService());
  ServiceLocator.bind(AnalysisType.ENTITY_SENTIMENT, new EntitySentimentService());
  ServiceLocator.bind(AnalysisType.HASHTAGS, new HashtagsService());
  ServiceLocator.bind(AnalysisType.LANG_DETECT, new LanguageDetectionService());
  ServiceLocator.bind(AnalysisType.CLASS, new ClassificationService());
})();

/**
 * Returns the array of cards that should be rendered for the current
 * e-mail thread. The name of this function is specified in the
 * manifest 'onTriggerFunction' field, indicating that this function
 * runs every time the add-on is started.
 *
 * @param {Object} e The data provided by the Gmail UI.
 * @return {Card[]}
 */
function buildAddOn(e) { 
  var message = getCurrentMessage(e);
  return createForms(e, message);
}

function createForms(e, message) {
  return [createRootCard(message),
    createSentimentCard(message, getResult(e, AnalysisType.SENTIMENT)),
    createSummaryCard(message, getResult(e, AnalysisType.SUMMARY)),
    createEntityCard(message, getResult(e, AnalysisType.ENTITY)),
    createHashtagsCard(message, getResult(e, AnalysisType.HASHTAGS)),
    createLanguageDetectionCard(message, getResult(e, AnalysisType.LANG_DETECT)),
    createClassificationCard(message, getResult(e, AnalysisType.CLASS)),
    createEntitySentimentCard(message, getResult(e, AnalysisType.ENTITY_SENTIMENT))];
}

function createRootCard(message) {
  return createCard(message, null, null, null);
}

// Classification

function createEntitySentimentCard(message, result) {
  var body = createEntitySentimentWidget(message, result);
  return createCard(message, result, AnalysisType.ENTITY_SENTIMENT, body);
}

function createEntitySentimentWidget(message, result) {
  return View.createBodyWidget(message, result, AnalysisType.ENTITY_SENTIMENT);
}

function analyseEntitySentiment(e) {
  return analyse(e, AnalysisType.ENTITY_SENTIMENT);
}

// Classification

function createClassificationCard(message, result) {
  var body = createClassificationWidget(message, result);
  return createCard(message, result, AnalysisType.CLASS, body);
}

function createClassificationWidget(message, result) {
  return View.createBodyWidget(message, result, AnalysisType.CLASS);
}

function analyseClassification(e) {
  return analyse(e, AnalysisType.CLASS);
}

// Language Detection

function createLanguageDetectionCard(message, result) {
  var body = createLanguageDetectionWidget(message, result);
  return createCard(message, result, AnalysisType.LANG_DETECT, body);
}

function createLanguageDetectionWidget(message, result) {
  return View.createBodyWidget(message, result, AnalysisType.LANG_DETECT);
}

function analyseLanguageDetection(e) {
  return analyse(e, AnalysisType.LANG_DETECT);
}

// Entity

function createEntityCard(message, result) {
  var body = createEntityWidget(message, result);
  return createCard(message, result, AnalysisType.ENTITY, body);
}

function createEntityWidget(message, result) {
  return View.createBodyWidget(message, result, AnalysisType.ENTITY);
}

function analyseEntity(e) {
  return analyse(e, AnalysisType.ENTITY);
}

// Summary

function createSummaryCard(message, result) {
  var body = createSummaryWidget(message, result);
  return createCard(message, result, AnalysisType.SUMMARY, body);
}

function createSummaryWidget(message, result) {
  return View.createBodyWidget(message, result, AnalysisType.SUMMARY);
}

function analyseSummary(e) {
  return analyse(e, AnalysisType.SUMMARY);
}

// Hashtags

function createHashtagsCard(message, result) {
  var body = createHashtagsWidget(message, result);
  return createCard(message, result, AnalysisType.HASHTAGS, body);
}

function createHashtagsWidget(message, result) {
  return View.createBodyWidget(message, result, AnalysisType.HASHTAGS);
}

function analyseHashtags(e) {
  return analyse(e, AnalysisType.HASHTAGS);
}

// Sentiment

function createSentimentCard(message, result) {
  var body = createSentimentWidget(message, result);
  return createCard(message, result, AnalysisType.SENTIMENT, body);
}

function createSentimentWidget(message, sentiment) {
  //return View.createBodyWidget(message, sentiment, AnalysisType.SENTIMENT);
  //debug_log(sentiment);
  var action = CardService.newAction()
    .setFunctionName(Config[AnalysisType.SENTIMENT].CALLBACK);
  var button = CardService.newTextButton()
    .setText(messages('action'))
    .setOnClickAction(action);
  var section = CardService.newCardSection()
    .setHeader("<font color=\"#1257e0\"><b>" + messages('results') + "</b></font>");
  section.addWidget(View.createText(safe_access(sentiment, 'polarity'), 
                               messages('label.sentiment.polarity')));
  section.addWidget(View.createText(safe_access(sentiment, 'polarity_confidence'), 
                               messages('label.sentiment.confidence')));
  section.addWidget(View.createText(safe_access(sentiment, 'subjectivity'), 
                               messages('label.sentiment.subjectivity')));
  section.addWidget(View.createText(safe_access(sentiment, 'subjectivity_confidence'), 
                               messages('label.sentiment.confidence')));
  section.addWidget(button);
  return section;
}

function analyseSentiment(e) {
  return analyse(e, AnalysisType.SENTIMENT);
}

// General

/**
 * Analyse the current message body if not already done.
 *
 * @param {Object} e The data provided by the Gmail UI.
 */
function analyse(e, analysisType) {
  // refresh view
  var navigation = CardService.newNavigation()
    .popToNamedCard(analysisType);
  // current message
  var message = getCurrentMessage(e);
  // send for analysis
  var result = ServiceLocator.analyse(analysisType, 
                                      extractText(message), 
                                      extractTitle(message));
  // last attempt
  updateLastUpdated(message, analysisType);
  // store result against message
  if (applyResult(message, result, analysisType)) {
    applyLabel(message, analysisType);
    var card = View.CreateCardCallbacks[analysisType](message, result);
    navigation.updateCard(card);
  }
  return CardService.newActionResponseBuilder()
    .setNavigation(navigation)
    .build();
}

function createCard(message, result, analysisType, body) {
  // Create a section for that contains all user Labels.
  var header = createSubHeaderWidget(getMessage(analysisType, 'subtitle'), 
                                  getMessage(analysisType, 'subtext'));
  // Build the main card after adding the section.
  var card = CardService.newCardBuilder()
    .setName(!analysisType ? 'root' : analysisType)
    .setHeader(CardService.newCardHeader()
               .setTitle(getMessage(analysisType, 'title'))
               .setImageUrl(Assets.getIcon(analysisType)))
    .addSection(header);
  if (!!body && Array.isArray(body)) {
    for (var key in body) {
      if (!!body[key]) {
        card.addSection(body[key]);
      }
    }
  } else if (!!body) {
    card.addSection(body);
  }
  if (!!result) {
    var footer = createFooterWidget(message, analysisType, result);
    card.addSection(footer);
  }
  return card.build();
}

function applyResult(message, result, analysisType) {
  var text = JSON.stringify(!result ? {} : result);
  return setProperty(message, analysisType, text);
}

function createSubHeaderWidget(title, subtext) {
  var header = CardService.newCardSection()
    .setHeader(Style.sectionHeader(title));
  header.addWidget(View.createText(subtext));
  return header;
}

function createFooterWidget(message, analysisType, results) { 
  var lastUpdated = getLastUpdated(message, analysisType);
  var statusText = messages('status') + ": " + 
    (!results ? messages('pre') : messages('post')) + "\n" + lastUpdated;
  var status = View.createText(statusText);
  var footer = CardService.newCardSection();
  footer.addWidget(status);
  return footer;
}

function getLastUpdated(message, prefix) {
  var key = (!prefix ? "" : prefix + "") + ".last-update";
  var lastUpdated = getProperty(message, key);
  return !!lastUpdated ? lastUpdated : '';
}

function updateLastUpdated(message, prefix) {
  var key = (!prefix ? "" : prefix + "") + ".last-update";
  setProperty(message, key, (new Date().toISOString()));
}

/**
 * Retrieve the current sentiment for the email as
 * a javascript object.
 */
function getResult(e, analysisType) {
  // find result against message
  var message = getCurrentMessage(e);
  var text = getProperty(message, analysisType);
  if (!!text) {
    return JSON.parse(text);
  }
  return text;
}

function getProperty(message, key) {
  var properties = PropertiesService.getUserProperties();
  return !properties ? null : properties.getProperty(
    getPropertyKey(message, key));
}

function setProperty(message, key, value) {
  if (value.length > 9000) {
    View.notify("The text is far too long to be stored using " + value.length + " characters.\n" + value);
    return;
  }
  var properties = PropertiesService.getUserProperties();
  if (!!properties) {
    properties.setProperty(
      getPropertyKey(message, key), value);
    return true;
  } 
  return false;
}

function getPropertyKey(message, key) {
  return message.getId() + '/' + key;
}

function extractText(message) {
  return !message ? '' : message.getPlainBody();
}

function extractTitle(message) {
  return !message ? '' : message.getSubject();
}

function getMessage(analysisType, key) {
  return !analysisType ? messages(key) : 
      messages(analysisType + '.' + key);
}

/**
 * Apply a label to the current message thread to help identify
 * which threads have been analysed using some particular method.
 *
 * @param {Message} message The email to be labelled.
 */
function applyLabel(message, analysisType) {
  var thread = message.getThread();
  if (thread) {
    var text = getMessage(analysisType, 'label');
    var found = false;
    var labels = thread.getLabels();
    for (var i in labels) {
      if (labels[i].getName() === text) {
        found = true;
      }
    }
    if (!found) {
      var label = GmailApp.getUserLabelByName(text);
      if (!label) {
        label = GmailApp.createLabel(text);
      }
      message.getThread().addLabel(label);
    }
  }
}

/**
 * Retrieves the current message given an action event object.
 * @param {Event} event An action event object
 * @return {Message}
 */
function getCurrentMessage(event) {
  var accessToken = event.messageMetadata.accessToken;
  var messageId = event.messageMetadata.messageId;
  // Activate temporary Gmail add-on scopes.
  GmailApp.setCurrentMessageAccessToken(accessToken);
  var message = GmailApp.getMessageById(messageId);
  return message;
}

