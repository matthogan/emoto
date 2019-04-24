/**
 * Constants
 */

// Maximum chars to be stored in a property
var MAX = 9000;

function AnalysisTypeService () {
  this.SENTIMENT = "sentiment";
  this.SUMMARY = "summary";
  this.ENTITY = "entity";
  this.HASHTAGS = "hashtags";
  this.LANG_DETECT = "languageDetection";
  this.CLASS = "classification";
  this.ENTITY_SENTIMENT = "entitySentiment";
  this.isAnalysisType = function(analysisType) {
    if (!analysisType) {
      debug_log("analysisType not provided");
      return false;
    }
    for (var key in AnalysisType) {
      if (AnalysisType[key] === analysisType) {
        return true;
      }
    }
    return false;
  };
};

var Config = {
  AYLIEN_KEY: "<<go to aylien.com>>",
  AYLIEN_APP_ID: "<<go to aylien.com>>",
};

Config[AnalysisType.SENTIMENT] = {
  CALLBACK: "analyseSentiment"
};
Config[AnalysisType.SUMMARY] = {
  CALLBACK: "analyseSummary"
};
Config[AnalysisType.ENTITY] = {
  CALLBACK: "analyseEntity"
};
Config[AnalysisType.HASHTAGS] = {
  CALLBACK: "analyseHashtags"
};
Config[AnalysisType.LANG_DETECT] = {
  CALLBACK: "analyseLanguageDetection"
};
Config[AnalysisType.CLASS] = {
  CALLBACK: "analyseClassification"
};
Config[AnalysisType.ENTITY_SENTIMENT] = {
  CALLBACK: "analyseEntitySentiment"
};