/**
 * https://docs.aylien.com/textapi/endpoints/#summarization
 */
function SummaryService () {
  
  this.analyse = function(text, title) {
    var data = {
      'title': title,
      'text': text,
      'sentences_number': '2'
    };
    return Aylien.invoke(Aylien.Operations.SUMMARIZE, data, this.parseResponse);
  };
  
  this.parseResponse = function(response) {
    var result = {
      status: 0,
      error: null,
      content: null
    };
    if (response.getResponseCode() != 200) {
      result.status = 1;
      result.error = messages('analysisFailed');
    } else {
      var json = JSON.parse(response.getContentText());
      var sentences = safe_access(json, 'sentences');
      var text = '';
      if (!!sentences && typeof sentences == 'object') {
        for (i in sentences) {
          text += url_decode(sentences[i]);
          text += ' ';
        }
      }
      result.content = !text ? text : text.substring(0, MAX);
    }
    return result;
  }
  
};
debug_log("Summary service loaded");
