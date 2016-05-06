
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
	this.viewModel();


	// Apply knowck out binding
	ko.applyBindings(new viewModel());

};



var Place = function(data) {
    var self = this;

    self.name = ko.observable(data.name);
    self.position = ko.observable(data.position);
    
    self.type = ko.observable(data.type);
    self.image = ko.observable(function(data) {
        return Icons[data.type()].url
    }(self));

    self.marker = ko.observable('');

};

var reactiveList = function(response){
	if (response.marker().getAnimation() !== null) {
			response.marker().setAnimation(null);
	} else {
	   		response.marker().setAnimation(google.maps.Animation.BOUNCE);
	}
 };



var viewModel = function() {

	var self = this;

	self.places = ko.observableArray([]);

	//Get the object containing the markers's attributes

	// For Loop to implement each marker
	locations.forEach( function(location) {
		var i = 0;

		var place = new Place(location);


		//Insert the text of the info string
		
		var contentString = 'A great location ' + location.name;

		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});

		//Create the marker(s)

		var marker = new google.maps.Marker({
			position: place.position(),
			map: map,
			title: place.name(),
			animation: google.maps.Animation.DROP,
			zIndex: i++,
			icon: place.image()
		});

		//Add an event listener to react on click
		marker.addListener('click', function() {
			infowindow.open(map, marker);
		});


		place.marker = ko.observable(marker);

		self.places.push(place);

	});

	/* !!!!!!!! Build in search function  !!!!!*/
	self.query = ko.observable('');

	self.searchedPlaces = ko.computed(function() {
		return ko.utils.arrayFilter(self.places(), function(item) {
            console.log(item);
			return (item.name().toLowerCase().indexOf(self.query().toLowerCase()) >= 0) ||(item.type().toLowerCase().indexOf(self.query().toLowerCase()) >= 0) ;
        });
	});
};


// Fallback function for Google Maps
var failMap = function() {
	var errorMsg = '<div><img src="images/error.jpg" alt="a picture from Ben Lui" class="img-responsive"><p>This is indeed a Munro, but you should see a Map instead. There was an error with Google Maps</p></div>'; 
	$("#map-section").append(errorMsg);
};

