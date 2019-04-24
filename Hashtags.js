/**
 * https://docs.aylien.com/textapi/endpoints/#hashtags
 */
function HashtagsService () { 
  
  this.analyse = function(text, title) {
    var data = {
      'text': text
    };
    var response = Aylien.invoke(Aylien.Operations.HASHTAGS, data, this.parseResponse);
    debug_log(response.content);
    return response;
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
      result.content = limit(safe_access(json, 'hashtags'), MAX);
      result.language = safe_access(json, 'language');
    }
    return result;
  }
  
};
debug_log("Hashtags service loaded");
