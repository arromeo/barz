(function ($, window, document) {
  $(function() {
      var elem = $("#test-chart");
      barz([1,2,3,2,1,2,1,1], {"height": "500px", "width": "400px"}, elem);
      var elem2 = $("#test-chart-2");
      barz([1, 2], {"multibar": "true", "bar-1-a-value": 4, "bar-1-b-value": 1, "bar-1-c-value": 4, "bar-2-a-value": 3,
        "bar-2-b-value": 2, "bar-2-c-value": 5}, elem2);
  });

}(window.jQuery, window, document));
