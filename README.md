# Barz

Barz is a JS library to configure and display custom bar charts.

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

The data array can be used to feed in raw data in series `[1,1,1,1,2,2]`  or it can be used to label the data, later passing in the value explicitly in the options object `["bar1", "bar2"]`.
