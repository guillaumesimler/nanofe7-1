/*
Map.js, programmed by Guillaume SIMLER
---------------------------------------------

This file is the module which the geodata data from the API's.

It uses widely the Jquery AJAX function (http://api.jquery.com/jquery.ajax/)

*/

// --------------------- Load the single API's -------------

	//------------------ Google Maps API -------------------


var gMap = {

	// ------------------ controller ------

	controller:{
	
		getMapCenter: function(){
			return model.map.center;
		},

		getMarkerData: function(){
			var locations = model.locations;

			locations.forEach( function(location) {
				location.image = model.Icons[location.type].url;
			});

			return locations;
		}
	},

	// ------------------ view -----------
	
	view:{
		initMap: function() {
			var map = new google.maps.Map(document.getElementById('map-section'), {
				center: gMap.controller.getMapCenter(),
				zoom: 10,
				mapTypeId: google.maps.MapTypeId.TERRAIN
			});	

			this.initMarker(map);
			
		},

		initMarker: function(data) {
			var locations = gMap.controller.getMarkerData();

			locations.forEach( function(location) {
				var i = 0;

				var image = {
					url: location.image,
					// This marker is 32 pixels wide by 32 pixels high.
					size: new google.maps.Size(32, 32),
					// The origin for this image is (0, 0).
					origin: new google.maps.Point(0, 0),
					// The anchor for this image is the base of the flagpole at (0, 32).
					anchor: new google.maps.Point(0, 32)
				}

				var contentString = '<div class="infotext">A nice place ' + location.name + '</div>';

				var infowindow = new google.maps.InfoWindow({
			    	content: contentString
				});

				var marker = new google.maps.Marker({
					position: location.position,
					map: data,
					title: location.name,
					zIndex: i++,
					icon: image
				});

				marker.addListener('click', function() {
					infowindow.open(data, marker);
				});

			});
		}
	}
}



// --------------------- Load the APIs ---------------------

/*loadMaps Elements, this function simply calls the subfunctions.
It is the gateway for the data*/ 