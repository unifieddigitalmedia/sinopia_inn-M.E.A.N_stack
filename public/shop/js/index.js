 $(document).ready(function() {
        
        $('a.catergory').click(function(e) {
            

             sessionStorage.catergory = $(this).attr("data");
             sessionStorage.page = 1;


        });


    });