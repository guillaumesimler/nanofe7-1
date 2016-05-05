
var markers = [];
var marker;
var map;


var createLoc = function(data) {
    var self = this;

    self.name = data.name;
    self.position = data.position;
    self.type = data.type;

    self.image = function(data) {
        return Icons[data.type].url
    }(self);

};



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
			zIndex: i++,
			icon: place.image
		});

		//Add an event listener to react on click
		marker.addListener('click', function() {
			infowindow.open(map, marker);
		});

		markers.push(marker);

	});

};

