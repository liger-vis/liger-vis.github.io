

var dataset=[
["Acura 3.5 RL 4dr"  ,43755, 29014, 3.5, 6],
["Acura 3.5 RL w/Navigation 4dr" ,56100 ,41100, 3.5, 6],
["Acura MDX" ,36945 ,33337 ,3.5, 6 ],
["Acura RSX Type S 2dr",  43820 ,21761, 2 ,4 ],
["Acura TL 4dr" , 33195 ,20299 ,0.5 ,6 ],
["Acura TSX 4dr" ,26990 ,14647 ,0.5 ,4 ],
["Audi A4 1.8T 4dr",  35940 ,13508, 1.8 ,4 ],
["Audi A4 3.0 4dr" ,81840 ,48846, 3, 2.1],
["Audi A4 3.0 convertible 2dr", 22490 ,78325 ,3 ,6],
["Audi A4 3.0 Quattro 4dr auto" , 84480, 31388, 2 ,6 ],
["Audi A4 3.0 Quattro 4dr manual" , 13430 ,30366, 3, 6],
["Audi A4 3.0 Quattro convertible 2dr", 24240, 40075, 3, 6],
["Audi A41.8T convertible 2dr", 75940, 32506, 1.8, 4 ],
["Audi A6 3.0 4dr" ,36640, 43129, 3, 6 ],
["Audi TT 3.2 coupe 2dr (convertible)" ,40590, 36739, 3.2, 6 ],
["BMW 325Ci convertible 2dr", 17995, 34800, 2.5, 6 ],
["BMW 325xi Sport", 32845 ,10110, 2.5, 6],
["BMW 330Ci convertible 2dr", 44295, 40530, 3 ,6],
["BMW 330i 4dr",  95495 ,72525, 3 ,6],
["BMW 530i 4dr" , 94995 ,91170, 3 ,6 ],
["BMW 745Li 4dr" ,43195, 66830, 4.4, 8 ],
["BMW M3 coupe 2dr" , 28195, 44170, 3.2, 6 ],
["BMW X3 3.0i", 37000 ,1873, 3 ,6 ],
["BMW 330i 4dr",  15495 ,52525, 0.5 ,6],
["BMW 530i 4dr" , 14995 ,31170, 3 ,6 ],
["BMW 745Li 4dr" ,73195, 16830, 4.4, 8 ],
["BMW M3 coupe 2dr" , 78195, 24170, 3.2, 6 ],
["BMW X3 3.0i", 37000 ,13873, 3 ,6 ],
["BMW Z4 convertible 2.5i 2dr" ,33895, 31065, 2.5, 6],
["BMW Z4 convertible 3.0i 2dr", 21045, 37575, 3, 6 ],
["Buick LeSabre Custom 4dr" , 16470, 24282, 3.8, 6 ],
["Buick LeSabre Limited 4dr" ,22245, 29566, 3.8, 6 ],
["Buick Park Avenue 4dr", 15545, 32244 ,3.8 ,6 ],
["Buick Park Avenue Ultra 4dr", 40720, 36927, 3.8, 6 ],
["Buick Rainier" ,57895, 74357, 4.2 ,6 ],
["Buick Regal LS 4dr" , 74895 ,72835 ,3.8 ,6 ],
["Cadillac CTS VVT 4dr",  30835 ,28575 ,3.6 ,6 ],
["Cadillac Deville 4dr" , 45445 ,41650, 4.6, 8],
["Cadillac Escaladet" , 12795 ,25377, 5.3, 8 ],
["Cadillac Seville SLS 4dr",  47955, 43841, 4.6 ,8 ],
["Chevrolet Aveo 4dr" , 13490 ,30965, 1.6, 4 ],
["Chevrolet Aveo LS 4dr hatch", 12585, 41802, 1.6, 4 ],
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
  y.domain([0, d3.max(dataset, function(d) { return d[1]; })]);

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
          .attr("cy", function(d) { return y(d[1]); })
          .on("mouseover", function(d){
            tooltip
              .style("left", d3.event.pageX  + "px")
              .style("top", d3.event.pageY - 50 + "px")
              .style("display", "inline-block")
              .html(("Name: " + d[0])+ "<br>"+ ("Price: " + d[1])+ "<br>"+ ("Engine Size: " + d[3])+ "<br>"+ ("Cylinder: " + d[4])+ "<br>");
          })
          .on("mouseout",  function(d){ tooltip.style("display", "none");})
          .on("mousedown", function(d){ tooltip.style("display", "none");});

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
      .text("Price");  
      
svg.append("text")             
      .attr("transform",
            "translate(" + ((width +90 + margin.right )/2) + " ," + 
                           (height + margin.bottom-20) + ")")
      .style("text-anchor", "middle")
      .text("Engine Size");

//create brush function redraw scatterplot with selection
function brushed() {
  var selection = d3.event.selection;
  focus.selectAll(".dot")
        .attr("cx", function(d) { return x(d[3]); })
        .attr("cy", function(d) { return y(d[1]); });
  focus.select(".axis--x").call(xAxis);
}


function type(d) {
  d[0] = parseDate(d[0]);
  d[1] = +d[1];
  return d;
}
