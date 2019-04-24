/**
 * https://docs.aylien.com/textapi/endpoints/#entity-extraction
 */
function EntityService () {
  
  var self = this;
  
  self.analyse = function(text, title) {
    var data = {
      'text': text
    };
    var response = Aylien.invoke(Aylien.Operations.ENTITY, data, self.parseResponse);
    debug_log(response.content);
    return response;
  };
  
  self.parseResponse = function(response) {
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
      result.content = limit(entities, MAX);
      result.language = safe_access(json, 'language');
    }
    return result;
  };
  
};
debug_log("Entity service loaded");
