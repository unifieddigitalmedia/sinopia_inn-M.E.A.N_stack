
var app = angular.module('sinopia', ['ngResource']);

app.controller('reservationsystem', function($scope,$http,$resource,$compile) {

var init = function () {

var d = new Date();

document.getElementById("date").innerHTML = d.toDateString();

$http.get("http://www.sinopiainn.com/api/reservation-details/?reservationID="+getCookie('reservationID')).then(function(response) {

                                    $scope.fullname = response.data.fname+' '+response.data.lname;

$scope.fullname = $scope.fullname.toUpperCase();

                                    $scope.bookingID = response.data._id;
 
                                    $scope.roomlist = response.data.rooms;

                                    $scope.numofdays = response.data.numofdays;

                                    $scope.amenitylist = response.data.amenities;

                                    $scope.offerlist = response.data.offers;

                                    $scope.total = response.data.total;

                                    $scope.fname = response.data.fname;
                                    
                                    $scope.lname = response.data.lname ;
                                    
                                    $scope.phone = response.data.phone;
                                    
                                    $scope.email = response.data.email;

                                    $scope.numofadults = response.data.numofadults;
  
                                    $scope.numofchildren = response.data.numofchildren; 
  
                                    $scope.numofinfants = response.data.numofinfants;

                                    $scope.numofdays = response.data.numofdays;

                                    $scope.subtotal = response.data.subtotal;

                                     $scope.discount = response.data.discount;

                                     $scope.fromdate = response.data.fromdate;

                                     $scope.todate = response.data.todate;

                                     $scope.amenityTotal = response.data.amenityTotal;


 var balance = Number(response.data.total) - Number(response.data.deposit);

 $scope.deposit = response.data.deposit;

 $scope.balance = balance;
                                


$http.get("http://www.sinopiainn.com/api/booking-confirmation/?reservationID="+getCookie('reservationID')).then(function(response) {

alert('s');

    if(location.pathname === '/booking-confirmation.html') {   document.cookie = "reservationID=";  }


  });



                                  });


};

init();


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

$scope.calculateoffertotal = function (para) {

$scope.total = $scope.calculatetotals();


                        for(var x = 0 ; x <= para ; x++)


                        {

                            $scope.discountedtotal =  Number($scope.total) - (Number($scope.offerlist[x].amount) * Number($scope.total));

                            $scope.discountedamount = (Number($scope.offerlist[x].amount) * Number($scope.total));
 
                            $scope.total = $scope.tocurrency($scope.discountedtotal);

                          
                        
                        }
                                      


return $scope.discountedamount;


}

$scope.calculatetotals = function () {

$scope.total = 0 ; 

$scope.roomlist = jQuery.grep($scope.roomlist, function( a,i ) { 

                                      $scope.total += parseInt(a.price) * parseInt($scope.numofdays) ;

                                
                                                                        return a; 

                                                                    
                                                                    });


$scope.amenitylist = jQuery.grep($scope.amenitylist, function( a,i ) { 

                                      if(a.checked === true)

                                      {

                                                if(a.frequency === 'person') 

                                                {


                                                     $scope.total += parseInt(a.price) * $scope.numofadults ;


                                                }
                                                else if(a.frequency === 'room') 

                                                {

                                                      $scope.total += parseInt(a.price) * parseInt($scope.roomlist.length) ;

                                                }

                                                else if (a.frequency === 'night')

                                                {


                                                      $scope.total += parseInt(a.price) * parseInt($scope.numofdays) ;


                                                }



                                      }

                                
                                                                        return a; 

                                                                    
                                                                    });
  

  if($scope.tripID){




$scope.total = Number($scope.total) + Number($scope.tripTotal);


  }

  return $scope.total;

}

$scope.caldeposit = function(para) {

$scope.total = (para * 50)/100;

return $scope.total;

}


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



});

