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



var articleLink = document.createElement("a");

articleLink.className = "blog-link";

articleLink.setAttribute("style","text-decoration:none;");

articleLink.setAttribute("href",itemList[counter].childNodes[5].innerHTML);

var articleItemTitle = document.createElement("p");

articleItemTitle.className = "side_menu_title";



articleItemTitle.appendChild(document.createTextNode(itemList[counter].childNodes[1].innerHTML));

articleItemTitle.setAttribute("style","padding:20px;");

articleLink.appendChild(articleItemTitle);



articleItem.appendChild(articleLink);



articleItem.appendChild(document.createElement("br"));

var articleImage = document.createElement("img");



articleImage.setAttribute("src","../"+itemList[counter].childNodes[7].innerHTML);

articleImage.setAttribute("style","width:100%;");


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