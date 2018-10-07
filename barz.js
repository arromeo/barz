// Call the Barz control flow object to apply settings, format data
// and render the chart.

function barz(rawData, options, elem) {
  var settings = setOptions(options);
  // Test code. Will be deleted.
  elem.css("color", settings["title-color"]);
}

// Initialize settings object using dafaults as a fall back.

function setOptions(options) {
  var defaults = {
    "title-color": "blue",
    "width": "700 px",
    "height": "500 px"
  };

  return Object.assign(defaults, options);
}
