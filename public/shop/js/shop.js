 var item ;

 $( window ).load(function() {


var url = "http://localhost:3000/api/product/?product="+sessionStorage.product;


$.get(url, function(data, status){

//item = data;
//product_description
//reducedfrom
//actual
//product_reviews
//product_details
//etalage
   
 });


var url = "http://localhost:3000/api/catergory/?catergory="+sessionStorage.catergory+"&page="+sessionStorage.page;


$.get(url, function(data, status){


$.each(data.items, function(i, el){

//el.items[0];

//item

});


 });


   });


$(document).ready(function(){


var shopcart = [];


var numofItems = JSON.parse(sessionStorage.shopCart).length;

$(".addItem").click(function(){

shopcart = JSON.parse(sessionStorage.shopCart); 

shopcart.push(item);

sessionStorage.shopCart = JSON.stringify(shopcart);



    });


$(".removeItem").click(function(){


shopcart = JSON.parse(sessionStorage.shopCart); 

var elementPos = shopcart.map(function(x) {return x.productCode; }).indexOf($(this).attr("data-id"));

//$(this).getAttribute('data-id');

shopcart.splice(elementPos, 1);

sessionStorage.shopCart = JSON.stringify(shopcart);



    });



});
