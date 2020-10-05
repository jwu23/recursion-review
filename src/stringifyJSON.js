// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  //if number then return string version
  //if null return string version
  //boolean return string version
  //if string return string version
  //if array
  //if object

  if (typeof(obj) === 'string') {
    return '"' + obj + '"';
  }
  if (Array.isArray(obj)) {
    var stringified = [];
    for (var i = 0; i < obj.length; i++) {
      stringified.push(stringifyJSON(obj[i]));
    }
    return '[' + stringified.join(',') + ']';
  }
  if (typeof(obj) === 'object' && obj !== null) {
    var keys = Object.keys(obj);
    var stringifiedObj = [];
    for (var i = 0; i < keys.length; i++) {
      if (typeof (obj[keys[i]]) === 'function' || obj[keys[i]] === undefined) {
        continue;
      }
      stringifiedObj.push(stringifyJSON(keys[i]) + ':' + stringifyJSON(obj[keys[i]]));
    }
    return '{' + stringifiedObj.join(',') + '}';
  }

  return '' + obj;
};
