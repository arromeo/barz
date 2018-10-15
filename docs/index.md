---
title: Documentation
---

### Prerequisites

The only requirement to run Barz is jQuery. jQuery v3.3.1 was used to develop and test the library, but other versions should work.

### Installation

All that is needed is to include the barz.js file after including jQuery.

### Basic Usage

First, place a div in the HTML body where you would like the chart to display. The id is used to identify the placeholder to the script. The text inside the tag is used as the chart's title.

```html
<div id="chart">Test Chart</div>
```

Once the document is completely loaded and the DOM is ready, run the barz function, passing in the data array, the options object and the jQuery element you would like to place the chart into.

```js
barz(data, options, element);
```

### Graph Types

Currently, Barz supports two types of graphs. Single-bar graphs and multi-bar graphs. The default is for a single bar.

![single bar example](https://raw.githubusercontent.com/arromeo/barz/master/docs/single-bar-example.png)

To setup a multi-bar add `"multibar": true` to the options object.

![multi bar example](https://raw.githubusercontent.com/arromeo/barz/master/docs/multi-bar-example.png)

### Data Array

The data array can be used to feed in raw data in series `[1,1,1,1,2,2]`  or it can be used to label the data, later passing in the value explicitly in the options object:

```js
barz(["Q1", "Q2"], { "bar-Q1-value": 2, "bar-Q2-value": 1 }, elem);
```

If the value is set explicitly in the options, any duplicate values in the data array will be added to that total.

### Options

With Barz, the options are passed in using a JS object. It's recommended to create an options object outside of the function call to help with readability.
