// Call the Barz control flow object to apply settings, format data
// then render the chart.

function barz(rawData, options, elem) {
  var settings = setOptions(options);
  var data = formatData(rawData, settings);
  renderBarz(data, settings, elem);
}

// Initialize settings object using dafaults as a fall back.

function setOptions(options) {
  var defaults = {
    "title-color": "black",
    "width": "700px",
    "height": "500px",
    "spacing": "auto",
    "multibar": "false",
    "label-color": "blue"
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

function formatData(data, options) {
  var setCount = 0;
  var keySets = [];
  var dataSets = [];

  // Bind raw data to data object and apply individual bar settings.

  if (options.multibar === "false") {
    for(var i = 0; i < data.length; i++) {
      if (keySets.includes(data[i])) {
        dataSets[keySets.indexOf(data[i])].value += 1;
      } else {
        keySets.push(data[i]);
        dataSets.push({
          id: data[i],
          label: (options["bar-" + data[i] + "-label"] || data[i]),
          value: options["bar-" + data[i] + "-value"] || 1,
          color: options["bar-" + data[i] + "-color"] || "blue"
        });
        setCount++;
      }
    }
  } else {
    for(var i = 0; i < data.length; i++) {
      if (!keySets.includes(data[i])) {
        keySets.push(data[i]);
        dataSets.push({
          id: data[i],
          label: (options["bar-" + data[i] + "-label"] || data[i]),
          aValue: options["bar-" + data[i] + "-a-value"] || 0,
          bValue: options["bar-" + data[i] + "-b-value"] || 0,
          cValue: options["bar-" + data[i] + "-c-value"] || 0,
          aColor: options["a-color"] || "red",
          bColor: options["b-color"] || "orange",
          cColor: options["c-color"] || "yellow",
          aLabel: options["a-label"] || "",
          bLabel: options["b-label"] || "",
          cLabel: options["c-label"] || ""
        });
      }
      dataSets[i].value = dataSets[i].aValue + dataSets[i].bValue + dataSets[i].cValue;
      setCount++;
    }
  }
  // Find the highest bar.

  var upperLimit = (function() {
    var result = 0;
    for (var i = 0; i < dataSets.length; i++) {
      if (dataSets[i].value > result) {
        result = dataSets[i].value;
      }
    }
    console.log(result);
    return result;
  })();

  return {
    "setCount": setCount,
    "upperLimit": upperLimit,
    "sets": dataSets
  };
}




// Apply settings and display barchart.

function renderBarz(data, options, elem) {

  // Initialize variables used for display calculations.

  var chartId = "#" + elem.attr("id");
  var width = parseInt(options.width.slice(0,-2));
  var height = parseInt(options.height.slice(0,-2));
  var title = elem.text();

  if (options.spacing === "auto") {
    padding = Math.ceil(((width - 100) / 3) / data.setCount);
  } else {
    padding = parseInt(options.spacing.slice(0, -2));
  }

  var barWidth = Math.ceil((width- 100 - (padding * data.setCount)) / data.setCount);
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

  // Place ticks in side bar.

  var ticks = 0;
  var skip = 0;

  (function () {
    var i = 0;

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
  })();

  // Place spacers, bars, labels.

  var lineHeight = Math.ceil((height - 115) / (ticks + 0.5));

  $(chartId + " .barz-content").append($("<div>", { class: "barz-halfpad" }));
  $(chartId + " .barz-bottombar").append($("<div>", { class: "barz-left-corner-pad"}));

  for (var i = 0; i < data.setCount; i++) {
    var barCssId = "barz-bar-" + i.toString();
    $(chartId + " .barz-content").append($("<div>", { class: barCssId}));

    $(chartId + " ." + barCssId).css({
      "display": "flex",
      "flex-direction": "column",
      "width": barWidth.toString() + "px",
      "height": (data.sets[i].value * (lineHeight / skip)).toString() + "px",
      "background-color": data.sets[i].color,
      "flex": "none"
    });

    if (i + 1 < data.setCount ) {
      $(chartId + " .barz-content").append($("<div>", { class: "barz-pad"}));
    }

    // Multibar display.

    if (options.multibar === "true") {
      $(chartId + " ." + barCssId).append($("<div>", {class: (barCssId + "-a")}));
      $(chartId + " ." + barCssId).append($("<div>", {class: (barCssId + "-b")}));
      $(chartId + " ." + barCssId).append($("<div>", {class: (barCssId + "-c")}));
      $(chartId + " ." + barCssId + "-a").css({
        "background-color": data.sets[i].aColor,
        "width": barWidth.toString() + "px",
        "height": (data.sets[i].aValue * (lineHeight / skip)).toString() + "px",
      });
      $(chartId + " ." + barCssId + "-b").css({
        "background-color": data.sets[i].bColor,
        "width": barWidth.toString() + "px",
        "height": (data.sets[i].bValue * (lineHeight / skip)).toString() + "px",
      });
      $(chartId + " ." + barCssId + "-c").css({
        "background-color": data.sets[i].cColor,
        "width": barWidth.toString() + "px",
        "height":  (data.sets[i].cValue * (lineHeight / skip)).toString() + "px",
      });
    }

    // Place bar labels.

    $(chartId + " .barz-bottombar").append($("<div>", {class: (barCssId + "-label-box")}));
    $(chartId + " ." + barCssId + "-label-box").append($("<p>", {class: (barCssId + "-label")}));
    $(chartId + " ." + barCssId + "-label").text(data.sets[i].label);

    $(chartId + " ." + barCssId + "-label-box").css({
      "display": "flex",
      "height": "25px",
      "width" : (barWidth + padding) + "px"
    });

    $(chartId + " ." + barCssId + "-label").css({
      "margin": "auto",
      "vertical-algin": "middle",
      "color": data.sets[i]["label-color"]
    });

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
    "line-height": lineHeight.toString() + "px",
    "margin": "0px",
    "vertical-align": "middle"
  });

  $(chartId + " .barz-halfpad").css({
    "width": Math.ceil(padding / 2).toString() + "px",
    "height": "20px",
    "flex": "none"
  });

  $(chartId + " .barz-pad").css({
    "width": padding,
    "height": "20px",
    "flex": "none"
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
    "width": "50px",
    "height": "65px"
  });

}
