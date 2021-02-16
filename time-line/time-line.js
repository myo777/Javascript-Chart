var margin = { left:40, right:40, top:40, bottom:80 },
    height = 240 - margin.top - margin.bottom, 
    width = 400 - margin.left - margin.right;

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + 
        ", " + margin.top + ")");

// Time parser for x-scale
var parseTime = d3.timeParse("%Y-%m-%d");
var parseDate = d3.timeParse("%d/%m/%Y");
var formatTime = d3.timeFormat("%d/%m/%Y");

//Transition time
var t = function(){ return d3.transition().duration(1000); }

// Scales
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// Axis generators
var xAxisCall = d3.axisBottom();
var yAxisCall = d3.axisLeft()
    .ticks(6)
    .tickFormat(function(d) { return "$" + d3.format(",.0f")(d);});

// Axis groups
var xAxis = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")");
var yAxis = g.append("g")
    .attr("class", "y axis")

var valueFiguresColour = d3.scaleOrdinal(d3.schemeSet1);

var valueFigures = ["Amount", "Running Total"];

var legend = g.append("g")
    .attr("class", "legend")
    .attr("transform", "translate(" + 120 +
        "," + 5 + ")");

valueFigures.forEach(function(values, i){
    var legendRow = legend.append("g")
        .attr("transform", "translate(0, " + (i * 20) + ")");

    legendRow.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", valueFiguresColour(values));

    legendRow.append("text")
        .attr("x", -10)
        .attr("y", 10)
        .attr("text-anchor", "end")
        .style("text-transform", "capitalize")
        .text(values);
});

var xLable = g.append("text")
    .attr("class", "x axis-label")
    .attr("x", width / 2)
    .attr("y", height + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Date ");

var startDate = new Date(parseDate("05/10/2018")).valueOf();
var endDate = new Date(parseDate("23/10/2018")).valueOf();



// Add jQuery UI slider
$("#date-slider").slider({
    range: true,
    min: startDate,
    max: endDate,
    step: 86400000, // One day
    values: [startDate, endDate],
    slide: function(event, ui){
        $("#dateLabel1").text(formatTime(new Date(ui.values[0])));
        $("#dateLabel2").text(formatTime(new Date(ui.values[1])));
        update(data);
    }
});


var data = [
    {"DATE":"2018-10-05","AMOUNT":1.000000000000000e+002,"Running Total":1.000000000000000e+002},
    {"DATE":"2018-10-06","AMOUNT":1.000000000000000e+003,"Running Total":1.100000000000000e+003},
    {"DATE":"2018-10-07","AMOUNT":5.000000000000000e+003,"Running Total":6.100000000000000e+003},
    {"DATE":"2018-10-08","AMOUNT":2.000000000000000e+003,"Running Total":8.100000000000000e+003},
    {"DATE":"2018-10-09","AMOUNT":1.000000000000000e+003,"Running Total":9.100000000000000e+003},
    {"DATE":"2018-10-10","AMOUNT":5.000000000000000e+003,"Running Total":1.410000000000000e+004},
    {"DATE":"2018-10-11","AMOUNT":3.000000000000000e+003,"Running Total":2.510000000000000e+004},
    {"DATE":"2018-10-12","AMOUNT":1.200000000000000e+004,"Running Total":3.710000000000000e+004},
    {"DATE":"2018-10-13","AMOUNT":5.000000000000000e+003,"Running Total":4.210000000000000e+004},
    {"DATE":"2018-10-17","AMOUNT":1.300000000000000e+004,"Running Total":5.510000000000000e+004},
    {"DATE":"2018-10-18","AMOUNT":1.500000000000000e+004,"Running Total":7.010000000000000e+004},
     {"DATE":"2018-10-19","AMOUNT":2.500000000000000e+004,"Running Total":8.010000000000000e+004},
     {"DATE":"2018-10-20","AMOUNT":1.600000000000000e+004,"Running Total":5.010000000000000e+004},
     {"DATE":"2018-10-21","AMOUNT":1.800000000000000e+004,"Running Total":7.010000000000000e+004},
     {"DATE":"2018-10-22","AMOUNT":1.900000000000000e+004,"Running Total":9.010000000000000e+004},
     {"DATE":"2018-10-23","AMOUNT":3.500000000000000e+004,"Running Total":7.010000000000000e+004}
];
  // Data cleaning
data.forEach(function(d) {
    d.DATE = parseTime(d.DATE);
    d["Running Total"] = +d["Running Total"];
    d.AMOUNT = +d.AMOUNT;
});
 
// Set scale domains
x.domain(d3.extent(data, function(d) { return d.DATE; }));
y.domain([d3.min(data, function(d) { return d["Running Total"]; }) / 1.002, 
    d3.max(data, function(d) { return d["Running Total"]; }) * 1.002]);

// Generate axes once scales have been set
xAxis.call(xAxisCall.scale(x))
yAxis.call(yAxisCall.scale(y))

// Path generator
var line = d3.line()
  .x(function(d){ return x(d.DATE); })
  .y(function(d){ return y(d.AMOUNT); });
  
var line2 = d3.line()
  .x(function(d){ return x(d.DATE); })
  .y(function(d){ return y(d["Running Total"]); });
  
// Add line to chart
g.append("path")
    .attr("class", "line")
    .attr('fill', 'rgba(0,0,0,0)')
    .style("stroke", "red")
    .attr("stroke", "#E51A1D")
    .attr("stroke-width", "2px")
    .attr("d", line(data));

g.append("path")
    .attr("class", "line2")
    .attr("fill", "rgba(0,0,0,0)")
    .style("stroke", "#377DB8")
    .attr("stroke-width", "2px")
    .attr("d", line2(data));

update(data);


function update(data) {

    // Filter data based on selections
    var sliderValues = $("#date-slider").slider("values");
    
    var dataTimeFiltered = data.filter(function(d){
        return ((d.DATE >= sliderValues[0]) && (d.DATE <= sliderValues[1]))
    });

    // Update scales
    x.domain(d3.extent(dataTimeFiltered, function(d){ return d.DATE; }));
    y.domain([0, 
        d3.max(dataTimeFiltered, function(d){ return d["Running Total"]; }) ]);



    // Update axes
    xAxisCall.scale(x);
    yAxisCall.scale(y);
    
    // Update our line path
    g.select(".line")
        .transition(t)
        .attr("d", line(dataTimeFiltered));

    g.select(".line2")
        .transition(t)
        .attr("d", line2(dataTimeFiltered));
}