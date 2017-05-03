 function initMap() {


 var bounds = new google.maps.LatLngBounds();

        // Create a new StyledMapType object, passing it an array of styles,
        // and the name to be displayed on the map type control.
        var styledMapType = new google.maps.StyledMapType(

          [
  {
    "featureType": "poi.business",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
]
           /* [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]*/,
            {name: 'Sinopia_Inn'});



        var lineSymbol = {
    path: 'M 0,-1 0,1',
    strokeOpacity: 1,
    scale: 4
  };
  var dashedPolyline = {
    strokeOpacity: 0,
    strokeColor: "#cb410b",
    icons: [{
      icon: lineSymbol,
      offset: '0',
      repeat: '20px'
    }]
  };


 var  directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true,polylineOptions:dashedPolyline});
 var directionsService = new google.maps.DirectionsService;
 
 // Multiple Markers
    var markers = [
        ['Blue Lagoon',18.170649,-76.385876],
        ['Winnifred Beach',18.169946, -76.375721],
        ['Sinopia Inn',18.166518,-76.380669]
    ];
           


  

        // Create a map object, and include the MapTypeId to add
        // to the map type control.
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat:18.166518,lng:-76.380669},
          zoom: 16,
          mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                    'Sinopia_Inn']
          }
        });

        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(18.166630, -76.381253),
          map: map,
          title: 'Sinopia Inn'
        });

         google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
    });

var contentString = '<div id="content" class="infowindowLogo" >'+
        '<div id="siteNotice">'+
        '</div>'+
        '<img src="/images/logo_header.png" class="logo" style="width:200px;height:50px!important;"><p class="infowindowDescription" >  your home away from home here in Jamaica </p>'+
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });


infowindow.open(map,marker);
 map.setTilt(45);
        //Associate the styled map with the MapTypeId and set it to display.
        map.mapTypes.set('Sinopia_Inn', styledMapType);
        map.setMapTypeId('Sinopia_Inn');
        directionsDisplay.setMap(map);

        //calculateAndDisplayRoute(directionsService, directionsDisplay);
  

      }


   function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        var selectedMode = "WALKING";


directionsService.route({
          origin: {lat:18.170328,lng: -76.385918},  // Haight.
          destination: {lat:18.169087,lng: -76.373850},  // Ocean Beach.
          waypoints: [{
            location:new google.maps.LatLng(18.166630, -76.381253),
          stopover:false}],  optimizeWaypoints: true,
          travelMode: google.maps.TravelMode[selectedMode]
        }, function(response, status) {
          if (status == 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
        
        


      }