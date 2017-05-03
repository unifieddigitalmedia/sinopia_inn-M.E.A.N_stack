

$(document).ready(function(){

   
$(function () { 
    var myChart = Highcharts.chart('weekly', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'NUMBNER OF LIKES BY YEAR'
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun','Jul', 'Aug', 'Sep','Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        series: [{
            name: '',
            data: [7, 2,3,4,3,4,4,5,4,5,6,10]
        }]
    });
});

$(function () { 
    var myChart = Highcharts.chart('monthly', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'NUMBER OF LIKES FOR MONTH OF NOVEMBER'
        },
        xAxis: {
             categories: ['WK1', 'WK2', 'WK3','WK4', 'WK5']
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        series: [{
            name: '',
            data: [1,1,1,3,4]
        }]
    });
});

/*$(function () { 
    var myChart = Highcharts.chart('time', {
        chart: {
            type: 'line'
        },
 tooltip: {
            dateTimeLabelFormats : {
                day: '%H:%M',
            }
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%H:%M'
            }
        },

    series: [{
        data:[[Date.UTC(2017,0, 1, 2, 0, 0),29.9],[Date.UTC(2017,1, 1, 2, 0, 0), 71.5],[Date.UTC(2017,2, 1, 2, 0, 0), 106.4], [Date.UTC(2017, 3, 1, 2, 0, 0),129.2],[Date.UTC(2017, 4, 1, 2, 0, 0), 144.0], [Date.UTC(2017, 5, 1, 2, 0, 0),176.0], [Date.UTC(2017, 6, 1, 2, 0, 0),135.6],[Date.UTC(2017, 7, 1, 2, 0, 0), 148.5], [Date.UTC(2017, 8, 1, 2, 0, 0),216.4],[Date.UTC(2017, 9, 1, 2, 0, 0), 194.1], [Date.UTC(2017, 10, 1, 2, 0, 0),95.6], [Date.UTC(2017,11, 1, 2, 0, 0),54.4]],

    }]
    });
}); 1296710352 */




$(function () {
    
    var ts = Math.round(new Date(1488304391467).getTime() / 1000);

    var tsYesterday = ts - (12 * 3600);

    var tsTomorrow = ts + (12 * 3600);
    
      var months = [
        'Jan', 
        'Feb', 
        'Mar', 
        'Apr', 
        'May', 
        'Jun', 
        'Jul', 
        'Aug', 
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'time'
        },
        xAxis: {


            
            /*categories: [1488304391467, 
            1488304391467, 
            1488304391467,
            1488304391467,
            1488304391467,
            1488304391467,
            1488304391467,
            1488304391467,
            1488304391467,
            1488304391467,
            1488304391467,
            1488304391467,
            1488304391467,
            1488304391467,
            1488304391467,
            1488304391467,
            1488304391467,
            1488304391467,
            1488304391467,
            1488304391467,
            1488304391467,
            1488304391467,
            1488304391467,
            1488304391467],


            labels: {
                formatter: function () {
                    
                    //var date = new Date(1488304391467);

 var date = new Date(this.value);

                    return months[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
            
                }
            }*/
            type: 'datetime',
           
        tickInterval: 1800 * 1000,
            min:tsYesterday * 1000,
            max:tsTomorrow * 1000,
        },
        title: {
            text: 'AVG LIKES BY TIME OF DAY'
        },
        series: [{
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4,29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
            pointStart: tsYesterday * 1000, // highcharts asks for miliseconds
            pointInterval: 3600 * 1000 // one hour
        }]
    });
});

Date.prototype.getHoursTwoDigits = function()
{
    var retval = this.getHours();
    if (retval < 10)
    {
        return ("0" + retval.toString());
    }
    else
    {
        return retval.toString();
    }
}

$(function () { 
    var myChart = Highcharts.chart('pie', {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'NUMBER OF LIKES'
        },
        xAxis: {
            categories: ['Feb 20', 'Feb 21', 'Feb 22','Feb 23', 'Feb 24', 'Feb 25', 'Feb 26']
        },
        yAxis: {
            title: {
                text: ''
            }
        }, plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },
          series: [{
        data: [{
            name: 'USA',
            y: 63.3,
            sliced: true,
            selected: true
        }, {
            name: 'Canada',
            y: 18.4,
           
        }, {
            name: 'Latin America',
            y: 1.4
        }, {
            name: 'Caribbean',
            y: 2.9
        }, {
            name: 'Europe',
            y: 13.1
        }, {
            name: 'Asia & Pacific',
            y: 0.4
        }, {
            name: 'Other Countries',
            y: 0.3
        }]
    }]
    });
});

$.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=world-population-density.json&callback=?', function (data) {

    // Initiate the chart
    Highcharts.mapChart('map', {

        title: {
            text: 'GEO DISTRIBUTION'
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            min: 1,
            max: 1000,
            type: 'logarithmic'
        },

        series: [{
            data: data,
            mapData: Highcharts.maps['custom/world'],
            joinBy: ['iso-a2', 'code'],
            name: 'Population density',
            borderColor: 'black',
            borderWidth: 0.2,
            states: {
                hover: {
                    borderWidth: 1
                }
            },
            tooltip: {
                valueSuffix: '/km²'
            }
        }]
    });
});

var chart1; // globally available
$(function() {
       chart1 = Highcharts.stockChart('container', {
         rangeSelector: {
            selected: 1
         },
         series: [{
            name: 'USD to EUR',
            data: usdtoeur // predefined JavaScript array
         }]
      });
   });

});

var destinations = [];


function loadArticles() {



var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {



if (xhr.readyState == 4) {




        BlogArticle1(xhr);
        
        loadArchive(xhr);
    

    }

}

xhr.open('GET', 'Feed/index.xml', true);

xhr.send(null);

}


$scope.loadArticlesIndex = function() {



var xhttps = new XMLhttpsRequest();

xhttps.onreadystatechange = function() {



    if (xhttps.readyState == 4 && xhttps.status == 200) {


        BlogArticle(xhttps);
     
    
    }

};

xhttps.open("GET", "Feed/index.xml", true);

xhttps.send();


}


function BlogArticle(xml) {



var x, xmlDoc, artcileTitle , articleDiv,itemList,listItemLink;

xmlDoc = xml.responseXML;

x = xmlDoc.getElementsByTagName('channel');

itemList = xmlDoc.getElementsByTagName('item');

var numofRows = itemList.length ;

var counter = numofRows - 1;

for (x = 0; x < numofRows ; x++) {

articleDiv = document.createElement("div");

articleDiv.className = "row";

document.getElementById("blog-section").appendChild(articleDiv);

articleDiv.appendChild(document.createElement("br"));



for (y = 0; y < 2 ; y++) {


var rowColumn = document.createElement("div");

rowColumn.className = "col-sm-6";

articleDiv.appendChild(rowColumn);



var articleItem = document.createElement("div");

articleItem.setAttribute("style","width:100%;");

articleItem.className = "w3-display-container divbox";

rowColumn.appendChild(articleItem);


var articleImage = document.createElement("img");

articleImage.setAttribute("src","../../"+itemList[counter].childNodes[7].innerHTML);

articleImage.setAttribute("style","width:95%;");

articleItem.appendChild(articleImage);



var row1 = document.createElement("div");
row1.className = "row";
articleItem.appendChild(row1);


var row1col1 = document.createElement("div");
row1col1.className = "col-sm-12";
row1.appendChild(row1col1);



var articleItemTitle = document.createElement("p");
articleItemTitle.className = "side_menu_title_blog";
articleItemTitle.setAttribute("style","text-align:center!important;");
articleItemTitle.appendChild(document.createTextNode(itemList[counter].childNodes[1].innerHTML));
row1col1.appendChild(articleItemTitle);



var row2 = document.createElement("div");
row2.className = "row";
row1.appendChild(row2);


var row2col1 = document.createElement("div");
row2col1.className = "col-sm-12";
row2.appendChild(row2col1);




var articleItemTitle = document.createElement("p");
articleItemTitle.className = "side_menu_title_blog_summary";
articleItemTitle.setAttribute("style","text-align:center!important;");
articleItemTitle.appendChild(document.createTextNode(itemList[counter].childNodes[3].innerHTML));
row2col1.appendChild(articleItemTitle);




var row3 = document.createElement("div");
row3.className = "row";
row2.appendChild(row3);




var row3col1 = document.createElement("div");
row3col1.className = "col-sm-12";
row3.appendChild(row3col1);




var articleItemTitle = document.createElement("a");

articleItemTitle.className = "side_menu_title_blog_link bookingform-rewards-cta";

articleItemTitle.setAttribute("href",itemList[counter].childNodes[5].innerHTML);
articleItemTitle.setAttribute("style","font-family: 'Waiting for the Sunrise'!important;font-weight:900!important;float:right;font-size:180%!important;");





articleItemTitle.appendChild(document.createTextNode("READ THE FULL STORY"));

row3col1.appendChild(articleItemTitle);


counter = counter - 1;


}





}

}



function BlogArticle1(xml) {



var x, xmlDoc, artcileTitle , articleDiv,itemList,listItemLink;

xmlDoc = xml.responseXML;

x = xmlDoc.getElementsByTagName('channel');




itemList = xmlDoc.getElementsByTagName('item');

var numofRows = itemList.length ;

var counter = numofRows - 1;

for (x = 0; x < 1 ; x++) {



var z = x % 2;


var mainRowDiv = document.createElement("div");

mainRowDiv.className = "row";

if(z == 0 ){

 // mainRowDiv.setAttribute("style","width:100%; background-color:#f8f6f6;padding:100px;border:thin solid #d2d2d2;");

mainRowDiv.setAttribute("style","width:90%; background-color:#f9f8f8;border:thin solid #ffffff; padding:30px;margin:0 auto!important; ");

}else{


 // mainRowDiv.setAttribute("style","width:100%; background-color:white;padding:100px;");

mainRowDiv.setAttribute("style","width:90%; padding:30px; background-color:white;margin:0 auto!important;");
}



document.getElementById("blog-section").appendChild(mainRowDiv);



articleDiv = document.createElement("div");

articleDiv.className = "row";

articleDiv.setAttribute("style","width:80%;margin:0 auto!important;background-color:white;");

mainRowDiv.appendChild(articleDiv);




var rowColumn = document.createElement("div");

rowColumn.className = "col-sm-6";

mainRowDiv.appendChild(rowColumn);


var articleItem = document.createElement("div");

articleItem.setAttribute("style","width:100%;border:red thin solid!important;");

articleItem.className = "w3-display-container";


var articleImage = document.createElement("img");

articleImage.setAttribute("src","../"+itemList[counter].childNodes[7].innerHTML);

articleImage.setAttribute("style","width:100%; vertical-align: middle;");



articleItem.appendChild(articleImage);

rowColumn.appendChild(articleImage);



var rowColumn2 = document.createElement("div");

rowColumn2.className = "col-sm-6";

rowColumn2.setAttribute("style","text-alige:center");

mainRowDiv.appendChild(rowColumn2);



var row1 = document.createElement("div");

row1.className = "row";

rowColumn2.appendChild(row1);



var row1col1 = document.createElement("div");

row1col1.className = "col-sm-12";

row1.appendChild(row1col1);



var articleItemTitle = document.createElement("p");

articleItemTitle.className = "side_menu_title_blog";

articleItem.setAttribute("style","text-align:center!important;");

articleItemTitle.appendChild(document.createTextNode(itemList[counter].childNodes[1].innerHTML));

row1col1.appendChild(articleItemTitle);



var row2 = document.createElement("div");
row2.className = "row";
row1.appendChild(row2);




var row2col1 = document.createElement("div");
row2col1.className = "col-sm-12";
row2.appendChild(row2col1);




var articleItemTitle = document.createElement("p");

articleItemTitle.className = "side_menu_title_blog_summary";

articleItem.setAttribute("style","color:red!important;text-align:center!important;font-weight:200!mportant;");

articleItemTitle.appendChild(document.createTextNode(itemList[counter].childNodes[3].innerHTML));


var articleItemTitleLink = document.createElement("a");

articleItemTitleLink.className = "side_menu_title_blog_link";

articleItemTitleLink.setAttribute("href",itemList[counter].childNodes[5].innerHTML);

articleItemTitleLink.setAttribute("style","font-family: 'Waiting for the Sunrise'!important;font-weight:900!important;float:right;font-size:100%!important;");

articleItemTitleLink.appendChild(document.createTextNode("READ THE FULL STORY"));

articleItemTitle.appendChild(articleItemTitleLink);





row2col1.appendChild(articleItemTitle);




counter = counter - 1;






}





}


function loadArchive(xml) {




var x, xmlDoc, itemList ;

xmlDoc = xml.responseXML;

x = xmlDoc.getElementsByTagName('channel');

itemList = xmlDoc.getElementsByTagName('item');

var numofRows = itemList.length ;


var counter = numofRows - 1;

for (x = 0; x < 1 ; x++) {


document.getElementById("blog-archive-section").appendChild(document.createElement("br"));



if(destinationArchive(itemList[numofRows-1].childNodes[9].innerHTML)){




var mainRowDiv = document.createElement("i");

mainRowDiv.className = "fa fa-plane";

mainRowDiv.setAttribute("style","font-size:30px;color:#cb410b;");

//mainRowDiv.innerHTML =  "&nbsp;&nbsp;" + itemList[numofRows-1].childNodes[9].innerHTML;


var articleItemTitle = document.createElement("a");

articleItemTitle.className = "side_menu_title_blog_link ";

articleItemTitle.setAttribute("style","display: inline-block; color:black; font-family: 'PT Sans', sans-serif; font-weight:100!important; font-size:15px;text-align: center; padding: 14px 16px; text-decoration: none;cursor:pointer; ");



articleItemTitle.setAttribute("href",itemList[counter].childNodes[5].innerHTML);


var spanElem = document.createElement("span");


spanElem.innerHTML = "&nbsp;&nbsp;" + itemList[numofRows-1].childNodes[9].innerHTML;


document.getElementById("blog-archive-menu").appendChild(articleItemTitle);

articleItemTitle.setAttribute("style","text-decoration:none;font-family: 'PT Sans', sans-serif; font-weight:100;");

articleItemTitle.appendChild(spanElem);

mainRowDiv.appendChild(articleItemTitle);



document.getElementById("blog-archive-section").appendChild(mainRowDiv);

var div2 = articleItemTitle.cloneNode(true);

document.getElementById("blog-archive-menu").appendChild(div2);



}


counter = counter  - 1;

}



}



function destinationArchive(para) {


if(destinations.indexOf(para) == -1 )

{


destinations.push(para);

return true;


}else{


  return false;
}



  }