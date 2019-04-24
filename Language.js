/**
 * https://docs.aylien.com/textapi/endpoints/#language-detection
 */
function LanguageDetectionService () { 
  
  this.analyse = function(text, title) {
    var data = {
      'text': text
    };
    var response = Aylien.invoke(Aylien.Operations.LANG_DETECT, data, this.parseResponse);
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
      var json = JSON.parse(response.getContentText());
      var entity = {
        confidence: safe_access(json, 'confidence'),
        language: safe_access(json, 'lang')
      };
      result.content = entity;
      result.language = safe_access(json, 'lang');
    }
    return result;
  }
  
};
debug_log("LanguageDetection service loaded");
