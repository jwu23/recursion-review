// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function (json) {
  // your code goes here
  // '{'key':'value', 'key':'value'}'
  // check first char in json
  // if '[' json[0]
  // then split by ','
  // '{"hello,: goodbye": "value", }'

  // '['hello', 'goodbye', 'hi, bye']

  var splitByChar = function (char, str) {
    var result = [];
    var word = '';
    var quotes = 0;
    var bracket = 0;
    var brace = 0;
    var escaped = false;
    for (var i = 0; i < str.length; i++) {
      var curr = str[i];
      if (curr === '"') {
        quotes++;
      } else if (curr === '[') {
        bracket++;
      } else if (curr === '{') {
        brace++;
      } else if (curr === ']') {
        bracket--;
      } else if (curr === '}') {
        brace--;
      } else if (curr === '\\' && escaped === false) {
        escaped = true;
        continue;
      }

      if (escaped === true) {
        escaped = false;
      }

      if (quotes % 2 === 0 && bracket === 0 && brace === 0 && curr === char) {
        result.push(word.trim());
        word = '';
      } else {
        word += curr;
      }
    }

    if (word !== '') {
      result.push(word.trim());
    }

    return result;
  };
  if (json[0] === '[') {
    if (json === '[]') {
      return [];
    }
    json =json.slice(1, -1);
    var splitVal = splitByChar(',', json);
    var result = [];
    for (var i = 0; i < splitVal.length; i++) {
      result.push(parseJSON(splitVal[i]));
    }
    return result;
  }
  // '{"foo": true, "bar": false, "baz": null}'
  // ['"foo": true', '"bar": false', '"baz": null']
  // ["foo", 'true']
  if (json[0] === '{') {
    if (json === '{}') {
      return {};
    }
    json = json.slice(1, -1);
    var splitVal = splitByChar(',', json);
    var result = {};
    for (var i = 0; i < splitVal.length; i++) {
      var temp = splitByChar(':', splitVal[i]);
      result[temp[0].slice(1, -1)] = parseJSON(temp[1]);
    }
    return result;
  }
  if (json === 'true') {
    return true;
  }
  if (json === 'false') {
    return false;
  }
  if (json === 'null') {
    return null;
  }
  if (json === '') {
    return '';
  }
  if (json[0] === '"') {
    return json.slice(1, -1);
  }
  return Number(json);
};
