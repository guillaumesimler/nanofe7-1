/*
Map.js, programmed by Guillaume SIMLER
---------------------------------------------

This file is the module which the geodata data from the API's.

It uses widely the Jquery AJAX function (http://api.jquery.com/jquery.ajax/)

*/

// --------------------- Load the single API's -------------

	//------------------ Google Maps API -------------------


var gMap = {
	initMap: function() {
	  	var map = new google.maps.Map(document.getElementById('map-section'), {
	       	center: {lat: 56.431, lng: -4.702},
	       	zoom: 10
		    });
	}
}



// --------------------- Load the APIs ---------------------

/*loadMaps Elements, this function simply calls the subfunctions.
It is the gateway for the data*/ 