var visInitialState;
function readMultipleFiles(callback) {
    $('#visContainer').empty();
    var reader = new FileReader();
    unbindEvents();

    visInitialState = $("#filebutton")[0].files[0];
    reader.readAsText(visInitialState, "UTF-8");
    reader.onload = function (evt) {
        var width= $("#visContainer").width();
        var height= $("#visContainer").height();
        var str = " var margin = {top: 20, right: 75, bottom: 80, left: 60}, width =" + String(width) + "- margin.left - margin.right , height ="+ String(height)+"- margin.top - margin.bottom;"
        $('<script id="appendedScript">' + str + (evt.target.result) +"</"+"script>").appendTo("#visContainer");
        callback();
        removeDataRelatedComponents();
    }

    reader.onerror = function (evt) {
        console.log(evt.target.result)
    }
}



function reloadInitialVis(callback){
    $('#visContainer').empty();
    var reader = new FileReader();
    unbindEvents();
    reader.readAsText(visInitialState, "UTF-8");
    reader.onload = function (evt) {
        var width= $("#visContainer").width();
        var height= $("#visContainer").height();
        var str = " var margin = {top: 20, right: 15, bottom: 80, left: 60}, width =" + String(width) + "- margin.left - margin.right , height ="+ String(height)+"- margin.top - margin.bottom;"
        $('<script id="appendedScript">' + str + (evt.target.result) +"</"+"script>").appendTo("#visContainer");
        callback();
        removeDataRelatedComponents();
    }
    reader.onerror = function (evt) {
        console.log(evt.target.result)
    }
}