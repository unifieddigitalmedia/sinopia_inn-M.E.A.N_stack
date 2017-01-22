  window.fbAsyncInit = function() {
    FB.init({
      appId      : '619443938242215',
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));




document.getElementById('fbShareBtn').onclick = function() {

FB.ui(

  {
    method: 'share',
    href: 'http://www.sinopiainn.com',
  },
  // callback
  function(response) {}

);

}

window.pAsyncInit = function() {
        PDK.init({
            appId: "4880316741500023076", // Change this
            cookie: true
        });
    };

    (function(d, s, id){
        var js, pjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//assets.pinterest.com/sdk/sdk.js";
        pjs.parentNode.insertBefore(js, pjs);
    }(document, 'script', 'pinterest-jssdk'));
    