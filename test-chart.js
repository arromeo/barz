(function ($, window, document) {
  $(function() {
      var elem = $("#test-chart");
      barz([1,2,3,2,1,2,1,1], {"height": "200px", "width": "400px"}, elem);

      var elem2 = $("#test-chart-2");
      var chartOptions = {
        "multibar": "true",
        "x-axis-label": "Test Label",
        "y-axis-label": "Test Label",
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
