

var dataset=[
["Acura 3.5 RL 4dr"  ,43755, 29014, 2, 90],
["Acura 3.5 RL w/Navigation 4dr" ,56100 ,41100, 2, 82],
["Acura MDX" ,36945 ,33337 ,1, 83 ],
["Acura RSX Type S 2dr",  43820 ,21761, 2.8, 80 ],
["Acura TL 4dr" , 33195 ,20299 ,2.1 ,81 ],
["Acura TSX 4dr" ,26990 ,14647 ,2.3 ,79],
["Audi A4 1.8T 4dr",  35940 ,13508, 2,78 ],
["Audi A4 3.0 4dr" ,81840 ,48846, 4, 73],
["Audi A4 3.0 convertible 2dr", 22490 ,78325 ,3.3 ,74],
["Audi A4 3.0 Quattro 4dr auto" , 84480, 31388, 2.5 ,71 ],
["Audi A4 3.0 Quattro 4dr manual" , 13430 ,30366, 3.7, 69],
["Audi A4 3.0 Quattro convertible 2dr", 24240, 40075, 3, 67],
["Audi A41.8T convertible 2dr", 75940, 32506, 4.4, 63 ],
["Audi A6 3.0 4dr" ,36640, 43129, 4, 60],
["Audi TT 3.2 coupe 2dr (convertible)" ,40590, 36739, 3.7, 59 ],
["BMW 325Ci convertible 2dr", 17995, 34800, 2.2, 90 ],
["BMW 325xi Sport", 32845 ,10110, 2.3, 87],
["BMW 330Ci convertible 2dr", 44295, 40530, 3 ,80],
["BMW 330i 4dr",  95495 ,72525, 4.8 ,53],
["BMW 530i 4dr" , 94995 ,91170, 4.2 ,50 ],
["BMW 745Li 4dr" ,43195, 66830, 5, 52],
["BMW M3 coupe 2dr" , 28195, 44170, 7.1, 73 ],
["BMW X3 3.0i", 37000 ,1873, 9.1 ,36 ],
["BMW 330i 4dr",  15495 ,52525, 7.3 ,38],
["BMW 530i 4dr" , 14995 ,31170, 8.5 ,32],
["BMW 745Li 4dr" ,73195, 16830, 2.8, 45 ],
["BMW M3 coupe 2dr" , 78195, 24170, 5, 74 ],
["BMW X3 3.0i", 37000 ,13873, 7 ,61 ],
["BMW Z4 convertible 2.5i 2dr" ,33895, 31065, 3.4, 64],
["BMW Z4 convertible 3.0i 2dr", 21045, 37575, 5.7, 69 ],
["Buick LeSabre Custom 4dr" , 1.6, 24282, 5.2, 60 ],
["Buick LeSabre Limited 4dr" ,1.4, 29566, 4.9, 69],
["Chevrolet Aveo 4dr" , 2 ,30965, 6, 37 ],
["Chevrolet Aveo LS 4dr hatch", 5, 41802, 8, 36],
]




// var margin = {top: 50, right: 40, bottom: 110, left: 70},
//     width = 800 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom;
    // height2 = 500 - margin2.top - margin2.bottom;

var parseDate = d3.timeParse("%b %Y");

var x = d3.scaleLinear().range([90, width-30]),
    y = d3.scaleLinear().range([height, 0]);
    // y2 = d3.scaleLinear().range([height2, 0]);

var xAxis = d3.axisBottom(x),
    yAxis = d3.axisLeft(y);

var svg = d3.select("#visContainer").append("svg")
    .attr("id","vis")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

svg.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);

var focus = svg.append("g")
    .attr("class", "focus")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain([0, d3.max(dataset, function(d) { return d[3]; })]);
  y.domain([0, d3.max(dataset, function(d) { return d[4]; })]);

var tooltip = d3.select("body").append("div").attr("class", "toolTip");
var dots = focus.append("g").attr("id","group");
      dots.attr("clip-path", "url(#clip)");
      dots.selectAll("dot")
          .data(dataset)
          .enter().append("circle")
          .attr("class","item")
          .attr("r",11)         
          .attr("fill", "white") 
          .attr("stroke", "black")
          .attr("stroke-width", 1)
          .attr("cx", function(d) { return x(d[3]); })
          .attr("cy", function(d) { return y(d[4]); })
          // .on("mousemove", function(d){
          //   tooltip
          //     .style("left", d3.event.pageX - 50 + "px")
          //     .style("top", d3.event.pageY - 70 + "px")
          //     .style("display", "inline-block")
          //     .html(("Name: "+d[0]) + "<br>"  + ("Type: " + d[1])+ "<br>"  + ("Price: " + d[3])+ "<br>"  + ("Engine Size: " + d[3]));
          // })
          // .on("drag",  function(d){ tooltip.style("display", "none");})
          // .on("mouseout", function(d){ tooltip.style("display", "none");});
          
  focus.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

  focus.append("g")
        .attr("class", "axis axis--y")
        .attr("transform", "translate(90," + 0+ ")")
        .call(yAxis);
      
focus.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left+80)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Life Expectancy (years)");  
      
svg.append("text")             
      .attr("transform",
            "translate(" + ((width +90 + margin.right )/2) + " ," + 
                           (height + margin.bottom-20) + ")")
      .style("text-anchor", "middle")
      .text("Fertility Rate (children per woman)");

//create brush function redraw scatterplot with selection
function brushed() {
  var selection = d3.event.selection;
  focus.selectAll(".dot")
        .attr("cx", function(d) { return x(d[3]); })
        .attr("cy", function(d) { return y(d[4]); });
  focus.select(".axis--x").call(xAxis);
}


function type(d) {
  d[0] = parseDate(d[0]);
  d[1] = +d[1];
  return d;
}
