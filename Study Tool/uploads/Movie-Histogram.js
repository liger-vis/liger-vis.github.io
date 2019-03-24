




// var data = d3.range(1000).map(d3.randomBates(10));
var data = [];
for (var i = 1; i <= 500; i++) {
    var a = Math.floor((Math.random() * 10) + 2004);
    data.push(a);
}

console.log(data);

var formatCount = d3.format("d");

var svg = d3.select("#visContainer").append("svg")
                .attr("id","vis")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                // .append("g")
                // .attr("id","barGroup")
                // .attr("transform", 
                //       "translate(" + margin.left + "," + margin.top + ")");
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleLinear()
        .rangeRound([90, width])
                .domain([2004,d3.max(data)])

    var bins = d3.histogram()
        .domain(x.domain())
        .thresholds(d3.range(2004, d3.max(data), (d3.max(data) - 2004) / 9))
        (data);

var y = d3.scaleLinear()
    .domain([0, d3.max(bins, function(d) { return d.length; })])
    .range([height, 0]);

console.log(bins);

var bar = g.selectAll(".bar")
  .data(bins)
  .enter().append("rect")
    .attr("x", function(d) {return x(d.x0); })
    .attr("y", function(d) {return y(d.length); })
    .attr("class","item")
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", 0.5)
    .attr("width", x(bins[0].x1) - x(bins[0].x0) - 1)
    .attr("height", function(d) { return height - y(d.length); });


g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickFormat(d3.format("d")) );

 svg.append("g")
          .attr("transform", "translate(150," + 20+ ")")
          .call(d3.axisLeft(y));



svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left+135)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Number of Movies (count)");  
      
svg.append("text")             
      .attr("transform",
            "translate(" + ((width +90 + margin.right )/2) + " ," + 
                           (height + margin.bottom-15) + ")")
      .style("text-anchor", "middle")
      .text("Year Made");