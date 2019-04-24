/**
 * https://docs.aylien.com/textapi/endpoints/#sentiment-analysis
 */
function SentimentService () {
  
  this.analyse = function(text, title) {
    var data = {
      'text': text,
      'mode': 'tweet'
    };
    return Aylien.invoke(Aylien.Operations.SENTIMENT, data, this.parseResponse);
  };
  
  this.parseResponse = function(response) {
    var result = {
      status: 0,
      error: null,
      polarity: null,
      polarity_confidence: null,
      subjectivity: null,
      subjectivity_confidence: null
    };
    if (response.getResponseCode() != 200) {
      result.status = 1;
      result.error = messages('analysisFailed');
    } else {
      var json = JSON.parse(response.getContentText());
      result.polarity = json.polarity;
      result.polarity_confidence = json.polarity_confidence;
      result.subjectivity = json.subjectivity;
      result.subjectivity_confidence = json.subjectivity_confidence;
    }
    return result;
  }
};
debug_log("Sentiment service loaded");
  