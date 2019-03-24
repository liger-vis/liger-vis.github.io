
function unbindEvents(){
	$("body").find("*").each(function() {
	  $(this).off("click");
	});
}

function removeDataRelatedComponents(){
	// d3.selectAll(".x, .y, text, .domain, .tick").remove();
	// d3.selectAll(".item").style("fill","gray");
}

function addInteractivity(){
  var visType;
  visType= getVisType();
  addInteractivityChart(visType);
  
  $(".item").click(function(){
  	d3.selectAll(".item").classed("itemSelected",false);
  	itemSelection(this);
  });
}

function getVisType(){
	if($(".item").length > 0)
	{
	   if($('.item')[0].tagName =="circle")
	   {
	   		if($('.node').length > 0 && $('.node').length > 0)
	   		{
	   			return "graph";
	   		}
	   		else
	   		{
	   			return "scatterplot";
	   		}
	   }
	   else if($('.item')[0].tagName =="rect")
	   {
	   		return "barchart";
	   }
	   else if($('.item')[0].tagName =="path")
	   {
	   		return "linechart";
	   }
	}

}


function addInteractivityChart(visType,listActFeatures){
	console.log(visType)
	if(visType == "barchart"){
		barAddInteraction(["Position", "Color","Width","Height"]);
	 	// loadInteractionPanel();
	}
	if(visType == "scatterplot" || visType == "graph"){
		barAddInteraction(["Position", "Color","Width","Radius"]);

	}
}


function itemSelection(elm){
	if(d3.select(elm).classed("itemSelected"))
	{
		$(elm).removeClass("itemSelected");
	}
	else
	{
		$(elm).addClass("itemSelected");
	}
}