/*
Map.js, programmed by Guillaume SIMLER
---------------------------------------------

This file is the module which the geodata data from the API's.

It uses widely the Jquery AJAX function (http://api.jquery.com/jquery.ajax/)

*/

// --------------------- Load the single API's -------------

	//------------------ Google Maps API -------------------


var gMap = {
	
		
	// ------------------ model --------
	model:{
		//Map center: coordinates of Tyndrum Station
		center: {
			lat: 56.436425, 
			lng: -4.711097
		},

		//Markers:

		locations:[
			{name: 'Glengarry House',
			position:{
				lat: 56.431270,
				lng: -4.702900
				}	
			},

			{name: 'Bridge of Orchy Hotel',
			position:{
				lat: 56.517778, 
				lng: -4.768667
				}	
			},

			{name: 'Ben Lui',
			position:{
				lat: 56.397507, 
				lng: -4.810323 
				}	
			},

			{name: 'Beinn Dorain',
			position:{
				lat: 56.502835, 
				lng: -4.722226 
				}	
			},

			{name: 'Beinn an Dòthaidh',
			position:{
				lat: 56.529969, 
				lng: -4.714415 
				}	
			}
		]

	},

	// ------------------ controller ------

	controller:{
	
		getMapCenter: function(){
			return gMap.model.center;
		},

		getMarkerData: function(){
			return gMap.model.locations;
		}
	},

	// ------------------ view -----------
	
	view:{
		initMap: function() {
			var map = new google.maps.Map(document.getElementById('map-section'), {
				center: gMap.controller.getMapCenter(),
				zoom: 10
			});	

			this.initMarker(map);
			
		},

		initMarker: function(data) {

			var locations = gMap.controller.getMarkerData();

			for (var i=0; i < locations.length; i++) {
				var marker = new google.maps.Marker({
					position: locations[i].position,
					map: data,
					title: locations[i].name,
					zIndex: i,
				});
			}
		}
	}
}



// --------------------- Load the APIs ---------------------

/*loadMaps Elements, this function simply calls the subfunctions.
It is the gateway for the data*/ 