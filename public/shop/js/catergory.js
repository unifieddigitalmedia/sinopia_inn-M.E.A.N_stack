
var numOfPages;

var type = [];

var brand = [];

var occassion = [];

$( window ).load(function() {


var url = "http://localhost:3000/api/catergory/?catergory="+sessionStorage.catergory+"&page="+sessionStorage.page;


$.get(url, function(data, status){

var catTypes = [];
var catBrands = [];
var catOccassion = [];

addPages(data);


$.each(data.items, function(i, el){



if($.inArray(el.type, catTypes) === -1) catTypes.push(el.type);

if($.inArray(el.type, catBrands) === -1) catBrands.push(el.brand);

if($.inArray(el.type, catOccassion) === -1) catOccassion.push(el.occassion);


var label = document.createElement("label");

label.className = "checkbox";

var checkBox = document.createElement("input");

checkBox.setAttribute("type","checkbox");

checkBox.setAttribute("data",el.type);


if($.inArray(el.type, JSON.parse(sessionStorage.type)) !== -1) checkBox.setAttribute("checked",true);

checkBox.setAttribute("filter","type");

checkBox.onclick = checkboxFilter;

document.getElementById("catTypes").appendChild(checkBox);

document.getElementById("catTypes").appendChild(label.appendChild(document.createTextNode(el.type)));



var label = document.createElement("label");

label.className = "checkbox";

var checkBox = document.createElement("input");

checkBox.setAttribute("type","checkbox");

checkBox.setAttribute("data",el.brand);

checkBox.setAttribute("filter","brand");

if($.inArray(el.brand, JSON.parse(sessionStorage.brand)) !== -1) checkBox.setAttribute("checked",true);

checkBox.onclick = checkboxFilter;

document.getElementById("catBrand").appendChild(checkBox);

document.getElementById("catBrand").appendChild(label.appendChild(document.createTextNode(el.brand)));







var label = document.createElement("label");

label.className = "checkbox";

var checkBox = document.createElement("input");

checkBox.setAttribute("type","checkbox");

checkBox.setAttribute("data",el.occassion);

checkBox.setAttribute("filter","occassion");

if($.inArray(el.occassion, JSON.parse(sessionStorage.occassion)) !== -1) checkBox.setAttribute("checked",true);

checkBox.onclick = checkboxFilter;

document.getElementById("catOccassion").appendChild(checkBox);

document.getElementById("catOccassion").appendChild(label.appendChild(document.createTextNode(el.occassion)));



});


    });


});

var addPages = function(data){

	if(data.count % data.per_page > 0 ){ numOfPages = Math.round((data.count / data.per_page)) + 1 ; };

for( var page = 0 ; page <= numOfPages+1 ; page++ ) {

var pageIndex = document.createElement("a");

pageIndex.onclick = nextPage;

pageIndex.setAttribute("data",page);

if(page == sessionStorage.page){  pageIndex.className = "active";   };

if(page == 0){  pageIndex.appendChild(document.createTextNode("<<")); }else if (page == numOfPages+1) {


	pageIndex.appendChild(document.createTextNode(">>"));


} else {


	pageIndex.appendChild(document.createTextNode(page));


}


document.getElementById("pagination").appendChild(pageIndex);




}


}

var nextPage =  function(){

//var url = "http://localhost:3000/api/catergory/filter/?catergory="+sessionStorage.catergory+"&page="+sessionStorage.page+"&type="+$(this).attr("data");

var limit = numOfPages + 1;

if($(this).attr("data") < limit  && $(this).attr("data") > 0  ){

sessionStorage.page = $(this).attr("data");

sessionStorage.type = JSON.stringify(type);

sessionStorage.brand = JSON.stringify(brand);

sessionStorage.occassion = JSON.stringify(occassion);

window.location = "shop.html" ;


}




}

var checkboxFilter =  function(){
   
//alert($(this).is(':checked'));

/****  add type ot array *****/



if($(this).is(':checked')){


if($(this).attr("filter") === 'type'){

if($.inArray($(this).attr("data"),type) === -1) type.push($(this).attr("data"));



}else if($(this).attr("filter") === 'occassion'){

if($.inArray($(this).attr("data"),occassion) === -1) occassion.push($(this).attr("data"));



}else{


if($.inArray($(this).attr("data"),brand) === -1) brand.push($(this).attr("data"));



}


} else {

if($(this).attr("filter") === 'type'){


if($.inArray($(this).attr("data"),type) !== -1)  type.splice(type.indexOf($(this).attr("data")), 1);



}else if($(this).attr("filter") === 'occassion'){


if($.inArray($(this).attr("data"),occassion) !== -1)  occassion.splice(occassion.indexOf($(this).attr("data")), 1);



}else{


if($.inArray($(this).attr("data"),brand) !== -1)  brand.splice(brand.indexOf($(this).attr("data")), 1);


}



}
   var itemPos = 0;

   var numoFItems = 3;

   var url = "http://localhost:3000/api/catergory/filter/?catergory="+sessionStorage.catergory+"&page="+sessionStorage.page;

   $.get(url, function(data, status){

   for(var row = 0 ; row < 4 ; row++){

   var box = document.createElement("div");

   box.className = "box1";

   for(itemPos; item < numoFItems ; item++){

/* IF ITEM TYPE IS IN FILTER ARRAY THEN ADD TO DISPLAY*/

/*<div class="col_1_of_single1 span_1_of_single1"><a href="single.html">
				     <div class="view1 view-fifth1">
				  	  <div class="top_box">
					  	<h3 class="m_1">Lorem ipsum dolor sit amet</h3>
					  	<p class="m_2">Lorem ipsum</p>
				         <div class="grid_img">
						   <div class="css3"><img src="images/pic3.jpg" alt=""/></div>
					          <div class="mask1">
	                       		<div class="info">Quick View</div>
			                  </div>
	                    </div>
                       <div class="price">£480</div>
					   </div>
					    </div>
					   <span class="rating1">
				        <input type="radio" class="rating-input" id="rating-input-1-5" name="rating-input-1">
				        <label for="rating-input-1-5" class="rating-star1"></label>
				        <input type="radio" class="rating-input" id="rating-input-1-4" name="rating-input-1">
				        <label for="rating-input-1-4" class="rating-star1"></label>
				        <input type="radio" class="rating-input" id="rating-input-1-3" name="rating-input-1">
				        <label for="rating-input-1-3" class="rating-star1"></label>
				        <input type="radio" class="rating-input" id="rating-input-1-2" name="rating-input-1">
				        <label for="rating-input-1-2" class="rating-star"></label>
				        <input type="radio" class="rating-input" id="rating-input-1-1" name="rating-input-1">
				        <label for="rating-input-1-1" class="rating-star"></label>&nbsp;
		        	  (45)
		    	      </span>
						 <ul class="list2">
						  <li>
						  	<img src="images/plus.png" alt=""/>
						  	<ul class="icon1 sub-icon1 profile_img">
							  <li><a class="active-icon c1" href="#">Add To Bag </a>
								<ul class="sub-icon1 list">
									<li><h3>sed diam nonummy</h3><a href=""></a></li>
									<li><p>Lorem ipsum dolor sit amet, consectetuer  <a href="">adipiscing elit, sed diam</a></p></li>
								</ul>
							  </li>
							 </ul>
						   </li>
					     </ul>
			    	    <div class="clear"></div>
			    	</a></div>


				box.appendChild(box);

			    	*/



	}

   itemPos = itemPos + 1;
   numoFItems = numoFItems + 3;

   document.getElementById("itemsContainer").appendChild(box);

}


   });




};

$(document).ready(function() {
        

    

});

 