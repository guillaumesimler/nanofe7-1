
var ScotLocation = function(data) {
	this.type = ko.observable(data.type);
	this.attribute = ko.observableArray([
		data.name,
		data.position,
		data.url
	]);

}




var viewModel = {
	locations: ko.observableArray(gMap.controller.getMarkerData())
}

ko.applyBindings(viewModel);