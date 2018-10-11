// Call the Barz control flow object to apply settings, format data
// then render the chart.

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

  // Initialize variables used for display calculations.

  var chartId = "#" + elem.attr("id");
  var width = parseInt(options.width.slice(0,-2));
  var height = parseInt(options.height.slice(0,-2));
  var title = elem.text();
  var padding = parseInt(options.spacing.slice(0,-2));

  // Set up div containers.

  elem.text("");
  elem.append($("<div>", { class: "barz-container" }));
  $(chartId + " .barz-container").append($("<div>", { class: "barz-title"}));
  $(chartId + " .barz-title").append($("<p>", {class: "barz-title-text"}));
  $(chartId + " .barz-title-text").text(title);
  $(chartId + " .barz-container").append($("<div>", { class: "barz-body"}));
  $(chartId + " .barz-body").append($("<div>", { class: "barz-sidebar"}));
  $(chartId + " .barz-body").append($("<div>", { class: "barz-content"}));
  $(chartId + " .barz-body").append($("<div>", { class: "barz-bottombar"}));
  $(chartId + " .barz-bottombar").append($("<div>", {class: "barz-left-corner-pad"}));

  // Place ticks in side bar.

  var ticks = 0;
  var skip = 0;
  var i = 0;
  var middleTick = false;

  if (data.upperLimit < 6) {
    ticks = data.upperLimit;
    skip = 1;
    i = ticks;
  } else {
    ticks = 5;
    skip = Math.ceil(data.upperLimit / 5);
    i = skip * 5;
  }

  while (i > 0) {
    $(chartId + " .barz-sidebar").append('<p class="tick">' + i + '–</p>');
    i -= skip;
  }



  // CSS properties.

  $(chartId).css({
    "display": "inline-block",
    "margin": "0px",
    "padding": "0px"
  });

  $(chartId + " .barz-container").css({
    "display": "inline-block",
    "height": options.height,
    "width": options.width,
    "background-color": "#C6E0FF"
  });

  $(chartId + " .barz-title").css({
    "display": "flex",
    "height": "50px",
    "width": options.width,
    "color": options["title-color"]
  });

  $(chartId + " .barz-title-text").css({
    "margin": "auto",
    "text-align": "center",
    "font-family": "Ariel, Helvetica, sans-serif",
    "font-style": "italic",
    "font-size": "30px"
  });

  $(chartId + " .barz-body").css({
    "display": "flex",
    "flex-wrap": "wrap",
    "height": (height - 50).toString() + "px",
    "width": options.width
  });

  $(chartId + " .barz-sidebar").css({
    "width": "50px",
    "height": (height - 115).toString() + "px",
    "overflow": "hidden"
  });

  $(chartId + " .tick").css({
    "text-align": "right",
    "line-height": Math.ceil((height - 115) / (ticks + 0.5)).toString() + "px",
    "margin": "0px",
    "vertical-align": "middle"
  });

  $(chartId + " .barz-content").css({
    "display": "flex",
    "align-items": "flex-end",
    "width": (width - 100).toString() + "px",
    "height": (height - 115).toString() + "px",
    "border-style": "solid",
    "border-width": "0 0 thin thin",
    "background-color": "white"
  });

  $(chartId + " .barz-bottombar").css({
    "display": "flex",
    "align-items": "flex-start",
    "height": "65px",
    "width": options.width
  });

  $(chartId + " .barz-left-corner-pad").css({
    "width": (50 + (padding / 2)).toString + "px",
    "height": "65px"
  });

}
