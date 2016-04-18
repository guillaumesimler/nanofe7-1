

var viewModel = function(data){
	this.name = ko.observable(data.name);
	this.type = ko.observable(data.type);
	this.position = ko.observable(data.position);
};


ko.applyBindings(viewModel(locations));