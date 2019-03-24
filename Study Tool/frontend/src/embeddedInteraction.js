class embeddedInteraction{
  constructor(itemID, canvasID) {
    this.itemID = itemID;
    this.canvasID = canvasID;
  }
}




embeddedInteraction.prototype.embedPosition = function(){
	var dx,dy;

	var itemType = $('.item')[0].tagName;
	d3.selectAll(this.itemID).each(function(d) {
		d3.select(this).call(d3.drag()
			        .on("start", dragstarted)
			        .on("drag", dragged)
			        .on("end", dragended));
	});

	function dragstarted(d) {
		d3.selectAll(".top, .right, .radius, .left, .bottom").remove();
		// d3.event.sourceEvent.stopPropagation();
		if(itemType == "circle")
		{
			dx = Number(d3.select(this).attr("cx"));
			dy = Number(d3.select(this).attr("cy"));
		}
		else
		{
			dx = Number(d3.select(this).attr("x"));
			dy = Number(d3.select(this).attr("y"));
		}
		// updateCornersPos(this); // moves the singifiers on the item as we move the item
	}

	function dragged(d) {
		dx= dx + d3.event.dx;
		dy= dy + d3.event.dy;
		if(itemType == "circle")
		{
			d3.select(this).attr("cx", dx).attr("cy", dy);
		}
		else
		{
			d3.select(this).attr("x", dx).attr("y", dy);
		}
		// updateCornersPos(this); // moves the singifiers on the item as we move the item
	}

	function dragended(d) {
		// d3.select(this).style("stroke","none");
	}
}


embeddedInteraction.prototype.embedColor =  function(){
	$('<div/>', {
	   	  id: "colorMenu",
	   	  class:" draggable ui-widget-content",
	   	  width:105,
	   	  height:65
	}).appendTo("#"+$(this.canvasID).parent().attr("id"));

	$(".draggable").css("box-shadow", "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)");
	$(".draggable").css("position", "absolute");

	$( ".draggable" ).draggable();

	$(".draggable").prepend('<div style="margin-bottom:25px; "><a id="closeColor" style="text-decoration:none; padding:4px; float: right" class="btn" href="#"><i class="fas fa-times"></i></a> </div>');
	$('.draggable').append('<span style=" padding-left: 4px; padding-right: 4px; font-size:12px">'+"Color"+'</span>');
	$('.draggable').append('<input type="color" value="#ffffff" id="colorWell" style="width: 40px; height:20px">');
	$(".draggable").hide();

  	d3.selectAll(this.itemID).on("contextmenu", function (d, i) { 
  			d3.event.preventDefault();
  			
			showColorMenu($(this).offset().left, $(this).offset().top)
			d3.select(this).classed("selected", true);
    });
     
	$("#colorWell").change((d) =>{
		d3.select(".selected").style("fill", function(){
			return $("#colorWell").val();
		});
	 });
  	
  	 $("#closeColor").click(function() {
  	 	 d3.selectAll(".selected").classed("selected", false);
		 $(".draggable").slideUp();
	     d3.select(this).style("opacity",0.5);
	 });

  	function showColorMenu(left, top)
	{
		console.log("Colorinng");
		$(".draggable").slideDown();
	    $("#colorMenu").css({left: left + 30 ,top:top +10});	
	}
}


embeddedInteraction.prototype.embedWidth = function (){
	var canvasID = this.canvasID;
  	d3.selectAll(this.itemID).each(function(d) {
  		$(this).click(function(){
  			d3.selectAll(".right, .left").remove();
			showSignifiers(this);
		});
    });

    function showSignifiers(item)
    {
    	$(item).parent().attr("id","visGroup")

    	d3.select("#visGroup").append("circle")
    					      .attr("class", "right")
    					      .style("cursor", "ew-resize")
							  .attr("r",2.5);


    	d3.select("#visGroup").append("circle")
    					      .attr("class", "left")
    					      .style("cursor", "ew-resize")
							  .attr("r",2.5);


		updateCornersPos(item,canvasID);
    }
}

embeddedInteraction.prototype.embedHeight = function (){
	var canvasID = this.canvasID;

  	d3.selectAll(this.itemID).each(function(d) {
  		$(this).click(function() {
  			d3.selectAll(".top, .bottom").remove();
			showSignifiers(this);
		});
    });

    function showSignifiers(item)
    {
    	$(item).parent().attr("id","visGroup")

    	d3.select("#visGroup").append("circle")
    					      .attr("class", "top")
    					      .style("cursor", "ns-resize")
							  .attr("r",2.5);

		  	d3.select("#visGroup").append("circle")
    					      .attr("class", "bottom")
    					      .style("cursor", "ns-resize")
							  .attr("r",2.5);

		updateCornersPos(item,canvasID);
    }
}


embeddedInteraction.prototype.embedRadius = function (){
	var canvasID = this.canvasID;
  	d3.selectAll(this.itemID).each(function(d) {
  		$(this).click(function() {
  			d3.selectAll(".radius").remove();
			showSignifiers(this);
		});
    });

    function showSignifiers(item)
    {
    	$(item).parent().attr("id","visGroup")

    	d3.select("#visGroup").append("circle")
    					      .attr("class", "radius")
    					      .style("cursor", "ew-resize")
							  .attr("r",2.5);

		updateCornersPos(item,canvasID);
	}
}


function getTranslation(transform) {
  // Create a dummy g for calculation purposes only. This will never
  // be appended to the DOM and will be discarded once this function 
  // returns.
  var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  
  // Set the transform attribute to the provided string value.
  g.setAttributeNS(null, "transform", transform);
  
  // consolidate the SVGTransformList containing all transformations
  // to a single SVGTransform of type SVG_TRANSFORM_MATRIX and get
  // its SVGMatrix. 
  var matrix = g.transform.baseVal.consolidate().matrix;
  
  // As per definition values e and f are the ones for the translation.
  return [matrix.e, matrix.f];
}


function updateCornersPos(item,canvasID){
		$(item).parent().attr("id","group");


	 	function dragstarted(d) {
	 		console.log(this)
			dx = Number(d3.select(this).attr("cx"))
			dy = Number(d3.select(this).attr("cy"))
		}

		function dragged(d) {
			var x1= Number(d3.select(this).attr("cx"))
			var y1= Number(d3.select(this).attr("cy"))

			dx= dx + d3.event.dx;
			dy= dy + d3.event.dy;
			if(d3.select(this).classed("right"))
			{
				d3.selectAll(".top, .left, .bottom").remove();
				var itemWidth =  (dx - x1) + Number($(item).attr("width"));
				d3.select(".right").attr("cx", dx);
				$(item).attr("width", itemWidth);			
			}
			else if(d3.select(this).classed("left"))
			{
				d3.selectAll(".top, .right, .bottom").remove();
				var itemWidth =  (x1- dx) + Number($(item).attr("width"));
				d3.select(".left").attr("cx", dx);
				$(item).attr("x", dx);
				$(item).attr("width", itemWidth);	
			}
			else if (d3.select(this).classed("top"))
			{
				d3.selectAll(".right, .left, .bottom").remove();
				var itemHeight =  (y1- dy) + Number($(item).attr("height"));
				d3.select(".top").attr("cy", dy);
				$(item).attr("y", dy).attr("height", itemHeight);
			}
			else if(d3.select(this).classed("bottom"))
			{
				d3.selectAll(".right, .left, .top").remove();
				var itemHeight =  (dy-y1) + Number($(item).attr("height"));
				d3.select(".bottom").attr("cy", dy);
			    $(item).attr("y", dy-itemHeight);
				$(item).attr("height", dy).attr("height", itemHeight);

			}
			else if (d3.select(this).classed("radius"))
			{
				var itemRadius =  (dx- x1) + Number($(item).attr("r"));
				d3.select(".radius").attr("cx", dx);
				$(item).attr("r", itemRadius);
			}
		}

		function dragended(d) {
			// d3.select(this).style("stroke","none");
			d3.selectAll(".top, .right, .radius").remove();
		}

		if($('.item')[0].tagName == "rect")
		{
			elmX = Number($(item).attr("x")) + Number($(item).width());
	 		elmY = Number($(item).attr("y")) + Number($(item).height()/2);
		 	
		 	d3.select(canvasID).select(".right")
						 .attr("cx",elmX)
						 .attr("cy",elmY)
						 .call(d3.drag()
					        .on("start", dragstarted)
					        .on("drag", dragged)
					        .on("end", dragended))
			

			elmX = Number($(item).attr("x")) ;
	 		elmY = Number($(item).attr("y")) + Number($(item).height()/2);
		 	d3.select(canvasID).select(".left")
						 .attr("cx",elmX)
						 .attr("cy",elmY)
						 .call(d3.drag()
					        .on("start", dragstarted)
					        .on("drag", dragged)
					        .on("end", dragended))




			elmX = Number($(item).attr("x")) + Number($(item).width()/2) ;
	 		elmY = Number($(item).attr("y"));

	 		d3.select(canvasID).select(".top")
						 .attr("cx",elmX)
						 .attr("cy",elmY)
						 .call(d3.drag()
					        .on("start", dragstarted)
					        .on("drag", dragged)
					        .on("end", dragended))




			elmX = Number($(item).attr("x")) + Number($(item).width()/2) ;
	 		elmY = Number($(item).attr("y")) + Number($(item).height()) ;

	 		d3.select(canvasID).select(".bottom")
						 .attr("cx",elmX)
						 .attr("cy",elmY)
						 .call(d3.drag()
					        .on("start", dragstarted)
					        .on("drag", dragged)
					        .on("end", dragended))


		}

		else if($('.item')[0].tagName == "circle")
		{
			elmX = Number($(item).attr("cx")) +  Number($(item).attr("r"));
	 		elmY = Number($(item).attr("cy"));
		 
		    d3.select(canvasID).select(".radius")
						 .attr("cx",elmX)
						 .attr("cy",elmY)
						 .call(d3.drag()
					        .on("start", dragstarted)
					        .on("drag", dragged)
					        .on("end", dragended))
		}
}