
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
	this.initMarker();

};

var failMap = function() {
	var errorMsg = '<div><img src="images/error.jpg" alt="a picture from Ben Lui" class="img-responsive"><p>This is indeed a Munro, but you should see a Map instead. There was an error with Google Maps</p></div>'; 
	$("#map-section").append(errorMsg);
};


var initMarker = function() {

//Get the object containing the markers's attributes

	// For Loop to implement each marker
	locations.forEach( function(location) {
		var i = 0;

		var place = new createLoc(location);


		console.log(place)

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
			animation: google.maps.Animation.DROP,
			zIndex: i++,
			icon: place.image
		});


		var toggleBounce = function() {
			if (marker.getAnimation() !== null) {
				marker.setAnimation(null);
			} else {
		   		marker.setAnimation(google.maps.Animation.BOUNCE);
			}
		};

		//Add an event listener to react on click
		marker.addListener('click', function() {
			infowindow.open(map, marker);
		});

		marker.addListener('click', toggleBounce);

		markers.push(marker);

	});

};



