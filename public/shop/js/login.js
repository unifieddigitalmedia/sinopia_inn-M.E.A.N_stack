$(document).ready(function(){
    $(".login").click(function(){



        $.get("http://localhost:3000/api/members?username="+document.getElementById('username').value+"&password="+document.getElementById('password').value,
        function(data,status){
            alert("Data: " + data + "\nStatus: " + status);
        });
    });
});