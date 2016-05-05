
var createLoc = function(data) {
    var self = this;

    self.name = data.name;
    self.position = data.position;
    self.type = data.type;

    self.image = function(data) {
        return Icons[data.type].url
    }(self);

};

var viewModel = function() {

	var self = this;
    
	self.places = ko.observableArray('');

    locations.forEach( function(location) {
        self.places().push(new createLoc(location));
    });

	self.query = ko.observable('');

	self.searchedPlaces = ko.computed(function() {
		return ko.utils.arrayFilter(self.places(), function(item) {
            console.log(item);
			return (item.name.toLowerCase().indexOf(self.query().toLowerCase()) >= 0) ||(item.type.toLowerCase().indexOf(self.query().toLowerCase()) >= 0) ;
        });
	});
}





var loadWiki = function(input) {

	console.log(input)

	var Input = input.name;
    var content;

    // Load Wikipedia Article
	$wiki = $('#ajax-answer');

	$wiki.children().remove();

    var WikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + Input + '&prop=revisions&rvprop=content&format=json&callback=wikiCallback';
    
   
    $.ajax({
        url:WikiUrl,
        dataType: "jsonp",
        success: function(response) {

            var articleList = response[1][0];
            var articleSum = response[2][0];
            var articleUrl = response[3][0];

            if (articleList){
				content = '<h5> <a href="' + articleUrl + '" target="_blank">' + articleList + '</a></h5>' +
            	'<p>' + articleSum + '</p>';
            } else {
            	content = ('<p> failed to get this specific wikipedia article about ' + Input + 
            		'</p><p>Please try with the <a href="https://en.wikipedia.org/wiki/Munro" target="_blank">generic article about Munros</a></p>')
            }

            $wiki.append(content);

            return content;
        },
        error: function(response){
            content = ('<p> failed to get this specific wikipedia article about ' + Input + 
                '</p><p>A major problem occured with Wikipedia - please try later or contact your administrator</a></p>')
            $wiki.append(content);

            return content;
        }

       
    });

    console.log(content);
       

};


ko.applyBindings(new viewModel());
