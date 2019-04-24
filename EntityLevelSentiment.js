/**
 * https://docs.aylien.com/textapi/endpoints/#entity-level-sentiment-analysis
 */
function EntitySentimentService () {
  
  this.analyse = function(text, title) {
    var data = {
      'text': text,
      'mode': 'tweet'
    };
    return Aylien.invoke(Aylien.Operations.ENTITY_SENTIMENT, data, this.parseResponse);
  };
  
  this.parseResponse = function(response) {
    var result = {
      status: 0,
      error: null,
      language: null,
      content: null
    };
    if (response.getResponseCode() != 200) {
      result.status = 1;
      result.error = messages('analysisFailed');
    } else {
      var json = JSON.parse(response.getContentText());
      var entities = safe_access(json, 'entities');
      var summary = {};
      for (var key in entities) {
        var entity = entities[key];
        var text = safe_access(entity.mentions[0], 'text');
        var sentiment = entity.overall_sentiment;
        sentiment.type = entity.type;
        if (!summary[text]) {
          summary[text] = [sentiment];
        } else {
          summary[text].push(sentiment);
        }
      }
      result.content = limit(summary, MAX);
      result.language = safe_access(json, 'language');
    }
    return result;
  }
};
debug_log("EntitySentiment service loaded");
  