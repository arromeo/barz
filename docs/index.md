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

Barz uses a color picking algorithm, so all color options must be set using hex values.

#####Title Color
Changes the color of text above the graph. Default is black.

```js
{ "title-color": "#000000" }
```

#####Title Font Size
Sets the font size used above the graph. Default is `30px`.

```js
{ "title-font-size": "18px" }
```

#####Background Color
Sets the background color. This is the area that surrounds the chart. Default is white.

```js
{ "background-color": "#000000" }
```

#####Chart Color
Sets the background color of the chart. Default is white.

```js
{ "chart-color": "#000000" }
```

#####Width
Sets the overall width of the chart container. Default is `700px`.

```js
{ "width": "500px" }
```

#####Height
Sets the overall height of the chart container. Default is `500px`.

```js
{ "height": "500px" }
```

#####Spacing
Sets the space between the bars. The default is `"auto"` which reserves 66% of the space for bars and the other 33% as the space between.

```js
{ "spacing": "20px" }
```

#####Multibar
Activates multibar mode. If set to `true`, it expects values for every level of the bar. Default is `false`

```js
{ "multibar": true }
```

#####Label Color
Changes the label colors at the bottom of the chart.

```js
{ "label-color": "#000000" }
```

#####Display Bar Numbers
Toggles whether to show number values in bars. Default is `true`.

```js
{ "display-numbers": true }
```

#####X-Axis Label
Sets label for x-axis. Default is empty.

```js
{ "x-axis-label": "value" }
```

#####Y-Axis Label
Sets label for y-axis. Default is empty.

```js
{ "y-axis-label": "value" }
```

#####Value
If single bar, the value is set with following format:

```js
{ "bar-<name>-value": 1 }
```

For multi-bar, the values are set using multiple options:

```js
{ "bar-<name>-a-value": 1, "bar-<name>-b-value": 2 }
```

#####Multibar Colors
Multibar colors are set the same for all bars.

```js
{ "a-color": "#000000", "b-color": "#FFFFFF" }
```

#####Multibar Labels
Multibar labels are similar to colors and will be the same across all bars.

```js
{ "a-label": "label", "b-label": "label" }
```
