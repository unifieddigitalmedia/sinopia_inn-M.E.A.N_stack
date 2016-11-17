

$(document).ready(function(){
   
 
$(".checking").hide();

$("#subscribe_button").click(function() {


   document.cookie = "subscribers_email=" + document.getElementById("subscribers_email").value;


   window.location = "connect.html" ;




});





});




var app = angular.module('sinopia', ['ngResource','typeofbusinessfilter','typeofservicefilter','businessnamefilter','itineraryFilter']);

app.controller('reservationsystem', function($scope,$http,$resource,$compile) {


$scope.numofdays = 0 ;


var init = function () {
   

var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {



    if (xhttp.readyState == 4 && xhttp.status == 200) {


        recentBlogPost(xhttp);

    }

};

xhttp.open("GET", "public/blog/Feed/index.xml", true);

xhttp.send();



};

init();

$scope.loadArticles = function() {


var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {



    if (xhttp.readyState == 4 && xhttp.status == 200) {


        BlogArticle1(xhttp);

    }

};

xhttp.open("GET", "Feed/index.xml", true);

xhttp.send();


}

function BlogArticle1(xml) {

var x, xmlDoc, artcileTitle , articleDiv,itemList,listItemLink;

xmlDoc = xml.responseXML;

x = xmlDoc.getElementsByTagName('channel');




itemList = xmlDoc.getElementsByTagName('item');

var numofRows = itemList.length / 2 ;

var counter = 0;

for (x = 0; x < numofRows ; x++) {

articleDiv = document.createElement("div");

articleDiv.className = "row";

document.getElementById("blog-section").appendChild(articleDiv);


for (y = 0; y < 2 ; y++) {


var rowColumn = document.createElement("div");

rowColumn.className = "col-sm-6";

articleDiv.appendChild(rowColumn);





var articleItem = document.createElement("div");

articleItem.setAttribute("style","width:100%;");

articleItem.className = "w3-card-6";

articleItem.appendChild(document.createElement("br"));

articleItem.appendChild(document.createElement("br"));

var articleItemTitle = document.createElement("p");

articleItemTitle.className = "side_menu_title";



articleItemTitle.appendChild(document.createTextNode(itemList[counter].childNodes[1].innerHTML));

articleItemTitle.setAttribute("style","padding:20px;");

articleItem.appendChild(articleItemTitle);


articleItem.appendChild(document.createElement("br"));

var articleImage = document.createElement("img");

articleImage.setAttribute("src","../images/beach.png");

articleImage.setAttribute("style","width:100%;height:450px;");


articleItem.appendChild(articleImage);


articleItem.appendChild(document.createElement("br"));


var articleItemContainer = document.createElement("div");

articleItemContainer.className = "w3-container";

articleItemContainer.setAttribute("style","height:0px;");


articleItemContainer.appendChild(document.createElement("br"));



var articleItemDescription = document.createElement("p");

articleItemDescription.appendChild(document.createTextNode(itemList[counter].childNodes[3].innerHTML));

articleItemContainer.appendChild(articleItemDescription);







articleItem.appendChild(articleItemContainer);

rowColumn.appendChild(articleItem);


rowColumn.appendChild(document.createElement("br"));

counter ++;

}






}





}


function recentBlogPost(xml) {

    var x, y ,  xmlDoc, count, listItem , listItemTitle,listItemDate,listItemLink;
  
    xmlDoc = xml.responseXML;
  
    x = xmlDoc.getElementsByTagName('item');

    if( x.length > 3 ) { count = 3 ; } else {  count = x.length ;} ;




    for (y = 0; y < 2 ; y++) {


        listItem =  document.createElement("li");

        listItemTitle = document.createElement("p");
        
        listItemLink = document.createElement("a");

        listItemLink.setAttribute("href", x[y].childNodes[5].innerHTML)


        listItemLink.appendChild(document.createTextNode(x[y].childNodes[1].innerHTML))
        
        listItemTitle.appendChild(listItemLink);

        listItem.appendChild(listItemTitle);

        listItemDate = document.createElement("p").appendChild( document.createTextNode(x[y].childNodes[9].innerHTML.slice(0,-15)));

        //listItemDate.setAttribute("style","font-size:25%!important;");
                                                 
        //listItemDate.className = "blog_post_date";

        listItem.appendChild(listItemDate);

        listItem.appendChild(document.createElement("br"));

        listItem.appendChild(document.createElement("br"));

        document.getElementById("recent_blog_posts").appendChild(listItem);



    }
    
    

}


$scope.reservationinit = function () {

if(getCookie("reservationID"))


{


alert("You must be staying with us to book this trip. Please specify the dates you would like to travel below.");


}



                              if(getCookie('fromdate') && getCookie('todate'))



                    {



                                                                $scope.fromdate = getCookie('fromdate'); 
                                                                $scope.todate = getCookie('todate'); 
                                                                $scope.promo = getCookie('promo'); 



$http.get("http://www.sinopiainn.com/api/checkavailability/?fromdate="+$scope.fromdate+"&todate="+$scope.todate+"&promo="+$scope.promo).then(function(response) {


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



$scope.lengthofstay($scope.fromdate,$scope.todate);


$scope.numofadults;

$scope.numofchildren;

$scope.numofinfants;

}




}

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
											



$http.get("http://www.sinopiainn.com/api/checkavailability/?fromdate="+getCookie('fromdate')+"&todate="+getCookie('todate')+"&promo="+getCookie('promo')).then(function(response) {





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

                                      

                                      var adltIn = document.getElementsByName("adults");


                                      var cldIn  = document.getElementsByName("children");


                                      var iftIn  = document.getElementsByName("infants");


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


                                                                        return a; 

                                                                    
                                                                    });



                                        //$scope.calculatetotals (para,para1,para2);


   $("#ratescol").slideDown("slow");

  $("html,body").animate({scrollTop:$("#ratescol").offset().top }, "slow");

                              }




$scope.discountedtotal = 0;



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


$scope.calculatetotals = function () {

$scope.total = 0 ; 

$scope.roomsArray = jQuery.grep($scope.roomsArray, function( a,i ) { 

                                      $scope.total += parseInt(a.price) * parseInt($scope.numofdays) ;

                                
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




												$("#detailscol").slideDown("slow");

 												//$("html,body").animate({scrollTop:$("#detailscol").offset().top }, "slow");




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



$scope.reserve = function() {

var resource = $resource('http://www.sinopiainn.com/api/personaldetails/',{

          id:"@id",
          fname:"@fname",
          lname:"@lname",
          phone:"@phone",
          email:"@email",
          expiry:"@expiry",
          idtype:"@idtype",
          idnumber:"@idnumber",
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


if($scope.reservationID){


var reserve = resource.update(

{
          id:$scope.reservationID,
          fname:$scope.fname,
          lname:$scope.lname,
          phone:$scope.phone,
          email:$scope.email,
          expiry:$scope.expiry,
          idtype:$scope.idtype,
          idnumber:$scope.idnumber,
          numofdays:$scope.numofdays,
          numofadults:$scope.numofadults,
          numofchildren:$scope.numofchildren,
          numofinfants:$scope.numofinfants,
          fromdate:getCookie('fromdate'),
          todate:getCookie('todate'),
          subtotal:$scope.tocurrency($scope.calculatetotals()), 
          discount:$scope.tocurrency($scope.calculatediscounttotal()),
          amenityTotal : $scope.tocurrency($scope.calTotalAmentities()),
          total:$scope.tocurrency($scope.calculatetotals() - $scope.calculatediscounttotal()),
          "roomarray[]":$scope.roomsArray,
          "offerarray[]":$scope.offersArray,
          "amenityarray[]":$scope.amenityArray,
         


}, function() {


if(reserve.ERROR){ alert(reserve.ERROR); } else {   



                            document.cookie = "reservationID=" + reserve.ReservationID; 

                            document.cookie = "fromdate=" ;

                            document.cookie = "todate=" ;

                            document.cookie = "promo=" ;

                            window.location = "http://www.sinopiainn.com/booking-details.html" ;

}
  


  });



}

else

{


var reserve = resource.save(

{

          fname:$scope.fname,
          lname:$scope.lname,
          phone:$scope.phone,
          email:$scope.email,
          expiry:$scope.expiry,
          idtype:$scope.idtype,
          idnumber:$scope.idnumber,
          numofdays:$scope.numofdays,
          numofadults:$scope.numofadults,
          numofchildren:$scope.numofchildren,
          numofinfants:$scope.numofinfants,
          fromdate:getCookie('fromdate'),
          todate:getCookie('todate'),
          subtotal:$scope.tocurrency($scope.calculatetotals()), 
          amenityTotal :$scope.tocurrency($scope.calTotalAmentities()),
          discount:$scope.tocurrency($scope.calculatediscounttotal()),
          total:$scope.tocurrency($scope.calculatetotals() - $scope.calculatediscounttotal()),
          "roomarray[]":$scope.roomsArray,
          "offerarray[]":$scope.offersArray,
          "amenityarray[]":$scope.amenityArray,
         


}, function() {


if(reserve.ERROR){ alert(reserve.ERROR); } else {   



                            document.cookie = "reservationID=" + reserve.ReservationID; 

                            document.cookie = "fromdate=" ;

                            document.cookie = "todate=" ;

                            document.cookie = "promo=" ;

                            window.location = "http://www.sinopiainn.com/booking-details.html" ;

}
  


  });



                                       
}
   
    }

$scope.newguestInit = function() {


document.cookie = "reservationID="; 


}

$scope.bookingdetailsandconfirm = function() {


alert(getCookie('reservationID'));


                            }


$scope.sendpaymentmethodnonce = function(para,para1) {

var resource = $resource('http://www.sinopiainn.com/checkout/',{

          payment_method_nonce:"@payment_method_nonce",
          total:"@total",
       


});


var reserve = resource.save(

{

          payment_method_nonce:para,
          total:para1,
        
         


}, function() {


if(reserve.ERROR){ alert(reserve.ERROR); } else {   



                           


                            window.location = "http://www.sinopiainn.com/booking-confirmation.html" ;

}
  


  });





}




var map = null;

$scope.filter_ini = function () {



$scope.mapmarkersArray = [];

$scope.businessmarkersArray = [];
//$scope.setupMap();

/*var x = document.getElementById("frontendmapframe");



var y = (x.contentWindow || x.contentDocument);

if (y.document)y = y.document;*/

     $scope.temppassword = "";

    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        $scope.temppassword += possible.charAt(Math.floor(Math.random() * possible.length));



$http.get("http://www.sinopiainn.com/api/businesses").then(function(response) {


$scope.businesses = response.data;


//map = new google.maps.Map(y.getElementById('map'), {

  map = new google.maps.Map(document.getElementById("map"),{
            
         center: {lat: 18.171100, lng: -76.442305},
          
          zoom: 9
  
        });


                                                                          
                                                                          });





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


       //$scope.drop(para);

                                               

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



if($scope.ItinComps.indexOf(para) === -1)

{


$scope.ItinComps.push(para);

jQuery.grep($scope.mapmarkersArray, function( a ) { 



if(a.title === para.businessname )

{


a.metadata.set = true;


}


return a; 


});


$scope.$apply(function () {



$scope.trpcfmdst = $scope.setDst($scope.calsdst($scope.mapmarkersArray));


        });




para1.innerHTML =  ($scope.checkItin(para) == -1) ? 'Add to itinerary!' : 'Delete from itinerary';

}
else
{

$scope.ItinComps = jQuery.grep($scope.ItinComps, function(a,x) { 


                                                    
return (a != para);


                                                                });





$scope.mapmarkersArray = jQuery.grep($scope.mapmarkersArray, function( a ) { 

if(a.title === para.businessname )

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



$scope.trpcfmdst = $scope.setDst($scope.calsdst($scope.mapmarkersArray));


        });

para1.innerHTML =  ($scope.checkItin(para) == -1) ? 'Add to itinerary!' : 'Delete from itinerary';


}
 


}



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

   },

    });


//$scope.mapmarkersArray.push(marker);


var content = document.createElement('div');

//content.setAttribute("class","w3-card-12");



//var content = '<div class="w3-card-4"><header class="w3-container w3-light-grey"><h3>'+para.businessname+'</h3></header><div class="w3-container"><p>'+para.businessdescription+'</p><img src="'+para.logo+'" alt="" class="w3-left w3-circle"><p></p></div><p>'+para.businessaddress+'</br>'+para.businessphone+'</br>'+para.businessemail+'</br>'+para.businesswebsite+'</p></div><button id="infowindowbutton"  class="w3-btn-block w3-dark-grey">'+$scope.checkItin(para)+'</button></div>';


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



//alert($scope.mapmarkersArray.length);





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

logo.setAttribute("style","width:25%;padding:10px;height:50%");

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



$scope.booktrip = function (para,content) 


{



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


$(function() {

    $( "#resexpiry" ).datepicker({ minDate: -0 ,dateFormat: "dd-mm-yy"});

   
  
  });


$(function() {
    $( "#fromdate" ).datepicker({

      minDate: -0 ,
      dateFormat: "dd-mm-yy",
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 3,
      onClose: function( selectedDate ) {
        $( "#todate" ).datepicker( "option", "minDate", selectedDate );
      }
    });
    $( "#todate" ).datepicker({
       minDate: -0 ,
       dateFormat: "dd-mm-yy",
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 3,
      onClose: function( selectedDate ) {
        $( "#fromdate" ).datepicker( "option", "maxDate", selectedDate );
      }
    });
  });


function displayModal(para) {

var modal = document.getElementById('myModal');

var modalImg = document.getElementById("img01");

var captionText = document.getElementById("caption");


    modal.style.display = "block";
    modalImg.src = para.src;
    modalImg.alt = para.alt;
    captionText.innerHTML = para.alt;




}


var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
var modal = document.getElementById('myModal');

    modal.style.display = "none";
}

function showResponsivemenu() {
    document.getElementsByClassName("topnav")[0].classList.toggle("responsive");
}


function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}





function showslide(slideIndex) {



currentSlide(slideIndex);

  }


function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}


function showSlides(n) {

 
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");



  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length} ;




  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }


  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

var slideIndex = null;

function showDivs(n) {

slideIndex = n;
  
  var i;



  var x = document.getElementsByClassName("mySlidesSmall");



  var dots = document.getElementsByClassName("demo");



  if (n > x.length) {slideIndex = 1}    

  if (n < 1) {slideIndex = x.length} ;



  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" w3-white","");
  }

 
  x[slideIndex-1].style.display = "block";  

  
  dots[slideIndex-1].className += " w3-white";

}

function yourTrip() {

document.getElementById("frontendmapframe").appendChild(document.getElementById("side-frame"));

}


var showModal = function(para) {

var modal = document.getElementById('myModal');

var modalImg = document.getElementById("img01");

var captionText = document.getElementById("caption");

    modal.style.display = "block";

    modalImg.src = para.src;
    
    modalImg.alt = para.alt;
    
    captionText.innerHTML = para.alt;

}

