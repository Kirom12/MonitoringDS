var API_KEY = "019ecd71188a4982a20e1a9717e1ab27";
var CACHE_DURATION = 60*60*1000;
var DAYS = 7;

var steps = [];
var stations = {};
var loadFromCache = false;

//Check the cache
var date = new Date();
var cacheTime = localStorage.getItem("MonitoringDS-cache");
var now = date.getTime();

if (cacheTime !== null && now - cacheTime < CACHE_DURATION) {
	loadFromCache = true;
	steps = JSON.parse(localStorage.getItem("MonitoringDS-steps"));
	stations = JSON.parse(localStorage.getItem("MonitoringDS-stations"));

	$(function() {
		$("#loading").hide();
		$("#global").show();
	});
}

//Save last date for graph display
var d = new Date();
var categoriesGraph = [];   
var weekday = new Array(7);
weekday[0]=  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

for(var i = 5; i >= 0; i--) {
	 d.setDate(d.getDate()-1);
	 categoriesGraph[i] = weekday[d.getDay()]+" "+(d.getMonth()+1)+"-"+d.getDate();
}
categoriesGraph[6] = "Today";