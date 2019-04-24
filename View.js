/**
 * Gui related
 */
var View = {
  
  /**
   * Notify
   */
  notify: function(text) {
    return CardService.newActionResponseBuilder()
      .setNotification(CardService.newNotification().setText(text))
      .build();
  },
  
  /**
   * Read-only text field
   */
  createText: function(text, label) {
    var prefix = !label ? "" : "" + label;
    var string = prefix + (!text ? "" : text);
    return CardService.newTextParagraph()
        .setText(string);
  },
  
  /**
   * A helper function for building dropdown widgets
   * https://cloud.google.com/blog/products/application-development/building-gmail-add-on-with-trello?m=0
   */
  buildDropdownWidget: function(key, title, items, selected) {
    var widget = CardService.newSelectionInput()
      .setType(CardService.SelectionInputType.DROPDOWN)
      .setTitle(title)
      .setFieldName(key)
    for(var i = 0; i < items.length; i++) {
      var itemSelected = selected === items[i].value
      widget.addItem(items[i].text, items[i].value, itemSelected)
    }
    return widget
  },
  
  /**
   * Generic body - just print out the data
   */
  createBodyWidget: function(message, data, analysisType) {
    var action = CardService.newAction()
      .setFunctionName(Config[analysisType].CALLBACK);
    var button = CardService.newTextButton()
      .setText(messages('action'))
      .setOnClickAction(action);
    var stack = [];
    var section = CardService.newCardSection();
    section.addWidget(button);
    stack.push(section);
    var content = safe_access(data, 'content');
    if (!!content && typeof content != 'object') {
      stack.push(View.createSectionFromValue(content));
    } else if (!!content && Array.isArray(content)) { // json, array
      stack.push(View.createSectionFromArray(content));
    } else if (!!content && typeof content == 'object') { // json, array
      stack.push(View.createSectionFromObject(content));
    }
    return stack;
  },
  
  createSectionFromValue: function(value) {
    debug_log('createSectionFromValue = ' + value);
    if (isString(value) && !value) {
      return View.createSectionForEmptyDataSet();
    }
    return CardService.newCardSection()
        .addWidget(View.createText(value));
  },
  
  createSectionFromArray: function(list) {
    debug_log('createSectionFromArray = ' + list);
    if (list.length == 0) {
      return View.createSectionForEmptyDataSet();
    }
    var section;
    for (var item in list) {
      if (!list[item]) {
        continue;
      }
      if (!section) {
        section = CardService.newCardSection();
      }
      if (isValue(list[item])) { // string
        section.addWidget(View.createText(list[item]));
      } else { // object
        var texts = View.createTextItemsFromObject(list[item]);
        for (var text in texts) {
          section.addWidget(texts[text]);
        }
      }
    }
    return section;
  },
  
  createTextItemsFromObject: function(object) {
    debug_log('createTextItemsFromObject = ' + object);
    var items = [];
    if (Object.keys(object).length == 0) {
      return items;
    }
    for (var key in object) {
      if (!object[key]) {
        continue;
      }
      if (isValue(object[key]) && hasValue(object[key])) {
        items.push(View.createText(object[key], toLabel(key)));
      } else if (Array.isArray(object[key])) {
        items = items.concat(View.createTextItemsFromArray(object[key]));
      } else if (isObject(object[key])) {
        items.push(View.createText(Style.subSectionHeader(capitalise(key))));
        items = items.concat(View.createTextItemsFromObject(object[key]));
      }
    }
    return items;
  },
  
  createTextItemsFromArray: function(object) {
    debug_log('createTextItemsFromArray = ' + object);
    var items = [];
    if (Object.keys(object).length == 0) {
      return items;
    }
    for (var key in object) {
      if (!object[key]) {
        continue;
      }
      if (isValue(object[key]) && hasValue(object[key])) {
        items.push(View.createText(object[key]));
      } else if (isObject(object[key])) {
        items = items.concat(View.createTextItemsFromObject(object[key]));
      }
    }
    return items;
  },
  
  createSectionFromObject: function(object) {
    debug_log('createSectionFromObject = ' + object);
    if (Object.keys(object).length == 0) {
      return View.createSectionForEmptyDataSet();
    }
    var section;
    for (var key in object) {
      if (!object[key]) {
        continue;
      }
      if (!section) {
        section = CardService.newCardSection();
      }
      // subtitle
      section.addWidget(View.createText(capitalise(key), 
                                        Style.subSectionHeader(toLabel(messages("entity")))));
      // elements
      if (isValue(object[key])) { // string
        section.addWidget(View.createText(object[key]));
      } else if (Array.isArray(object[key])) { // has children
        var texts = View.createTextItemsFromArray(object[key]);
        for (var text in texts) {
          section.addWidget(texts[text]);
        }
      } else { // has children
        var texts = View.createTextItemsFromObject(object[key]);
        for (var text in texts) {
          section.addWidget(texts[text]);
        }
      }
    }
    return section;
  },
  
  createSectionForEmptyDataSet: function() {
    return CardService.newCardSection()
        .addWidget(View.createText(messages('emptydataset')));
  }
};

View.CreateCardCallbacks = {};
View.CreateCardCallbacks[AnalysisType.SUMMARY] = this['createSummaryCard'];
View.CreateCardCallbacks[AnalysisType.SENTIMENT] = this['createSentimentCard'];
View.CreateCardCallbacks[AnalysisType.ENTITY] = this['createEntityCard'];
View.CreateCardCallbacks[AnalysisType.HASHTAGS] = this['createHashtagsCard'];
View.CreateCardCallbacks[AnalysisType.LANG_DETECT] = this['createLanguageDetectionCard'];
View.CreateCardCallbacks[AnalysisType.CLASS] = this['createClassificationCard'];
View.CreateCardCallbacks[AnalysisType.ENTITY_SENTIMENT] = this['createEntitySentimentCard'];
