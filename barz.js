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

  // Set up div containers and apply some CSS properties.

  var title = elem.text();
  elem.text("");
  elem.append($("<div>", {id: "title", class: "barz"}));
  $("#title").text(title);
  elem.append($("<div>", {id: "body", class: "barz"}));
  $("#body").append($("<div>", {id: "y-label", class: "barz"}));
  $("#body").append($("<div>", {id: "chart", class: "barz"}));
  $("#body").append($("<div>", {id: "x-label", class: "barz"}));

  $("#y-label").css("display", "inline-block");
  $("#chart").css("display", "inline-block");

  $(".barz").css("margin", "0").css("padding", "0");
  $("#title").css({
             "height": "10%",
             "font-family": "Arial, Helvetica, sans-serif",
             "font-size": "2em",
             "text-align": "center",
  });

  $("#body").css("height", "90%").css("font-size","0");
  $("#y-label").css("width", "20%").css("height", "80%");
  $("#chart").css("width", "80%").css("height", "80%");
  $("#x-label").css("width", "100%").css("height", "20%");

  // Test code. Will be removed.

  $("#y-label").css("background-color", "blue");
  $("#chart").css("background-color", "red");
  $("#x-label").css("background-color", "green");
}
