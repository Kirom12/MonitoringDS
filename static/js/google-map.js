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
		console.log(placemark);

		var markerOptions = {
			optimized: false,
			position: placemark.latlng,
			map: map
		};

		// Create the marker on the map
		var marker = new google.maps.Marker(markerOptions);

		google.maps.event.addListener(marker, 'click', function()
		{
			var lat = placemark.latlng.lat();
			var lgt = placemark.latlng.lng();
			var start = "2016-10-30T12%3A00%3A00";
			console.log(lat + ' - ' + lgt);
			var start = "2016-04-05T14:30:00Z";
			var end = "2016-04-11T15:30:00Z";
			//http://api.planetos.com/v1/datasets/myocean_sst_europe_daily/point?lat=49.83000183105469&lon=-2.009999990463257&start=2016-10-30T12%3A00%3A00&apikey=019ecd71188a4982a20e1a9717e1ab27
			$.ajax({
				url: 'http://api.planetos.com/v1/datasets/noaa_ww3_global_1.25x1d/point?lon='+lgt+'&lat='+lgt+'&apikey=019ecd71188a4982a20e1a9717e1ab27',
				type: 'GET',
				dataType: 'json',
				success : function(data){
					var listStation = data["entries"][0]["data"];
					var Wind_speed_surface = listStation["Wind_speed_surface"];
					var Wind_direction_from_which_blowing_surface = listStation["Wind_direction_from_which_blowing_surface"];
					var vcomponent_of_wind_surface = listStation["v-component_of_wind_surface"];
					var ucomponent_of_wind_surface = listStation["u-component_of_wind_surface"];
					var Direction_of_wind_waves_surface = listStation["Direction_of_wind_waves_surface"];
					var Primary_wave_mean_period_surface = listStation["Primary_wave_mean_period_surface"];
					var Primary_wave_direction_surface = listStation["Primary_wave_direction_surface"];
					var Significant_height_of_wind_waves_surface = listStation["Significant_height_of_wind_waves_surface"];
					var Mean_period_of_wind_waves_surface = listStation["Mean_period_of_wind_waves_surface"];
					var Secondary_wave_mean_period_surface = listStation["Secondary_wave_mean_period_surface"];
					var Significant_height_of_combined_wind_waves_and_swell_surface = listStation["Significant_height_of_combined_wind_waves_and_swell_surface"];
					var Secondary_wave_direction_surface = listStation["Secondary_wave_direction_surface"];

					$(".planet").html(
						"<li>"+
						Wind_speed_surface+
						"</li>"+
						"<li>"+
						Wind_direction_from_which_blowing_surface+
						"</li>"+
						"<li>"+
						vcomponent_of_wind_surface+
						"</li>"+
						"<li>"+
						ucomponent_of_wind_surface+
						"</li>"+
						"<li>"+
						Direction_of_wind_waves_surface+
						"</li>"+
						"<li>"+
						Primary_wave_mean_period_surface+
						"</li>"+
						"<li>"+
						Primary_wave_direction_surface+
						"</li>"+
						"<li>"+
						Significant_height_of_wind_waves_surface+
						"</li>"+
						"<li>"+
						Mean_period_of_wind_waves_surface+
						"</li>"+
						"<li>"+
						Secondary_wave_mean_period_surface+
						"</li>"+
						"<li>"+
						Significant_height_of_combined_wind_waves_and_swell_surface+
						"</li>"+
						"<li>"+
						Secondary_wave_direction_surface+
						"</li>"
						)
				}
			})
		});
	}
}