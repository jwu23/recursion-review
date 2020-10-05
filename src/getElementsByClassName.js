// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  // your code here
  // Create var hold document obj
  // Create array to hold element with className
  // Start at top of doc obj check if it has className using element.classList.contains(className);
    // Push into array if yes
  // Check if current obj has childNodes
    // set current obj as childNode

  var results = [];
  var htmlDoc = document.body;

  var traverse = function(element) {
    if (element.nodeType === 1) {
      if (element.classList.contains(className)) {
        results.push(element);
      }
    }

    if (element.hasChildNodes()) {
      var children = element.childNodes;

      for (var child of children) {
        traverse(child);
      }
    }
  };

  traverse(htmlDoc);
  return results;
};
