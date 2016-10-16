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


var mongoose = require('mongoose');

var MONGOLAB_URI = 'mongodb://sinopiainn-administrator:321123ETz$@ds057476.mlab.com:57476/heroku_mn2k4bdf';



var db = mongoose.createConnection(MONGOLAB_URI);

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.use(compression());

app.use(express.static('public'));

app.use(express.static('tools'));

app.use(express.static(__dirname + '/'));

process.env.NODE_ENV = 'development';


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


app.get('connect', function (req, res) {

      res.sendFile(path.join(__dirname + "/public/connect.html"));

      })


app.use(express.static('bower_components'));


app.use(bodyParser.json());



var hotelID = '57ffa3bd7d73f20010ef5c7e';


var braintree = require("braintree");


var gateway = braintree.connect({

  environment: braintree.Environment.Sandbox,

  merchantId: "srhrsqv4gy3hq4ph",

  publicKey: "43rvqc54k6f95qvq",

  privateKey: "501e4b051264b96427f0ceddf2383920"


});



app.get('/api/businesses', function (req, res) {

   
db.collection('placesofinterest').find( ).toArray(function(e, results){


   res.json(results);


});

});


app.post('/api/booktrip/', function (req, res) {


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



app.get('/api/trip/', function (req, res) {


var o_id = new mongo.ObjectID(req.query.tripID );


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


db.collection('hotels').insertOne( {"rooms":[{"_id":"1","name":"Camel", "description":"Air conditioned double occupancy bedroom with ensuite bathroom","occupancy":"2","icon":"/images/parrot_thumb.png","price":"160.00","booking":[]},{"_id":"2","name":"Puce", "description":"Double occupancy bedroom with ensuite bathroom","occupancy":"2","price":"135.00","icon":"/images/parrot_thumb.png","booking":[]},{"_id":"3","name":"Spring Bud","description":"Double occupancy bedroom with ensuite bathroom","occupancy":"2","price":"135.00","icon":"/images/parrot_thumb.png","booking":[]},{"_id":"4","name":"Coquelicot","description":"Quadruple occupancy bedroom with ensuite bathroom and lounge","occupancy":"4","price":"180.00","icon":"/images/parrot_thumb.png","booking":[]}],"offers":[{"_id":"1","name":"Summer & Autumn Discount 10%","description":"Validity period from 20th June to 14th December","amount":".10","validdate":"20-04-2016","exdate":"14-12-2016","token":""},{"_id":"2","name":"Friends and family discount 15%","description":"All year","amount":".15","validdate":"","exdate":"","token":"marshmellows"}],"amenities":[{"_id":"1","name":"Breakfast","description":"Traditional Jamaican breakfast","price":"10.00","frequency":"person",},{"_id":"2","name":"Airport Pickup","description":"Transportation to and from airport","price":"30.00","frequency":"room",},{"_id":"3","name":"Private Car Hire","description":"On and Off road SUV - seating capacity 5 plus baggage","price":"60.00","frequency":"night",}],"businessname":"Sinopia Inn","businessaddress":"Matthews Ave Port Antonio, Jamaica","businessphone":"+1 876-993-7267","businesswebsite":"http://www.hotelmockingbirdhill.com/","businessemail":"","businessdescription":"","country":"Jamaica","coordinates":{"Latitude":"18.1763329","Longitude":"-76.44973749999997"},"nameofevent":"","timeofevent":"","dateofevent":"","activity":[{"typeofbusiness":"Accomodation","typeofservice":"Villa"}],"typeofactivity":[],"contactname":"","location":"","logourl":"","showcaseurl":[],"comments":[],"averagerating":"","avergaeprice":"","date":"","enabled":""}, function(err, result) {
 
    res.send("Inserted a document into the hotel collection.");
   
  });



});

app.get('/api/hotels/', function (req, res) {


db.collection('hotels').find().toArray(function(e, results){


                                            if (e) return next(e)


                                            res.json(results);
    
                                          

                                       
    
                                 
                                                                                                });


});



app.get('/api/checkhotelavailability/', function (req, res) {

var o_id = new mongo.ObjectID("57ffa3bd7d73f20010ef5c7e");

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





  
  },function(arg1,callback){



if(req.query.promo){



db.collection("hotels").find({"_id":o_id }, { "offers": { $elemMatch: { "token": req.query.promo } } }  ).toArray(function(e, results){



if (e) return next(e)


      if (results.length > 0 ) {


            arg1.push(results[0].offers[0]);


      }



    

    availability.push(arg1);


    
      
    

});




 } 


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





app.get('/api/checkavailability/', function (req, res) {

var availability = [];

var offersArray = [];

var roomsIdArray = [];


var o_id = new mongo.ObjectID(hotelID);




var fromdate = req.query.fromdate.split("-")[2]+"-"+req.query.fromdate.split("-")[1]+"-"+req.query.fromdate.split("-")[0];

var fromdate = req.query.fromdate.split("-")[2]+"-"+req.query.fromdate.split("-")[1]+"-"+req.query.fromdate.split("-")[0];
var todate = req.query.todate.split("-")[2]+"-"+req.query.todate.split("-")[1]+"-"+req.query.todate.split("-")[0];

async.waterfall([

function(callback){

db.collection("hotels").find({"_id":o_id}, {'rooms': true} ).toArray(function(e, results){


    if (e) return next(e)


 async.eachSeries(results,function(item,callback) {
 
      
      if ( new Date(item.booking.fromdate) <= new Date(fromdate)  &&  new Date(item.booking.enddate) >= new Date(todate)  ) {


            roomsIdArray.push(item);


      }


               
          
               callback(e);


                                                      });



    callback(null,roomsIdArray);
    

});


},function(arg,callback){



                          if( arg.length === 0)
                          

                          {


                                   db.collection("hotels").find({"_id":o_id}, {'rooms': true} ).toArray(function(e, results){


                                            if (e) return next(e)


                                            availability.push(results);
    

                                            callback(null);
    
                                 
                                                                                                });

                          }
                            

                            else
                          

                          {


                                    var arrayofIDs = [];


                                            arg.forEach(function(entry) {
    

                                            if(entry._id !== undefined)

                                            
                                            {

                                           
                                             arrayofIDs.push(entry._id);  


                                            }
  
                                                                            });

                                db.collection("hotels").find({"_id":o_id}, {'rooms': true} ).toArray(function(err, results) {

                                

res.json(results);
                                            if (e) return next(e)


                                            availability.push(results);


                                            callback(null);
    
                                 
                                                                             });

                          

                          }



} , function(callback) {



db.collection('offers').find().toArray(function(e, results){


if (e) return next(e)


      async.eachSeries(results,function(item,callback) {


      if (new Date(item.validdate) <= new Date(fromdate)  && new Date(item.exdate) >= new Date(todate) ) {


            offersArray.push(item);


      }


               
          
               callback(e);


                                                      }, function done() {
  //...


   // availability.push(offersArray);

    callback(null,offersArray);
      


});



   
    

});


} , function(arg1,callback) {


db.collection('offers').find(  { "token":req.query.promo } ).toArray(function(e, results){


if (e) return next(e)


    
      if (results.length > 0 ) {


            arg1.push(results[0]);


      }



    availability.push(arg1);

    callback(null);
      
    

});

} ,

function(callback) {

                              db.collection('amenities').find({}).toArray(function(e, results){


                                            if (e) return next(e)


                                            availability.push(results);
    
                                     
                                            res.json(availability);
                                 
                                                                                                });

}

] , function (err, result) {
 





  });





});



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



app.get("/api/mobile/checkout/", function (req, res) {

 gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
  });

});


app.get("/api/checkout/", function (req, res) {

 gateway.clientToken.generate({}, function (err, response) {


    res.send(response.clientToken);
  });

});

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




app.get("/api/testHTML/", function (req, res) {

 var transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: 'machelslack@hotmail.com', 
            pass: '321123ETz@' 
        }
    });


var mailOptions = {
    from: '"Fred Foo ?" <machelslack@hotmail.com>',
    to: 'machelslack@icloud.com', 
    subject: 'Hello ✔', 
    text: 'Hello world ?', 
    html: "<b>Hello world ?</b>", 
    attachments:[{ filename: 'Machel Slack Web CV.pdf', path: 'http://www.sinopiainn.com/public/pdfs/books/Machel Slack Web CV.pdf'}],
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
});


});



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


});




app.get("/api/reservations/", function (req, res) {


db.collection('reservation').find().toArray(function(e, results){


   res.json(results);


});


});



app.get("/api/reservation-details/", function (req, res) {



var hotelID = new mongo.ObjectID( '57ffa3bd7d73f20010ef5c7e');

var o_id = new mongo.ObjectID(req.query.reservationID);



db.collection('reservation').findOne({ "_id": o_id  },function(e, results){


                                                           if (e) return next(e)

        
                                                    res.json(results);
                                          
    
                                 
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



app.post('/api/personaldetails/', function(req,res) {


var tripID = new mongo.ObjectID( req.query.tripID);

var availability = [];

var offersArray = [];

var roomsIdArray = [];

var resID ;

var fromdate = req.query.fromdate.split("-")[2]+"-"+req.query.fromdate.split("-")[1]+"-"+req.query.fromdate.split("-")[0];

var todate = req.query.todate.split("-")[2]+"-"+req.query.todate.split("-")[1]+"-"+req.query.todate.split("-")[0];

var hotelID = new mongo.ObjectID( '57ffa3bd7d73f20010ef5c7e');

waterfall([function(callback){



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
    


     if(arg1.length > 0 )
    {



for (i = 0; i < roomsArray.length; i++) { 


if(arg1.indexOf(roomsArray._id) === -1 ){


     var response = {"ERROR":"One or more of your rooms has now been booked."};
        
      res.json(response);

}



}



     

    }

    else
    
    {



          callback(null);

    }

  




  },  function(callback){
   

    
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



var offerArray = [];

var amentityArray = [];

var roomsArray = [];

if (typeof req.body['offerarray[]'] != 'undefined') { offerArray = req.body['offerarray[]'] ; } else { offerArray = null ; } ;


if (typeof req.body['amenityarray[]'] != 'undefined')  { amentityArray = req.body['amenityarray[]'] ; } else { amentityArray = null  ; } ;


if (typeof req.body['roomarray[]'] != 'undefined')  { roomsArray = req.body['roomarray[]'] ; } else { roomsArray = null  ; } ;





db.collection('reservation').insert( [


{





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
   


}], function(err, results) { 


          resID = results.insertedIds[0];

          callback(null,results.insertedIds[0]);


});

                      

}
  

  }









});




   } ,function(arg1, callback){
   


  req.body['roomarray[]'].forEach(function(entry) {
                              
                            
  db.collection('hotels').updateOne( {"rooms._id":entry._id}, { $push: {"rooms.$.booking": [{ 


"RID" : arg1,
"fromdate" : fromdate , 
"enddate" : todate 

} ] } } , function(err, results) { 


 });


                               });

  callback(null,arg1);

   
  },function(arg1, callback){


var balance = Number(req.query.total) - Number(req.query.deposit);

var response = {"ERROR":"","ReservationID":arg1};
        
res.json(response);




}], function (err, result) {


if(err) return(err);

res.json(result);





});


});




var client = new pdf.Pdfcrowd('sinopiainn', 'fcfaaea5b060744db668d1bee67ccaae');

app.get('/api/booking-confirmation/', function(req,res) {

client.convertURI('http://www.sinopiainn.com/booking-confirmation.html', pdf.saveToFile("public/reservations/"+req.query.reservationID+".pdf"));

var chunks = [];

var readableStream = fs.createReadStream('public/reservations/'+req.query.reservationID+'.pdf');

var data = '';

readableStream.on('data', function(chunk) {

 

          chunks.push(chunk);

});

readableStream.on('end', function() {

var o_id = new mongo.ObjectID(req.query.reservationID);
 
db.collection('reservation').findOne({ "_id": o_id  },function(e, results){


                                                           if (e) return next(e)


  
                                                                    

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
            "content": results.fname
        },{
            "name": "dateofarrival",
            "content": results.fromdate
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
            "name": "sinopiainn_booking_confirmation.pdf",
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

  

}, function(e) {

if(e){return  console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message); }
   
 
});

       });
        
      });

res.send('done');

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

});



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
