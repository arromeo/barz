// Call the Barz control flow object to apply settings, format data
// and render the chart.

function barz(rawData, options, elem) {
  var data = formatData(rawData);
  var settings = setOptions(options);
  renderBarz(data, settings, elem);
}

// Initialize settings object using dafaults as a fall back.

function setOptions(options) {
  var defaults = {
    "title-color": "black",
    "width": "700px",
    "height": "500px",
    "subtitle": "",
    "spacing": "auto",
    "y-label": "",
    "x-label": ""
  };

  var minimums = {
    "width": "400px",
    "height": "400px"
  };

  var maximums = {
    "width": "1500px",
    "height": "900px"
  };

  return Object.assign(defaults, options);
}




// Indexes the raw data and returns a data object for rendering

function formatData(data) {
  var sets = 0;
  var dataSets = {};

  // Enumerate through and index the raw data set.

  for (var i = 0; i < data.length; i++) {
    if (dataSets.hasOwnProperty(data[i])) {
      dataSets[data[i]] ++;
    } else {
      dataSets[data[i]] = 1;
      sets ++;
    }
  }

  // Find the bar with the most results.

  var upperLimit = (function() {
    var result = 0;
    for (var key in dataSets) {
      if (dataSets[key] > result) {
        result = dataSets[key];
      }
    }

    return result;
  })();

  return {
    "sets": sets,
    "upperLimit": upperLimit,
    "data": dataSets
  };
}




// Apply settings and display barchart.

function renderBarz(data, options, elem) {
  elem.css("color", options["title-color"]);
  elem.css("width", options.width);
  elem.css("height", options.height);

  // Set up div containers.

  var title = elem.text();
  elem.text("");
  elem.append($("<div>", {id: "title", class: "barz"}));
  $("#title").text(title);
  elem.append($("<div>", {id: "body", class: "barz"}));
  $("#body").append($("<div>", {id: "y-label", class: "barz"}));
  $("#body").append($("<div>", {id: "chart", class: "barz"}));
  $("#body").append($("<div>", {id: "x-label", class: "barz"}));

  // Apply CSS properties.

  $(".barz").css({
            "margin": "0",
            "padding": "0"
  });

  $("#title").css({
             "height": "50px",
             "font-family": "Arial, Helvetica, sans-serif",
             "font-size": "2em",
             "font-style": "italic",
             "text-align": "center",
             "line-height": "50px"
  });

  $("#body").css({
            "height": "90%",
            "font-size":"0"
  });

  $("#y-label").css({
               "display": "inline-block",
               "width": "15%",
               "height": "80%"
  });

  $("#chart").css({
             "display": "inline-block",
             "width": "84%",
             "height": "80%",
             "border-style": "solid",
             "border-width": "thin"
  });

  $("#x-label").css({
               "width": "100%",
               "height": "20%"
  });

}
