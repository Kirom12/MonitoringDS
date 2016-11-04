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