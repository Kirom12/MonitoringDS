var i = 0;

function initMap() {
	// Create a map object and specify the DOM element for display.
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 39.650557, lng: 2.718484},
		scrollwheel: false,
		zoom: 4
	});

	var parser = new geoXML3.parser({map: map, createMarker: createM});
	parser.parse('library/navigate.kml');

	function createM(placemark) {
		if (!loadFromCache) {
			var tmp = {};
			tmp.id = i;
			tmp.name = placemark.name;
			tmp.lat = placemark.latlng.lat();
			tmp.long = placemark.latlng.lng();
			steps.push(tmp);
		}

		i++;

		var markerOptions = {
			optimized: false,
			position: placemark.latlng,
			map: map
		};

		// Create the marker on the map
		var marker = new google.maps.Marker(markerOptions);

		google.maps.event.addListener(marker, 'click', function()
		{
			var stepDiv = $("#one_step");
			
			//Hide select graph type for avoid displaying bug
			$("#graph_type").hide();

			//Display data
			$("#single_graph_infos").show();
			
			//Show button "display all step"
			stepDiv.show();

			stepDiv.find("h3").text(placemark.name+" datas");

			//console.log(steps);

			var stepId = 0;

			for (var i = 0; i < steps.length; i++) {
				if (placemark.name == steps[i].name) {
					stepId = steps[i].id;
				}
			}

			// \/ This is shit
			var surfaceTempSerie = [];
			var surfaceWindSpeed = [];
			var surfaceWaveHeight = [];
			var surfaceAirTemp = [];

			surfaceTempSerie[0] = {};
			surfaceWindSpeed[0] = {};
			surfaceWaveHeight[0] = {};
			surfaceAirTemp[0] = {};

			surfaceTempSerie[0].data = [];
			surfaceWindSpeed[0].data = [];
			surfaceWaveHeight[0].data = [];
			surfaceAirTemp[0].data = [];

			surfaceTempSerie[0].name = steps[stepId].name;
			surfaceWindSpeed[0].name = steps[stepId].name;
			surfaceWaveHeight[0].name = steps[stepId].name;
			surfaceAirTemp[0].name = steps[stepId].name;

			for(var j = 0; j < steps[stepId].days.length; j++) {
				surfaceTempSerie[0].data.push(checkData(stepId, j, steps[stepId].station, "sea_surface_temperature"));
				surfaceWindSpeed[0].data.push(checkData(stepId, j, steps[stepId].station, "wind_speed"));
				surfaceWaveHeight[0].data.push(stations[steps[stepId].station].day[j].wave_height);
				surfaceAirTemp[0].data.push(stations[steps[stepId].station].day[j].air_temperature);
			}

			displayGraph(surfaceTempSerie, surfaceWindSpeed, surfaceWaveHeight, surfaceAirTemp, graphTypeG);
			
			var dataAll = [surfaceWaveHeight[0], surfaceWindSpeed[0], surfaceTempSerie[0], surfaceAirTemp[0]];
			
			dataAll[0].name = "Surface Wave Height";
			dataAll[0].type = "spline";
			dataAll[0].yAxis = 1;
			dataAll[0].tooltip = {valueSuffix: 'm'};
			dataAll[0].color = '#E8910C';
			
			dataAll[1].name = "Surface Wind Speed";
			dataAll[1].type = "spline";
			dataAll[1].yAxis = 2;
			dataAll[1].tooltip = {valueSuffix: 'm/s'};
			dataAll[1].color = '#7EFF3D';
			
			dataAll[2].name = "Sea Surface Temperature";
			dataAll[2].type = "spline";
			dataAll[2].yAxis = 3;
			dataAll[2].tooltip = {valueSuffix: 'c°'};
			dataAll[2].color = '#7020E8';
			
			dataAll[3].name = "Surface Air Temperature";
			dataAll[3].type = "spline";
			dataAll[3].tooltip = {valueSuffix: 'c°'};
			dataAll[3].color = '#30C1D4';
			
			displayGraphAll(dataAll);
			
			dataAll[0].data[6] = (dataAll[0].data[6] === null)? "<i>No data</i>" : dataAll[0].data[6]+" m";
			dataAll[1].data[6] = (dataAll[1].data[6] === null)? "<i>No data</i>" : dataAll[1].data[6]+" m/s";
			dataAll[2].data[6] = (dataAll[2].data[6] === null)? "<i>No data</i>" : dataAll[2].data[6]+" c°";
			dataAll[3].data[6] = (dataAll[3].data[6] === null)? "<i>No data</i>" : dataAll[3].data[6]+" c°";
			
			//Fill info box
			$("#info_data_box").find("ul").html("<li><strong>Surface Wave Height</strong> : "+dataAll[0].data[6]+"</li>"+
												"<li><strong>Surface Wind Speed</strong> : "+dataAll[1].data[6]+"</li>"+
												"<li><strong>Sea Surface Temperature</strong> : "+dataAll[2].data[6]+"</li>"+
												"<li><strong>Air Surface Temperature</strong> : "+dataAll[3].data[6]+"</li>");
			
		});

		google.maps.event.addListener(marker, 'mouseover', function() {
			$("#dialog_map").show();
			$("#dialog_map").html("<strong>"+placemark.name+"</strong><br>lat: "+roundNb(placemark.latlng.lat())+"<br>lng: "+roundNb(placemark.latlng.lng()));
		});

		google.maps.event.addListener(marker, 'mouseout', function() {
			$("#dialog_map").hide();
		});
	}

	$("#map").on("mousemove", function(e){
		var y = e.pageY + 20;
		var x = e.pageX + 10;

		$("#dialog_map").offset({top: y , left: x});
	});
}