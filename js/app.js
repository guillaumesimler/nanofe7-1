/* App.js
--------- programmed by Guillaume Simler
This is the main part of the program bringing the logic into the app. 

*/ 



/* !!!!!!!!!!!!!!!!!! init Map !!!!!!!!!!!!!!!!!!  

    This actually starts the program as it launches (in the respective order) 
        1. the google Map api
        2. the binding
 */

var initMap = function() {
		
	//Get the data for the map
	var mapAttr = MapCriteria;

	//Load the map
	var map = new google.maps.Map(document.getElementById('map-section'), {
		center: mapAttr.center,
		zoom: mapAttr.zoom,
		mapTypeId: google.maps.MapTypeId.TERRAIN
	});	


	// Apply knowck out binding
	ko.applyBindings(new viewModel());

};


var viewModel = function() {

	var self = this;

	self.places = ko.observableArray([]);


	// For Loop to implement the objects to follow and creating a marker for each
	locations.forEach( function(location) {
		var i = 0;

		var place = new Place(location);

		//create the infowindow with Wikipedia informations (for more details, pleace look at the function itselfs)
		var infowindow = new google.maps.InfoWindow();
		loadWiki(place, infowindow);
		
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

        // Add the marker to the object

		place.marker = ko.observable(marker);

		self.places.push(place);

	});

	/* !!!!!!!! Build in search function  !!!!!*/
	self.query = ko.observable('');

	self.searchedPlaces = ko.computed(function() {

		return ko.utils.arrayFilter(self.places(), function(item) {
    		var checkVal = (item.name().toLowerCase().indexOf(self.query().toLowerCase()) >= 0) ||(item.type().toLowerCase().indexOf(self.query().toLowerCase()) >= 0) ;

        	if (checkVal) {
        		item.marker().setVisible(true);
        	} else { 
        		item.marker().setVisible(false);
        	}

        	return checkVal;

        });
	});


};

/* !!!!!!!!!!!!!!!!!! helper functions !!!!!!!!!!!!!!!!!!  */

    /* !!!!!!!!!!!!!!!!!! place !!!!!!!!!!!!!!!!!! 
        The aim of the function is to create the object out of the model section for the viewmodel.

        Naturally the function cannot work independently from ViewModel.  
        
    */

var Place = function(data) {
    var self = this;

    self.name = ko.observable(data.name);
    self.position = ko.observable(data.position);
    
    self.type = ko.observable(data.type);

    // Gets the icon depending on its type
    self.image = ko.observable(function(data) {
        return Icons[data.type()].url;
    }(self));

    self.marker = ko.observable('');

};

    /* !!!!!!!!!!!!!!!!!! loadWiki !!!!!!!!!!!!!!!!!! 
        The aim of the function is to get the data from Wikipedia. 

        This function has two fallback options: 
            (1) in case there is no wikipedia article
            (2) in case there is no link to wikipedia or another errors

        The function passes two parameter:
            - input, which is the object created previously with all location information
            - infowindow, the infowindow created just above, in order to ensure getting the scope from Viewmodel in loadWiki

        Naturally the function cannot work independently from ViewModel.  
        
    */
var loadWiki = function(input, infowindow) {

	var Input = input.name();
    var content;

    // Load Wikipedia Article
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

            // Fallback n°1: in case there is no article the response will not have a second element in the array or if it will be null or undefinied. In any case, it will be falsy
            } else {

            	content = ('<p> failed to get this specific wikipedia article about ' + Input + 
            		'</p><p>Please try with the <a href="https://en.wikipedia.org/wiki/Munro" target="_blank">generic article about Munros</a></p>');
            }          

            infowindow.setContent(content);
        },

        // Fallback n°2: in this case the AJAX request completely failed and this creates this error message
        error: function(response){
            content = ('<p> failed to get this specific wikipedia article about ' + Input + 
                '</p><p>A major problem occured with Wikipedia - please try later or contact your administrator</a></p>');
           
			
            infowindow.setContent(content);
        }
       
    });
        
};

/* !!!!!!!!!!!!!!!!!! additional functions !!!!!!!!!!!!!!!!!!  */

// Function enabling a response of when clicking an element of the list

var reactiveList = function(response){
	if (response.marker().getAnimation() !== null) {
			response.marker().setAnimation(null);
	} else {
	   		response.marker().setAnimation(google.maps.Animation.BOUNCE);
	}
 };


// Fallback function for Google Maps
var failMap = function() {
	var errorMsg = '<div><img src="images/error.jpg" alt="a picture from Ben Lui" class="img-responsive"><p>This is indeed a Munro, but you should see a Map instead. There was an error with Google Maps</p></div>'; 
	$("#map-section").append(errorMsg);
};
