$(document).ready(function(){
    $("button").click(function(){



        $.post("http://localhost:3000/api/members",
        {
          name: document.getElementById('Name').value,
          company: document.getElementById('Company').value,
          email: document.getElementById('Email').value,
          password: document.getElementById('Password').value,
          address: document.getElementById('Address').value,
          city: document.getElementById('City').value,
          country: document.getElementById('country').value,
          phone: document.getElementById('Phone').value,
          countryCode: document.getElementById('Code').value,
          type:"guest",
        },
        function(data,status){
            alert("Data: " + data + "\nStatus: " + status);
        });
    });
});