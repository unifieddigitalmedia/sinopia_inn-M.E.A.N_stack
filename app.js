var compression = require('compression');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var waterfall = require('async-waterfall');
var mongo = require('mongodb');
var async = require('async');
var waterfall = require('async-waterfall');
var MongoClient = require('mongodb').MongoClient;
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('fix_HqmjREpZnCAHR_Dhaw');
var pdf = require('pdfcrowd');
var assert = require('assert');
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra'); 
var mongoose = require('mongoose');
var MONGOLAB_URI = 'mongodb://sinopiainn-administrator:321123ETz$@ds057476.mlab.com:57476/heroku_mn2k4bdf';
var db = mongoose.createConnection(MONGOLAB_URI);
var routes = require('./routes/index');
var users = require('./routes/users');
//var nodemailer = require('nodemailer');
var client = new pdf.Pdfcrowd('sinopiainn', 'fcfaaea5b060744db668d1bee67ccaae');

var gcm = require('node-gcm');

var s3 = require('s3');

var AWS = require('aws-sdk');

AWS.config.loadFromPath('config.json');

var s3 = new AWS.S3();

var bucket = 'sinopiainn.reservations';





var app = express();

app.use(busboy());

app.use(compression());

app.use(express.static('public'));

app.use(express.static('tools'));

app.use(express.static(__dirname + '/'));

process.env.NODE_ENV = 'development';


var hotelID = '5855a1f3523d3f70c7dd48ac';


var braintree = require("braintree");


var gateway = braintree.connect({

  environment: braintree.Environment.Sandbox,

  merchantId: "srhrsqv4gy3hq4ph",

  publicKey: "43rvqc54k6f95qvq",

  privateKey: "501e4b051264b96427f0ceddf2383920"


});


function rawBody(req, res, next) {

    var chunks = [];

    req.on('data', function(chunk) {
        chunks.push(chunk);
    });

    req.on('end', function() {
        var buffer = Buffer.concat(chunks);

        req.bodyLength = buffer.length;
        req.rawBody = buffer;
        next();
    });

    req.on('error', function (err) {
        console.log(err);
        res.status(500);
    });
}

var multipart = require('connect-multiparty');

var multipartMiddleware = multipart();


app.get('/*', function (req, res, next) {

  if (req.url.indexOf("/public/") === 0 ) {
    res.setHeader("Cache-Control", "public, max-age=2592000");
    res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
 }

  next();

});


app.get('/', function (req, res) {

      res.sendFile(path.join(__dirname + "/index.html"));

      })


app.get('/booking-confirmation/', function (req, res) {

      res.sendFile(path.join(__dirname + "/public/booking-confirmation.html"));

      })

app.get('connect', function (req, res) {

      res.sendFile(path.join(__dirname + "/public/connect.html"));

      })


app.use(express.static('bower_components'));


app.use(bodyParser.json());




/********* START OF MOBILE API'S *********/


app.get('/api/menu/', function (req, res) {

  var container = [];
  var items = [];

waterfall([

  function(callback){


db.collection("menu").find( {}, {type:1, _id:0} ).toArray(function(e, results){

  
  if (e) return next(e)


for (var i = 0; i < results.length; i++) { 
   



   if(items.indexOf(results[i].type) === -1)

                                            
            {

                    items.push(results[i].type);

            }



}

    
callback(null,items);


});

  
  },

  function(paraArray,callback){



    async.eachSeries(paraArray,function(item,callback) {
 
      
      db.collection('menu').find( { "type": item } ).toArray(function(e, results){

               
          
              container.push({"type":item,"items":results});

callback(e)



                                                                                       });


 
    },function(err) {

 
        if (err) throw err;

     


        callback(null,container);
 

    });



                                 
 


  },

  function(arg1,callback){

 
       res.json(arg1);
  

  }

], function (err, result) {
  

 res.json('done');


});




});


          

          app.get('/api/books/', function (req, res) {

  var container = [];
  var items = [];

waterfall([

  function(callback){


db.collection("books").find( {}, {type:1, _id:0} ).toArray(function(e, results){

  
  if (e) return next(e)


for (var i = 0; i < results.length; i++) { 
   



   if(items.indexOf(results[i].type) === -1)

                                            
            {

                    items.push(results[i].type);

            }



}

    
callback(null,items);


});

  
  },

  function(paraArray,callback){



    async.eachSeries(paraArray,function(item,callback) {
 
      
      db.collection('books').find( { "type": item } ).toArray(function(e, results){

               
          
              container.push({"type":item,"items":results});

callback(e)



                                                                                       });


 
    },function(err) {

 
        if (err) throw err;

     


        callback(null,container);
 

    });



                                 
 


  },

  function(arg1,callback){

 
       res.json(arg1);
  

  }

], function (err, result) {
  

 res.json('done');


});




});


app.post('/api/mobile/booktrip/', function (req, res) {



db.collection('itinerary').insert( [


{


          "name":req.query.name,
          "email":req.query.email,
          "phone":req.query.phone,
          "numoftravellers":req.query.numoftravellers,
          "numofadults":req.query.numofadults,
          "numofchildren":req.query.numofchildren,
          "numofinfants":req.query.numofinfants,
          "subtotaladmission":req.query.subtotaladmission,
          "subtotalavergae":req.query.subtotalavergae,
          "carhire":req.query.carhire,
          "tax":req.query.tax,
          "total":req.query.total,
          "places[]":req.body['places[]'],



}], function(err, results) { 



         resID = results.insertedIds[0];

         var response = {"ERROR":"","tripID":resID};
        
         res.json(response);



});


});



app.get('/api/mobile/checkhotelavailability/', function (req, res) {

var o_id = new mongo.ObjectID("5855a1f3523d3f70c7dd48ac");

var availability = [];

var offersArray = [];

var roomsIdArray = [];

var fromdate = req.query.fromdate.split("-")[2]+"-"+req.query.fromdate.split("-")[1]+"-"+req.query.fromdate.split("-")[0];

var todate = req.query.todate.split("-")[2]+"-"+req.query.todate.split("-")[1]+"-"+req.query.todate.split("-")[0];

waterfall([
  
function(callback){

db.collection("hotels").find({"_id":o_id}, {'rooms': true} ).toArray(function(err, results) {
      
if (err) return next(err)

for (x = 0; x < results[0].rooms.length; x++) { 

if (results[0].rooms[x].booking.length != 0) {

for (y = 0; y < results[0].rooms[x].booking.length; y++) { 

for (z = 0; z < results[0].rooms[x].booking[y].length; z++) { 



if ( (new Date(results[0].rooms[x].booking[y][z].fromdate) <= new Date(fromdate)  &&  new Date(results[0].rooms[x].booking[y][z].enddate) >= new Date(fromdate) ) || (new Date(results[0].rooms[x].booking[y][z].fromdate) <= new Date(todate)  &&  new Date(results[0].rooms[x].booking[y][z].enddate) >= new Date(todate) ) ) {


            roomsIdArray.push(results[0].rooms[x]._id);


      }


}




}



}



}



 callback(null,roomsIdArray,results);



});


},function(arg1,arg2,callback){

if(arg1.length > 0 ) {

var obj = [];

obj = JSON.parse(req.query.roomarray[0]);

for (i = 0; i < obj.length; i++) { 

if(arg1.indexOf(obj[i]._id) != -1 ){


     var response = {"ERROR":"One or more of your rooms has now been booked."};
        
      res.json(response);

}



}



} else {


 var response = {"ERROR":""};
        
      res.json(response);

}


  }], function (err, result) {
 

    if (err) return next(err)

    res.send(results);


});






  });

app.get("/api/mobile/checkout/", function (req, res) {

 gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
  });

});



app.get('/api/reviews/', function(req,res) {


db.collection('reviews').find({}).toArray(function(e, results){


    if (e) return next(e)


   
      res.json(results);



});



});


app.post('/api/reviews/', function(req,res) {



var idArray ;

db.collection('reservation').find({"name":req.query.name},{ _id:1 }).toArray(function(e, results){

//idArray = results;



var photofile = "http://www.sinopiainn.com/public/reservations/"+req.query.name+"/"+results[results.length-1]._id+".jpg";



db.collection('reviews').insert( [



{


          "name":req.query.name,
          "date":req.query.date,
          "rating":req.query.rating,
          "comment":req.query.comment,
          "rating_img":req.query.rating+"star",
          "photofile":photofile,
         


}], function(err, results) { 

if(err){ res.json({"ERROR": "There was an error on our saerver'" });}else{

  res.json({"ERROR": "Your comment has been posted" });
}
       
      

});


});






});




app.post('/api/upload-reservation-photo', multipartMiddleware, function(req, res) {

console.log("got");

var d = new Date();

var reservationID = new mongo.ObjectID(req.query.resID);

var date_created = d.toDateString();

var time_created = d.toDateString();

var filename =  req.files.displayImage.originalFilename;




fs.readFile(req.files.displayImage.path, function (err, data) {


   if (err) {


      return console.error(err);
   
      var response = {"ERROR":"There was an system error. Please contact the web administrator."};

      res.json(response);



   }else{

var name = req.query.name.trim();

 var directory =  name+"/"+filename; 

       var params = {Key: directory, Body: data};

        s3Bucket.putObject(params, function(err, data) {
  
        if (err) {
            

            var response = {"ERROR":"Error uploading your picture:"};

            res.json(response);

            console.log("Error uploading data: ", err);

        } else {
           
         

          db.collection('reservation').updateOne( {"_id":reservationID}, { $push: {"photos": { 

"image_url" : "https://s3-us-west-2.amazonaws.com/"+bucket+"/"+directory,
"text" : req.query.message , 
"date_created" : date_created,
"time_created" : time_created,

}  } } , function(err, results) { 

  if (err) return next(err)

  var response = {"ERROR":""};

    res.json(response);



 });


           
        }
    });





   }

});
      

/*
var directory = "public/reservations/"+req.query.name+"/"; 



if (fs.existsSync(directory)) {



fs.readFile(req.files.displayImage.path, function (err, data) {


   if (err) {


      return console.error(err);
   
      var response = {"ERROR":"There was an system error. Please contact the web administrator."};

      res.json(response);



   }

fs.writeFile(directory+filename, data, function (err) {

 if (err) return next(err)

db.collection('reservation').updateOne( {"_id":reservationID}, { $push: {"photos": { 

"image_url" : directory+filename,
"text" : req.query.message , 
"date_created" : date_created,
"time_created" : time_created,

}  } } , function(err, results) { 

  if (err) return next(err)

  var response = {"ERROR":""};

    res.json(response);



 });

 });




});


}else{

  fs.mkdir(directory,function(err){

   if (err) {
      return console.error(err);
   }


fs.readFile(req.files.displayImage.path, function (err, data) {


   if (err) {


      return console.error(err);
   
      var response = {"ERROR":"There was an system error. Please contact the web administrator."};

      res.json(response);



   }

fs.writeFile(directory+filename, data, function (err) {

 if (err) return next(err)

db.collection('reservation').updateOne( {"_id":reservationID}, { $push: {"photos": { 

"image_url" : directory+filename,
"text" : req.query.message , 
"date_created" : date_created,
"time_created" : time_created,

}  } } , function(err, results) { 

  if (err) return next(err)

  var response = {"ERROR":""};

    res.json(response);



 });

 });




});


});

}*/


});



app.get('/api/timeline/', function(req, res) {

var containerArray= [];

var reservationID = new mongo.ObjectID(req.query.name);

db.collection('reservation').find({"name":req.query.name},{}).toArray(function(e, results){

if (e) return next(e)


for (var x = 0 ; x < results.length ; x++){


containerArray.push({ images : results[x].photos , name : req.query.name ,  location : "" , from : results[x].fromdate ,  to : results[x].todate });


}



res.json(containerArray);

});


  });




app.get('/api/images/', function(req,res) {

var filesArray = [];

var containerArray= [];

waterfall([

function(callback){

db.collection('reservation').find({},{'photos': true}).toArray(function(e, results){

if (e) return next(e)

for (var x = 0 ; x < results.length ; x++) {

for (var y = 0 ; y < results[x].photos.length ; y++) {


containerArray.push(results[x].photos[y]);



}


}


callback(null,containerArray);


});


} , function(arg){

res.json(arg);

}],function (err, result) {


if(err) return(err);

res.json(result);


});


});

app.post('/api/mobile/payment/', multipartMiddleware, function(req,res) {

console.log("request : ",req);

console.log("request body: ",req.body);

console.log("request query: ",req.query);
//var rString = randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

 var rString = "";

 var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ ) {


        rString += possible.charAt(Math.floor(Math.random() * possible.length));

  }


var availability = [];

var offersArray = [];

var roomsIdArray = [];

var resID ;

var fromdate = req.query.fromdate.split("-")[2]+"-"+req.query.fromdate.split("-")[1]+"-"+req.query.fromdate.split("-")[0];

var todate = req.query.todate.split("-")[2]+"-"+req.query.todate.split("-")[1]+"-"+req.query.todate.split("-")[0];

var hotelID = new mongo.ObjectID( '5855a1f3523d3f70c7dd48ac');

var offerArray = [];

var amentityArray = [];

var roomsArray = [];

if (typeof req.query.offerarray != 'undefined') { var obj = [];

obj = JSON.parse(req.query.offerarray[0]); offerArray = obj ; } else { offerArray = null ; } ;


if (typeof req.query.amenityarray != 'undefined')  { var obj = [];

console.log(req.query.amenityarray[0]);

obj = JSON.parse(req.query.amenityarray[0]); amentityArray = obj ; } else { amentityArray = null  ; } ;


if (typeof req.query.roomarray != 'undefined')  { var obj = [];

obj = JSON.parse(req.query.roomarray[0]); roomsArray = obj; } else { roomsArray = null  ; } ;


waterfall([

function(callback){

db.collection("hotels").find({"_id":hotelID}, {'rooms': true} ).toArray(function(err, results) {
      
if (err) return next(err)

for (x = 0; x < results[0].rooms.length; x++) { 

if (results[0].rooms[x].booking.length != 0) {

for (y = 0; y < results[0].rooms[x].booking.length; y++) { 

for (z = 0; z < results[0].rooms[x].booking[y].length; z++) { 



if ( (new Date(results[0].rooms[x].booking[y][z].fromdate) <= new Date(fromdate)  &&  new Date(results[0].rooms[x].booking[y][z].enddate) >= new Date(fromdate) ) || (new Date(results[0].rooms[x].booking[y][z].fromdate) <= new Date(todate)  &&  new Date(results[0].rooms[x].booking[y][z].enddate) >= new Date(todate) ) ) {


            roomsIdArray.push(results[0].rooms[x]._id);


      }


}




}



}



}



 callback(null,roomsIdArray,results);



});


},function(arg1,arg2,callback){

if(arg1.length > 0 ){

var obj = [];

obj = JSON.parse(req.query.roomarray[0]);

for (i = 0; i < obj.length; i++) { 

if(arg1.indexOf(obj[i]._id) != -1 ){


     var response = {"ERROR":"One or more of your rooms has now been booked."};
        
      res.json(response);

}



}



}else{


callback(null);

}


  },function(callback){


var nonce = req.query.payment_method_nonce;

var deposit = req.query.deposit;

console.log(deposit);


gateway.transaction.sale({
  
                                    amount:deposit,
  
                                    paymentMethodNonce:"fake-valid-nonce",
  options: {

    submitForSettlement: true
  
  }

}, function (err, result) {



 if (err) {



    console.log(err.type); // "notFoundError"
    console.log(err.name); // "notFoundError"
    console.log(err.message); // "Not Found"
  


  } else {

    
   
  
console.log("Payment ERRORS NONE");

if(!result.success)
{



var response = {"ERROR":result};
        
res.json(response);




}

else

{


console.log("Payment ERRORS NONE");

var tripID ;

console.log(req.query.tripID);

if(req.query.tripID){

console.log("trip"+req.query.tripID);

db.collection('itinerary').insert( [


{


          "name":req.query.name,
          "email":req.query.email,
          "phone":req.query.phone,
          "numoftravellers":req.query.numoftravellers,
          "numofadults":req.query.numofadults,
          "numofchildren":req.query.numofchildren,
          "numofinfants":req.query.numofinfants,
          "subtotaladmission":req.query.subtotaladmission,
          "subtotalavergae":req.query.subtotalavergae,
          "carhire":req.query.carhire,
          "tax":req.query.triptax,
          "total":req.query.triptotal,
          "places":req.query.places,


}], function(err, results) { 


tripID  = results.insertedIds[0];

console.log("trip"+results.insertedIds[0]);
      
console.log("trip"+tripID);

callback(null,tripID);


});

//= new mongo.ObjectID( req.query.tripID);

}else{


callback(null,tripID);



}
                      

}
  

  }









});




   },function(arg1,callback){


tripID = arg1; 

var name = req.query.fname.concat(" ").concat(req.query.lname);

name = name.trim();

db.collection('reservation').insert( [


{




          "token":rString,
          "fname":req.query.fname,
          "lname":req.query.lname,
          "phone":req.query.phone,
          "email":req.query.email,
          "numofdays":req.query.numofdays,
          "numofadults":req.query.numofadults,
          "numofchildren":req.query.numofchildren,
          "numofinfants":req.query.numofinfants,
          "fromdate":req.query.fromdate,
          "todate":req.query.todate,
          "subtotal":req.query.subtotal,
          "amenityTotal":req.query.amenityTotal,
          "discount":req.query.discount,
          "deposit":req.query.deposit,
          "total":req.query.total,
          "tripID":tripID,
          "offers":offerArray,
          "amenities":amentityArray,
          "rooms":roomsArray,
          "photos":[],
          "name":name,
   


}], function(err, results) { 

var o_id = new mongo.ObjectID(results.insertedIds[0]);

db.collection('reservation').findOne({ "_id": o_id  },function(e, results){


if (e) return next(e)

var costofrooms = 0 ;

var costofbreakfast = 0 ;

var costofairportpickup = 0 ;

var tax = 0;

var total = 0 ;

var discount = 0;


for(var a = 0 ; a < results.rooms.length ; a++ ){


costofrooms = costofrooms + (results.rooms[a].price * results.numofdays);



}

costofrooms = costofrooms.toFixed(2);


for(var b = 0 ; b < results.amenities.length ; b++ ){


if(results.amenities[b].name == 'Breakfast'){


  costofbreakfast = Number(results.amenities[b].price) * (results.numofadults + results.numofchildren);

  costofbreakfast = costofbreakfast.toFixed(2);
}
else if(results.amenities[b].name == 'Airport Pickup'){

 costofairportpickup = Number(results.amenities[b].price) * results.rooms.length;

costofairportpickup = costofairportpickup.toFixed(2);

}


}


total = results.total;

var balance = Number(total) - Number(req.query.deposit);

for(var c = 0 ; c < results.offers.length ; c++ ){


discount = discount + (results.offers[c].amount * total) ;

}

var fullname = results.fname +' '+results.lname;  

var template_name = "Booking confirmation sent to business";

var template_content = [{
        "name": "",
        "content": ""
    }]; 

var message = {

    "subject": "Sinopia Inn Booking Confirmation",
    "from_email": "info@sinopiainn.com",
    "from_name": "Sinopia Inn",
    "to": [
        {
            "email": results.email,
            "name": fullname,
            "type": "to"
        }

        ],


    "headers": {
        "Reply-To": "info@sinopiainn.com"
    },

    "important": false,
    "track_opens": null,
    "track_clicks": null,
    "auto_text": null,
    "auto_html": null,
    "inline_css": null,
    "url_strip_qs": null,
    "preserve_recipients": null,
    "view_content_link": null,
    "bcc_address": "machelslack@icloud.com",
    "tracking_domain": null,
    "signing_domain": null,
    "return_path_domain": null,
    "merge": true,
    "merge_language": "handlebars",
    "global_merge_vars":[{
            "name": "name",
            "content": results.fname
        },{
            "name": "dateofarrival",
            "content": results.fromdate
        },{
            "name": "bookingID",
            "content": results._id
        },{
            "name": "dateofleave",
            "content": results.todate
        },{
            "name": "numofrooms",
            "content": results.rooms.length
        },{
            "name": "numofdays",
            "content": results.numofdays
        },{
            "name": "costofrooms",
            "content": costofrooms
        },{
            "name": "costofbreakfast",
            "content": costofbreakfast
        },{
            "name": "costofairportpickup",
            "content": costofairportpickup
        },{
            "name": "discount",
            "content": discount
        },{
            "name": "phone",
            "content": results.phone
        },{
            "name": "email",
            "content": results.email
        },{
            "name": "adults",
            "content": results.numofadults
        },{
            "name": "children",
            "content": results.numofchildren
        },{
            "name": "infants",
            "content": results.numofinfants
        },{
            "name": "tax",
            "content": tax
        },{
            "name": "total",
            "content": total
        },{
            "name": "deposit",
            "content": req.query.deposit
        },{
            "name": "balance",
            "content": balance
        },{

            "name":"token",
            "content":rString

        }

        ],
    "merge_vars": [{
            "rcpt": "recipient.email@example.com",
            "vars": [{
                    "name": "merge2",
                    "content": "merge2 content"
                }]
        }],
    /*"tags": [
        "password-resets"
    ],
    "subaccount": "customer-123",
    "google_analytics_domains": [
        "example.com"
    ],
    "google_analytics_campaign": "message.from_email@example.com",*/
    "metadata": {
        "website": "www.sinopiainn.com"
    },
    /*"recipient_metadata": [{
            "rcpt": "recipient.email@example.com",
            "values": {
                "user_id": 123456
            }
        }],*/
   /* "attachments": [{
            "type": "application/pdf",
            "name": "sinopiainn_booking_confirmation.pdf",
            "content": jsfile
        }],*/
    /*images": [{
            "type": "image/png",
            "name": "IMAGECID",
            "content": "ZXhhbXBsZSBmaWxl"
        }]*/
};

var async = false;
var ip_pool = "Main Pool";
var send_at = "2016-10-10 23:59:59";

mandrill_client.messages.sendTemplate({"template_name": template_name, "template_content": template_content, "message": message, "async": async, "ip_pool": ip_pool, "send_at": send_at}, function(result) {

           callback(null,o_id,results);

}, function(e) {

if(e){return  console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message); }
   
 
});



 });


});

   } ,function(arg1, arg2, callback){


//JSON.stringify(req.query.roomarray[0]);

var obj = [];

obj = JSON.parse(req.query.roomarray[0]);

for (x = 0; x < obj.length; x++) { 



  db.collection('hotels').updateOne( {"rooms._id":obj[x]._id}, { $push: {"rooms.$.booking": [{ 


"RID" : arg1,
"fromdate" : fromdate , 
"enddate" : todate 

} ] } } , function(err, results) { 


 });


}


  callback(null,arg2,arg1);

   
  },function(arg1,arg2){


var name = req.query.fname.concat(" ").concat(req.query.lname);

name = name.trim();

var directory =  name+"/"+arg2+".jpg"; 

var s3Bucket = new AWS.S3( { params: {Bucket: bucket} } );

fs.readFile(req.files.displayImage.path, function (err, data) {


   if (err) {


      return console.error(err);
   
      var response = {"ERROR":"There was an system error. Please contact the web administrator."};

      res.json(response);

   }else{


var params = {Key: directory, Body: data};

    s3Bucket.putObject(params, function(err, data) {
  
        if (err) {
            

            var response = {"ERROR":"Error creating your booking:"};

            res.json(response);

            console.log("Error uploading data: ", err);

        } else {
           
var directory =  name+"/"+arg2; 

var params = {Key: directory, Body: arg1};

  s3Bucket.putObject(params, function(err, data) {
  
        if (err) {
            

            var response = {"ERROR":"Error creating your booking:"};

            res.json(response);

            console.log("Error uploading data: ", err);

        } else {
           
         

            var response = {"ERROR":"","ReservationID":arg1};

            res.json(response);


           
        }


    });


           
        }
    });


   }


 });

    

/*


var directory = "public/reservations/"+name+"/"; 

if (!fs.existsSync(directory)) {


fs.mkdir(directory,function(err){

   if (err) {
      return console.error(err);
   }



fs.readFile(req.files.displayImage.path, function (err, data) {


   if (err) {


      return console.error(err);
   
      var response = {"ERROR":"There was an system error. Please contact the web administrator."};

      res.json(response);



   }



 fs.writeFile(directory+arg2+'.jpg', data, function (err) {


   var balance = Number(req.query.total) - Number(req.query.deposit);

   var response = {"ERROR":"","Reservation":arg1};

   res.json(response);
  
  console.log(response);

  console.log(directory+arg2+'.jpg');

   console.log("Directory created successfully!");



        });





 });



   


});



}else {



  fs.readFile(req.files.displayImage.path, function (err, data) {


   if (err) {


      return console.error(err);
   
      var response = {"ERROR":"There was an system error. Please contact the web administrator."};

      res.json(response);



   }



 fs.writeFile(directory+arg2+'.jpg', data, function (err) {


   var balance = Number(req.query.total) - Number(req.query.deposit);

   var response = {"ERROR":"","Reservation":arg1};

   res.json(response);
  
  console.log(directory+arg2+'.jpg');

   console.log("Directory created successfully!");



        });

 });

}

*/




}







        ], function (err, result) {


if(err) return(err);

res.json(result);





});


});


app.get('/api/login/', function (req, res) {


db.collection('reservation').find({}).toArray(function(e, results){


    if (e) return next(e)


   
      res.json(results);



});



});



 

app.post('/api/newmessage/', function (req, res) {

console.log(req.query.body);


var message = new gcm.Message({
    collapseKey: 'demo',
    priority: 'high',
    contentAvailable: true,
    delayWhileIdle: true,
    timeToLive: 3,
    restrictedPackageName: "com.example.home.sinopiainntravelapp",
    dryRun: false,
    data: {
        key1: req.query.body,
        key2: 'message2'
    },
    notification: {
        title: "Sinopia Inn",
        icon: "ic_launcher",
        body: req.query.body.substring(0, 11) + "...",
    }

});

// Set up the sender with you API key, prepare your recipients' registration tokens. 
var sender = new gcm.Sender('AIzaSyCQ-ngrwzhZ9JiCBXL-sVk_4pbdeD55Lek');

var regTokens = [req.query.sender];
 
sender.send(message, { registrationTokens: regTokens }, function (err, response) {
    if(err) console.error(err);
    else  res.json(response);
});



});

/********* END OF MOBILE API'S *********/




app.get('/api/businesses', function (req, res) {

   
db.collection('placesofinterest').find( ).toArray(function(e, results){


   res.json(results);


});

});



/********* START OF WEB API'S *********/


app.post('/api/booktrip/', function (req, res) {


db.collection('itinerary').insert( [


{

          "token":req.query.token,
          "name":req.query.name,
          "email":req.query.email,
          "phone":req.query.phone,
          "numoftravellers":req.query.numoftravellers,
          "numofadults":req.query.numofadults,
          "numofchildren":req.query.numofchildren,
          "numofinfants":req.query.numofinfants,
          "subtotaladmission":req.query.subtotaladmission,
          "subtotalavergae":req.query.subtotalavergae,
          "carhire":req.query.carhire,
          "mileFare":req.query.milesFare,
          "minuteFare":req.query.minuteFare,
          "dist":req.query.dist,
          "tax":req.query.tax,
          "total":req.query.total,
          "places[]":req.body['places[]'],



}], function(err, results) { 

resID = results.insertedIds[0];

db.collection('hotels').updateOne( {"token":req.query.token}, { $set: { "tripID": resID } } , function(err, results) { 


       var response = {"ERROR":"","tripID":resID};
        
       res.json(response);




 });

      



});



});



app.get('/api/checkhotelavailability/', function (req, res) {

var o_id = new mongo.ObjectID("5855a1f3523d3f70c7dd48ac");

var availability = [];

var offersArray = [];

var roomsIdArray = [];

var fromdate = req.query.fromdate.split("-")[2]+"-"+req.query.fromdate.split("-")[1]+"-"+req.query.fromdate.split("-")[0];

var todate = req.query.todate.split("-")[2]+"-"+req.query.todate.split("-")[1]+"-"+req.query.todate.split("-")[0];

waterfall([
  
  function(callback){


db.collection("hotels").find({"_id":o_id}, {'rooms': true } ).toArray(function(err, results) {
  
    
 if (err) return next(err)

for (x = 0; x < results[0].rooms.length; x++) { 




if (results[0].rooms[x].booking.length != 0) {

for (y = 0; y < results[0].rooms[x].booking.length; y++) { 

for (z = 0; z < results[0].rooms[x].booking[y].length; z++) { 




if ( (new Date(results[0].rooms[x].booking[y][z].fromdate) <= new Date(fromdate)  &&  new Date(results[0].rooms[x].booking[y][z].enddate) >= new Date(fromdate) ) || (new Date(results[0].rooms[x].booking[y][z].fromdate) <= new Date(todate)  &&  new Date(results[0].rooms[x].booking[y][z].enddate) >= new Date(todate) ) ) {


            roomsIdArray.push(results[0].rooms[x]._id);


      }


}




}



}



}



 callback(null,roomsIdArray,results);



});



  },function(arg1,arg2,callback){




                          if( arg1.length === 0)
                          

                          {



                                   db.collection("hotels").find({"_id":o_id}, {'rooms': true} ).toArray(function(e, results){


                                            if (e) return next(e)

                                            availability.push(results[0].rooms);



                                            callback(null);
    
                                 
                                                                                                });

                          }
                            

                            else
                          

                          {


                                            var arrayofIDs = [];


                                              arrayofIDs = arg1;


var availableRooms = [];
                                   
                                     db.collection("hotels").find({"_id":o_id}, {'rooms':true } ).toArray(function(err, results) {

                                
     if (err) return next(err)





for (i = 0; i < results[0].rooms.length; i++) { 


if(arrayofIDs.indexOf(results[0].rooms[i]._id) === -1 ){


availableRooms.push(results[0].rooms[i]);


}



}


availability.push(availableRooms);

                                       


                                            callback(null);
    
                                 
                                                                             });

                          

                          }



   
  },function(callback){
    

db.collection("hotels").find({"_id":o_id}, {'offers': true} ).toArray(function(err, results) {
      
if (err) return next(err)

for (x = 0; x < results[0].offers.length; x++) { 


if ( (new Date(results[0].offers[x].validdate) <= new Date(fromdate)  &&  new Date(results[0].offers[x].exdate) >= new Date(fromdate) ) || (new Date(results[0].offers[x].validdate) <= new Date(todate)  &&  new Date(results[0].offers[x].exdate) >= new Date(todate) ) ) {


            offersArray.push(results[0].offers[x]);


      }



}

 callback(null,offersArray,results);


});





  
  },function(arg1,arg2,callback){

//db.temp.find({b: {$elemMatch: {$gte: 4, $lt: 5}}})

if(req.query.promo){






db.collection("hotels").find({"_id":o_id }, { "offers": { $elemMatch: { "token": req.query.promo } } }  ).toArray(function(e, results){

//db.collection("hotels").find({"_id":o_id }, { "offers": { "$elemMatch": { "$or": [{ "token": req.query.promo  },{ "nights": "3"  } ] }}}  ).toArray(function(e, results){

//db.collection("hotels").find({"_id":o_id }, { "offers": { "$elemMatch": {  "nights": { $gte:3 } } } } ).toArray(function(e, results){



if (e) return next(e)


      if (results.length > 0 ) {


            arg1.push(results[0].offers[0]);


      }


    //availability.push(arg1);


});




 } 



db.collection("hotels").find({"_id":o_id }, { "offers": { $elemMatch: { "nights":{ $lte : Number(req.query.nights) }  } } }  ).toArray(function(e, results){


console.log(results[0].offers);

if (e) return next(e)


if(  typeof results[0].offers != 'undefined'  ){


  if (results.length > 0 ) {


            arg1.push(results[0].offers[0]);


      }


}
    

    availability.push(arg1);


});



 db.collection("hotels").find({"_id":o_id}, {'amenities': true} ).toArray(function(e, results){


                                            if (e) return next(e)


                                            availability.push(results[0].amenities);
    
                                    
                                            res.json(availability);
                                 
                                                                                                });


  }], function (err, result) {
 

    if (err) return next(err)

    res.send(results);


});






  });


app.get("/api/checkout/", function (req, res) {

 gateway.clientToken.generate({}, function (err, response) {


    res.send(response.clientToken);

  });


});

/*
app.get("/api/booking-confirmation",function(req,res) {



      var transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: 'machelslack@hotmail.com', 
            pass: '321123ETz@'
        }
    });

var file = req.query.resID+'.pdf';

var mailOptions = {
    from: '"Fred Foo ?" <machelslack@hotmail.com>',
    to: 'machelslack@icloud.com', 
    subject: 'Hello ✔', 
    text: 'Hello world ?',
    html: "<b>Hello world ?</b>", 
    attachments:[{ filename: file, path: 'http://www.sinopiainn.com/public/reservations/'+req.query.reservationID+'.pdf'}],
};

transporter.sendMail(mailOptions, function(error, info){

    if(error){
  
        return console.log(error);
    }


});


});*/


app.get("/api/reservation-details/", function (req, res) {



var hotelID = new mongo.ObjectID( '5855a1f3523d3f70c7dd48ac');

var o_id = new mongo.ObjectID(req.query.reservationID);



db.collection('reservation').findOne({ "_id": o_id  },function(e, results){


                                                           if (e) return next(e)

        
                                                    res.json(results);
                                          
    
                                 
                                                                             });


});

app.post('/api/personaldetails/', function(req,res) {


 var rString = "";

 var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ ) {


        rString += possible.charAt(Math.floor(Math.random() * possible.length));

  }


var tripID = new mongo.ObjectID(req.query.tripID);

console.log(tripID);

var availability = [];

var offersArray = [];

var roomsIdArray = [];

var resID ;

var fromdate = req.query.fromdate.split("-")[2]+"-"+req.query.fromdate.split("-")[1]+"-"+req.query.fromdate.split("-")[0];

var todate = req.query.todate.split("-")[2]+"-"+req.query.todate.split("-")[1]+"-"+req.query.todate.split("-")[0];

var hotelID = new mongo.ObjectID( '5855a1f3523d3f70c7dd48ac');

var offerArray = [];

var amentityArray = [];

var roomsArray = [];

if (typeof req.body['offerarray[]'] != 'undefined') { offerArray = req.body['offerarray[]'] ; } else { offerArray = null ; } ;


if (typeof req.body['amenityarray[]'] != 'undefined')  { amentityArray = req.body['amenityarray[]'] ; } else { amentityArray = null  ; } ;


if (typeof req.body['roomarray[]'] != 'undefined')  { roomsArray = req.body['roomarray[]'] ; } else { roomsArray = null  ; } ;





waterfall([function(callback){

console.log("block 1");

db.collection("hotels").find({"_id":hotelID}, {'rooms': true} ).toArray(function(err, results) {
  
    
if (err) return next(err)

for (x = 0; x < results[0].rooms.length; x++) { 

if (results[0].rooms[x].booking.length != 0) {

for (y = 0; y < results[0].rooms[x].booking.length; y++) { 

for (z = 0; z < results[0].rooms[x].booking[y].length; z++) { 

if ( (new Date(results[0].rooms[x].booking[y][z].fromdate) <= new Date(fromdate)  &&  new Date(results[0].rooms[x].booking[y][z].enddate) >= new Date(fromdate) ) || (new Date(results[0].rooms[x].booking[y][z].fromdate) <= new Date(todate)  &&  new Date(results[0].rooms[x].booking[y][z].enddate) >= new Date(todate) ) ) {


            roomsIdArray.push(results[0].rooms[x]._id);


      }

}

}

}

}

 callback(null,roomsIdArray,results);


});


}, function(arg1,arg2,callback){
   
   var booked = false ;

console.log("block 2");

     if(arg1.length > 0 )
    {


console.log("rooms array length" + roomsArray.length);

for (i = 0; i < roomsArray.length; i++) { 

console.log(arg1);

console.log(roomsArray[i]._id);

if(arg1.indexOf(roomsArray[i]._id) != -1 ){

booked = true; 
    

}



}



if(booked) {

 var response = {"ERROR":"One or more of your rooms has now been booked."};
        
      res.json(response);


}else{

  callback(null);

}




     

    }

    else
    
    {

console.log("block 2 going to next");

          callback(null);

    }

  




  },  function(callback){
   
console.log("block 3");
    
var nonce = req.query.payment_method_nonce;

var deposit = req.query.deposit.replace(",","");
 
gateway.transaction.sale({
  
                                    amount:deposit,
  
                                    paymentMethodNonce:nonce,
  options: {

    submitForSettlement: true
  
  }

}, function (err, result) {



 if (err) {



    console.log(err.type); // "notFoundError"
    console.log(err.name); // "notFoundError"
    console.log(err.message); // "Not Found"
  


  } else {

    
   
  

if(!result.success)
{


   console.log("Payment ERRORS"+result);

   res.end();


}

else

{





var name = req.query.fname.concat(" ").concat(req.query.lname);

db.collection('reservation').insert( [


{




          "token":rString,
          "fname":req.query.fname,
          "lname":req.query.lname,
          "phone":req.query.phone,
          "email":req.query.email,
          "numofdays":req.query.numofdays,
          "numofadults":req.query.numofadults,
          "numofchildren":req.query.numofchildren,
          "numofinfants":req.query.numofinfants,
          "fromdate":req.query.fromdate,
          "todate":req.query.todate,
          "subtotal":req.query.subtotal,
          "amenityTotal":req.query.amenityTotal,
          "discount":req.query.discount,
          "deposit":req.query.deposit,
          "total":req.query.total,
          "tripID":req.query.tripID,
          "offers":offerArray,
          "amenities":amentityArray,
          "rooms":roomsArray,
          "photos":[],
          "name":name,
   
   


}], function(err, results) { 


          resID = results.insertedIds[0];

          callback(null,results.insertedIds[0],results);


});

                      

}
  

  }









});




   } ,function(arg1, arg2, callback){
   

for (x = 0; x < req.body['roomarray[]'].length; x++) { 


db.collection('hotels').updateOne( {"rooms._id":req.body['roomarray[]'][x]._id}, { $push: {"rooms.$.booking": [{ 


"RID" : arg1,
"fromdate" : fromdate , 
"enddate" : todate 

} ] } } , function(err, results) { 


 });


}


  //req.body['roomarray[]'].forEach(function(entry) {});

  callback(null,arg1,arg2);

   
  },function(arg1,arg2, callback){



var directory = req.query.fname+" "+req.query.lname+"/"+arg1; 

var s3Bucket = new AWS.S3( { params: {Bucket: bucket} } );

    var params = {Key: directory, Body: arg2};

    s3Bucket.putObject(params, function(err, data) {
  
        if (err) {
            

            var response = {"ERROR":"Error creating your booking:"};

            res.json(response);

            console.log("Error uploading data: ", err);

        } else {
           
            var balance = Number(req.query.total) - Number(req.query.deposit);

            var response = {"ERROR":"","ReservationID":arg1};

            res.json(response);
           
        }
    });


/*




if (!fs.existsSync(directory)) {


fs.mkdir(directory,function(err){

   if (err) {
      return console.error(err);
   }


    var balance = Number(req.query.total) - Number(req.query.deposit);

    var response = {"ERROR":"","ReservationID":arg1};

    res.json(response);
  
    console.log("Directory created successfully!");


});




}










fs.stat("public/reservations/", function (err, stats){

  if (err) {


    fs.mkdir("public/reservations/");

    client.convertURI('http://www.sinopiainn.com/booking-confirmation.html', pdf.saveToFile("public/reservations/"+req.query.reservationID+".pdf"));

    res.json(response);


  
  } else{


  if (!stats.isDirectory()) {
  
  
  } else {
  
    console.log('Does exist');
  
     
    client.convertURI('http://www.sinopiainn.com/booking-confirmation.html', pdf.saveToFile("public/reservations/"+req.query.reservationID+".pdf"));

    res.json(response);

  
  }


  }
  


});*/




}], function (err, result) {


if(err) return(err);

res.json(result);





});


});





app.get('/api/booking-confirmation/', function(req,res) {



var o_id = new mongo.ObjectID(req.query.reservationID);



db.collection('reservation').findOne({ "_id": o_id  },function(e, results){


                                                           if (e) return next(e)



var costofrooms = 0 ;

var costofbreakfast = 0 ;

var costofairportpickup = 0 ;

var tax = 0;

var total = 0 ;

var discount = 0;


for(var a = 0 ; a < results.rooms.length ; a++ ){


costofrooms = costofrooms + (Number(results.rooms[a].price) * Number(results.numofdays));



}

costofrooms = costofrooms.toFixed(2);


for(var b = 0 ; b < results.amenities.length ; b++ ){


if(results.amenities[b].name == 'Breakfast'){


  costofbreakfast = Number(results.amenities[b].price) * (Number(results.numofadults) + Number(results.numofchildren));


  costofbreakfast = costofbreakfast.toFixed(2);
}
else if(results.amenities[b].name == 'Airport Pickup'){

 costofairportpickup = Number(results.amenities[b].price) * Number(results.rooms.length);

costofairportpickup = costofairportpickup.toFixed(2);

}


}



total = results.total;


for(var c = 0 ; c < results.offers.length ; c++ ){


discount = discount + (Number(results.offers[c].amount) * Number(total)) ;


}

var fullname = results.fname +' '+results.lname;  

var template_name = "Booking confirmation sent to business";

var fname =  results.fname.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

var balance = Number(total) - Number(results.deposit);

var deposit = results.deposit;

balance = balance.toFixed(2);

var template_content = [{
        "name": "",
        "content": ""
    }]; 

var message = {

    "subject": "Sinopia Inn Booking Confirmation",
    "from_email": "info@sinopiainn.com",
    "from_name": "Sinopia Inn",
    "to": [
        {
            "email": results.email,
            "name": fullname,
            "type": "to"
        }

        ],


    "headers": {
        "Reply-To": "info@sinopiainn.com"
    },

    "important": false,
    "track_opens": null,
    "track_clicks": null,
    "auto_text": null,
    "auto_html": null,
    "inline_css": null,
    "url_strip_qs": null,
    "preserve_recipients": null,
    "view_content_link": null,
    "bcc_address": "machelslack@icloud.com",
    "tracking_domain": null,
    "signing_domain": null,
    "return_path_domain": null,
    "merge": true,
    "merge_language": "handlebars",
    "global_merge_vars":[{
            "name": "name",
            "content": fname
        },{
            "name": "dateofarrival",
            "content": results.fromdate
        },{
            "name": "bookingID",
            "content": results._id
        },{
            "name": "dateofleave",
            "content": results.todate
        },{
            "name": "numofrooms",
            "content": results.rooms.length
        },{
            "name": "numofdays",
            "content": results.numofdays
        },{
            "name": "costofrooms",
            "content": costofrooms
        },{
            "name": "costofbreakfast",
            "content": costofbreakfast
        },{
            "name": "costofairportpickup",
            "content": costofairportpickup
        },{
            "name": "discount",
            "content": discount
        },{
            "name": "phone",
            "content": results.phone
        },{
            "name": "email",
            "content": results.email
        },{
            "name": "adults",
            "content": results.numofadults
        },{
            "name": "children",
            "content": results.numofchildren
        },{
            "name": "infants",
            "content": results.numofinfants
        },{
            "name": "tax",
            "content": tax
        },{
            "name": "total",
            "content": total
        },{
            "name": "deposit",
            "content": deposit
        },{
            "name": "balance",
            "content": balance
        },{

            "name":"token",
            "content":rString

        }
        ],
    "merge_vars": [{
            "rcpt": "recipient.email@example.com",
            "vars": [{
                    "name": "merge2",
                    "content": "merge2 content"
                }]
        }],
    /*"tags": [
        "password-resets"
    ],
    "subaccount": "customer-123",
    "google_analytics_domains": [
        "example.com"
    ],
    "google_analytics_campaign": "message.from_email@example.com",*/
    "metadata": {
        "website": "www.sinopiainn.com"
    },
    /*"recipient_metadata": [{
            "rcpt": "recipient.email@example.com",
            "values": {
                "user_id": 123456
            }
        }],*/
   /* "attachments": [{
            "type": "application/pdf",
            "name": "sinopiainn_booking_confirmation.pdf",
            "content": jsfile
        }],*/
    /*images": [{
            "type": "image/png",
            "name": "IMAGECID",
            "content": "ZXhhbXBsZSBmaWxl"
        }]*/
};

var async = false;
var ip_pool = "Main Pool";
var send_at = "2016-10-10 23:59:59";

mandrill_client.messages.sendTemplate({"template_name": template_name, "template_content": template_content, "message": message, "async": async, "ip_pool": ip_pool, "send_at": send_at}, function(result) {

res.send("done");


//callback(null,results.insertedIds[0],results);


}, function(e) {

if(e){return  console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message); }
   
 
});



 });




});
  



/*
request('http://www.sinopiainn.com/booking-confirmation.html').pipe(fs.createWriteStream('booking.html'));


request('http://www.sinopiainn.com/booking-confirmation.html', function (error, response, body) {

  if (!error && response.statusCode == 200) {
  
    console.log(body) // Show the HTML for the Google homepage.


    res.json(body);
  
  }


})
*/


/*

var options = { format: 'Letter' };
 
pdf.create(html, options).toFile('businesscard.pdf', function(err, res) {

  if (err) return console.log(err);
  
  console.log(res); 

});
*/



/********* END OF WEB API'S *********/



/********* START OF ADMIN API'S *********/


app.post('/api/trips/', function (req, res) {



db.collection('itinerary').deleteMany( {}, function(err, results) {
     
     
   });


   });


app.get('/api/trips/', function (req, res) {


db.collection('itinerary').find().toArray(function(e, results){


    if (e) return next(e);

res.json(results);

});

});


app.get('/api/trip/', function (req, res) {


var o_id = new mongo.ObjectID(req.query.tripID);


db.collection('itinerary').find({ "_id":o_id}).toArray(function(e, results){


    if (e) return next(e);

res.json(results);

});

});


app.post('/api/reservations/', function (req, res) {



db.collection('reservation').deleteMany( {}, function(err, results) {
     
     
   });


   });

app.post('/api/hotels/', function (req, res) {



db.collection('hotels').deleteMany( {}, function(err, results) {
     
     
   });


db.collection('hotels').insertOne( {"rooms":[{"_id":"1","name":"Camel", "description":"Air conditioned double occupancy bedroom with ensuite bathroom","occupancy":"2","icon":"/images/parrot_thumb.png","price":"70.00","booking":[],"adults":"0","children":"0","infants":"0"},{"_id":"2","name":"Puce", "description":"Double occupancy bedroom with ensuite bathroom","occupancy":"2","price":"73.00","icon":"/images/parrot_thumb.png","booking":[],"adults":"0","children":"0","infants":"0"},{"_id":"3","name":"Spring Bud","description":"Double occupancy bedroom with ensuite bathroom","occupancy":"2","price":"73.00","icon":"/images/parrot_thumb.png","booking":[],"adults":"0","children":"0","infants":"0"},{"_id":"4","name":"Coquelicot","description":"Quadruple occupancy bedroom with ensuite bathroom and lounge","occupancy":"4","price":"90.00","icon":"/images/parrot_thumb.png","booking":[],"adults":"0","children":"0","infants":"0"}],"offers":[{"_id":"1","name":"Summer & Autumn Discount 10%","description":"Validity period from 20th June to 14th December","amount":".10","validdate":"20-04-2016","exdate":"14-12-2016","token":"","nights":""},{"_id":"2","name":"Friends and family discount 15%","description":"All year","amount":".15","validdate":"","exdate":"","token":"marshmellows","nights":""},{"_id":"3","name":"Breakfast","description":"Traditional Jamaican Break - Mackrel Run Down with Chicken or Calloo alternatives","amount":"0","validdate":"","exdate":"","token":"","nights":3}],"amenities":[{"name":"Breakfast","description":"Traditional Jamaican breakfast","price":"10.00","frequency":"person",},{"name":"Airport Pickup","description":"Transportation to and from airport","price":"30.00","frequency":"room",},{"name":"Private Car Hire","description":"On and Off road SUV - seating capacity 5 plus baggage","price":"60.00","frequency":"night",}],"businessname":"Sinopia Inn","businessaddress":"Matthews Ave Port Antonio, Jamaica","businessphone":"+1 876-993-7267","businesswebsite":"http://www.hotelmockingbirdhill.com/","businessemail":"info@sinopiainn.com","businessdescription":"","country":"","coordinates":{"Latitude":"18.1763329","Longitude":"-76.44973749999997"},"nameofevent":"","timeofevent":"","dateofevent":"","activity":[{"typeofbusiness":"Accomodation","typeofservice":"Villa"}],"typeofactivity":[],"contactname":"","location":"","logourl":"","showcaseurl":[],"comments":[],"averagerating":"","avergaeprice":"","date":"","enabled":""}, function(err, result) {
 
    res.send("Inserted a document into the hotel collection.");
   
  });



});

app.get('/api/hotels/', function (req, res) {


db.collection('hotels').find().toArray(function(e, results){


                                            if (e) return next(e)


                                            res.json(results);
    
                                          

                                       
    
                                 
                                                                                                });


});



app.get("/api/reservations/", function (req, res) {


db.collection('reservation').find().toArray(function(e, results){


   res.json(results);


});


});

app.delete('/api/reviews/', function(req,res) {


db.collection('reviews').deleteMany( {}, function(err, results) {
     
     
   });



});


/********* END OF ADMIN API'S *********/





// production error handler
// no stacktraces leaked to user
/*app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
*/








app.post("/checkout", function (req, res) {

  //var nonce = req.body.payment_method_nonce;
  
  var nonce = req.query.payment_method_nonce;

  var total = req.query.total.replace(",","");

  gateway.transaction.sale({
  
                                    amount:total,
  
                                    paymentMethodNonce:nonce,
  options: {

    submitForSettlement: true
  
  }

}, function (err, result) {



 if (err) {



    console.log(err.type); // "notFoundError"
    console.log(err.name); // "notFoundError"
    console.log(err.message); // "Not Found"
  


  } else {

    
   
  

if(!result.success)
{


   res.end();


}

else

{


                              var response = {"ERROR":""};
        
                              res.json(response);

                    

                               res.end();

}
  

  }









});





});

















app.get("/api/confirm/", function (req, res) {

var o_id = new mongo.ObjectID(req.query.resID);

db.collection('reservation').findOne({ "_id": o_id  },function(e, results){


                                                           if (e) return next(e)

 var response = {"reservation":results};
        
                                                           res.json(response);

  
                                                                            });

});









//app.post('/upload-image', rawBody, function (req, res) {
app.post('/upload-image', multipartMiddleware, function(req, res) {

 console.log(req.files);
  
  console.log(req.files.displayImage);



  fs.readFile(req.files.displayImage.path, function (err, data) {
            //here get the image name and other data parameters which you are sending like image name etc.
           fs.writeFile('profile.jpg', data, function (err) {

console.log("Data written successfully!");

   console.log("Let's read newly written data");
   
 res.status(200, {status: 'OK'});

   //dont forgot the delete the temp files.
        });


             });

/*
var containerArray = [];

waterfall([

function(callback){

db.collection('reservations').find({"name":req.query.name}).toArray(function(e, results){


    if (e) return next(e)

      res.json(results);


fs.stat("public/reservations/"+results._id, function (err, stats){

  if (err) {


    //fs.mkdir("public/reservations/");

  
  } else {


  if (!stats.isDirectory()) {
  
  
  } else {
  
console.log('Does exist');
       
var filesArray = [];

fs.readdir("public/reservations/"+results._id, (err, files) => {


if ( typeof files != "undefined" ) {

  files.forEach(file => {

    filesArray.push(file);
   
  });


} 


});

  }


  }


});


var directory = '{ "images" : '+filesArray +',"name" :" ", "location" :" " ," from" : " ", " to ": " " }';

var obj = JSON.parse(directory);

containerArray.push(obj);

});


callback(containerArray);

},function(arg){


res.josn(containerArray);


}],function (err, result) {


if(err) return(err);

res.json(result);



});*/





/*

fs.writeFile('profile.jpg', req.body.displayImage, 'base64', function(err) {
    console.log(err);
});

    if (req.rawBody && req.bodyLength > 0) {


   fs.writeFile('profile.jpg', req.rawBody,  function(err) {

   if (err) {
   
      return console.error(err);
   
   }
   
   console.log("Data written successfully!");
   console.log("Let's read newly written data");
   
   fs.readFile('profile.jpg', function (err, data) {
   
      if (err) {
   
         return console.error(err);
   
      }
   
     
   
   });

});


        res.send(200, {status: 'OK'});
    } else {
        res.send(500);
    }
*/


});



/*app.get('/api/images/', function(req,res) {

var filesArray = [];

waterfall([

function(callback){


fs.stat("public/reservations/", function (err, stats){

  if (err) {


console.log("does not exist");

res.json(filesArray);

  
  }else{


fs.readdir('public/reservations/', (err, files) => {


files.forEach(file => {

    //
   
  if (fs.lstatSync('public/reservations/'+file).isDirectory()) {
  
  
fs.readdir('public/reservations/'+file, (err, files) => {



files.forEach(file => {


filesArray.push(file);

console.log(filesArray);

    });

});



  }


 });



});


  callback(null);

}


});




},function(callback){


   res.json(filesArray);


}],function (err, result) {


if(err) return(err);

res.json(result);



});




});*/








app.get('/api/mandrillTestEmail/', function(req,res) {


//http.get('http:///www.sinopiainn.com/public/pdfs/books/Machel Slack Web CV.pdf', function(response) {


/*fs.readFile('public/pdfs/books/Machel Slack Web CV.pdf', function (err, data) {

  
   if (err) {
  
      return console.error(err);
  
   }*/


var chunks = [];

var readableStream = fs.createReadStream('public/pdfs/books/Machel Slack Web CV.pdf');

var data = '';

readableStream.on('data', function(chunk) {

 

          chunks.push(chunk);

});

readableStream.on('end', function() {



      /*response.on('data', function(chunk) {

          console.log('downloading');

          chunks.push(chunk);

      });

      response.on("end", function() {*/

    
          
          var jsfile = new Buffer.concat(chunks).toString('base64');
        

var template_name = "Booking confirmation sent to business";

var template_content = [{
        "name": "",
        "content": ""
    }];

var message = {

    "subject": "Sinopia Inn Booking Confirmation",
    "from_email": "info@sinopiainn.com",
    "from_name": "Sinopia Inn",
    "to": [{
            "email": "machelslack@icloud.com",
            "name": "Sinopia Inn",
            "type": "to"
        }],
    "headers": {
        "Reply-To": "info@sinopiainn.com"
    },

    "important": false,
    "track_opens": null,
    "track_clicks": null,
    "auto_text": null,
    "auto_html": null,
    "inline_css": null,
    "url_strip_qs": null,
    "preserve_recipients": null,
    "view_content_link": null,
    "bcc_address": "machelslack@icloud.com",
    "tracking_domain": null,
    "signing_domain": null,
    "return_path_domain": null,
    "merge": true,
    "merge_language": "handlebars",
    "global_merge_vars": [{
            "name": "name",
            "content": "merge1 content"
        },{
            "name": "dateofarrival",
            "content": "merge1 content"
        }],
    "merge_vars": [{
            "rcpt": "recipient.email@example.com",
            "vars": [{
                    "name": "merge2",
                    "content": "merge2 content"
                }]
        }],
    /*"tags": [
        "password-resets"
    ],
    "subaccount": "customer-123",
    "google_analytics_domains": [
        "example.com"
    ],
    "google_analytics_campaign": "message.from_email@example.com",*/
    "metadata": {
        "website": "www.sinopiainn.com"
    },
    /*"recipient_metadata": [{
            "rcpt": "recipient.email@example.com",
            "values": {
                "user_id": 123456
            }
        }],*/
    "attachments": [{
            "type": "application/pdf",
            "name": "myfile.pdf",
            "content": jsfile
        }],
    /*images": [{
            "type": "image/png",
            "name": "IMAGECID",
            "content": "ZXhhbXBsZSBmaWxl"
        }]*/
};

var async = false;
var ip_pool = "Main Pool";
var send_at = "2016-10-10 23:59:59";

mandrill_client.messages.sendTemplate({"template_name": template_name, "template_content": template_content, "message": message, "async": async, "ip_pool": ip_pool, "send_at": send_at}, function(result) {

    console.log(result);

}, function(e) {

    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
 
});


        
      });





});









module.exports = app;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
