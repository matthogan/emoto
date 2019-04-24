function ServiceLocatorService () {
  
  this.Services = {
  };
  
  this.bind = function(analysisType, service) {
    if (!analysisType) {
      debug_log("Service name not provided");
    }
    if (!service) {
      debug_log("Service not provided");
    }
    this.Services[analysisType] = service;
    debug_log("Service bound " + analysisType + "=>" + this.Services[analysisType]);
  };
  
  this.analyse = function(analysisType, text, title) {
    if (!analysisType) {
      debug_log("Service name not provided");
      return null;
    }
    if (!AnalysisType.isAnalysisType(analysisType)) {
      debug_log("AnalysisType not found [" + analysisType + "]");
      return null;
    }
    if (!this.Services[analysisType]) {
      debug_log("Service not found [" + analysisType + "]");
      debug_log("ServiceLocators are [" + object_tostring(this.Services) + "]");
      return null;
    }
    return this.Services[analysisType].analyse(text, title);
  };
};