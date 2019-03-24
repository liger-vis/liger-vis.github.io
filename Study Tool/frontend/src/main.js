(function(){

	// call it visex - short for Vis Examplar

  visType = "scatter";
  demoType ="";
  initialData =[] 
  newData = [];

  window.visMl = {};

  radius = 7;
  originalColor = "#3385ff";
  MlModels={"logestic,":false, "decision,":false, "mlp,":false};
  // demo = new demoClassifier();
  // obj = new featureExtraction();

  userID= new Date().valueOf();

  var margin = {top: 20, right: 100, bottom: 10, left: 40},
  width = 5/10 * $(window ).width() - margin.left - margin.right,
  height = 9.7/10 * $(window ).height() - margin.top - margin.bottom;
  
  $("#visContainer,#mainVis, #taskCustomPanel").height($(window).height() - $(".devMenu").height());
  
  // loading and adjusting all divs
  $('select').niceSelect();
 
})();





