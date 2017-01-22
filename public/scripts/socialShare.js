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


/* href="https://twitter.com/share" class="twitter-share-button" data-show-count="false"*/


function socialShareMail (para) {


var url = 'mailto:?subject='+para.alt+'&body='+this.location.href;

window.open(url,'_self');


}


function socialShareTwitter (para) {


var url = 'https://twitter.com/share?text='+para.alt;

window.open(url,'_self');


}

function socialShare (para) {





FB.ui(

  {
    method: 'share',
    href: para.alt,
  },
  // callback
  function(response) {}

);

}



function socialSharePinInterest (para) {


var url = 'https://twitter.com/share?text='+para.alt;

window.open(url,'_self');


}


