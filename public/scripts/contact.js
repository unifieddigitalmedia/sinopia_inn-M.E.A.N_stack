var map = null;


function initMap() {

map = new google.maps.Map(document.getElementById('map'), {

          center: {lat: 18.166618, lng: -76.380691},

           zoomControl: true,
          zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT_CENTER
    

          },

          zoom: 16
        
        });

      }
      