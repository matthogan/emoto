/**
 * Random utilities
 */

    
function limit(json, max) {
  if (!json || !max) {
    return json;
  }
  var text = JSON.stringify(json);
  if (!text || text.length < max) {
    return json;
  }
  var smaller = {};
  for (var key in json) {
    var element = json[key];
    var string = JSON.stringify(element);
    var len = JSON.stringify(smaller).length;
    if (len + string.length < max) {
      smaller[key] = element;
    } else {
      debug_log("Exceeded " + max + ", removed " + key);
    }
  }
  return smaller;
}

function safe_access(object, property) {
  if (!!object && typeof object == 'object' && !!object[property]) {
    return object[property];
  }
  return null;
}

function url_decode(string) {
  if (!!string && typeof string == 'string') {
    return decodeURIComponent(string);
  }
  return '';
}

function isValue(value) {
  return typeof value == "string" ||
    typeof value == "number" ||
    typeof value == "boolean";
}

function isString(value) {
  return typeof value == "string";
}

function isObject(value) {
  return typeof value == "object";
}

function hasValue(value) {
  return !isString(value) || value.length > 0;
}

function debug_log(value) {
  Logger.log('********** DEBUG LOG ************');
  if (!!value && Array.isArray(value)) {
    for (var key in value) {
      Logger.log(value[key]);
    }
  } else {
    Logger.log(value);
  }
  Logger.log('********** LOGGED ************');
}

function object_tostring(object) {
  if (!object || !(typeof object == 'object')) {
    return 'not an object';
  }
  var items = [];
  for (var key in object) {
    items.push(key + ":" + object[key]);
  }
  return "" + items;
}

function toLabel(string) {
  var caps = capitalise(string);
  return !caps ? caps : caps + ': ';
}

function capitalise(string) {
  // 0 long or not string then don't bother
  if (!!string && typeof string == 'string' && string.length > 0) {
    var words = string.replace('_', ' ').split(' ');
    var text = '';
    for (key in words) {
      text += words[key];
      text += ' ';
    }
    text = text.trim();
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  return '';
}
