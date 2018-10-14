(function ($, window, document) {
  $(function() {
      var elem1 = $("#test-chart");
      var options1 = {
        "height": "500px",
        "width": "700px",
        "bar-Yes-value": 12,
        "bar-No-value": 18,
        "bar-Maybe-value": 8
      };

      barz(["Yes", "No", "Maybe"], options1 , elem1);

      var elem2 = $("#test-chart-2");
      var chartOptions = {
        "multibar": "true",
        "x-axis-label": "X-Axis Label",
        "y-axis-label": "Y-Axis Label",
        "bar-1-label": "Q1",
        "bar-2-label": "Q2",
        "bar-3-label": "Q3",
        "bar-1-a-value": 10,
        "bar-1-b-value": 14,
        "bar-1-c-value": 18,
        "bar-2-a-value": 12,
        "bar-2-b-value": 8,
        "bar-2-c-value": 24,
        "bar-3-a-value": 30,
        "bar-3-b-value": 0,
        "bar-3-c-value": 12
      };
      barz([1, 2, 3], chartOptions , elem2);
  });

}(window.jQuery, window, document));
