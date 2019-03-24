

var dataset=[
["Korea",79, 6,1],
["Mexico",71, 4.6,2],
["China", 88, 5.3, 0],
["USA",76, 3.7,3],
["Malaysia",73, 3.7,4],
["India",65, 3.7,5],
["Iran",71, 3.7,6],
["Germany",73, 3.7,7],
["France",69, 3.7,8]
]

var tooltip = d3.select("body").append("div").attr("class", "toolTip");

    var x = d3.scaleBand()
              .range([90, width-30])
              .padding(0.1);
    var y = d3.scaleLinear()
              .range([height, 0]);

    var svg = d3.select("#visContainer").append("svg")
                .attr("id","vis")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("id","barGroup")
                .attr("transform", 
                      "translate(" + margin.left + "," + margin.top + ")");

    x.domain(dataset.map(function(d) { return d[0]; }));
    y.domain([0, d3.max(dataset, function(d) { return d[1]; })]);

    
    // append the rectangles for the bar chart
    svg.selectAll(".bar")
          .data(dataset)
        .enter().append("rect")
          .attr("class", "bar")
              .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", 0.5)
          .attr("id",function(d){return "id_"+d[4];})
          .attr("class","item")
          .attr("x", function(d) {return x(d[0]); })
          .attr("width", x.bandwidth())
          .attr("y", function(d) { return y(d[1]); })
          .attr("height", function(d) { return height - y(d[1]); })
          // .on("mousemove", function(d){
          //   tooltip
          //     .style("left", d3.event.pageX - 30 + "px")
          //     .style("top", d3.event.pageY - 30 + "px")
          //     .style("display", "inline-block")
          //     .html(("Count: " + d[1])+ "<br>");
          // })
          // .on("drag",  function(d){ tooltip.style("display", "none");})
          // .on("mouseout", function(d){ tooltip.style("display", "none");});


      // add the x Axis
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));




      // add the y Axis
      svg.append("g")
      .attr("transform", "translate(90," + 0+ ")")
          .call(d3.axisLeft(y));

      svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left+90)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Life Expectancy (years)");  
      
svg.append("text")             
      .attr("transform",
            "translate(" + ((width -30 + margin.right )/2) + " ," + 
                           (height + margin.bottom-35) + ")")
      .style("text-anchor", "middle")
      .text("Country");