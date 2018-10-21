---
title: Options
---

## Options
Barz applies user settings using an options object. You can set any amount of options you would like and in any order.

Barz uses a color picking algorithm, so all color options must be set using hex values.

#### Title Color
Changes the color of text above the graph. Default is black.

```js
{ "title-color": "#000000" }
```

#### Title Font Size
Sets the font size used above the graph. Default is `30px`.

```js
{ "title-font-size": "18px" }
```

#### Background Color
Sets the background color. This is the area that surrounds the chart. Default is white.

```js
{ "background-color": "#000000" }
```

#### Chart Color
Sets the background color of the chart. Default is white.

```js
{ "chart-color": "#000000" }
```

#### Width
Sets the overall width of the chart container. Default is `700px`.

```js
{ "width": "500px" }
```

#### Height
Sets the overall height of the chart container. Default is `500px`.

```js
{ "height": "500px" }
```

#### Spacing
Sets the space between the bars. The default is `"auto"` which reserves 66% of the space for bars and the other 33% as the space between.

```js
{ "spacing": "20px" }
```

#### Multibar
Activates multibar mode. If set to `true`, it expects values for every level of the bar. Default is `false`

```js
{ "multibar": true }
```

#### Label Color
Changes the label colors at the bottom of the chart.

```js
{ "label-color": "#000000" }
```

#### Display Bar Numbers
Toggles whether to show number values in bars. Default is `true`.

```js
{ "display-numbers": true }
```

#### X-Axis Label
Sets label for x-axis. Default is empty.

```js
{ "x-axis-label": "value" }
```

#### Y-Axis Label
Sets label for y-axis. Default is empty.

```js
{ "y-axis-label": "value" }
```

#### Value
If single bar, the value is set with following format:

```js
{ "bar-<name>-value": 1 }
```

For multi-bar, the values are set using multiple options:

```js
{ "bar-<name>-a-value": 1, "bar-<name>-b-value": 2 }
```

#### Bar Shadow
Adds or removes shadow behind bar. Default value is `true`.

```js
{ "bar-shadow": false }
```

#### Default Bar Color
Sets the default color for single bar charts. Can be then overridden using the invidual bar color options:

```js
{ "bar-color": "#00FF00" }
```

### Individual Bar Color
Sets the color of a specific bar:

```js
{ "bar-<name>-color": "#00FF00" }
```

#### Multibar Colors
Multibar colors are set the same for all bars.

```js
{ "a-color": "#000000", "b-color": "#FFFFFF" }
```

#### Multibar Labels
Multibar labels are similar to colors and will be the same across all bars.

```js
{ "a-label": "label", "b-label": "label" }
```
