function AylienService () {
  
  this.Operations = {
    SUMMARIZE: "https://api.aylien.com/api/v1/summarize",
    SENTIMENT: "https://api.aylien.com/api/v1/sentiment",
    ENTITY: "https://api.aylien.com/api/v1/entities",
    HASHTAGS: "https://api.aylien.com/api/v1/hashtags",
    LANG_DETECT: "https://api.aylien.com/api/v1/language",
    CLASS: "https://api.aylien.com/api/v1/classify",
    ENTITY_SENTIMENT: "https://api.aylien.com/api/v1/elsa"
  },
  
  this.invoke = function(operation, data, callback) {
    var headers = {
      "Accept": "application/json",
      "X-AYLIEN-TextAPI-Application-Key": Config.AYLIEN_KEY,
      "X-AYLIEN-TextAPI-Application-ID": Config.AYLIEN_APP_ID
    };
    var options = {
      'method' : 'post',
      'contentType': 'application/x-www-form-urlencoded',
      'headers': headers,
      'muteHttpExceptions': true,
      'payload' : data
    };
    var response = UrlFetchApp.fetch(operation, options);
    debug_log(response);
    return callback(response);
  }
}
