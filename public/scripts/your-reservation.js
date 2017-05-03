
var app = angular.module('travellight', ['ngResource']);

app.controller('travelplanner', function($scope,$http,$resource,$compile) {




   $("#from_travel").hide();
   
   $(".checking").hide();

   $("#availablecol").hide();

   $("#offerscol").hide();

   $("#bookingcol").hide();

   $("#ratescol").hide();

   $("#detailscol").hide();

$scope.Javascript_is_disable_Enable_Javascript_for_an_enhanced_experience = 'Checking availability';


$scope.reservationinit = function () {



if(getCookie("tripID"))


{


$scope.tripID = getCookie("tripID"); 

$http.get("https://www.sinopiainn.com/api/trip/?tripID="+getCookie("tripID")).then(function(response) {

$scope.tripTotal = response.data[0].total ; 

     $("#from_travel").show();

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


$scope.checkavailability = function(){



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
                      


//alert("https://www.sinopiainn.com/api/checkhotelavailability/?fromdate="+returnDate($("#fromdate").val())+"&todate="+returnDate($("#todate").val())+"&promo="+getCookie('promo')+"&nights="+$scope.numofNights(returnDate($("#fromdate").val()),returnDate($("#todate").val())));


$http.get("https://www.sinopiainn.com/api/checkhotelavailability/?fromdate="+returnDate($("#fromdate").val())+"&todate="+returnDate($("#todate").val())+"&promo="+getCookie('promo')+"&nights="+$scope.numofNights(returnDate($("#fromdate").val()),returnDate($("#todate").val()))).then(function(response) {





                                                            $scope.reservationID = getCookie("reservationID");


                                                            $scope.token = getCookie("token");


                                                            $scope.distance = getCookie("distance");


                                                          $scope.roomlist = response.data[0];

                                                      


                                                          $scope.offerlist = response.data[1];


                                                          $scope.amenityArray = response.data[2];

                                                          
if(getCookie("reservationID"))


{


$scope.reservationID = getCookie("reservationID");


$scope.token = getCookie("token");


$scope.distance = getCookie("distance");

$scope.trip = {       


        "name":"to book Planned Trip - token : "+ $scope.token, 
        "description":"",
        "price":$scope.distance ,
        "frequency":"distance",
       
      
    };

 $scope.amenityArray.push($scope.trip);

 
}




                                                          $scope.numofdays = $scope.lengthofstay(getCookie('fromdate'),getCookie('todate'));


  
                              $("#availablecol").slideToggle("slow");

                              $("#offerscol").slideToggle("slow");

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


                        $scope.Javascript_is_disable_Enable_Javascript_for_an_enhanced_experience = $scope.validateDates($("#fromdate").val(),$("#todate").val());


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



$scope.validateDates = function(from,to) {



if(!from || !to )

{


return 'Please check your reservation dates.';

}

else

{


$scope.today = new Date();

$scope.fromarray = returnDate(from).split("-");

$scope.toarray = returnDate(to).split("-");

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


function returnDate(d) {

var d = new Date(d);

var month = d.getMonth()  + 1;

return d.getDate() + "-" +month+ "-" + d.getFullYear();

}

$scope.numofNights = function(para,para1) {



$scope.fromarray = para.split("-");

$scope.toarray =   para1.split("-");


$scope.startDate = new Date($scope.fromarray[2],Number($scope.fromarray[1])-1,$scope.fromarray[0]); 

$scope.endDate = new Date($scope.toarray[2],Number($scope.toarray[1])-1,$scope.toarray[0]);

$scope.numofdays = Math.round(($scope.endDate - $scope.startDate)/(1000*60*60*24));


return $scope.numofdays;


}

$scope.lengthofstay = function(para,para1) {



$scope.fromarray = returnDate(para).split("-");

$scope.toarray =   returnDate(para1).split("-");


$scope.startDate = new Date($scope.fromarray[2],Number($scope.fromarray[1])-1,$scope.fromarray[0]); 

$scope.endDate = new Date($scope.toarray[2],Number($scope.toarray[1])-1,$scope.toarray[0]);

$scope.numofdays = Math.round(($scope.endDate - $scope.startDate)/(1000*60*60*24));


return $scope.numofdays;


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

$scope.adult = false;

$scope.roomsArray = jQuery.grep($scope.roomsArray, function( a,i ) { 


if(adltIn[i].value != 0){

$scope.adult = true;

}else{

$scope.adult = false;


}

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


if(!$scope.adult){


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



var amt = (parseInt($scope.roomsArray[para].price) * parseInt($scope.numofdays))  ;


return amt; 


/** parseInt($scope.roomsArray[para].numofguest)*/


}


$scope.calculatetotals = function () {

$scope.total = 0 ; 


/* a.adults = adltIn[i].value;

                                      a.children = cldIn[i].value;

                                      a.infants = iftIn[i].value;*/


$scope.roomsArray = jQuery.grep($scope.roomsArray, function( a,i ) { 


//parseInt(a.adults) *  parseInt(a.children)

//*  parseInt(a.numofguest) 

                                      $scope.total += (parseInt(a.price) * parseInt($scope.numofdays) )  ;

                                
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


$('#checkout-form').submit(function(ev) {

  ev.preventDefault(); 
  
  angular.element(document.getElementById('span')).scope().reserve($scope.paymentnonce);
  

});



                     

$scope.bookingdetailsandconfirm = function() {




$http.get("https://www.sinopiainn.com/api/checkout/").then(function(response) {


braintree.setup(response.data, "dropin", {

  container: "dropin-container",
   form: 'checkout-form',
  paypal: {
    button: {
      type: 'checkout'
    }
  },

  onPaymentMethodReceived: function (obj) {



$scope.paymentnonce = obj.nonce;

   
    
  
    }
  
});


});


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



var resource = $resource('https://www.sinopiainn.com/api/personaldetails/',{

        
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


//+"&nights="+$scope.numofNights(returnDate($("#fromdate").val()),returnDate($("#todate").val()))
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
          fromdate:returnDate($("#fromdate").val()),
          todate:returnDate($("#todate").val()),
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



$(document).ready(function(){


  $( function() {
    var dateFormat = "dd-mm-yy",
      from = $( "#fromdate" )
        .datepicker({
          defaultDate: "+1w",
          changeMonth: true,
          numberOfMonths: 3,
          dateFormat: 'D, d M, yy'
        })
        .on( "change", function() {
          to.datepicker( "option", "minDate", getDate( this ) );
        }),
      to = $( "#todate" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 3,
        dateFormat: 'D, d M, yy'
      })
      .on( "change", function() {
        from.datepicker( "option", "maxDate", getDate( this ) );
      });
 
    function getDate( element ) {
      var date;
      try {
        date = $.datepicker.parseDate( dateFormat, element.value );
      } catch( error ) {
        date = null;
      }
 
      return date;
    }
  
  } );



});
