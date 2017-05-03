/*https://api.instagram.com/oauth/authorize/?client_id=4384aa5a0abe4d6b97eb20823c2a9814&redirect_uri=https://www.sinopiainn.com/dashboard/&response_type=token*/




function openNav() {

    document.getElementById("mySidenav").style.width = "440px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}



var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var monthNamesFull = ["January", "Feburary", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];


window.onload = function(){
   

var tmp = [];



if(sessionStorage.instagram == 'logged in' ){



   document.getElementById("account").innerHTML = sessionStorage.username ; 

   document.getElementById("igStatus").innerHTML = "You're logged in";

   document.getElementById("dashboardCard").style.display = "block";

   var poi = '{ "name": "Winnifred Beach","image": "../images/slideshow/beach.jpg","tagline":"winnifredbeach" }';

   var topics = ["family", "beach", "festival", "food&drink", "historyarts&culture", "islandhopping", "newdiscovery","offthepath","spa&wellness","wildlife","goinggreen"];

   document.getElementById("StreamplaceOfbusiness").innerHTML = JSON.parse(poi).name; 

   document.getElementById("StreampoiImage").src = JSON.parse(poi).image; 

   document.getElementById("Streamhashtag").innerHTML = sessionStorage.hashtag;

   document.getElementById("StreamdayofWeek").innerHTML  = sessionStorage.dayofweek;

   document.getElementById("Streampostdate").innerHTML  = sessionStorage.postdate;

   document.getElementById("Streamsponsor").innerHTML  = sessionStorage.username;





} else {




var paths = decodeURI(location).split("#");



if(paths[1] == 'contact' ){

document.getElementById("account").innerHTML = username;



}else{



paths.forEach(function (item) {

tmp = item.split("=");
      


 if (tmp[0] === 'access_token') {

sessionStorage.instagram = 'logged in';

document.getElementById("menu").style.display = "block";

document.getElementById("menu-bar").style.display = "block";

document.getElementById("ig").style.display = "block";

document.getElementById("dashboard").style.display = "none";

popCalendar(current_month,current_year);

var url = "https://api.instagram.com/v1/users/self/?access_token="+tmp[1];


var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {


    alert(JSON.parse(this.responseText));

      document.getElementById("account").innerHTML = JSON.parse(this.responseText)[0].username ; 
      document.getElementById("sponsor").innerHTML = JSON.parse(this.responseText)[0].username ; 
      sessionStorage.username = JSON.parse(this.responseText)[0].username ;
      
    
    }
  
  };

  xhttp.open("GET",url, true);
  
  xhttp.send();

 /*$.get("https://api.instagram.com/v1/users/self/?access_token=4248238337.4384aa5.99622bb28dd54cdb83b0aba6dd88d54d", function(data, status){


    //sessionStorage.access_token = tmp[1];

        //alert("Data: " + data + "\nStatus: " + status);

     
    
     document.getElementById('account').innerHTML = username;

    });*/
 

       }

    });



}

/**/

  
}


}

var newdate = new Date();

var current_month = newdate.getMonth();

var current_year = newdate.getFullYear();



function nextCalendar (){

current_month = current_month + 1;

if(current_month <= 11 ){


popCalendar(current_month,current_year);


}else{

current_month = 0; 

current_year++;

popCalendar(current_month,current_year);

}


}

function previousCalendar() {

current_month = current_month - 1;


if(current_month >= newdate.getMonth() || (current_year > newdate.getFullYear() && current_month !== -1 )){

popCalendar(current_month,current_year);


}  else if(current_year > newdate.getFullYear() && current_month === -1 ){


current_month = 11 ;

current_year = current_year - 1;

popCalendar(current_month,current_year);


}





}

function popCalendar (current_month,current_year){


while (document.getElementById("days").hasChildNodes()) {   

    document.getElementById("days").removeChild(document.getElementById("days").firstChild);

}

var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

for(var dayofWeek = 0 ; dayofWeek < new Date(2017, current_month, 1).getDay() ; dayofWeek++){

var dayOfWeekItem = document.createElement("li");


dayOfWeekItem.innerHTML = " ";

document.getElementById("days").appendChild(dayOfWeekItem);

}


for(var day = 1 ; day <= new Date(2017, current_month + 1, 0).getDate() ; day++ ){


var dayOfWeekItem = document.createElement("li");

dayOfWeekItem.innerHTML = day;


dayOfWeekItem.setAttribute("style","cursor:pointer;");

dayOfWeekItem.setAttribute("onclick","setToAactive(this),returnDate(this)");

document.getElementById("days").appendChild(dayOfWeekItem);



}

document.getElementById("calMonth").innerHTML =  monthNames[current_month];

document.getElementById("calYear").innerHTML = new Date(2017, current_month, 1);



}

function setToAactive(para){

var x = document.querySelectorAll(".active");


[].forEach.call(x, function(el) {

    el.classList.remove("active");

});


 para.classList.toggle('active');

    
}

var choosenDateObject;

function returnDate(para){



choosenDateObject = new Date(current_year, current_month, para.innerHTML);


document.getElementById("choosenDate").value = choosenDateObject.toString();


document.getElementById("date").value =  dayNames[choosenDateObject.getDay()]+" "+monthNames[choosenDateObject.getMonth()]+" "+choosenDateObject.getDate()+" "+choosenDateObject.getFullYear();

document.getElementById("dayofWeek").innerHTML  = dayNames[choosenDateObject.getDay()];

document.getElementById("postdate").innerHTML  = choosenDateObject.getDate() +" "+monthNamesFull[choosenDateObject.getMonth()]+" "+choosenDateObject.getFullYear() ;

sessionStorage.dayofweek = dayNames[choosenDateObject.getDay()];

sessionStorage.postdate  = choosenDateObject.getDate() +" "+monthNamesFull[choosenDateObject.getMonth()]+" "+choosenDateObject.getFullYear() ;


}



function setTag(para){

var poi = '{ "name": "Winnifred Beach","image": "../images/slideshow/beach.jpg","tagline":"winnifredbeach" }';

var topics = ["family", "beach", "festival", "food&drink", "historyarts&culture", "islandhopping", "newdiscovery","offthepath","spa&wellness","wildlife","goinggreen"];

document.getElementById("hashtag").innerHTML = topics[para.getAttribute('data-id')];

sessionStorage.hashtag = topics[para.getAttribute('data-id')];


document.getElementById("tagValue").value =topics[para.getAttribute('data-id')];
document.getElementById("poiImage").src = JSON.parse(poi).image; 
document.getElementById("placeOfbusiness").innerHTML = JSON.parse(poi).tagline; 
}

$(document).ready(function(){

/*$(window).scroll(function() {
if ($(this).scrollTop() > 1){  
    $('header').addClass("sticky");
  }
  else{
    $('header').removeClass("sticky");
  }
});*/



$(".menu li a").hover(function(){

var index = $( ".menu li a" ).index( this ) + 1;

//$(".menu-bar li:nth-child("+index+") a ").css("background"," #267fdd");

$(".menu-bar li:nth-child("+index+") a ").toggleClass( "menuLink" );



var d = $(".menu-bar li:nth-child("+index+") a ").html();


});

$(".menu-bar li a").hover(function(){

var index = $( ".menu-bar li a" ).index( this ) + 1;

//$(".menu-bar li:nth-child("+index+") a ").css("background"," #267fdd");

$(".menu li:nth-child("+index+") a ").toggleClass( "menuLink" );



var d = $(".menu-bar li:nth-child("+index+") a ").html();


});

//.menu-bar li:first-child

$(".menu, .menu-bar").hover(function(){


$(".menu-bar").toggleClass( "open" );

})

 $(".optionMenu").hover(function(){
 
//$(".optiontdstCell").css("width","400");
  //$(".optiontdstFirstCell").slideToggle();

//$(".cellLabel").toggle( "slow", function() { left: "600" });
 
//$('.optioncell').toggle(500);
//$(".optioncell").toggle( "slow", function() { left: "600" });

//$(".optiontdstCell").css("width", "500");


    });

/*


$( window ).load(function() {
  // Run code
});


function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
    .substr(1)
        .split("&")
        .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
    return result;
}*/

 $('input[type=radio][name=optradio]').change(function() {
       

//$('input[name="optradio"]:checked').val()

document.getElementById("hashtag").innerHTML = $('input[name="optradio"]:checked').val();



});



$('#instagram').click(function(ev) {

window.location.assign("https://api.instagram.com/oauth/authorize/?client_id=4384aa5a0abe4d6b97eb20823c2a9814&redirect_uri=https://www.sinopiainn.com/dashboard.html&response_type=token");




});





});



