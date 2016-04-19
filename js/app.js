var viewModel = function() {

	var self = this;

	self.places = ko.observableArray(locations);

	self.query = ko.observable('');

	self.searchedPlaces = ko.computed(function() {

		console.log('At least started ' + self.query())

		return ko.utils.arrayFilter(self.places(), function(item) {
			return (item.name.toLowerCase().indexOf(self.query().toLowerCase()) >= 0) ||(item.type.toLowerCase().indexOf(self.query().toLowerCase()) >= 0) ;
        });
	});
};





ko.applyBindings(new viewModel());