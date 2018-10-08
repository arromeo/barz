// Call the Barz control flow object to apply settings, format data
// and render the chart.

function barz(rawData, options, elem) {
  var settings = setOptions(options);
  renderBarz(rawData, settings, elem);
}

// Initialize settings object using dafaults as a fall back.

function setOptions(options) {
  var defaults = {
    "title-color": "black",
    "width": "700px",
    "height": "500px"
  };

  return Object.assign(defaults, options);
}

// Apply settings and display barchart.

function renderBarz(data, options, elem) {
  elem.css("color", options["title-color"]);
  elem.css("width", options.width);
  elem.css("height", options.height);

  // Test code. Will be removed.
  elem.css("border-style", "solid").css("border-width", "2px");
}
