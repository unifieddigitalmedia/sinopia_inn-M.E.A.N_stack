
$('#mc-embedded-subscribe-form').submit(function(ev) {
   

 document.cookie = "subscribers_email=" + document.getElementById("#subscribers_email").value;


});

function showResponsivemenu() {
    document.getElementsByClassName("topnav")[0].classList.toggle("responsive");
}


function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}


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


$( "#subscribe_button" ).click(function() {



   window.location = "connect.html" ;

   document.cookie = "subscribers_email=" + document.getElementById("#subscribers_email").value;



});

  $(".itinerary-main-section").css("height","auto");
  $(".itinerary-main-section-left").css("height",window.innerHeight);
  $(".Itinerary-right-side").css("height",window.innerHeight);



  jQuery(document).on("click",".destination-room",function(event){



var pos = this.value;


document.cookie = "hotelID=" + this.value; 

window.location = "reservation.html" ;


});

jQuery(function() {

                jQuery('#fromdate').datepicker({
                   
      defaultDate: "+1w",
      dateFormat: 'dd-mm-yy',
      changeMonth: true,
      numberOfMonths: 3,
      onClose: function( selectedDate ) {

        $( "#todate" ).datepicker( "option", "minDate", selectedDate );

      }


                });

            jQuery('#todate').datepicker({
                   
      defaultDate: "+1w",
      dateFormat: 'dd-mm-yy',
      changeMonth: true,
      numberOfMonths: 3,
      onClose: function( selectedDate ) {

        $( "#fromdate" ).datepicker( "option", "maxDate", selectedDate );

      }


                });

            });


   $(".checking").hide();

   $("#availablecol").hide();

   $("#offerscol").hide();

   $("#bookingcol").hide();

   $("#ratescol").hide();

   $("#detailscol").hide();

});








var app = angular.module('travellight', ['ngResource']);

app.filter('itineraryFilter', function() {

  return function(input,para) {
      



var businessnames = [];

angular.forEach(input, function(value, key) {

 

 for (i = 0; i < para.length; i++) {



 if ( value._id === para[i] )  { this.push(value); }



 }
                         

                                                     

                                             }, businessnames);



  return businessnames;


    };


});


app.controller('travelplanner', function($scope,$http,$resource,$compile) {



$scope.bookingdetailsandconfirm = function() {




$http.get("http://www.sinopiainn.com/api/checkout/").then(function(response) {


braintree.setup(response.data, "dropin", {

  container: "dropin-container",
   form: 'checkout-form',
  paypal: {
    button: {
      type: 'checkout'
    }
  },

  onPaymentMethodReceived: function (obj) {


    $scope.reserve(obj.nonce);
    
  
    }
  
});


});
        



                            }

$scope.sendpaymentmethodnonce = function(para,para1) {

var resource = $resource('http://www.sinopiainn.com/checkout/',{

          payment_method_nonce:"@payment_method_nonce",
          fname:"@fname",
          lname:"@lname",
          phone:"@phone",
          email:"@email",
          numofdays:"@numofdays",
          numofadults:"@numofadults",
          numofchildren:"@numofchildren",
          numofinfants:"@numofinfants",
          fromdate:"@fromdate",
          todate:"@todate",
          subtotal:"@subtotal",
          discount:"@discount",
          amenityTotal:"@amenityTotal",
          total:"@total",
          "roomarray[]":"@rooms",
          "offerarray[]":"@offers",
          "amenityarray[]":"@amenities"
       


});


var reserve = resource.save(

{

          payment_method_nonce:para,
          total:para1,
          id:$scope.reservationID,
          fname:$scope.fname,
          lname:$scope.lname,
          phone:$scope.phone,
          email:$scope.email,
          numofdays:$scope.numofdays,
          numofadults:$scope.numofadults,
          numofchildren:$scope.numofchildren,
          numofinfants:$scope.numofinfants,
          fromdate:getCookie('fromdate'),
          todate:getCookie('todate'),
          subtotal:$scope.tocurrency($scope.calculatetotals()), 
          discount:$scope.tocurrency($scope.calculatediscounttotal()),
          amenityTotal : $scope.tocurrency($scope.calTotalAmentities()),
          total:$scope.tocurrency($scope.total),
          "roomarray[]":$scope.roomsArray,
          "offerarray[]":$scope.offersArray,
          "amenityarray[]":$scope.amenityArray,
        
         


}, function() {


if(reserve.ERROR){ alert(reserve.ERROR); } else {   



                            window.location = "http://www.sinopiainn.com/booking-confirmation.html" ;


}
  


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


$scope.from_travel = "false";


$scope.reservationinit = function () {


if(getCookie("tripID"))


{


$scope.tripID = getCookie("tripID"); 

$http.get("http://www.sinopiainn.com/api/trip/?tripID="+getCookie("tripID")).then(function(response) {

$scope.tripTotal = response.data[0].total ; 

$scope.from_travel = "false";

});



}


                              if(getCookie('fromdate') && getCookie('todate'))



                    {



                                                                $scope.fromdate = getCookie('fromdate'); 
                                                                $scope.todate = getCookie('todate'); 
                                                                $scope.promo = getCookie('promo'); 
                                                                $scope.checkavailability();



                    }




}


$scope.numofadults;

$scope.numofchildren;

$scope.numofinfants;


$scope.lengthofstay = function(para,para1) {



$scope.fromarray = para.split("-");

$scope.toarray =   para1.split("-");


$scope.startDate = new Date($scope.fromarray[2],Number($scope.fromarray[1])-1,$scope.fromarray[0]); 

$scope.endDate = new Date($scope.toarray[2],Number($scope.toarray[1])-1,$scope.toarray[0]);

$scope.numofdays = Math.round(($scope.endDate - $scope.startDate)/(1000*60*60*24));


return $scope.numofdays;


}

$scope.error = 'Checking availability';



$scope.checkavailability = function() {


if( getCookie("privacy") == 'no' ){


var modal = document.getElementById('myModal');


modal.style.display = "block";


var span = document.getElementsByClassName("close")[0];


span.onclick = function() {
    modal.style.display = "none";
}


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

}
else{


$scope.error = 'Checking availability';


                     $("html,body").animate({scrollTop:$(".checking").offset().top }, "slow");
                     
                     $(".checking").slideDown("slow" , function() {

                


            setTimeout(function(){     


                  $(".checking").slideUp("slow", function() {

          if(!$scope.validateDates($("#fromdate").val(),$("#todate").val()))


                    {


                            document.cookie = "fromdate=" + $("#fromdate").val();

  
                            document.cookie = "todate=" + $("#todate").val();


                            document.cookie = "promo=" + $("#promo").val();

                           

                                  if (document.getElementById("shortcodeform")) 

                                
                                {
                 
                    $http.get("http://www.sinopiainn.com/api/checkhotelavailability/?nights="+$scope.lengthofstay(getCookie('fromdate'),getCookie('todate'))+"&hotelID="+getCookie('hotelID')+"&fromdate="+getCookie('fromdate')+"&todate="+getCookie('todate')+"&promo="+getCookie('promo')).then(function(response) {



if(response.data.length > 2 ){

  $scope.roomlist = response.data[0];
                                                      
  $scope.offerlist = response.data[1];

  $scope.amenityArray = response.data[2];

} else if(response.data.length == 2) {

  $scope.roomlist = response.data[0];

  $scope.amenityArray = response.data[1];


}
          else{


            $scope.availabilityerrorreturn = 'No rooms are available';
          

          }                                              
                           


                              $scope.numofdays = $scope.lengthofstay(getCookie('fromdate'),getCookie('todate'));




  if($("#availablecol").is(":hidden"))
{
   

  $("#availablecol").slideToggle("slow");

                              $("#offerscol").slideToggle("slow");

                            


}


                              $("html,body").animate({scrollTop:$("#availablecol").offset().top }, "slow");



                                  });



                                }
                                else

                                {




                    

                                          setTimeout(function(){ 

                                          location.assign("reservation.html");
                                      

                                          
                                          }, 2000);



                                }

                            
                            



                    }
                      
                        else

                    {


                        $scope.error = $scope.validateDates($("#fromdate").val(),$("#todate").val());

$scope.$apply();


                                               $(".checking").slideDown("slow" , function() {

                

                                      setTimeout(function(){     


                                                          

                          $(".checking").slideUp("slow");



                                                 }, 3000);



                                    });




                            



                   }







                            });





                  }, 3000);





                    



                     });
              


         
}
           

    }



$scope.validateDates = function(from,to) {



if(!from || !to )

{


return 'Please check your reservation dates.';

}
else
{


$scope.today = new Date();

$scope.fromarray = from.split("-");

$scope.toarray = to.split("-");

$scope.startDate = new Date($scope.fromarray[2],Number($scope.fromarray[1])-1,$scope.fromarray[0]); 

$scope.endDate = new Date($scope.toarray[2],Number($scope.toarray[1])-1,$scope.toarray[0]);

if( $scope.startDate > $scope.endDate )

{


return 'Please check you check out date.';


} 

else if($scope.today > $scope.startDate || $scope.today > $scope.endDate)

{


return 'Dates cannot be in the past.';


}
else if( $scope.endDate ==  'Invalid Date' || $scope.startDate == 'Invalid Date')
{

return 'Please check your reservation dates.';


}

else
{

return '';


}



}



 

}


$scope.roomsArray = [];


$scope.offersArray = [];

$scope.addroom = function(para) {




                              
                                    if(!$scope.rmad($scope.roomlist[para]._id,$scope.roomsArray))

                                  {


                                          

                                        $scope.roomsArray.push($scope.roomlist[para]);

 $scope.roomsArray[$scope.roomsArray.length - 1 ].numofguest = 0;

                                        $("#bookingcol").slideDown("slow");

                                    
                                  }



                                  }


$scope.addoffer = function(para) {

                                    if(!$scope.rmad($scope.offerlist[para]._id,$scope.offersArray))

                                  {


                                         $scope.offersArray.push($scope.offerlist[para]);

                                         $("#bookingcol").slideDown("slow");


                                    
                                  }


                                  }






$scope.removerm = function (para) {




                                      


                                      $scope.roomsArray = jQuery.grep($scope.roomsArray, function( a,i ) { 



                                                          return ( a._id !== $scope.roomsArray[para]._id ); 


                                                                                                          });



                                  };


$scope.removeoffer = function (para) {




                                  


                                      $scope.offersArray = jQuery.grep($scope.offersArray, function( a,i ) { 



                                                          return ( a._id !== $scope.offersArray[para]._id ); 


                                                                                                          });



                                  };

$scope.rmad = function(para,para1) {




                                    for (i = 0; i < para1.length; i++  )


                                    {

                                              if( para1[i]._id === para )

                                    {


                                                return true;


                                    }



                                    }


                                                return false;

                                    }


 var adltIn = document.getElementsByName("adults");


                                      var cldIn  = document.getElementsByName("children");


                                      var iftIn  = document.getElementsByName("infants");

$scope.bookingtotal = function() {


                              

                                $scope.addonsArray = [];

                                
                                var f = $('input[type=radio]:checked');


                                for (var i = 0, length = f.length; i < length; i++) {

 
                                          if(f[i].value === 'Yes')
                                      
                                      {


                                              $scope.addonsArray.push(f[i].name);


                                      }


       

                                                                                    }

                                                                                     

$scope.amenityArray = jQuery.grep($scope.amenityArray, function( a,i ) { 




if($scope.addonsArray.indexOf(a.name) != -1 )

{



 a.checked = true;


}
else
{


 a.checked = false;

}


return a;


});

                                      

                                     


$scope.numofadults = 0;

$scope.numofchildren = 0;

$scope.numofinfants = 0;



$scope.roomsArray = jQuery.grep($scope.roomsArray, function( a,i ) { 


                                      $scope.numofadults += Number(adltIn[i].value);

                                      $scope.numofchildren += Number(cldIn[i].value);

                                      $scope.numofinfants += Number(iftIn[i].value);

                                      a.adults = adltIn[i].value;

                                      a.children = cldIn[i].value;

                                      a.infants = iftIn[i].value;

                                      a.numofguest = parseInt(adltIn[i].value) + parseInt(cldIn[i].value);


                                                                        return a; 

                                                                    
                                                                    });



                                        //$scope.calculatetotals (para,para1,para2);


if($scope.numofadults == 0 ){


$scope.bookingerror = "An adult is need to stay here to continue a booking.";

}else{

  $("#ratescol").slideDown("slow");

  $("html,body").animate({scrollTop:$("#ratescol").offset().top }, "slow");

}


                              }




$scope.discountedtotal = 0;
$scope.total = 0;


$scope.calculatediscounttotal = function () {

$scope.discountedamounttotal = 0; 

$scope.total = $scope.calculatetotals();


                          for(var x = 0 ; x <= $scope.offersArray.length ; x++)


                        {
           
if(typeof $scope.offersArray[x] != 'undefined') {  

$scope.discountedamounttotal  += $scope.calculateoffertotal(x);

}
           

                          
                        
                        }


return $scope.discountedamounttotal;

}


$scope.calculateoffertotal = function (para) {

$scope.total = $scope.calculatetotals();


                        for(var x = 0 ; x <= para ; x++)


                        {

                            $scope.discountedtotal =  Number($scope.total) - (Number($scope.offersArray[x].amount) * Number($scope.total));

                            $scope.discountedamount = (Number($scope.offersArray[x].amount) * Number($scope.total));

                            $scope.offersArray[x].discount = $scope.discountedamount;
                            
                            $scope.total = $scope.tocurrency($scope.discountedtotal);

                          
                        
                        }
                                      


return $scope.discountedamount;


}


var childrenOptions = {};

childrenOptions2= ['0', '1', '2'];

childrenOptions1 = ['0', '1'];

childrenOptions0 = ['0'];


$scope.populateOption =function(para,para1,para2){


for (i = 0; i < para.length; i++) {

     
     var childOption = new Option(para[i], i);

     para1.options.add(childOption);


 }

 para1.options[para2].selected = true ;


}

$scope.addAdult = function (para) {

$scope.roomsArray[para].adults = adltIn[para].value;

var cldOptions = cldIn[para];

cldOptions.options.length = 0;

if($scope.roomsArray[para].adults == 0) {

$scope.populateOption(childrenOptions2,cldOptions,$scope.roomsArray[para].children);

}

else if($scope.roomsArray[para].adults == 1) {

 $scope.populateOption(childrenOptions1,cldOptions,$scope.roomsArray[para].children);


} else if($scope.roomsArray[para].adults == 2){

$scope.populateOption(childrenOptions0,cldOptions,$scope.roomsArray[para].children);


}


$scope.roomsArray[para].numofguest = parseInt($scope.roomsArray[para].adults) +  parseInt($scope.roomsArray[para].children);

$scope.calculatetotals();

$scope.$apply();


}


$scope.addChildren = function (para) {


$scope.roomsArray[para].children = cldIn[para].value;

var cldOptions = adltIn[para];

cldOptions.options.length = 0;

if($scope.roomsArray[para].children == 0) {

$scope.populateOption(childrenOptions2,cldOptions,$scope.roomsArray[para].adults);

}

else if($scope.roomsArray[para].children == 1) {

 $scope.populateOption(childrenOptions1,cldOptions,$scope.roomsArray[para].adults);


} else if($scope.roomsArray[para].children == 2){

$scope.populateOption(childrenOptions0,cldOptions,$scope.roomsArray[para].adults);


}

$scope.roomsArray[para].numofguest = parseInt($scope.roomsArray[para].adults) + parseInt($scope.roomsArray[para].children);

$scope.calculatetotals();

$scope.$apply();



}


$scope.addInfant = function (para) {


$scope.roomsArray[para].infants = iftIn[para].value;

$scope.calculatetotals();

$scope.$apply();

}



$scope.calRoom = function (para) {



var amt = (parseInt($scope.roomsArray[para].price) * parseInt($scope.numofdays)) * parseInt($scope.roomsArray[para].numofguest) ;


return amt; 
}


$scope.calculatetotals = function () {

$scope.total = 0 ; 


/* a.adults = adltIn[i].value;

                                      a.children = cldIn[i].value;

                                      a.infants = iftIn[i].value;*/


$scope.roomsArray = jQuery.grep($scope.roomsArray, function( a,i ) { 


//parseInt(a.adults) *  parseInt(a.children)

                                      $scope.total += (parseInt(a.price) * parseInt($scope.numofdays) ) *  parseInt(a.numofguest)  ;

                                
                                                                        return a; 

                                                                    
                                                                    });


$scope.amenityArray = jQuery.grep($scope.amenityArray, function( a,i ) { 

                                      if(a.checked === true)

                                      {

                                                if(a.frequency === 'person') 

                                                {


                                                     $scope.total += parseInt(a.price) * $scope.numofadults ;


                                                }
                                                else if(a.frequency === 'room') 

                                                {

                                                      $scope.total += parseInt(a.price) * parseInt($scope.roomsArray.length) ;

                                                }

                                                else if (a.frequency === 'night')

                                                {


                                                      $scope.total += parseInt(a.price) * parseInt($scope.numofdays) ;


                                                }
                                                 

                                      }

                                
                                                                        return a; 
                                          
                                                                    });
  

/*if($scope.tripTotal) {

 $scope.total = parseInt($scope.tripTotal) + $scope.total;

}
*/

  return $scope.total;

}


$scope.caldeposit = function(para) {




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



$scope.personaldetails = function() {


                        $scope.bookingdetailsandconfirm();

                        $("#detailscol").slideDown("slow");

                        $("html,body").animate({scrollTop:$("#detailscol").offset().top }, "slow");




}

$scope.calTotalAmentities = function () {


var total = 0;

jQuery.grep($scope.amenityArray, function( a ) { 



  if(a.frequency  === 'person'  )
  {

    total = total + (a.price * $scope.numofadults) ; 

  }
  else if(a.frequency  === 'room' ) {


     total = total + (a.price * $scope.roomsArray.length);

  }
   else if(a.frequency  === 'night' ) {


      total = total + (a.price * $scope.numofdays);
    
  }

 else if(a.frequency  === 'distance' ) {


       total = total + (a.price * $scope.numofdays);
    
  }



return a ;

});

  


return total;

}


$scope.caldeposit = function(para) {

$scope.deposit = (para * 50) / 100;

$scope.deposit = $scope.deposit.toFixed(2);

return $scope.deposit;

}

$scope.offersArra = [];

$scope.amenityArray = [];

$scope.reserve = function(para) {

var email = document.getElementById("resemail").value;

if( ( $scope.fname.length == 0 || typeof $scope.fname === 'undefined' ) || ( $scope.lname.length == 0 || typeof $scope.lname === 'undefined' ) || ( $scope.phone.length == 0 || typeof $scope.phone === 'undefined' ) || ( $scope.email.length == 0 || typeof $scope.email === 'undefined' ) || ( $scope.email.length == 0 || typeof $scope.email === 'undefined' )  )
  
{



$scope.detailserror = "All details forms are required ";
$scope.$apply();

}
else if (/(.+)@(.+){2,}\.(.+){2,}/.test(email) != true) 
 

    {



$scope.detailserror = "Please check you email.";

$scope.$apply();

    }

else {



if( $('input[name="terms"]:checked').length > 0 ){

$scope.detailserror = "";



var resource = $resource('http://www.sinopiainn.com/api/personaldetails/',{

        
          tripID:"@tripID",
          deposit:"@deposit",
          payment_method_nonce:"@payment_method_nonce",
          fname:"@fname",
          lname:"@lname",
          phone:"@phone",
          email:"@email",
          numofdays:"@numofdays",
          numofadults:"@numofadults",
          numofchildren:"@numofchildren",
          numofinfants:"@numofinfants",
          fromdate:"@fromdate",
          todate:"@todate",
          subtotal:"@subtotal",
          discount:"@discount",
          amenityTotal:"@amenityTotal",
          total:"@total",
          "roomarray[]":"@rooms",
          "offerarray[]":"@offers",
          "amenityarray[]":"@amenities"

},{ 'update': { method:'PUT' } } );


$scope.amenityArray = jQuery.grep($scope.amenityArray, function( a,i ) {return (a.checked === true);});

alert("Please wait while we process your reservation");

var reserveBooking = resource.save(

{

          tripID:$scope.tripID,
          deposit:$scope.caldeposit($scope.tocurrency($scope.calculatetotals() - $scope.calculatediscounttotal())),
          payment_method_nonce:para,
          fname:$scope.fname,
          lname:$scope.lname,
          phone:$scope.phone,
          email:email,
          numofdays:$scope.numofdays,
          numofadults:$scope.numofadults,
          numofchildren:$scope.numofchildren,
          numofinfants:$scope.numofinfants,
          fromdate:getCookie('fromdate'),
          todate:getCookie('todate'),
          deposit:$scope.deposit,
          subtotal:$scope.tocurrency($scope.calculatetotals()), 
          discount:$scope.tocurrency($scope.discountedamounttotal),
          amenityTotal : $scope.tocurrency($scope.calTotalAmentities()),
          total:$scope.tocurrency($scope.calculatetotals() - $scope.calculatediscounttotal()),
          "roomarray[]":$scope.roomsArray,
          "offerarray[]":$scope.offersArray,
          "amenityarray[]":$scope.amenityArray,
         


}, function() {


if(reserveBooking.ERROR){ alert(reserveBooking.ERROR); } else {   




$scope.offersArray = [];

$scope.amenityArray = [];

$scope.roomsArray = [];



                            document.cookie = "reservationID=" + reserveBooking.ReservationID; 

                            document.cookie = "fromdate=" ;

                            document.cookie = "todate=" ;

                            document.cookie = "promo=" ;

                            document.cookie = "tripID=" ;

                            window.location = "booking-confirmation.html" ;

}
  


  });

}else{

$scope.detailserror = "Please agree to our terms before you continue";

}


} 






   
    }

$scope.newguestInit = function() {


document.cookie = "reservationID="; 


}

});





