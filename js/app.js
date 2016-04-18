
// var ScotLocation = function(data) {
// 	this.type = ko.observable(data.type);
// 	this.attribute = ko.observableArray([
// 		data.name,
// 		data.position,
// 		data.url
// 	]);

// };

var locJson = model.locations;

var mapJson = model.map;


var Place = function(data) {
	this.Type = ko.observable(data.type);
	this.Name = ko.observable(data.name);
	this.Position = ko.observable(data.position);
	this.Marker = ko.observable(data.Marker);

	this.Url = ko.computed(function(){
		var Url = model.Icons;

		if (data.type === 'Summit') {
			return Url.Summit.url;
		}

		if (data.type === 'Walk') {
			return Url.Walk.url;
		}

		if (data.type === 'Accomodation') {
			return Url.Accomodation.url;
		}

	}, this);


};




var gMap = {
	
	initMap: function () {
		var mapAttr = mapJson;

		//Load the map
		var map = new google.maps.Map(document.getElementById('map-section'), {
			center: mapAttr.center,
			zoom: mapAttr.zoom,
			mapTypeId: google.maps.MapTypeId.TERRAIN
		});	

		this.initMarker(map, locJson);
			
	},

	initMarker: function(data, locations) {

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
			// };

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
				//icon: image
			});

			//Add an event listener to react on click
			marker.addListener('click', function() {
				infowindow.open(data, marker);
			});

			model.locations.marker = marker;
		});
	},

};


var viewModel = function() {	
		var self = this;

		this.locations = ko.observableArray([]);

		locJson.forEach( function(loc) {
			self.locations.push(new Place(loc));
		});

		console.log(this.locations()[0])
	}


ko.applyBindings(viewModel)	;

