
$( "#subscribe_button" ).click(function() {



   window.location = "connect.html" ;

   document.cookie = "subscribers_email=" + document.getElementById("#subscribers_email").value;



});


function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}


var map = null;


function initMap() {

map = new google.maps.Map(document.getElementById('map'), {

          center: {lat: 18.171100, lng: -76.442305},

           zoomControl: true,
          zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT_CENTER
    

          },

          zoom: 8
        
        });

      }
      

jQuery(document).ready(function(){




if( getCookie("privacy") == 'no' ){


var modal = document.getElementById('myModal');


modal.style.display = "block";

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

}

jQuery("input[name='optradio']").change(function(){


var modal = document.getElementById('myModal');

 if(jQuery(this).val() == 'yes' ){

document.cookie = "privacy=yes";

 modal.style.display = "none";
 }else{

document.cookie = "privacy=no";
 modal.style.display = "none";

 }


});


function getCookie(cname) {

    var name = cname + "=";
  
    var ca = document.cookie.split(';');
  
    for(var i=0; i<ca.length; i++) {
  
        var c = ca[i];
  
        while (c.charAt(0)==' ') c = c.substring(1);
  
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  
    }
  
    return "";

}


jQuery( "#subscribe_button" ).click(function() {



  window.open("connect.html","_self");

   document.cookie = "subscribers_email=" + document.getElementById("#subscribers_email").value;



});

   jQuery("#map,.right-panel").css("height", window.innerHeight / 2);



});



var app = angular.module('travellight', ['ngResource','typeofbusinessfilter','typeofservicefilter','businessnamefilter','itineraryFilter']);

app.controller('travelplanner', function($scope,$http,$resource,$compile) {

var latlng;

$scope.filterBylocation = function( para ) {

$scope.log = [];



angular.forEach(para, function(value, key) {


                                        

                                                      if ( value.location == getCookie('location'))  

                                                         { $scope.log.push(value); }



});

 

   return $scope.log;
  


};


$scope.filter_ini = function () {


$scope.mapmarkersArray = [];

$scope.businessmarkersArray = [];


$scope.temppassword = "";

    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )

        $scope.temppassword += possible.charAt(Math.floor(Math.random() * possible.length));



$http.get("http://www.sinopiainn.com/api/businesses").then(function(response) {

$scope.businesses = $scope.filterBylocation(response.data);




var element = document.getElementById('country');

element.value = 'Jamaica';

var geocoder;


geocoder = new google.maps.Geocoder();


geocoder.geocode( { 'address': 'Jamaica'}, function(results, status) {



if (status == google.maps.GeocoderStatus.OK) {



 map = new google.maps.Map(document.getElementById("map"),{
            
         center: results[0].geometry.location,
          
            zoomControl: true,
          zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT_CENTER
    

          },

          zoom: 8
  
        });


}



 });


                                                                          
                                                                          });





                               }


function getCookie(cname) {

    var name = cname + "=";
  
    var ca = document.cookie.split(';');
  
    for(var i=0; i<ca.length; i++) {
  
        var c = ca[i];
  
        while (c.charAt(0)==' ') c = c.substring(1);
  
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  
    }
  
    return "";

}



$scope.tobArray = [];
$scope.tosArray = [];

$scope.tob = function (event) {


var action = (event.target.checked ? 'add' : 'remove');

$scope.updateSelected(action,event.target.value,$scope.tobArray,0);


}

$scope.tos = function (event) {


var action = (event.target.checked ? 'add' : 'remove');

$scope.updateSelected(action,event.target.value,$scope.tosArray,1);


}

$scope.updateSelected = function(action,para,para1,para2) {


if (action === 'add' && para1.indexOf(para) === -1) {

     
     para1.push(para);

     if(para2 === 1 ) {$scope.placeService(para);}
    

  }


  if (action === 'remove' && para1.indexOf(para) !== -1) {


     para1.splice(para1.indexOf(para), 1);

     if(para2 === 1 ) { $scope.removeService(para);}
    

  }


}

$scope.businessesArray = [];

$scope.placetag = function(para) {



if ($scope.businessesArray.indexOf(para) === -1) {



    $scope.businessesArray.push(para);


       $scope.drop(para);

                                               

                                                }

                               




}

$scope.placeService =function (para) {

for (x = 0; x < $scope.businesses.length; x++)
 
 {

for (y = 0; y < $scope.businesses[x].activity.length; y++)

                                                              {


 if ( $scope.businesses[x].activity[y]["typeofservice"] === para)  

               if($scope.mapmarkersArray.length != 0)

{


                          jQuery.grep($scope.mapmarkersArray, function(a,q) { 


                                                              if ( a.metadata.service.indexOf(para) === -1)  

                                                                    {$scope.drop($scope.businesses[x]);} 




                                                                             });


}

else

{



                                                                      $scope.drop($scope.businesses[x]); 



}





                                                              }




}



}


$scope.removeService = function(para) {


                          jQuery.grep($scope.mapmarkersArray, function( a,x ) { 


                                      jQuery.grep(a.metadata.service, function (b,y) {



                              if((b.typeofservice === para) && (a.metadata.set === 'false') && ($scope.tosArray.indexOf(b.typeofservice) === -1))

                                                                
                                                                {




                                                                  a.setMap(null);

                                                        


                                                                } 



                                                                                      });
                              




                                                                              });


$scope.mapmarkersArray = jQuery.grep($scope.mapmarkersArray, function( a,x ) {  return (a.map !== null ) });


}


$scope.drop =function(para) {


    var myCenter = $scope.getCoords(para);

   
    $scope.addmarkettomap(myCenter, i * 200,para);



}

$scope.getCoords = function (para) {


var myCenter = new google.maps.LatLng(para.coordinates.Latitude,para.coordinates.Longitude);



return myCenter;


}

$scope.ItinComps = [];

$scope.checkItin = function(para) {


/*

if ($scope.ItinComps.indexOf(para) === -1) { 


 return 'Add to itinerary!' 


}
else

{





return 'Delete from itinerary';

}*/

return $scope.ItinComps.indexOf(para);


}



$scope.addtoItin = function (para,para1) {






if($scope.ItinComps.indexOf(para._id) === -1)

{

var pos = null;

$scope.ItinComps.push(para._id);


$scope.mapmarkersArray = jQuery.grep($scope.mapmarkersArray, function( a,i ) { 




if(a.title === para.businessname )

{


a.metadata.set = true;



pos = a.metadata._id;


}


return a; 


});


$scope.$apply(function () {



$scope.trpcfmdst = $scope.setDst($scope.calsdst($scope.mapmarkersArray));


        });


para1.innerHTML =  ($scope.checkItin(para._id) == -1) ? 'Add to itinerary!' : 'Delete from itinerary';


$scope.addPlaceDetails(pos,para);

$scope.addplacesOfinterest(para._id);

}
else
{

$scope.ItinComps = jQuery.grep($scope.ItinComps, function(a,x) { 


                                                    
return (a != para);


                                                                });



var idx;

$scope.mapmarkersArray = jQuery.grep($scope.mapmarkersArray, function( a , i ) { 


idx = i ;


if(a.title === para.businessname && a.metadata.set === 'true')

{


a.metadata.set = false;


}



if( $scope.tosArray.indexOf(a.metadata.service) === -1 )

{

 a.setMap(null);


}

return ( a.map != null ); 


});



$scope.$apply(function () {


$scope.mapmarkersArray.splice(idx, 1);

$scope.trpcfmdst = $scope.setDst($scope.calsdst($scope.mapmarkersArray));


        });

para1.innerHTML =  ($scope.checkItin(para._id) == -1) ? 'Add to itinerary!' : 'Delete from itinerary';


}
 


}


//$scope.addTobtn = function(event) {

jQuery(document).on("click",".addTobtn",function(event){



var pos = this.value;

var child = this.parentNode.parentNode;

//child.parentNode.removeChild(child);


$scope.ItinComps.splice($scope.ItinComps.indexOf(this.value), 1);

$scope.mapmarkersArray = jQuery.grep($scope.mapmarkersArray, function( a , i) { 



if(a.metadata._id == pos)

{

 a.setMap(null);


}



return a.metadata._id != pos; 


});


 $(this).closest("table").remove();



});


$scope.addmarkettomap = function(position,timeout,para) {



window.setTimeout(function() {

var marker = new google.maps.Marker({

      position: position,

      draggable: true,

      map:map,

      title:para.businessname,

      animation: google.maps.Animation.DROP,


metadata: {


            service:para.activity,

            set:'false',

            lat:para.coordinates.Latitude, 
 
            lng:para.coordinates.Longitude,

            _id:para._id,

   },

    });


$scope.mapmarkersArray.push(marker);


var content = document.createElement('div');


                      $scope.setContent(para,content);

                      button = content.appendChild(document.createElement('P'));
                      
                      button.innerHTML =  ($scope.checkItin(para) == -1) ? 'Add to itinerary!' : 'Delete from itinerary';

                      button.setAttribute("style","float:right;padding:2px;cursor:pointer;");


 google.maps.event.addDomListener(button, 'click', function () {



                            $scope.addtoItin(para,this);



                      });


  var infowindow = new google.maps.InfoWindow({


    content: content
  


  });

marker.addListener('click', function() {

    infowindow.open(map, marker);
  
  });

google.maps.event.addListener(marker, 'dragstart', function() {


     marker.setPosition(position);


  });

google.maps.event.addListener(marker, 'drag', function() {


    marker.setPosition(position);


  });


google.maps.event.addListener(infowindow, 'domready', function() {
      


   


});







 }, timeout);





}

$scope.setDst = function (totalmeters) {  


var totalKmeters = ((Number(totalmeters)*2) * 0.001).toFixed(2);

var miles = Number(totalKmeters) * Number(0.621371192);


return miles.toFixed(2);


}


$scope.pathdistance = function(lat,long) {

var R = 6378137;

var dLat = ((Number(lat) - 18.166673)* Math.PI )/180;

var dLong = ((Number(long) - (-76.381451))* Math.PI )/180;

var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos((lat * Math.PI )/180) * Math.cos((18.166673 * Math.PI )/180) * Math.sin(dLong / 2) * Math.sin(dLong / 2);

var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

var d = R * c;

return d;

}

$scope.calsdst = function (mapmarkers) {

var totalmeters = 0;

jQuery.grep(mapmarkers, function( a,i ) { 

if(a.metadata.set === true)

{



 totalmeters = Number($scope.pathdistance(a.metadata.lat,a.metadata.lng)) + Number(totalmeters);




}


return a; 


});


return totalmeters;

}


$scope.setContent = function (para,content) 


{
  


logo = content.appendChild(document.createElement('img'));


logo.src= para.logourl;

logo.setAttribute("style","width:100%;padding:10px;height:50%");

logo.setAttribute("class","img-responsive");



container = content.appendChild(document.createElement('div'));

content.setAttribute("class","w3-container w3-center");

title = container.appendChild(document.createElement('h3'));

title.innerHTML = para.businessname;

address = container.appendChild(document.createElement('h4'));

address.innerHTML = para.businessaddress;

phone = container.appendChild(document.createElement('h5'));

phone.innerHTML = para.businessphone;

email = container.appendChild(document.createElement('h5'));

email.innerHTML = para.businessemail;

url = container.appendChild(document.createElement('h5'));

url.innerHTML = para.businesswebsite;

return  content;


}




$scope.map = null;

$scope.setupMap = function() {







}


$scope.addplacesOfinterest =function(para){


var div = document.getElementById("placesOfinterest");  

var newItem = document.createElement("input");  

newItem.setAttribute("name","places[]");

newItem.setAttribute("type","hidden");

newItem.setAttribute("value",para);

newItem.setAttribute("id",para);

div.appendChild(newItem);


}



$scope.removeplacesOfinterest =function(){



}



$scope.addPlaceDetails = function (para1,para) {

var place , header, content , paragraph, logo ,subtitle ,addTo,container;



var tableRow, tableRow2 , tableCell1, tableCell2, tableCell3, tableRow2tabelCell1,tableRow2tabelCell2,tableRow3,tableRow3tabelCell1,tableRow4,tableRow4tabelCell1,tableRow5,tableRow5tabelCell1,tableRow5tabelCell2,iTinbutton; 





var newItem = document.createElement("li");  


place = newItem.appendChild(document.createElement('table'));


place.setAttribute("style","position:relative; width: 100%;border-bottom:thin solid #f6f6f6;padding:20px;");

tableRow = place.appendChild(document.createElement('tr'));

tableCell1 = tableRow.appendChild(document.createElement('td'));

tableCell1.setAttribute("rowspan","5");

tableCell1.setAttribute("id",para1);



logo = tableCell1.appendChild(document.createElement('img'));

logo.src = "" ;

logo.setAttribute("style","width:25%;padding:10px;height:50%");

logo.setAttribute("class","img-responsive");



tableCell2 = tableRow.appendChild(document.createElement('td'));
title = tableCell2.appendChild(document.createElement('h3'));
title.innerHTML = para.businessname;
tableCell3 = tableRow.appendChild(document.createElement('td'));


tableRow2 = place.appendChild(document.createElement('tr'));
tableRow2tabelCell1 = tableRow2.appendChild(document.createElement('td'));
address = tableRow2tabelCell1.appendChild(document.createElement('h4'));
address.innerHTML = para.businessaddress;


tableRow2tabelCell2 = tableRow2.appendChild(document.createElement('td'));
phone = tableRow2tabelCell2.appendChild(document.createElement('h4'));
tableRow2tabelCell2.setAttribute("rowspan","3");


tableRow3 = place.appendChild(document.createElement('tr'));
tableRow3tabelCell1 = tableRow3.appendChild(document.createElement('td'));
phone = tableRow3tabelCell1.appendChild(document.createElement('h4'));
phone.innerHTML = para.businessphone;


tableRow4 = place.appendChild(document.createElement('tr'));
tableRow4tabelCell1 = tableRow4.appendChild(document.createElement('td'));
email = tableRow4tabelCell1.appendChild(document.createElement('h4'));
email.innerHTML = para.businessemail;


tableRow5 = place.appendChild(document.createElement('tr'));
tableRow5tabelCell1 = tableRow5.appendChild(document.createElement('td'));
url = tableRow5tabelCell1.appendChild(document.createElement('h4'));
url.innerHTML = para.businesswebsite;



tableRow5tabelCell2 = tableRow5.appendChild(document.createElement('td'));
iTinbutton = tableRow5tabelCell2.appendChild(document.createElement('button'));
iTinbutton.appendChild(document.createTextNode("Remove from Itinerary"));           
iTinbutton.setAttribute("class","btn btn-link addTobtn  destination-room");
iTinbutton.setAttribute("value",para1);



newItem.appendChild(place);
var list = document.getElementById("side-panel-right-list");  
list.appendChild(newItem);




}



//$scope.addTobtn = function(event) {

jQuery(document).on("click",".booktrip",function(event){

if( getCookie("privacy").length == 0 ){


var modal = document.getElementById('myModal');


modal.style.display = "block";


}else{



var array_string  = JSON.stringify($scope.ItinComps);


document.cookie = "itinerary=" + array_string;

  window.location = "itinerary.html" ;


  
}



});






$scope.booktrip = function (para,content) 


{



/*
var resource = $resource('http://www.sinopiainn.com/api/booktrip/',{

          triptoken:"@triptoken", 
          distance:"@distance",   
          "placesArray[]":"@placesArray"

});



var reserve = resource.save(

{

          triptoken:$scope.temppassword,
          distance:$scope.trpcfmdst,
          "placesArray[]":$scope.ItinComps,
         


}, function() {


       if(reserve.ERROR){ alert(reserve.ERROR); } else {   



                            document.cookie = "reservationID=" + reserve.ReservationID; 


                            document.cookie = "token=" + reserve.Token; 



                            document.cookie = "distance=" + reserve.Distance; 



                            window.location = "http://www.sinopiainn.com/make-a-reservation.html" ;


        }
  


  });
*/




}






$scope.$watch('filteredBusinesses', function() {



return $scope.filteredBusinesses;


})



});


angular.module('typeofbusinessfilter', []).filter('businesstypefilter', function() {

return function(input) {

var tob = [];


angular.forEach(input, function(value, key) {


                                            for (i = 0; i < value.activity.length; i++)

                                                              {



                                                      if ( tob.indexOf(value.activity[i]["typeofbusiness"]) === -1)  

                                                         { this.push(value.activity[i]["typeofbusiness"]); }

                                              

                                                              }


                                            }, tob);

return tob;



}



});




angular.module('typeofservicefilter', []).filter('servicetypefilter', function() {

return function(input,para) {

var tosduplicates = [];

var tos = [];



angular.forEach(input, function(value, key) {


                                            for (i = 0; i < value.activity.length; i++)

                                                              {

                                                      //alert(value.activity[i]["typeofservice"]+'-'+ para.indexOf(value.activity[i]["typeofbusiness"]));

                                                      if ( para.indexOf(value.activity[i]["typeofbusiness"]) !== -1)  

                                                         { this.push(value.activity[i]["typeofservice"]); }

                                              

                                                              }


                                            }, tosduplicates);


                                           for (i = 0; i < tosduplicates.length; i++)

                                                              {


                                                      if ( tos.indexOf(tosduplicates[i]) === -1)  

                                                         { tos.push(tosduplicates[i]); }

                                              

                                                              }


                                          




return tos;



}



});


angular.module('businessnamefilter', []).filter('filterbusinessnames', function() {

return function(input,para) {



var businessnames = [];



angular.forEach(input, function(value, key) {


                                            for (i = 0; i < value.activity.length; i++)

                                                              {

                                                      if ( para.indexOf(value.activity[i]["typeofservice"]) !== -1)  

                                                         { this.push(value); }

                                              

                                                              }


                                            }, businessnames);




return businessnames;



}



});


angular.module('itineraryFilter', []).filter('itineraryFilterMain', function() {

return function(input,para) {




var businessnames = [];



angular.forEach(input, function(value, key) {

 

                                            for (i = 0; i < para.length; i++)

                                                              {


                                                 if ( value.businessname === para[i].businessname )  { this.push(value); }



                                                              }



                                                     

                                             }, businessnames);




return businessnames;



}



});

