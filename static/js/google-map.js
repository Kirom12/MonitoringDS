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