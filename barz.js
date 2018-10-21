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
    "title-font-size": "30px",
    "background-color": "#FFFFFF",
    "chart-color": "#FFFFFF",
    "width": "700px",
    "height": "500px",
    "spacing": "auto",
    "display-numbers": true,
    "multibar": false,
    "label-color": "#000000",
    "x-axis-label": "",
    "y-axis-label": "",
    "a-label": "",
    "b-label": "",
    "c-label": "",
    "a-color": "#FF0000",
    "b-color": "#00FF00",
    "c-color": "#0000FF",
    "bar-colors": null,
    "bar-shadow": true
  };

  // Object.assign starts with the default object and overwrites any values that
  // are also contained in the options object.

  return Object.assign(defaults, options);
}




// Indexes the raw data and returns a data object for rendering

function formatData(data, options) {
  var setCount = 0;
  var keySet = [];
  var dataSets = [];

  // Bind raw data to data object and apply individual bar settings.

  for(var i = 0; i < data.length; i++) {
    if (options.multibar === false) {
      if (keySet.includes(data[i])) {
        dataSets[keySet.indexOf(data[i])].value += 1;
      } else {
        keySet.push(data[i]);
        dataSets.push({
          id: data[i],
          label: options["bar-" + data[i] + "-label"] || data[i],
          value: options["bar-" + data[i] + "-value"] || 1,
          color: options["bar-" + data[i] + "-color"] ||
              options["bar-colors"] || "#0000FF"
        });
      }
    } else {
      if (!keySet.includes(data[i])) {
        keySet.push(data[i]);
        dataSets.push({
          id: data[i],
          label: (options["bar-" + data[i] + "-label"] || data[i]),
          aValue: options["bar-" + data[i] + "-a-value"] || 0,
          bValue: options["bar-" + data[i] + "-b-value"] || 0,
          cValue: options["bar-" + data[i] + "-c-value"] || 0
        });
      }
      dataSets[i].value = dataSets[i].aValue + dataSets[i].bValue +
                          dataSets[i].cValue;
    }
    setCount++;
  }
  // Find the highest bar.

  var upperLimit = 0;
  for (var set = 0; set < dataSets.length; set++) {
    if (dataSets[set].value > upperLimit) {
      upperLimit = dataSets[set].value;
    }
  }

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
  var sidebarWidth = 50;
  var bottombarHeight = 65;
  var multiLabel = false;
  var title = elem.text();

  if (options["a-label"] !== "" || options["b-label"] !== "" ||
      options["c-label"] !== "") {
    multiLabel = true;
    bottombarHeight = 85;
  }

  if (options["y-axis-label"] !== "") {
    sidebarWidth = 85;
  }

  if (options.spacing === "auto") {
    padding = Math.ceil(((width - sidebarWidth - 50) / 3) / data.setCount);
  } else {
    padding = parseInt(options.spacing.slice(0, -2));
  }

  var barWidth = Math.ceil((width - sidebarWidth - 50 -
                           (padding * data.setCount)) / data.setCount);

  // Set up div containers.

  elem.text("");
  elem.append($("<div>", { class: "barz-container" }));
  $(chartId + " .barz-container").append($("<div>", { class: "barz-title"}));
  $(chartId + " .barz-title")
      .append($("<div>", { class: "barz-left-corner-pad" }));
  $(chartId + " .barz-title").append($("<p>", {class: "barz-title-text"}));
  $(chartId + " .barz-title-text").text(title);
  $(chartId + " .barz-container").append($("<div>", { class: "barz-body"}));

  // Apply y-axis label if one exists.

  if (options["y-axis-label"] !== "") {
    $(chartId + " .barz-body").append($("<div>", { class: "barz-y-label"}));
    $(chartId + " .barz-y-label")
        .append($("<p>", { class: "barz-y-label-text"}));
    $(chartId + " .barz-y-label-text").text(options["y-axis-label"]);
  }

  // Continue with more div containers for the layout.

  $(chartId + " .barz-body").append($("<div>", { class: "barz-tickbar"}));
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
      $(chartId + " .barz-tickbar").append('<p class="tick">' + i + '–</p>');
      i -= skip;
    }
  })();

  // Place spacers, bars, labels.

  var lineHeight = Math.ceil((height - 50 - bottombarHeight) / (ticks + 0.5));

  $(chartId + " .barz-content").append($("<div>", { class: "barz-halfpad" }));
  $(chartId + " .barz-bottombar")
      .append($("<div>", { class: "barz-left-corner-pad"}));

  for (var i = 0; i < data.setCount; i++) {
    var barCssId = "barz-bar-" + i.toString();
    $(chartId + " .barz-content").append($("<div>", { class: barCssId}));

    // CSS settings for bar, including height which is determined by value.

    $(chartId + " ." + barCssId).css({
      "display": "flex",
      "align-items": "flex-start",
      "flex-direction": "column",
      "width": barWidth.toString() + "px",
      "height": (data.sets[i].value * (lineHeight / skip)).toString() + "px",
      "background-color": data.sets[i].color,
      "flex": "none"
    });

    if (options["bar-shadow"] === true) {
      $(chartId + " ." + barCssId).css({
              "box-shadow": "7px 2px 10px -1px rgba(0,0,0,0.68)"
      });
    }

    if (i + 1 < data.setCount ) {
      $(chartId + " .barz-content").append($("<div>", { class: "barz-pad"}));
    }

    // Multibar display.

    if (options.multibar === true) {

      //Fill in the bar with sub bars and display number inside bar.
      $(chartId + " ." + barCssId)
          .prepend($("<div>", {class: (barCssId + "-a")}));
      $(chartId + " ." + barCssId)
          .prepend($("<div>", {class: (barCssId + "-b")}));
      $(chartId + " ." + barCssId)
          .prepend($("<div>", {class: (barCssId + "-c")}));

      if (options["display-numbers"] === true) {
        $(chartId + " ." + barCssId + "-a")
            .append($("<p>", {class: (barCssId + "barz-bar-label-a")}));
        if (data.sets[i].aValue > 0) {
          $(chartId + " ." + barCssId + "barz-bar-label-a")
              .text(data.sets[i].aValue);
          $(chartId + " ." + barCssId + "barz-bar-label-a").css({
            "margin": "auto",
            "vertical-align": "middle",
            "color": colorPicker(options["a-color"])
          });
        }

        $(chartId + " ." + barCssId + "-b")
            .append($("<p>", {class: (barCssId + "barz-bar-label-b")}));
        if (data.sets[i].bValue > 0) {
          $(chartId + " ." + barCssId + "barz-bar-label-b")
              .text(data.sets[i].bValue);
          $(chartId + " ." + barCssId + "barz-bar-label-b").css({
            "margin": "auto",
            "vertical-align": "middle",
            "color": colorPicker(options["b-color"])
          });
        }

        $(chartId + " ." + barCssId + "-c")
            .append($("<p>", {class: (barCssId + "barz-bar-label-c")}));
        if (data.sets[i].cValue > 0) {
          $(chartId + " ." + barCssId + "barz-bar-label-c")
              .text(data.sets[i].cValue);
          $(chartId + " ." + barCssId + "barz-bar-label-c").css({
            "margin": "auto",
            "vertical-align": "middle",
            "color": colorPicker(options["c-color"])
          });
        }
      }
      $(chartId + " ." + barCssId + "-a").css({
        "display": "flex",
        "background-color": options["a-color"],
        "width": barWidth.toString() + "px",
        "height": (data.sets[i].aValue * (lineHeight / skip)).toString() + "px"
      });
      $(chartId + " ." + barCssId + "-b").css({
        "display": "flex",
        "background-color": options["b-color"],
        "width": barWidth.toString() + "px",
        "height": (data.sets[i].bValue * (lineHeight / skip)).toString() + "px"
      });
      $(chartId + " ." + barCssId + "-c").css({
        "display": "flex",
        "background-color": options["c-color"],
        "width": barWidth.toString() + "px",
        "height": (data.sets[i].cValue * (lineHeight / skip)).toString() + "px"
      });
    } else {
      if (options["display-number"] === true) {
        $(chartId + " ." + barCssId)
            .append($("<p>",{class: (barCssId + "-value-label")}));
        $(chartId + " ." + barCssId + "-value-label").text(data.sets[i].value);
        $(chartId + " ." + barCssId + "-value-label").css({
          "margin": "auto",
          "vertical-align": "middle",
          "color": colorPicker(data.sets[i].color)
        });
      }
    }

    // Place bar labels.

    $(chartId + " .barz-bottombar")
        .append($("<div>", {class: (barCssId + "-label-box")}));
    $(chartId + " ." + barCssId + "-label-box")
        .append($("<p>", {class: (barCssId + "-label")}));
    $(chartId + " ." + barCssId + "-label").text(data.sets[i].label);

    $(chartId + " ." + barCssId + "-label-box").css({
      "display": "flex",
      "height": "25px",
      "width" : (barWidth + padding) + "px"
    });

    $(chartId + " ." + barCssId + "-label").css({
      "margin": "auto",
      "vertical-align": "middle",
      "color": options["label-color"]
    });

  }

  // Apply axis labels.

  if (options["x-axis-label"] !== "") {
    $(chartId + " .barz-bottombar")
        .append($("<div>", {class: "barz-left-corner-pad"}));
    $(chartId + " .barz-bottombar")
        .append($("<div>", {class: "barz-x-label"}));
    $(chartId + " .barz-x-label")
        .append($("<p>", {class: "barz-x-label-text"}));
    $(chartId + " .barz-x-label-text").text(options["x-axis-label"]);
  }

  // Apply multibar labels.

  if (multiLabel === true) {
    $(chartId + " .barz-bottombar")
        .append($("<div>", {class: "barz-left-corner-pad"}));
    $(chartId + " .barz-bottombar")
        .append($("<div>", {class: "barz-multi-labels"}));

    // Creates a small color box and places a label to the right of it.

    if (options["a-label"] !== "") {
      $(chartId + " .barz-multi-labels")
          .append($("<div>", {class: "a-color-box colorbox"}));
      $(chartId + " .a-color-box").css({
        "background-color": options["a-color"]
      });

      $(chartId + " .barz-multi-labels")
          .append($("<p>", {class: "a-multi-label multilabel"}));
      $(chartId + " .a-multi-label").text(options["a-label"]);
    }

    if (options["b-label"] !== "") {
      $(chartId + " .barz-multi-labels")
          .append($("<div>", {class: "b-color-box colorbox"}));
      $(chartId + " .b-color-box").css({
        "background-color": options["b-color"]
      });
      $(chartId + " .barz-multi-labels")
          .append($("<p>", {class: "b-multi-label multilabel"}));
      $(chartId + " .b-multi-label").text(options["b-label"]);
    }

    if (options["c-label"] !== "") {
      $(chartId + " .barz-multi-labels")
          .append($("<div>", {class: "c-color-box colorbox"}));
      $(chartId + " .c-color-box").css({
        "background-color": options["c-color"]
      });
      $(chartId + " .barz-multi-labels")
          .append($("<p>", {class: "c-multi-label multilabel"}));
      $(chartId + " .c-multi-label").text(options["c-label"]);
    }
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
    "background-color": options["background-color"]
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
    "font-size": options["title-font-size"]
  });

  $(chartId + " .barz-body").css({
    "display": "flex",
    "flex-wrap": "wrap",
    "height": (height - 50).toString() + "px",
    "width": options.width
  });

  $(chartId + " .barz-tickbar").css({
    "width": "50px",
    "height": (height - 50 - bottombarHeight).toString() + "px",
    "overflow": "hidden"
  });

  $(chartId + " .tick").css({
    "text-align": "right",
    "line-height": lineHeight.toString() + "px",
    "margin": "0px",
    "vertical-align": "middle",
    "font-family": "Ariel, Helvetica, sans-serif",
    "font-size": "12px"
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
    "width": (width - (sidebarWidth + 50)).toString() + "px",
    "height": (height - 50 - bottombarHeight).toString() + "px",
    "border-style": "solid",
    "border-width": "0 0 thin thin",
    "background-color": options["chart-color"]
  });

  $(chartId + " .barz-bottombar").css({
    "display": "flex",
    "flex-wrap": "wrap",
    "align-items": "flex-start",
    "height": bottombarHeight.toString() + "px",
    "width": (width - 48).toString() + "px"
  });

  $(chartId + " .barz-x-label").css({
    "display": "flex",
    "height": "35px",
    "width": (width - (sidebarWidth + 50)).toString() + "px"
  });

  $(chartId + " .barz-y-label").css({
    "display": "flex",
    "height": (height - 50 - bottombarHeight).toString() + "px",
    "width": "35px",
    "text-orientation": "sideways",
    "writing-mode": "vertical-rl",
    "transform": "rotate(180deg)"
  });

  $(chartId + " .barz-x-label-text").css({
    "margin": "auto",
    "vertical-align": "middle",
    "font-family": "Ariel, Helvetica, sans-serif",
    "font-size": "18px"
  });

  $(chartId + " .barz-y-label-text").css({
    "margin": "auto",
    "vertical-align": "middle",
    "font-family": "Ariel, Helvetica, sans-serif",
    "font-size": "18px"
  });

  $(chartId + " .barz-left-corner-pad").css({
    "width": sidebarWidth.toString() + "px",
    "height": "25px"
  });

  $(chartId + " .colorbox").css({
    "height": "15px",
    "width": "15px",
    "vertical-align": "middle"
  });

  $(chartId + " .multilabel").css({
    "font-size": "12px",
    "margin-top": "auto",
    "padding": "0px 15px 0px 5px",
    "font-family": "Ariel, Helvetica, sans-serif"
  });

  $(chartId + " .barz-multi-labels").css({
    "display": "flex",
    "justify-items": "center",
    "height": "20px",
    "width": (width - (sidebarWidth + 50)).toString() + "px"
  });

}

function colorPicker (bgColor) {
  bgColor = bgColor.slice(1);
  var colors = [parseInt(bgColor.slice(0,2), 16),
                parseInt(bgColor.slice(2,4), 16),
                parseInt(bgColor.slice(4), 16)];

  var red = colors[0] / 255;
  var green = colors[1] / 255;
  var blue = colors[2] / 255;

  var maxColor = Math.max(red, green, blue);
  var minColor = Math.min(red, green, blue);

  // Calculate luminosity.

  var lumin = (maxColor + minColor) / 2 ;
  var saturation = 0;
  var hue = 0;
  if(maxColor != minColor){

      // Calculate saturation.

      if(lumin < 0.5){
          saturation = (maxColor - minColor) / (maxColor + minColor);
      } else {
          saturation = (maxColor - minColor) / (2.0 - maxColor - minColor);
      }

      // Calculate hue.

      if (red == maxColor) {
          hue = (green - blue) / (maxColor - minColor);
      } else if (green == maxColor) {
          hue = 2.0 + (blue - red) / (maxColor - minColor);
      } else {
          hue = 4.0 + (red - green) / (maxColor - minColor);
      }
  }

  lumin = lumin * 100;
  saturation = saturation * 100;
  hue = hue * 60;
  if (hue < 0){
    hue += 360;
  }

  // If the color is bright, it makes the label dark. If it's dark, it makes
  // the label bright.

  if (lumin < 50.0 || ( hue > 225 && hue < 270 )) {
    lumin = 85.00;
  } else {
    lumin = 15.00;
  }
  var hslString = "hsl(" + hue + ", " + saturation + "%, " + lumin + "%)";

  return hslString;
}
