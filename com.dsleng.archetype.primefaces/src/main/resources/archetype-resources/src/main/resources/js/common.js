var map;
var layers = [];

function initialize() {
	var myLatLng = new google.maps.LatLng(-28.4648487, 23.9321415);
	var myOptions = {
		zoom : 6,
		center : myLatLng,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	}

	document.getElementById('layer0').checked = false;
	document.getElementById('layer1').checked = false;
	document.getElementById('layer2').checked = false;
	document.getElementById('layer3').checked = false;

	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

	var geocoder = new google.maps.Geocoder();
	var infowindow1 = new google.maps.InfoWindow;
	var infowindow2 = new google.maps.InfoWindow;

	document.getElementById('submit').addEventListener('click', function() {
		geocodeAddress(geocoder, map, infowindow1);
	});

	document.getElementById('submitll').addEventListener('click', function() {
		geocodeLatLng(geocoder, map, infowindow2);
	});

	layers[0] = new google.maps.KmlLayer(
			'https://googledrive.com/host/0BxgbW77_GYAMeGFHODYzNkMtUG8/PoliceStation.kml',
			{
				preserveViewport : true,
				suppressInfoWindows : false,
				zoom : 15
			});
	layers[1] = new google.maps.KmlLayer(
			'https://googledrive.com/host/0BxgbW77_GYAMeGFHODYzNkMtUG8/IBA.kml',
			{
				preserveViewport : true,
				suppressInfoWindows : false
			});

	layers[2] = new google.maps.KmlLayer(
			'https://googledrive.com/host/0BxgbW77_GYAMeGFHODYzNkMtUG8/medic1.kml',
			{
				preserveViewport : true,
				suppressInfoWindows : false
			});

	layers[3] = new google.maps.KmlLayer(
			'https://googledrive.com/host/0BxgbW77_GYAMeGFHODYzNkMtUG8/office.kml',
			{
				preserveViewport : true,
				suppressInfoWindows : false
			});

	for (var i = 0; i < layers.length; i++) {
		layers[i].setMap(null);
	}

	var infoWindow = new google.maps.InfoWindow({
		map : map
	});
	// Try HTML5 geolocation.
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = {
				lat : position.coords.latitude,
				lng : position.coords.longitude
			};

			infoWindow.setPosition(pos);
			infoWindow.setContent('Hello Citizen! You are here ');
			// map.setCenter(pos);
			map.setZoom(6);
		}, function() {
			handleLocationError(true, infoWindow, map.getCenter());
		});
	} else {
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	}

	function showInContentWindow(text) {
		var sidediv = document.getElementById('content-window');
		sidediv.innerHTML = text;
	}

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow
			.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.'
					: 'Error: Your browser doesn\'t support geolocation.');
}

function toggleLayer(i) {
	if (layers[i].getMap() === null) {
		layers[i].setMap(map);

	} else {
		layers[i].setMap(null);

	}
}

function geocodeLatLng(geocoder, map, infowindow) {
	var input = document.getElementById('latlng').value;
	var latlngStr = input.split(',', 2);
	var latlng = {
		lat : parseFloat(latlngStr[0]),
		lng : parseFloat(latlngStr[1])
	};
	geocoder.geocode({
		'location' : latlng
	}, function(results, status) {
		if (status === google.maps.GeocoderStatus.OK) {
			if (results[1]) {
				map.setZoom(15);
				map.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker({
					position : latlng,
					map : map
				});
				infowindow.setContent(results[1].formatted_address);
				infowindow.open(map, marker);
			} else {
				window.alert('No results found');
			}
		} else {
			window.alert('Geocoder failed due to: ' + status);
		}
	});
}

function geocodeAddress(geocoder, resultsMap, infowindow) {
	var address = document.getElementById('address').value;
	if (address == null || address == '') {
		alert("Please enter a valid Location");
		return false;
	}
	geocoder.geocode({
		'address' : address
	}, function(results, status) {

		if (status === google.maps.GeocoderStatus.OK) {
			resultsMap.setCenter(results[0].geometry.location);
			var marker = new google.maps.Marker({
				map : resultsMap,
				position : results[0].geometry.location,

			});
			infowindow.setContent(results[0].formatted_address);
			infowindow.open(resultsMap, marker);
			resultsMap.setZoom(15);
		} else {
			alert('Geocode was not successful for the following reason: '
					+ status);
		}

	});
}