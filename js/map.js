/*
Map.js, programmed by Guillaume SIMLER
---------------------------------------------

This file is the module which transforms the geodata data from the API's.

It uses widely the google maps API (https://developers.google.com/maps/?hl=en)

*/

// --------------------- Load the single API's -------------

	//------------------ Google Maps API -------------------


var gMap = {

	// ------------------ controller ------

	controller:{
	
		//Load the map attributes from the model
		getMapCenter: function(){
			return model.map;
		},

		//Load the marker attributes from the model
		getMarkerData: function(){
			var locations = model.locations;

			//Add the Url for the images to each markeer
			locations.forEach( function(location) {
				location.image = model.Icons[location.type].url;
			});

			console.log(locations)
			return locations;
		}
	},

	// ------------------ view -----------
	
	view:{
		initMap: function() {
			
			//Get the data for the map
			var mapAttr = gMap.controller.getMapCenter();

			//Load the map
			var map = new google.maps.Map(document.getElementById('map-section'), {
				center: mapAttr.center,
				zoom: mapAttr.zoom,
				mapTypeId: google.maps.MapTypeId.TERRAIN
			});	

			//Run the function loading the Markers
			this.initMarker(map);
			
		},

		initMarker: function(data) {

			//Get the object containing the markers's attributes
			var locations = gMap.controller.getMarkerData();

			// For Loop to implement each marker
			locations.forEach( function(location) {
				var i = 0;

				// format the type specific icon
				var image = {
					url: location.image,
					// This marker is 32 pixels wide by 32 pixels high.
					size: new google.maps.Size(32, 32),
					// The origin for this image is (0, 0).
					origin: new google.maps.Point(0, 0),
					// The anchor for this image is the base of the flagpole at (0, 32).
					anchor: new google.maps.Point(0, 32)
				}

				//Insert the text of the info string

				var contentString = '<div class="infotext">A nice place ' + location.name + '</div>';

				var infowindow = new google.maps.InfoWindow({
			    	content: contentString
				});

				//Create the marker(s)

				var marker = new google.maps.Marker({
					position: location.position,
					map: data,
					title: location.name,
					zIndex: i++,
					icon: image
				});

				//Add an event listener to react on click
				marker.addListener('click', function() {
					infowindow.open(data, marker);
				});

			});
		}
	}
}
