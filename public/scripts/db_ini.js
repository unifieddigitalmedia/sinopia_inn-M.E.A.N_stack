/*mongo ds031862.mlab.com:31862/heroku_88xtttk1 -u sinopiainn-administrator -p 321123ETz$*/

db.rooms.remove({});
db.offers.remove({});
db.amenities.remove({});
db.reservations.remove({});
db.placesofinterest.remove({});
db.menu.remove({});
db.books.remove({});
db.hotels.remove({});


db.hotels.insert([{"rooms":[{"_id":"1","name":"Camel", "description":"Air conditioned double occupancy bedroom with ensuite bathroom","occupancy":"2","icon":"/images/parrot_thumb.png","price":"160.00","booking":[]},{"_id":"2","name":"Puce", "description":"Double occupancy bedroom with ensuite bathroom","occupancy":"2","price":"135.00","icon":"/images/parrot_thumb.png","booking":[]},{"_id":"3","name":"Spring Bud","description":"Double occupancy bedroom with ensuite bathroom","occupancy":"2","price":"135.00","icon":"/images/parrot_thumb.png","booking":[]},{"_id":"4","name":"Coquelicot","description":"Quadruple occupancy bedroom with ensuite bathroom and lounge","occupancy":"4","price":"180.00","icon":"/images/parrot_thumb.png","booking":[]}],"offers":[{"name":"Summer & Autumn Discount 10%","description":"Validity period from 20th June to 14th December","amount":".10","validdate":"20-04-2016","exdate":"14-12-2016","token":""},{"name":"Friends and family discount 15%","description":"All year","amount":".15","validdate":"","exdate":"","token":"marshmellows"}],"amenities":[{"name":"Breakfast","description":"Traditional Jamaican breakfast","price":"10.00","frequency":"person",},{"name":"Airport Pickup","description":"Transportation to and from airport","price":"30.00","frequency":"room",},{"name":"Private Car Hire","description":"On and Off road SUV - seating capacity 5 plus baggage","price":"60.00","frequency":"night",}],"businessname":"Sinopia Inn","businessaddress":"Matthews Ave Port Antonio, Jamaica","businessphone":"+1 876-993-7267","businesswebsite":"http://www.hotelmockingbirdhill.com/","businessemail":"info@sinopiainn.com","businessdescription":"","country":"","coordinates":{"Latitude":"18.1763329","Longitude":"-76.44973749999997"},"nameofevent":"","timeofevent":"","dateofevent":"","activity":[{"typeofbusiness":"Accomodation","typeofservice":"Villa"}],"typeofactivity":[],"contactname":"","location":"","logourl":"","showcaseurl":[],"comments":[],"averagerating":"","avergaeprice":"","date":"","enabled":""}]);


//[{"name":"Camel","date":"20-04-2016","rating":"4","comment":"test comment",},{"name":"puce","date":"20-04-2016","rating":"4","comment":"test comment",},{"name":"Test","date":"20-04-2016","rating":"4","comment":"test comment"}]

db.rooms.insert([{"name":"Camel", "description":"Air conditioned double occupancy bedroom with ensuite bathroom","occupancy":"2","icon":"/images/parrot_thumb.png","price":"160.00","booking":[]},{"name":"Puce", "description":"Double occupancy bedroom with ensuite bathroom","occupancy":"2","price":"135.00","icon":"/images/parrot_thumb.png","booking":[]},{"name":"Spring Bud","description":"Double occupancy bedroom with ensuite bathroom","occupancy":"2","price":"135.00","icon":"/images/parrot_thumb.png","booking":[]},{"name":"Coquelicot","description":"Quadruple occupancy bedroom with ensuite bathroom and lounge","occupancy":"4","price":"180.00","icon":"/images/parrot_thumb.png","booking":[]}]);
 



db.offers.insert([{"name":"Summer & Autumn Discount 10%","description":"Validity period from 20th June to 14th December","amount":".10","validdate":"20-04-2016","exdate":"14-12-2016","token":""},{"name":"Friends and family discount 15%","description":"All year","amount":".15","validdate":"","exdate":"","token":"marshmellows"}]);
 


db.amenities.insert([{"name":"Breakfast","description":"Traditional Jamaican breakfast","price":"10.00","frequency":"person",},{"name":"Airport Pickup","description":"Transportation to and from airport","price":"30.00","frequency":"room",},{"name":"Private Car Hire","description":"On and Off road SUV - seating capacity 5 plus baggage","price":"60.00","frequency":"night",}]);
 



db.placesofinterest.insert([{"businessname":"Mille Fleurs","businessaddress":"Matthews Ave Port Antonio, Jamaica","businessphone":"+1 876-993-7267","businesswebsite":"http://www.hotelmockingbirdhill.com/","businessemail":"info@sinopiainn.com","businessdescription":"","country":"","coordinates":{"Latitude":"18.1763329","Longitude":"-76.44973749999997"},"nameofevent":"","timeofevent":"","dateofevent":"","activity":[{"typeofbusiness":"Food and Drink","typeofservice":"Local Taste"}],"typeofactivity":[],"contactname":"","location":"","logourl":"","showcaseurl":[],"comments":[],"averagerating":"","avergaeprice":"","date":"","enabled":""}]);

db.placesofinterest.insert([{"businessname":"Bush Bar","businessaddress":"18.173906, -76.407411","businessphone":"+1 876-993-7000","businesswebsite":"http://www.geejamhotel.com/","businessemail":"info@sinopiainn.com","businessdescription":"","country":"","coordinates":{"Latitude":"18.172243","Longitude":"-76.40768559999998",},"nameofevent":"","timeofevent":"","dateofevent":"","activity":[{"typeofbusiness":"Food and Drink","typeofservice":"Fusion"}],"typeofservice":["Fusion"],"typeofactivity":[],"contactname":"","location":"","logourl":"","showcaseurl":[],"comments":[],"averagerating":"","avergaeprice":"","date":"","enabled":"",}]);

db.placesofinterest.insert([{"businessname":"Woody's","businessaddress":"Matthews Ave Port Antonio, Jamaica","businessphone":"+1 876-993-7888","businesswebsite":"http://www.geejamhotel.com/","businessemail":"info@sinopiainn.com","businessdescription":"","country":"","coordinates":{"Latitude":"18.1763329","Longitude":"-76.44973749999997",},"nameofevent":"","timeofevent":"","dateofevent":"","activity":[{"typeofbusiness":"Food and Drink","typeofservice":"Local Taste"}],"typeofactivity":[],"contactname":"","location":"","logourl":"","showcaseurl":[],"comments":[],"averagerating":"","avergaeprice":"","date":"","enabled":"",}]);

db.placesofinterest.insert([{"businessname":"San San Tropez","businessaddress":"San San Tropez Portland Rd Port Antonio Jamaica","businessphone":"+1 876-999-0305","businesswebsite":"http://www.SanSanTropez.com","businessemail":"info@sinopiainn.com","businessdescription":"","country":"","coordinates":{"Latitude":"18.1758487","Longitude":"-76.45340139999996",},"nameofevent":"","timeofevent":"","dateofevent":"","activity":[{"typeofbusiness":"Food and Drink","typeofservice":"European"}],"typeofactivity":[],"contactname":"","location":"","logourl":"","showcaseurl":[],"comments":[],"averagerating":"","avergaeprice":"","date":"","enabled":"",}]);

db.placesofinterest.insert([{"businessname":"Blue Lagoon","businessaddress":"Blue Hole Rd Port Antonio Jamaica","businessphone":"+1 876-978-6245","businesswebsite":"http://www.BlueLagoon.com","businessemail":"info@sinopiainn.com","businessdescription":"","country":"","coordinates":{"Latitude":"18.1718019","Longitude":"-76.38738690000002",},"nameofevent":"","timeofevent":"","dateofevent":"","activity":[{"typeofbusiness":"Lesiure and Nightlife","typeofservice":"Adventure"}],"typeofactivity":[],"contactname":"","location":"","logourl":"","showcaseurl":[],"comments":[],"averagerating":"","avergaeprice":"","date":"","enabled":"",}]);

db.placesofinterest.insert([{"businessname":"Winnifred Beach","businessaddress":"","businessphone":"","businesswebsite":"http://www.BlueLagoon.com","businessemail":"info@sinopiainn.com","businessdescription":"","country":"","coordinates":{"Latitude":"18.0844274","Longitude":"-76.4100267",},"nameofevent":"","timeofevent":"","dateofevent":"","activity":[{"typeofbusiness":"Beaches","typeofservice":"Public"}],"typeofactivity":[],"contactname":"","location":"","logourl":"","showcaseurl":[],"comments":[],"averagerating":"","avergaeprice":"","date":"","enabled":"",}]);

db.placesofinterest.insert([{"businessname":"Frenchman's Cove","businessaddress":"Frenchman's Cove beach Jamaica","businessphone":"","businesswebsite":"","businessemail":"info@sinopiainn.com","businessdescription":"","country":"","coordinates":{"Latitude":"18.1755481","Longitude":"-76.40021689999998",},"nameofevent":"","timeofevent":"","dateofevent":"","activity":[{"typeofbusiness":"Beaches","typeofservice":"Private"}],"typeofactivity":[],"contactname":"","location":"","logourl":"","showcaseurl":[],"comments":[],"averagerating":"","avergaeprice":"","date":"","enabled":"",}]);

db.placesofinterest.insert([{"businessname":"San San Beach","businessaddress":"San San Beach, Port Antonio, Portland","businessphone":"","businesswebsite":"","businessemail":"info@sinopiainn.com","businessdescription":"","country":"","coordinates":{"Latitude":"18.1712764","Longitude":"-76.44763209999996",},"nameofevent":"","timeofevent":"","dateofevent":"","activity":[{"typeofbusiness":"Beaches","typeofservice":"Private"}],"typeofactivity":[],"contactname":"","location":"","logourl":"","showcaseurl":[],"comments":[],"averagerating":"","avergaeprice":"","date":"","enabled":"",}]);



db.menu.insert([{"type":"breakfast","name":"appetizers 1","description":"appetizers 1 description","method":["appetizers 1 ingridient 1","appetizers 1 ingridient 2","appetizers 1 ingridient 3","appetizers 1 ingridient 4 "],"ingridients":["appetizers 1 ingridient 1","appetizers 1 ingridient 2","appetizers 1 ingridient 3","appetizers 1 ingridient 4 "],"price":"","pdf":"http:/www.sinopiainn.com/public/menu/breakfast/appetizers 1.pdf","image_url":"http:/www.sinopiainn.com/public/menu/breakfast/images/appetizers 1.jpg"}]);

db.menu.insert([{"type":"breakfast","name":"appetizers 2","description":"appetizers 2 description","method":["appetizers 1 ingridient 1","appetizers 1 ingridient 2","appetizers 1 ingridient 3","appetizers 1 ingridient 4 "],"ingridients":[ "appetizers 2 ingridient 1","appetizers 2 ingridient 2","appetizers 2 ingridient 3","appetizers 2 ingridient 4 "],"price":"","pdf":"http:/www.sinopiainn.com/public/menu/breakfast/appetizers 1.pdf","image_url":"http:/www.sinopiainn.com/public/menu/breakfast/images/appetizers 1.jpg"}]);

db.menu.insert([{"type":"breakfast","name":"appetizers 3","description":"appetizers 1 description","method":["appetizers 1 ingridient 1","appetizers 1 ingridient 2","appetizers 1 ingridient 3","appetizers 1 ingridient 4 "],"ingridients":["appetizers 3 ingridient 1","appetizers 3 ingridient 2","appetizers 3 ingridient 3","appetizers 3 ingridient 4 "],"price":"","pdf":"http:/www.sinopiainn.com/public/menu/breakfast/appetizers 1.pdf","image_url":"http:/www.sinopiainn.com/public/menu/breakfast/images/appetizers 1.jpg"}]);


db.menu.insert([{"type":"entree", "name":"entree 1","description":"entree 1 description",["appetizers 1 ingridient 1","appetizers 1 ingridient 2","appetizers 1 ingridient 3","appetizers 1 ingridient 4 "],"ingridients":["entree 1 ingridient 1","entree 1 ingridient 2","entree 1 ingridient 3","entree 1 ingridient 4 "],"price":"","pdf":"http:/www.sinopiainn.com/public/menu/breakfast/appetizers 1.pdf","image_url":"http:/www.sinopiainn.com/public/menu/breakfast/images/appetizers 1.jpg"}]);

db.menu.insert([{"type":"entree", "name":"entree 2","description":"entree 2 description",["appetizers 1 ingridient 1","appetizers 1 ingridient 2","appetizers 1 ingridient 3","appetizers 1 ingridient 4 "],"ingridients":["entree 2 ingridient 1","entree 2 ingridient 2","entree 2 ingridient 3","entree 2 ingridient 4 "],"price":"","pdf":"http:/www.sinopiainn.com/public/menu/breakfast/appetizers 1.pdf","image_url":"http:/www.sinopiainn.com/public/menu/breakfast/images/appetizers 1.jpg"}]);

db.menu.insert([{"type":"entree","name":"entree 3","description":"entree 1 description",["appetizers 1 ingridient 1","appetizers 1 ingridient 2","appetizers 1 ingridient 3","appetizers 1 ingridient 4 "],"ingridients":["entree 3 ingridient 1","entree 3 ingridient 2","entree 3 ingridient 3","entree 3 ingridient 4 "],"price":"","pdf":"http:/www.sinopiainn.com/public/menu/breakfast/appetizers 1.pdf","image_url":"http:/www.sinopiainn.com/public/menu/breakfast/images/appetizers 1.jpg"}]);



db.books.insert([{"type":"author 1", "name":"title of book","description":"book 1 description","method":"","ingridients":["book page 1","book page 2","book page 3","book page 4 "],"price":"","pdf":"http:/www.sinopiainn.com/public/books/author 1/title of book.pdf","image_url":"http:/www.sinopiainn.com/public/books/author 1/images/title of book.jpg"}]);

db.books.insert([{"type":"author 1", "name":"title of book 2","description":"book 2 description","method":"","ingridients":["book 2 page 1","book 2 page 2","book 2 page 3","book 2 page 4 "],"price":"","pdf":"http:/www.sinopiainn.com/public/books/author 1/title of book.pdf","image_url":"http:/www.sinopiainn.com/public/books/author 1/images/title of book.jpg"}]);

db.books.insert([{"type":"author 2", "name":"title of book 1","description":"book 1 description","method":"","ingridients":["book 1 page 1","book 1 page 2","book 1 page 3","book 1 page 4 "],"price":"","pdf":"http:/www.sinopiainn.com/public/books/author 1/title of book.pdf","image_url":"http:/www.sinopiainn.com/public/books/author 1/images/title of book.jpg"}]);

