
var markers = [];
var marker;
var map;

var initMap = function() {
		
	//Get the data for the map
	var mapAttr = MapCriteria;

	//Load the map
	map = new google.maps.Map(document.getElementById('map-section'), {
		center: mapAttr.center,
		zoom: mapAttr.zoom,
		mapTypeId: google.maps.MapTypeId.TERRAIN
	});	

	//Run the function loading the Markers
	this.initMarker(map);

};



var initMarker = function(data) {

//Get the object containing the markers's attributes


	// For Loop to implement each marker
	locations.forEach( function(location) {
		var i = 0;

		// format the type specific icon
		// var image = {
		// 	url: location.image,
		// 	// This marker is 32 pixels wide by 32 pixels high.
		// 	size: new google.maps.Size(32, 32),
		// 	// The origin for this image is (0, 0).
		// 	origin: new google.maps.Point(0, 0),
		// 	// The anchor for this image is the base of the flagpole at (0, 32).
		// 	anchor: new google.maps.Point(0, 32)
		// }

		//Insert the text of the info string
		
		var contentString = 'A great location ' + location.name;

		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});

		//Create the marker(s)

		var marker = new google.maps.Marker({
			position: location.position,
			map: map,
			title: location.name,
			zIndex: i++,
			//icon: image
		});

		//Add an event listener to react on click
		marker.addListener('click', function() {
			infowindow.open(map, marker);
		});

		markers.push(marker);

	});

};

