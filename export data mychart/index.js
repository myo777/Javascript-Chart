/**
 * Create chart
 */
var chart = AmCharts.makeChart("chart1", {
  "type": "serial",
  "theme": "light",
  "autoMargins": false,
  "marginLeft": 50,
  "marginRight": 8,
  "marginTop": 30,
  "marginBottom": 26,
  "dataProvider": [{
    "country": "USA",
    "visits": 2025
  }, {
    "country": "China",
    "visits": 1882
  }, {
    "country": "Japan",
    "visits": 1809
  }, {
    "country": "Germany",
    "visits": 1322
  }, {
    "country": "UK",
    "visits": 1122
  }, {
    "country": "France",
    "visits": 1114
  }, {
    "country": "India",
    "visits": 984
  }, {
    "country": "Spain",
    "visits": 711
  }],
  "valueAxes": [{
    "gridColor": "#FFFFFF",
    "gridAlpha": 0.2,
    "dashLength": 0
  }],
  "startDuration": 1,
  "graphs": [{
    "balloonText": "[[category]]: <b>[[value]]</b>",
    "fillAlphas": 0.8,
    "lineAlpha": 0.2,
    "type": "column",
    "valueField": "visits"
  }],
  "chartCursor": {
    "categoryBalloonEnabled": false,
    "cursorAlpha": 0,
    "zoomable": false
  },
  "categoryField": "country",
  "categoryAxis": {
    "gridPosition": "start",
    "gridAlpha": 0,
    "tickPosition": "start",
    "tickLength": 20
  },
  "export": {
    "enabled": true,
    "menu": []
  }

});

/**
 * Exports and triggers download of chart data as JSON file
 */
function exportJSON() {
  chart.export.toJSON({}, function(data) {
    this.download(data, this.defaults.formats.JSON.mimeType, "amCharts.json");
  });
}

/**
 * Exports and triggers download of chart data as CSV file
 */
function exportCSV() {
  chart.export.toCSV({}, function(data) {
    this.download(data, this.defaults.formats.CSV.mimeType, "amCharts.csv");
  });
}

/**
 * Exports and triggers download of chart data as Excel file
 */
function exportXLSX() {
  chart.export.toXLSX({}, function(data) {
    this.download(data, this.defaults.formats.XLSX.mimeType, "amCharts.xlsx");
  });
}

function printChart(){
   chart.export.capture( {}, function() {
       this.toPRINT();
   } );
}