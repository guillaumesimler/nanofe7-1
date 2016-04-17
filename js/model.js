/*
model.js, programmed by Guillaume SIMLER
---------------------------------------------

This file is the module which handles the data.

It uses widely the google maps API (https://developers.google.com/maps/?hl=en).

Personal comment: Gosh, I would love to use a database !!! Try to implement Fireflash later

*/


var model = {
	/*The data for Google Map Init
	
	Map center: coordinates of Tyndrum Station*/
	map:{
		center: {
			lat: 56.436425, 
			lng: -4.711097
			},
		zoom: 11,
		
	},

	/*The data for placing the markers. The structure is the following
		name (string): "name of the place"
		position (object): composed by latitude (lat) and longitude (lng) and their respective coordinates in WGS84 format
		type (string): potential choice Accommodation, Summit, Walk

	Additional data will not be added by gMAP.controller.getMarkerData
		url (string): url of the images linked to the type as described in the next object (only to an intermediary object)S
		
	*/

	locations:[{
		name: 'Glengarry House',
		position:{
			lat: 56.431270,
			lng: -4.702900
			},
		type: 'Accomodation'	
		},

		{
		name: 'Bridge of Orchy Hotel',
		position:{
			lat: 56.517778, 
			lng: -4.768667
			},
		type: 'Accomodation'

		},

		{name: 'Ben Lui',
		position:{
			lat: 56.397507, 
			lng: -4.810323 
			},
		type: 'Summit'	
		},

		{name: 'Beinn Dorain',
		position:{
			lat: 56.502835, 
			lng: -4.722226 
			},
		type: 'Summit'	
		},

		{name: 'Beinn an Dòthaidh',
		position:{
			lat: 56.529969, 
			lng: -4.714415 
			},
		type: 'Summit'
		},

		{name: 'Clachaig Inn',
		position:{
			lat: 56.664364, 
			lng: -5.056212 
			},
		type: 'Accomodation'
		},

		{name: 'Am Bodach',
		position:{
			lat: 56.74086,
			lng: -4.98394 
			},
		type: 'Summit'
		},

		{name: 'Stob Ban',
		position:{
			lat: 56.743772,
			lng: -5.030793
			},
		type: 'Summit'
		},

		{name: 'Mullach nan Coirean',
		position:{
			lat: 56.749867,
			lng: -5.072397
			},
		type: 'Summit'
		},

		{name: 'Ben Challum',
		position:{
			lat: 56.454708,
			lng: -4.61977
			},
		type: 'Summit'
		},

		{name: 'Beinn Mhanach',
		position:{
			lat: 56.535031,
			lng: -4.646462
			},
		type: 'Summit'
		},

		{name: 'Glentower Lower Observatory',
		position:{
			lat: 56.813563,
			lng: -5.118816
			},
		type: 'Accomodation'
		},

		{name: 'Glen Nevis',
		position:{
			lat: 56.777631, 
			lng: -5.000240
			},
		type: 'Walk'
		},

		{name: 'Glenn Falloch',
		position:{
			lat: 56.348641,
			lng: -4.697225
			},
		type: 'Walk'
		},

		{name: 'Beinn a’ Chleibh',
		position:{
			lat: 56.390144,
			lng: -4.835627
			},
		type: 'Summit'
		},

		{name: 'Stob Coire a’ Chàirn',
		position:{
			lat: 56.750649,
			lng: -4.969177
			},
		type: 'Summit'
		},

		{name: "King's House Hotel",
		position:{
			lat: 56.651129,
			lng: -4.840683
			},
		type: 'Accomodation'
		},

	],

	/* Icons: 
		- Specific Design for each Type
		- Design by Laura Reen https://www.iconfinder.com/DemSt	
	*/

	Icons:{
		Summit:{
			url: 'images/peak.png'
		},

		Walk:{
			url: 'images/walk.png',
		},

		Accomodation:{
			url: 'images/rest.png',

		}
	}
};