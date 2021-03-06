function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}


$(document).ready(function(){



if( getCookie("privacy").length == 0 ){


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


$("input[name='optradio']").change(function(){

var modal = document.getElementById('myModal');

if($(this).val() == 'yes' ){

document.cookie = "privacy=yes";

 modal.style.display = "none";

 }else{

document.cookie = "privacy=";

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


$( "#subscribe_button" ).click(function() {



   window.location = "connect.html" ;

   document.cookie = "subscribers_email=" + document.getElementById("#subscribers_email").value;



});


  $(".itinerary-main-section").css("height",window.innerHeight);
  $(".itinerary-main-section-left").css("height",window.innerHeight);
  $(".Itinerary-right-side").css("height",window.innerHeight);


});


var app = angular.module('travellight', ['ngResource']);




app.filter('itineraryFilter', function() {

return function(input,para) {
      
var businessnames = [];

angular.forEach(input, function(value, key) {

for (i = 0; i < para.length; i++) {

if ( value._id === para[i] )  { 


this.push(value); 




 }



 }

                                             }, businessnames);





  return businessnames;


    };



});


app.controller('travelplanner', function($scope,$http,$resource,$compile) {


$scope.itinerary_array = [];


$scope.filteredbusinesses = [];


$scope.businesses = [];

$scope.distanceurl;

$scope.miles = 0 ;

$scope.hours = 0;



var init = function () {




$scope.itinerary_array = JSON.parse(getCookie('itinerary'));

$http.get("http://www.sinopiainn.com/api/businesses").then(function(response) {




$scope.businesses = response.data;

$scope.subTotal();



$scope.distanceurl = $scope.filterBylocation($scope.businesses,$scope.itinerary_array);
                                                                          
                                                                          });


$http.get("http://www.sinopiainn.com/api/hotels").then(function(response) {



$scope.accomodations = response.data;



   });




};

init();

$scope.totalmeters = 0 ;

$scope.totalseconds = 0 ;

$scope.$watch('distanceurl', function() {



if($scope.distanceurl != undefined ){

var  res = '{"destination_addresses": ["Waterloo Rd, Kingston, Jamaica"],"origin_addresses": ["Dragon Bay Road, Fairy Hill, Jamaica"],"rows": [{"elements": [{"distance": {"text": "61.6 mi","value": 99160},"duration": {"text": "2 hours 21 mins","value": 8474},"status": "OK"}]}],"status": "OK"}';


$http.get($scope.distanceurl).then(function(response) {


var json = JSON.parse(response.data;);


for (i = 0; i < json.rows.length; i++) {

$scope.totalmeters = $scope.totalmeters + Number(json.rows[i].elements[0].distance.value);

$scope.totalseconds = $scope.totalseconds + Number(json.rows[i].elements[0].duration.value);

 }


$scope.miles = Number($scope.totalmeters) / 1609.344 ;

$scope.minutes =  Number($scope.totalseconds) / 60 ;



   });






}


});




$scope.filterBylocation = function( para , para1 ) {



var url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=18.166635,-76.381238&key=AIzaSyCKkEyLmhQV-BJObSMv6u3jx3sWQiTHjec&destinations=";


angular.forEach(para, function(value, key) {

for (i = 0; i < para.length; i++) {

if ( value._id === para1[i] )  { 

url = url+value.coordinates['Latitude']+"%2C"+value.coordinates['Longitude'];


 }


 }

});

 
   return url;
  
};

$scope.calculatebasefare = function(){

$scope.baseFare = 3.50 ;


return $scope.tocurrency($scope.baseFare);
}

$scope.calculatemilefare = function(){

$scope.mileFare = 0 ;



$scope.mileFare = $scope.miles * Number(2.10);

return $scope.tocurrency($scope.mileFare);

}


$scope.calculateminutefare = function(){



$scope.minuteFare = 0 ;

var hrs = Number($scope.miles)  / 45 ; 

var mins = hrs * 30 ; 

$scope.minuteFare = Number($scope.minutes) * Number(0.15);

return $scope.tocurrency($scope.minuteFare);

  
}

$scope.setHotelid = function(para){



$scope.hotelID = $scope.accomodations[para]._id;

document.cookie = "hotelID=" + $scope.accomodations[para]._id;

}
$scope.bookTrip = function(){






var resource = $resource('http://www.sinopiainn.com/api/booktrip/',{

          id:"@id",
          name:"@name",
          email:"@email",
          phone:"@phone",
          numoftravellers:"@numoftravellers",
          numofadults:"@numofadults",
          numofchildren:"@numofchildren",
          numofinfants:"@numofinfants",
          subtotaladmission:"@subtotaladmission",
          subtotalavergae:"@subtotalavergae",
          milesFare:"@scope.mileFare",
          minuteFare:"@scope.minuteFare",
          carhire:"@carhire",
          dist:"@dist",
          tax:"@tax",
          token:"@token",
          total:"@total",
          "places[]":"@places",
        

},{ 'update': { method:'PUT' } } );


var reserve = resource.save(

{
          id:$scope.reservationID,
          name:$scope.name,
          email:$scope.email,
          phone:$scope.phone,
          numoftravellers:$scope.numoftravellers,
          numofadults:$scope.numadults,
          numofchildren:$scope.numchildren,
          numofinfants:$scope.numinfants,
          subtotaladmission:$scope.subtotal,
          subtotalavergae:$scope.subavgtotal,
          milesFare:$scope.mileFare,
          minuteFare:$scope.minuteFare,
          carhire:$scope.carhire,
          dist:$scope.miles,
          tax:$scope.tax,
          token:$scope.token,
          total:$scope.itinerarytotal,
          "places[]":$scope.filteredbusinesses,
         
         


}, function() {


if(reserve.ERROR){ alert(reserve.ERROR); } else {   



                            document.cookie = "tripID=" + reserve.tripID; 

                            //document.cookie = "hotelID=" + $scope.hotelID; 

                            window.location = "reservation.html" ;


}
  


  });



}
$scope.numadults = 1; 
$scope.numchildren = 0;
$scope.numinfants = 0;

$scope.tax = 20;
$scope.calcarhirecost = 60;
$scope.calbushirecost = 100;


$scope.calcarhire = function(){


$scope.carhire = 0; 

$scope.numoftravellers = Number($scope.numadults) + Number($scope.numchildren) + Number($scope.numinfants);

$scope.numofcars = Math.floor($scope.numoftravellers / 5 ) + 1 ;

if($scope.numofcars > 1 ){


$scope.carhire = Number($scope.calbushirecost);


}else {


$scope.carhire = Number($scope.numofcars) * Number($scope.calcarhirecost);

}


//return $scope.numoftravellers ;


}

$scope.itineraryTotal = function(){


$scope.calcarhire();
$scope.calculatebasefare();
$scope.calculatemilefare();
$scope.calculateminutefare();

$scope.itinerarytotal = $scope.subtotal + $scope.subavgtotal + $scope.tax + $scope.carhire + $scope.baseFare + $scope.mileFare + $scope.minuteFare;

return $scope.tocurrency($scope.itinerarytotal);

}


$scope.calplacesubtotal = function(){



$scope.averageprice = 1 ;


 for (i = 0; i < $scope.filteredbusinesses; i++) {


$scope.subtotal += ( Number($scope.numadults) * $scope.averageprice  ) + (Number($scope.numchildren) * $scope.averageprice ) + (Number($scope.numinfants) * $scope.averageprice );



 }

return $scope.tocurrency($scope.subtotal);



}



$scope.calplacsubeavg = function(){



$scope.averageprice = 1 ;



 for (i = 0; i < $scope.filteredbusinesses; i++) {


$scope.subavgtotal += ( Number($scope.numadults) * $scope.averageprice  ) + (Number($scope.numchildren) * $scope.averageprice ) + (Number($scope.numinfants) * $scope.averageprice );



 }



return $scope.tocurrency($scope.subavgtotal);



}





$scope.calplaceavg = function(para,para1,para2,para3){


var avgcost;

$scope.averageprice = 1 ;

avgcost = ( Number(para1) * $scope.averageprice  ) + (Number(para2) * $scope.averageprice ) + (Number(para3) * $scope.averageprice );

return $scope.tocurrency(avgcost);



}


$scope.calplacetotal = function(para,para1,para2,para3){


var avgcost;

$scope.averageprice = 1 ;

avgcost = ( Number(para1) * $scope.averageprice  ) + (Number(para2) * $scope.averageprice ) + (Number(para3) * $scope.averageprice );

return $scope.tocurrency(avgcost);



}







$scope.subTotal = function () {


$scope.subtotal = 0 ;

$scope.subavgtotal = 0 ;

$scope.averageprice = 1;

for (i = 0; i < $scope.filteredbusinesses.length; i++)

                                                              {


$scope.subtotal += ( Number($scope.numadults) * $scope.averageprice  ) + (Number($scope.numchildren) * $scope.averageprice ) + (Number($scope.numinfants) * $scope.averageprice );

$scope.subavgtotal += ( Number($scope.numadults) * $scope.averageprice  ) + (Number($scope.numchildren) * $scope.averageprice ) + (Number($scope.numinfants) * $scope.averageprice );




                                                              }



$scope.itineraryTotal();

}


$scope.$watch('filteredbusinesses', function() {





$scope.subTotal();



return $scope.filteredbusinesses;

});




$scope.$watch('numadults', function() {

$scope.subTotal();

return $scope.numadults;


});


$scope.$watch('numchildren', function() {

$scope.subTotal();
return $scope.numadults;


});

$scope.$watch('numinfants', function() {

$scope.subTotal();
return $scope.numadults;


});


$scope.tocurrency = function (para) {


var number = para.toString();

var dollars = number.split('.')[0];

var  cents = (number.split('.')[1] || '') +'00';

var dollars = dollars.split('').reverse().join('').replace(/(\d{3}(?!$))/g, '$1,').split('').reverse().join('');

var cent = cents.slice(0, 2);

var decimal = ".";

var cent2 = decimal.concat(cent);

var dollars = dollars.concat(cent2);

return dollars;




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





});
