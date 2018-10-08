// Call the Barz control flow object to apply settings, format data
// and render the chart.

function barz(rawData, options, elem) {
  var settings = setOptions(options);
  var data = formatData(rawData);
  renderBarz(data, settings, elem);
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

// Indexes the raw data and returns a data object for rendering

function formatData(data) {
  var sets = 0;
  var dataSets = {};

  //Enumerate through and index the raw data set.

  for (var i = 0; i < data.length; i++) {
    if (dataSets.hasOwnProperty(data[i])) {
      dataSets[data[i]] ++;
    } else {
      dataSets[data[i]] = 1;
      sets ++;
    }
  }

  // Test code. Will be removed.
  console.log(JSON.stringify(dataSets));

  return {
    "sets": sets,
    "data": dataSets
  };
}

// Apply settings and display barchart.

function renderBarz(data, options, elem) {
  elem.css("color", options["title-color"]);
  elem.css("width", options.width);
  elem.css("height", options.height);

  // Test code. Will be removed.
  elem.css("border-style", "solid").css("border-width", "2px");
}
