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
    "spacing": "auto"
  };

  var settings = Object.assign(defaults, options);

  var minimums = {
    "width": "800px",
    "height": "400px"
  };

  var maximums = {
    "width": "1200px",
    "height": "900px"
  };

  var width = parseInt(settings.width.slice(0,-2));
  var height = parseInt(settings.height.slice(0, -2));

  if (width < minimums.width) {
    settings.width = minimums.width;
  }
  if (width > maximums.width) {
    settings.width = maximums.width;
  }

  if (height < minimums.height) {
    settings.height = minimums.height;
  }
  if (height > maximums.width) {
    settings.height = maximums.height;
  }

  return settings;
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

  // Place ticks on side bar.

  var tickString = "";
  var ticks = 0;
  var skip = Math.ceil(data.upperLimit / 5);

  for (var i = 0; i <= data.upperLimit + skip; i += skip) {
    tickString = i.toString() + " –<br>" + tickString;
    ticks++;
  }

  tickString = tickString.slice(0,-4);

  var height = parseInt(options.height.slice(0,-2));
  var width = parseInt(options.width.slice(0,-2));
  var tickSpace = Math.floor((height - 115) / ticks).toString();

  $("#y-label").html(tickString);

  // CSS properties.

  elem.css({
      "display": "inline-block",
      "background-color": "#C6E0FF"
  });

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
            "height": (height - 50).toString() + "px",
            "font-size":"0"
  });

  $("#y-label").css({
               "display": "inline-block",
               "width": "60px",
               "height": (height - 130).toString() + "px",
               "text-align": "right",
               "font-size": "12px",
               "line-height": tickSpace + "px"
  });

  $("#chart").css({
             "display": "inline-block",
             "width": (width - 120).toString() + "px",
             "height": (height - 130).toString() + "px",
             "border-style": "solid",
             "border-width": "0 0 thin thin",
             "margin-bottom": "2px",
             "background-color": "white"
  });

  $("#x-label").css({
               "width": "100%",
               "height": "65px"
  });

}
