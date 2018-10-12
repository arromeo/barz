(function ($, window, document) {
  $(function() {
      var elem = $("#test-chart");
      barz([1,2,3,2,1,2,1,1], {"height": "500px", "width": "400px"}, elem);
      var elem2 = $("#test-chart-2");
      barz([1, "text"], {"bar-1-value": 3, "bar-1-color": "red"}, elem2);
  });

}(window.jQuery, window, document));
