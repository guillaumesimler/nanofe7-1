
// var ScotLocation = function(data) {
// 	this.type = ko.observable(data.type);
// 	this.attribute = ko.observableArray([
// 		data.name,
// 		data.position,
// 		data.url
// 	]);

// };

var places =  gMap.controller.getMarkerData();

var viewModel = {
	locations: ko.observableArray(),

	query: ko.observableArray(''),

	search: function(value) {
		viewModel.locations.removeAll();

		for(var i=0; i < places.length; i++){
	
			if ((places[i].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) 
				|| (places[i].type.toLowerCase().indexOf(value.toLowerCase()) >= 0)){
				viewModel.locations.push(places[i]);

			};
		};

	}
}

viewModel.query.subscribe(viewModel.search);

ko.applyBindings(viewModel);

