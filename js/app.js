var viewModel = {
	locations: ko.observableArray(gMap.controller.getMarkerData())
}

ko.applyBindings(viewModel);