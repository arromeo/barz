# Barz

Barz is a JS library to configure and display custom bar charts.

### Features

- Display both single and multi-bar graphs
- Customize labels, colors and background
- Feed in raw or formatted data
- Adaptable and dynamic sizing to fit in any space

### Prerequisites

The only requirement to run Barz is jQuery. jQuery v3.3.1 was used to develop and test the library, but other versions should work.

### Installation

All that is needed is to include the barz.js file after including jQuery.

### Usage

First, place a div in the HTML. The id is used to identify the placeholder to the script. The text inside the tag is used as the chart's title.

```html
<div id="chart">Test Chart</div>
```

Once the document is completely loaded and the DOM is ready, run the barz function, passing in the data array, the options object and the jQuery element you would like to place the chart into.

```js
barz(data, options, element);
```

To get the full details on how to structure the data array and all the available options, please see [documentation](https://arromeo.github.io/barz/). For a full list of customizable features, please see the [options](https://arromeo.github.io/barz/options) page.

### Sources

This project was made for educational purposes and as such pulled a lot of information from a lot of sources.

##### Color Picker

The color picker algorithm was based off of [this algorithm](https://gmigdos.wordpress.com/2011/01/13/javascript-convert-rgb-values-to-hsl/) intended to convert RGB values to HSL.

##### CSS

There were a countless number of CSS resources that were used to fit the design together. The major sources being [W3Schools](https://www.w3schools.com/), [MDN Web Docs](https://developer.mozilla.org/en-US/) and the online book [Learn CSS Layout
the pedantic way](http://book.mixu.net/css/).

##### jQuery

Most of the jQuery came from the [official jQueery API documentation](https://api.jquery.com/) as well as MDN Web Docs.

### Known Issues

There are currently no known bugs with this library but it requires further testing. If any bugs are found, please submit it in the issues tab for review.

### To-Dos

A list of future plans for this project can be found on the [To-Do List](https://github.com/arromeo/barz/blob/master/todo.md).
