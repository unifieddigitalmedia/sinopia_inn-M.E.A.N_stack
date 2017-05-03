
angular.module('sinopia', []).controller('reservationsystem', function ($scope) {
    
$('#reservationform').submit(function(ev) {

  ev.preventDefault(); 
  
  angular.element(document.getElementById('span')).scope().checkavailability();
  

});


$scope.Javascript_is_disable_Enable_Javascript_for_an_enhanced_experience = 'Checking availability';

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


$scope.lengthofstay = function(para,para1) {



$scope.fromarray = returnDate(para).split("-");

$scope.toarray =   returnDate(para1).split("-");


$scope.startDate = new Date($scope.fromarray[2],Number($scope.fromarray[1])-1,$scope.fromarray[0]); 

$scope.endDate = new Date($scope.toarray[2],Number($scope.toarray[1])-1,$scope.toarray[0]);

$scope.numofdays = Math.round(($scope.endDate - $scope.startDate)/(1000*60*60*24));


return $scope.numofdays;


}




});



$(document).ready(function(){

//"blue-lagoon-4.jpg","blue-lagoon-2.jpg",  "blue-lagoon-5.jpg", "Blue-Lagoon.jpg",
var slideshowImages = ["trek.jpg","beach.jpg","beach_front.jpg","dragon_bay_hotel.jpg" ,"rafting.jpg", "lagoon1.jpg", "lagoon2.jpg",  "blue-lagoon-2.jpg",  "lagoon.jpg", "castle.jpg", "gate.jpg", "grill.jpg", "football.jpg"];

var slideIndex = 0;

$(".parallaxNextimg").css("opacity",0);


function changeImage(id, image){



  $(id).css('background-image', "url('../images/slideshow/"+image+"')");


  
};


//showparallaxSlides();

function showparallaxSlides() {


    changeImage('.parallaxNextimg', slideshowImages[slideIndex]);

    changeBackground();

    function changeBackground() {

      $('.parallaxNextimg').animate({"opacity": 1}, 3000, function(){ 



          changeImage('.parallax', slideshowImages[slideIndex]);
          
           slideIndex++;
           
          if (slideIndex  >= slideshowImages.length) { slideIndex = 0; } 
          //$(".parallaxNextimg").css("opacity", 0);


           $('.parallaxNextimg').animate({"opacity": 0}, 3000, function(){ 




          changeImage('.parallaxNextimg', slideshowImages[slideIndex]);

             });
       
        

      });
    
   

    }


    setInterval(changeBackground, 4500);

    /*if (slideIndex > slideshowImages.length) {slideIndex = 0}    
   
    $(".parallaxNextimg").css("background-image", "url('../images/slideshow/"+slideshowImages[slideIndex]+"')");

    slideIndex++;

    setTimeout(showparallaxSlides, 1000); // Change image every 2 seconds*/

}




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


$(window).scroll(function() {


if ($(".shortcodeformOuterform").css('top') == 0){  


    $(".shortcodeformOuterform").addClass("sticky");

  }
  else{
    
    $(".shortcodeformOuterform").removeClass("sticky");
  }

});



$.get("https://api.instagram.com/v1/users/self/media/recent/?access_token=207254463.22050d9.9df9602edcf9424082d95c1f55be004e", function(data, status){


/*var photoCount = 20;

    var length = data != 'undefined' ? data.length : 0;
   
    var limit = photoCount != null && photoCount < length ? photoCount : length;
  
 


       

 if(limit > 0) {


      for(var i = 0; i < limit; i++) {
 



var myslidesDiv = document.createElement("div");

myslidesDiv.className = "mySlides fade";

document.getElementById("slideshow-container").appendChild(myslidesDiv);


var articleImage = document.createElement("img");

articleImage.setAttribute("src",data[i].images.standard_resolution.url);

articleImage.setAttribute("style","width:100%;");

myslidesDiv.appendChild(articleImage);


      }
 



    }
*/



    });




if( getCookie("privacy").length == 0 ) {


$(".modal-footer-panel").css("display", "block");


var span = document.getElementsByClassName("close")[0];


span.onclick = function() {

   $(".modal-footer-panel").css("display", "none");
}


window.onclick = function(event) {

var modal = document.getElementById('myModal');

    if (event.target == modal) {
  
       $(".modal-footer-panel").css("display", "none");
  
    }

}

}


$("input[name='optradio']").change(function(){



 if($(this).val() == 'yes' ){

document.cookie = "privacy=yes";

$(".modal-footer-panel").css("display", "none");
 }else{

document.cookie = "privacy=no";

$(".modal-footer-panel").css("display", "none");

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

$(".checking").hide();





$(".trip").click(function() {


document.cookie = "location=" + $(this).data("id");

});


$("#subscribe_button").click(function() {


   document.cookie = "subscribers_email=" + document.getElementById("subscribers_email").value;



   window.location = "connect.html" ;




});



function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}



var slideIndex = 0;

//showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex> slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 10000); // Change image every 2 seconds
}




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

var slideIndex = 0;
showSlides();



function showSlides(n) {

 var i;
    var slides = document.getElementsByClassName("mySlides");
    //var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex> slides.length) {slideIndex = 1}    
    /*for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }*/
    slides[slideIndex-1].style.display = "block";  
    //dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 3000); // Change image every 2 seconds
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


/******************/


var slideIndex = 0;

showDivs(slideIndex);

function plusDivs(n) {

  showDivs(slideIndex += n);

}

function currentDiv(n) {

  showDivs(slideIndex = n);

}

function showDivs(n) {


  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");

  if (n > x.length) {slideIndex = 1}

  if (n < 1) {slideIndex = x.length}
  
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  


  }
  
  for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" w3-opacity-off", "");




  }
  x[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " w3-opacity-off";
}



