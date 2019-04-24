/**
 * https://docs.aylien.com/textapi/endpoints/#classification
 */
function ClassificationService () { 
  
  this.analyse = function(text, title) {
    var data = {
      'text': text
    };
    var response = Aylien.invoke(Aylien.Operations.CLASS, data, this.parseResponse);
    return response;
  };
  
  this.parseResponse = function(response) {
    var result = {
      status: 0,
      error: null,
      language: null,
      confidence: null
    };
    if (response.getResponseCode() != 200) {
      result.status = 1;
      result.error = messages('analysisFailed');
    } else {
      debug_log(response.getContentText());
      var json = JSON.parse(response.getContentText());
      var entity = {
        categories : safe_access(json, 'categories')
      };
      result.content = (!entity.categories || entity.categories.length == 0 ? {} : limit(entity, MAX));
      result.language = safe_access(json, 'lang');
    }
    return result;
  }
  
};
debug_log("Classification service loaded");
