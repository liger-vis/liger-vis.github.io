

var dataset=[
["Acura 3.5 RL 4dr"  ,43755, 29014, 3.5, 6],
["Acura 3.5 RL w/Navigation 4dr" ,56100 ,41100, 3.5, 5.1],
["Acura MDX" ,36945 ,33337 ,3.5, 8.9 ],
["Acura RSX Type S 2dr",  43820 ,21761, 2 ,7.6 ],
["Acura TL 4dr" , 33195 ,20299 ,0.5 ,3.7 ],
["Acura TSX 4dr" ,26990 ,14647 ,0.5 ,5.1 ],
["Audi A4 1.8T 4dr",  35940 ,13508, 1.8 ,9.1 ],
["Audi A4 3.0 4dr" ,81840 ,48846, 3, 8.1],
["Audi A4 3.0 convertible 2dr", 22490 ,78325 ,3 ,5.9],
["Audi A4 3.0 Quattro 4dr auto" , 84480, 31388, 2 ,6.1 ],
["Audi A4 3.0 Quattro 4dr manual" , 13430 ,30366, 3, 7.3],
["Audi A4 3.0 Quattro convertible 2dr", 24240, 40075, 3, 3.1],
["Audi A41.8T convertible 2dr", 75940, 32506, 1.8, 9.3 ],
["Audi A6 3.0 4dr" ,36640, 43129, 3, 6 ],
["Audi TT 3.2 coupe 2dr (convertible)" ,40590, 36739, 3.2, 5.1 ],
["BMW 325Ci convertible 2dr", 17995, 34800, 2.5, 6.4 ],
["BMW 325xi Sport", 32845 ,10110, 2.5, 6],
["BMW 330Ci convertible 2dr", 44295, 40530, 3 ,5.4],
["BMW 330i 4dr",  95495 ,72525, 3 ,3.1],
["BMW 530i 4dr" , 94995 ,91170, 3 ,9.4 ],
["BMW 745Li 4dr" ,43195, 66830, 3.8, 8.1 ],
["BMW M3 coupe 2dr" , 28195, 44170, 3.2, 8.3 ],
["BMW X3 3.0i", 37000 ,1873, 3 ,7.3 ],
["BMW 330i 4dr",  15495 ,52525, 0.5 ,4.5],
["BMW 530i 4dr" , 14995 ,31170, 3 ,9.1 ],
["BMW 745Li 4dr" ,73195, 16830, 4.4, 8.3 ],
["BMW M3 coupe 2dr" , 78195, 24170, 3.2, 7.7 ],
["BMW X3 3.0i", 37000 ,13873, 3 ,6.6 ],
["BMW Z4 convertible 2.5i 2dr" ,33895, 31065, 2.5, 5.6],
["BMW Z4 convertible 3.0i 2dr", 21045, 37575, 3, 9.6 ],
["Buick LeSabre Custom 4dr" , 1.6, 24282, 3.8, 4.5 ],
["Buick LeSabre Limited 4dr" ,1.4, 29566, 3.8, 3.6 ],
["Chevrolet Aveo 4dr" , 2 ,30965, 1.6, 9.5 ],
["Chevrolet Aveo LS 4dr hatch", 5, 41802, 1.6, 7.1],
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

  x.domain([0, d3.max(dataset, function(d) { return d[4]; })]);
  y.domain([0, d3.max(dataset, function(d) { return d[3]; })]);

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
          .attr("cx", function(d) { return x(d[4]); })
          .attr("cy", function(d) { return y(d[3]); })
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
      .text("Profit (million dollar)");  
      
svg.append("text")             
      .attr("transform",
            "translate(" + ((width +90 + margin.right )/2) + " ," + 
                           (height + margin.bottom-20) + ")")
      .style("text-anchor", "middle")
      .text("IMDB Rating");

//create brush function redraw scatterplot with selection
function brushed() {
  var selection = d3.event.selection;
  focus.selectAll(".dot")
        .attr("cx", function(d) { return x(d[4]); })
        .attr("cy", function(d) { return y(d[3]); });
  focus.select(".axis--x").call(xAxis);
}


function type(d) {
  d[0] = parseDate(d[0]);
  d[1] = +d[1];
  return d;
}
