
function barUnbindEvents(){
	d3.selectAll('.item').each(function(d) {
  		d3.select(this).on('mousedown.drag', null);
    });

    $("#dialog").hide();
}

// function loadInteractionPanel(){
// 	for(i=0;i<6;i++)
// 	{
// 		$('<div/>', {
// 	   	  class:"taskAddition",
// 	   	  id: "interaction_"+i,
// 	  	}).appendTo('#taskCustomPanel');
	    
// 	    $("#interaction_"+i).prepend('<a id="reject" style="text-decoration:none;" class="btn" href="#"><i class="fas fa-plus"></i> Add Task</a>');  
// 	}
  
// }


function barAddInteraction(listFeatures){
	barUnbindEvents();
	var embed = new embeddedInteraction(".item","#vis");

	for(i=0;i<listFeatures.length;i++)
	{
		if(listFeatures[i]=="Position")
		{
			embed.embedPosition()
			//embedPosition(".item");
		}
		else if(listFeatures[i]=="Color")
		{
			embed.embedColor();
		}
		else if(listFeatures[i]=="Width")
		{
			embed.embedWidth();
		}
		else if(listFeatures[i]=="Height")
		{
			embed.embedHeight();
		}
		else if(listFeatures[i]=="Radius")
		{
			embed.embedRadius();

		}
	}
}
