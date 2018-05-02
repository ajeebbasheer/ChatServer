
var larvaunched=false;
window.fbAsyncInit = function(){arevicotest();};

function arevicotest(){
InitDeviceScan();

	if ( (typeof(lb_l_ret.mobile)!='undefined' && lb_l_ret.mobile==1 ) //detect mobiles
		&& 
		( 
      ((screen.width < 500) || (screen.height < 500) 
			|| isIphone 
			|| isAndroidPhone
			|| isTierIphone
			|| isTierTablet
			|| isTierGenericMobile
		))){
		
	} else {
		arinitcode();
	}
}


function arinitcode() {
	if ((!larvaunched) && typeof(FB)!= 'undefined'){
    FB.init({
	    appId: lb_l_ret.appid,
      xfbml: true,    
	    status : true, // check login status
    	cookie : true // enable cookies to allow the server to access the session
    });
    larvaunched=true;

    FB.Event.subscribe('edge.create', function(response) {

    if (lb_l_ret.gaevent==1 && (typeof(_gaq)!= 'undefined')) {
	    _gaq.push(['_trackSocial', 'facebook', 'like', response]);
    }
	if (lb_l_ret.hideonlike==1) {
	$jarevico.arevicofancy.close();
	createCookie("arevico_lb_ns", "1", 90000);
	}

    });
	
	if (((lb_l_ret.show_once>0 && readCookie("arevico_lb")==1) ||  readCookie('arevico_lb_ns')==1)) 
	{
	
	
	} else {
		FB.getLoginStatus(function(response) {
	  	if (response.status === 'connected' ) {
   		var uid = response.authResponse.userID;
    	var accessToken = response.authResponse.accessToken;
    	FB.api('/'+ uid +'/likes/' + lb_l_ret.fb_id,function(response) {
   	
   	 if( response.data ) {
        if( !arv__isEmpty(response.data) ) {
         //   alert('You are a fan!');
         	createCookie("arevico_lb_ns", "1", 90000);
        } else {
           window.setTimeout(show_facebox, lb_l_ret.delay);
       }
   		 } else {
              window.setTimeout(show_facebox, lb_l_ret.delay);
		    }
		});
    
  		} else if (response.status === 'not_authorized'){

			window.setTimeout(show_facebox, lb_l_ret.delay); //loggedin

		 } else if (typeof(lb_l_ret.loggedin)!='undefined' && lb_l_ret.loggedin==1){ //not loggedin && only 
    		//not loggedin
	  } else {
 			 	window.setTimeout(show_facebox, lb_l_ret.delay);
	  }
	});

	}
		
	}
}
jQuery(document).ready(function(){

	/** lb_l_ret */
		if ((lb_l_ret.show_once>0 && readCookie("arevico_lb")==1) ||  readCookie('arevico_lb_ns')==1)
	{

	} else {
	var fb_locale='';
	if (lb_l_ret.fblocale==''){fb_locale='en_US';}else{fb_locale=lb_l_ret.fblocale}

	jQuery('body').append('<div id="fb-root"></div>');
	jQuery('body').append(construct_code());
	jQuery.getScript('//connect.facebook.net/' + fb_locale + '/all.js#xfbml=1&appId=' + 
		lb_l_ret.appid + "&status=1&cookie=1",function(script, textStatus, jqXHR){window.setTimeout(arevicotest, 200);});

	}

});

function show_facebox(){
	if (lb_l_ret.show_once>0){
		createCookie("arevico_lb", "1", lb_l_ret.show_once);
	}

//jQuery('iframe').css('overflow:hidden;');
$jarevico('a#inline').arevicofancy({
	'modal': false,
	'padding' : 0,
	'scrolling' : 'no',
	'showCloseButton' : true,
	'autoDimensions':true,
	'width' : 'auto',
	'overlayOpacity':lb_l_ret.overlayop,
	'overlayColor':lb_l_ret.overlaycolor,
	'height': lb_l_ret.height,
	'centerOnScroll':true,
	'hideOnOverlayClick' : false
	}).trigger('click');
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}


function construct_code(){
var fanpagestring='profile-id="' + lb_l_ret.fb_id +'"';
fanpagestring += ' data-header="' +  (lb_l_ret.facebookheader==1) + '"';
if (lb_l_ret.mab.length>0){lb_l_ret.mab += '<br>'}
fbl_otp='<a id="inline" href="#data" style="display: none;overflow:hidden;">Show</a><div style="display:none"><div id="data" style="overflow:hidden;padding:0;' + lb_l_ret.extracss + '">';
fbl_otp += lb_l_ret.mab +'<div style="overflow:hidden;width:' + lb_l_ret.width + 'px;height:' + lb_l_ret.height +'px;" class="fb-like-box" ' + fanpagestring + ' data-width="' + lb_l_ret.width +'" data-height="' + lb_l_ret.height + '" data-colorscheme="' + lb_l_ret.fbcolorscheme + '" data-show-faces="true" data-stream="false"></div>';

if ( typeof(lb_l_ret.connect)!='undefined' && lb_l_ret.connect==1 ) {
fbl_otp +='<div><div style="padding-bottom:3px;padding-right:3px;float:right;"><a href="#" onclick="fbloginner();" style="text-decoration:none;">' + lb_l_ret.cmessage + '</a><br /></div><div style="clear:both;"></div>';
}
fbl_otp +='</div></div>';
return fbl_otp;
}


function fbloginner(){
	FB.login(function(response) {
            if (response.authResponse) {

     	FB.getLoginStatus(function(response) {
	  	if (response.status === 'connected' ) {
   		var uid = response.authResponse.userID;
    	var accessToken = response.authResponse.accessToken;
    	FB.api('/'+ uid +'/likes/' + lb_l_ret.fb_id,function(response) {
	   	 if( response.data ) {
	        if( !arv__isEmpty(response.data) ) {
         //   alert('You are a fan!');
         	createCookie("arevico_lb_ns", "1", 90000);
               $jarevico.arevicofancy.close();
        
    	    }
    	   }
   	    });
    }});

            }else{
               
            }
        },{scope:'user_likes'}
)
};

	function arv__isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
 
    return true;
}





var isIphone = false;
//Stores whether the device is an Android phone or multi-media player.
var isAndroidPhone = false;
//Stores whether is the Tablet (HTML5-capable, larger screen) tier of devices.
var isTierTablet = false;
//Stores whether is the iPhone tier of devices.
var isTierIphone = false;
//Stores whether the device can probably support Rich CSS, but JavaScript support is not assumed. (e.g., newer BlackBerry, Windows Mobile)
var isTierRichCss = false;
//Stores whether it is another mobile device, which cannot be assumed to support CSS or JS (eg, older BlackBerry, RAZR)
var isTierGenericMobile = false;

//Initialize some initial string variables we'll look for later.
var engineWebKit = "webkit";
var deviceIphone = "iphone";
var deviceIpod = "ipod";
var deviceIpad = "ipad";
var deviceMacPpc = "macintosh"; //Used for disambiguation

var deviceAndroid = "android";
var deviceGoogleTV = "googletv";
var deviceXoom = "xoom"; //Motorola Xoom
var deviceHtcFlyer = "htc_flyer"; //HTC Flyer

var deviceNuvifone = "nuvifone"; //Garmin Nuvifone

var deviceSymbian = "symbian";
var deviceS60 = "series60";
var deviceS70 = "series70";
var deviceS80 = "series80";
var deviceS90 = "series90";

var deviceWinPhone7 = "windows phone os 7";
var deviceWinMob = "windows ce";
var deviceWindows = "windows";
var deviceIeMob = "iemobile";
var devicePpc = "ppc"; //Stands for PocketPC
var enginePie = "wm5 pie";  //An old Windows Mobile

var deviceBB = "blackberry";
var vndRIM = "vnd.rim"; //Detectable when BB devices emulate IE or Firefox
var deviceBBStorm = "blackberry95"; //Storm 1 and 2
var deviceBBBold = "blackberry97"; //Bold 97x0 (non-touch)
var deviceBBBoldTouch = "blackberry 99"; //Bold 99x0 (touchscreen)
var deviceBBTour = "blackberry96"; //Tour
var deviceBBCurve = "blackberry89"; //Curve 2
var deviceBBCurveTouch = "blackberry 938"; //Curve Touch 9380
var deviceBBTorch = "blackberry 98"; //Torch
var deviceBBPlaybook = "playbook"; //PlayBook tablet

var devicePalm = "palm";
var deviceWebOS = "webos"; //For Palm's line of WebOS devices
var deviceWebOShp = "hpwos"; //For HP's line of WebOS devices

var engineBlazer = "blazer"; //Old Palm browser
var engineXiino = "xiino";

var deviceKindle = "kindle"; //Amazon Kindle, eInk one
var engineSilk = "silk"; //Amazon's accelerated Silk browser for Kindle Fire

//Initialize variables for mobile-specific content.
var vndwap = "vnd.wap";
var wml = "wml";

//Initialize variables for random devices and mobile browsers.
//Some of these may not support JavaScript
var deviceTablet = "tablet"; //Generic term for slate and tablet devices
var deviceBrew = "brew";
var deviceDanger = "danger";
var deviceHiptop = "hiptop";
var devicePlaystation = "playstation";
var deviceNintendoDs = "nitro";
var deviceNintendo = "nintendo";
var deviceWii = "wii";
var deviceXbox = "xbox";
var deviceArchos = "archos";

var engineOpera = "opera"; //Popular browser
var engineNetfront = "netfront"; //Common embedded OS browser
var engineUpBrowser = "up.browser"; //common on some phones
var engineOpenWeb = "openweb"; //Transcoding by OpenWave server
var deviceMidp = "midp"; //a mobile Java technology
var uplink = "up.link";
var engineTelecaQ = 'teleca q'; //a modern feature phone browser

var devicePda = "pda";
var mini = "mini";  //Some mobile browsers put 'mini' in their names.
var mobile = "mobile"; //Some mobile browsers put 'mobile' in their user agent strings.
var mobi = "mobi"; //Some mobile browsers put 'mobi' in their user agent strings.

//Use Maemo, Tablet, and Linux to test for Nokia's Internet Tablets.
var maemo = "maemo";
var linux = "linux";
var qtembedded = "qt embedded"; //for Sony Mylo and others
var mylocom2 = "com2"; //for Sony Mylo also

//In some UserAgents, the only clue is the manufacturer.
var manuSonyEricsson = "sonyericsson";
var manuericsson = "ericsson";
var manuSamsung1 = "sec-sgh";
var manuSony = "sony";
var manuHtc = "htc"; //Popular Android and WinMo manufacturer

//In some UserAgents, the only clue is the operator.
var svcDocomo = "docomo";
var svcKddi = "kddi";
var svcVodafone = "vodafone";

//Disambiguation strings.
var disUpdate = "update"; //pda vs. update



//Initialize our user agent string.
var uagent = "";
if (navigator && navigator.userAgent)
    uagent = navigator.userAgent.toLowerCase();


//**************************
// Detects if the current device is an iPhone.
function DetectIphone()
{
   if (uagent.search(deviceIphone) > -1)
   {
      //The iPad and iPod Touch say they're an iPhone! So let's disambiguate.
      if (DetectIpad() || DetectIpod())
         return false;
      //Yay! It's an iPhone!
      else
         return true;
   }
   else
      return false;
}

//**************************
// Detects if the current device is an iPod Touch.
function DetectIpod()
{
   if (uagent.search(deviceIpod) > -1)
      return true;
   else
      return false;
}

//**************************
// Detects if the current device is an iPad tablet.
function DetectIpad()
{
   if (uagent.search(deviceIpad) > -1  && DetectWebkit())
      return true;
   else
      return false;
}

//**************************
// Detects if the current device is an iPhone or iPod Touch.
function DetectIphoneOrIpod()
{
   //We repeat the searches here because some iPods
   //  may report themselves as an iPhone, which is ok.
   if (uagent.search(deviceIphone) > -1 ||
       uagent.search(deviceIpod) > -1)
       return true;
    else
       return false;
}

//**************************
// Detects *any* iOS device: iPhone, iPod Touch, iPad.
function DetectIos()
{
   if (DetectIphoneOrIpod() || DetectIpad())
      return true;
   else
      return false;
}

//**************************
// Detects *any* Android OS-based device: phone, tablet, and multi-media player.
// Also detects Google TV.
function DetectAndroid()
{
   if ((uagent.search(deviceAndroid) > -1) || DetectGoogleTV())
      return true;
   //Special check for the HTC Flyer 7" tablet. It should report here.
   if (uagent.search(deviceHtcFlyer) > -1)
      return true;
   else
      return false;
}

//**************************
// Detects if the current device is a (small-ish) Android OS-based device
// used for calling and/or multi-media (like a Samsung Galaxy Player).
// Google says these devices will have 'Android' AND 'mobile' in user agent.
// Ignores tablets (Honeycomb and later).
function DetectAndroidPhone()
{
   if (DetectAndroid() && (uagent.search(mobile) > -1))
      return true;
   //Special check for Android phones with Opera Mobile. They should report here.
   if (DetectOperaAndroidPhone())
      return true;
   //Special check for the HTC Flyer 7" tablet. It should report here.
   if (uagent.search(deviceHtcFlyer) > -1)
      return true;
   else
      return false;
}

//**************************
// Detects if the current device is a (self-reported) Android tablet.
// Google says these devices will have 'Android' and NOT 'mobile' in their user agent.
function DetectAndroidTablet()
{
   //First, let's make sure we're on an Android device.
   if (!DetectAndroid())
      return false;

   //Special check for Opera Android Phones. They should NOT report here.
   if (DetectOperaMobile())
      return false;
   //Special check for the HTC Flyer 7" tablet. It should NOT report here.
   if (uagent.search(deviceHtcFlyer) > -1)
      return false;
         
   //Otherwise, if it's Android and does NOT have 'mobile' in it, Google says it's a tablet.
   if (uagent.search(mobile) > -1)
      return false;
   else
      return true;
}


//**************************
// Detects if the current device is an Android OS-based device and
//   the browser is based on WebKit.
function DetectAndroidWebKit()
{
   if (DetectAndroid() && DetectWebkit())
      return true;
   else
      return false;
}


//**************************
// Detects if the current device is a GoogleTV.
function DetectGoogleTV()
{
   if (uagent.search(deviceGoogleTV) > -1)
      return true;
   else
      return false;
}


//**************************
// Detects if the current browser is based on WebKit.
function DetectWebkit()
{
   if (uagent.search(engineWebKit) > -1)
      return true;
   else
      return false;
}

//**************************
// Detects if the current browser is the Nokia S60 Open Source Browser.
function DetectS60OssBrowser()
{
   if (DetectWebkit())
   {
     if ((uagent.search(deviceS60) > -1 ||
          uagent.search(deviceSymbian) > -1))
        return true;
     else
        return false;
   }
   else
      return false;
}

//**************************
// Detects if the current device is any Symbian OS-based device,
//   including older S60, Series 70, Series 80, Series 90, and UIQ,
//   or other browsers running on these devices.
function DetectSymbianOS()
{
   if (uagent.search(deviceSymbian) > -1 ||
       uagent.search(deviceS60) > -1 ||
       uagent.search(deviceS70) > -1 ||
       uagent.search(deviceS80) > -1 ||
       uagent.search(deviceS90) > -1)
      return true;
   else
      return false;
}

//**************************
// Detects if the current browser is a
// Windows Phone 7 device.
function DetectWindowsPhone7()
{
   if (uagent.search(deviceWinPhone7) > -1)
      return true;
   else
      return false;
}

//**************************
// Detects if the current browser is a Windows Mobile device.
// Excludes Windows Phone 7 devices.
// Focuses on Windows Mobile 6.xx and earlier.
function DetectWindowsMobile()
{
   //Exclude new Windows Phone 7.
   if (DetectWindowsPhone7())
      return false;
   //Most devices use 'Windows CE', but some report 'iemobile'
   //  and some older ones report as 'PIE' for Pocket IE.
   if (uagent.search(deviceWinMob) > -1 ||
       uagent.search(deviceIeMob) > -1 ||
       uagent.search(enginePie) > -1)
      return true;
   //Test for Windows Mobile PPC but not old Macintosh PowerPC.
   if ((uagent.search(devicePpc) > -1) &&
       !(uagent.search(deviceMacPpc) > -1))
      return true;
   //Test for Windwos Mobile-based HTC devices.
   if (uagent.search(manuHtc) > -1 &&
       uagent.search(deviceWindows) > -1)
      return true;
   else
      return false;
}

//**************************
// Detects if the current browser is a BlackBerry of some sort.
// Includes the PlayBook.
function DetectBlackBerry()
{
   if (uagent.search(deviceBB) > -1)
      return true;
   if (uagent.search(vndRIM) > -1)
      return true;
   else
      return false;
}

//**************************
// Detects if the current browser is on a BlackBerry tablet device.
//    Example: PlayBook
function DetectBlackBerryTablet()
{
   if (uagent.search(deviceBBPlaybook) > -1)
      return true;
   else
      return false;
}

//**************************
// Detects if the current browser is a BlackBerry device AND uses a
//    WebKit-based browser. These are signatures for the new BlackBerry OS 6.
//    Examples: Torch. Includes the Playbook.
function DetectBlackBerryWebKit()
{
   if (DetectBlackBerry() &&
       uagent.search(engineWebKit) > -1)
      return true;
   else
      return false;
}

//**************************
// Detects if the current browser is a BlackBerry Touch
//    device, such as the Storm, Torch, and Bold Touch. Excludes the Playbook.
function DetectBlackBerryTouch()
{
   if (DetectBlackBerry() &&
        ((uagent.search(deviceBBStorm) > -1) ||
        (uagent.search(deviceBBTorch) > -1) ||
        (uagent.search(deviceBBBoldTouch) > -1) ||
        (uagent.search(deviceBBCurveTouch) > -1) ))
      return true;
   else
      return false;
}

//**************************
// Detects if the current browser is a BlackBerry OS 5 device AND
//    has a more capable recent browser. Excludes the Playbook.
//    Examples, Storm, Bold, Tour, Curve2
//    Excludes the new BlackBerry OS 6 and 7 browser!!
function DetectBlackBerryHigh()
{
   //Disambiguate for BlackBerry OS 6 or 7 (WebKit) browser
   if (DetectBlackBerryWebKit())
      return false;
   if (DetectBlackBerry())
   {
     if (DetectBlackBerryTouch() ||
        uagent.search(deviceBBBold) > -1 ||
        uagent.search(deviceBBTour) > -1 ||
        uagent.search(deviceBBCurve) > -1)
        return true;
     else
        return false;
   }
   else
      return false;
}

//**************************
// Detects if the current browser is a BlackBerry device AND
//    has an older, less capable browser.
//    Examples: Pearl, 8800, Curve1.
function DetectBlackBerryLow()
{
   if (DetectBlackBerry())
   {
     //Assume that if it's not in the High tier or has WebKit, then it's Low.
     if (DetectBlackBerryHigh() || DetectBlackBerryWebKit())
        return false;
     else
        return true;
   }
   else
      return false;
}


//**************************
// Detects if the current browser is on a PalmOS device.
function DetectPalmOS()
{
   //Most devices nowadays report as 'Palm',
   //  but some older ones reported as Blazer or Xiino.
   if (uagent.search(devicePalm) > -1 ||
       uagent.search(engineBlazer) > -1 ||
       uagent.search(engineXiino) > -1)
   {
     //Make sure it's not WebOS first
     if (DetectPalmWebOS())
        return false;
     else
        return true;
   }
   else
      return false;
}

//**************************
// Detects if the current browser is on a Palm device
//   running the new WebOS.
function DetectPalmWebOS()
{
   if (uagent.search(deviceWebOS) > -1)
      return true;
   else
      return false;
}

//**************************
// Detects if the current browser is on an HP tablet running WebOS.
function DetectWebOSTablet()
{
   if (uagent.search(deviceWebOShp) > -1 &&
       uagent.search(deviceTablet) > -1)
      return true;
   else
      return false;
}

//**************************
// Detects if the current browser is a
//   Garmin Nuvifone.
function DetectGarminNuvifone()
{
   if (uagent.search(deviceNuvifone) > -1)
      return true;
   else
      return false;
}


//**************************
// Check to see whether the device is a 'smartphone'.
//   You might wish to send smartphones to a more capable web page
//   than a dumbed down WAP page.
function DetectSmartphone()
{
   if (DetectIphoneOrIpod()
      || DetectAndroidPhone()
      || DetectS60OssBrowser()
      || DetectSymbianOS()
      || DetectWindowsMobile()
      || DetectWindowsPhone7()
      || DetectBlackBerry()
      || DetectPalmWebOS()
      || DetectPalmOS()
      || DetectGarminNuvifone())
      return true;

   //Otherwise, return false.
   return false;
};

//**************************
// Detects if the current device is an Archos media player/Internet tablet.
function DetectArchos()
{
   if (uagent.search(deviceArchos) > -1)
      return true;
   else
      return false;
}

//**************************
// Detects whether the device is a Brew-powered device.
function DetectBrewDevice()
{
   if (uagent.search(deviceBrew) > -1)
      return true;
   else
      return false;
}

//**************************
// Detects the Danger Hiptop device.
function DetectDangerHiptop()
{
   if (uagent.search(deviceDanger) > -1 ||
       uagent.search(deviceHiptop) > -1)
      return true;
   else
      return false;
}

//**************************
// Detects if the current device is on one of
// the Maemo-based Nokia Internet Tablets.
function DetectMaemoTablet()
{
   if (uagent.search(maemo) > -1)
      return true;
   //For Nokia N810, must be Linux + Tablet, or else it could be something else.
   if ((uagent.search(linux) > -1)
       && (uagent.search(deviceTablet) > -1)
       && !DetectWebOSTablet()
       && !DetectAndroid())
      return true;
   else
      return false;
}

//**************************
// Detects if the current browser is a Sony Mylo device.
function DetectSonyMylo()
{
   if (uagent.search(manuSony) > -1)
   {
     if (uagent.search(qtembedded) > -1 ||
         uagent.search(mylocom2) > -1)
        return true;
     else
        return false;
   }
   else
      return false;
}

//**************************
// Detects if the current browser is Opera Mobile or Mini.
function DetectOperaMobile()
{
   if (uagent.search(engineOpera) > -1)
   {
     if (uagent.search(mini) > -1 ||
         uagent.search(mobi) > -1)
        return true;
     else
        return false;
   }
   else
      return false;
}

//**************************
// Detects if the current browser is Opera Mobile
// running on an Android phone.
function DetectOperaAndroidPhone()
{
   if ((uagent.search(engineOpera) > -1) &&
      (uagent.search(deviceAndroid) > -1) &&
      (uagent.search(mobi) > -1))
      return true;
   else
      return false;
}

//**************************
// Detects if the current browser is Opera Mobile
// running on an Android tablet.
function DetectOperaAndroidTablet()
{
   if ((uagent.search(engineOpera) > -1) &&
      (uagent.search(deviceAndroid) > -1) &&
      (uagent.search(deviceTablet) > -1))
      return true;
   else
      return false;
}

//**************************
// Detects if the current device is a Sony Playstation.
function DetectSonyPlaystation()
{
   if (uagent.search(devicePlaystation) > -1)
      return true;
   else
      return false;
};

//**************************
// Detects if the current device is a Nintendo game device.
function DetectNintendo()
{
   if (uagent.search(deviceNintendo) > -1   ||
        uagent.search(deviceWii) > -1 ||
        uagent.search(deviceNintendoDs) > -1)
      return true;
   else
      return false;
};

//**************************
// Detects if the current device is a Microsoft Xbox.
function DetectXbox()
{
   if (uagent.search(deviceXbox) > -1)
      return true;
   else
      return false;
};

//**************************
// Detects if the current device is an Internet-capable game console.
function DetectGameConsole()
{
   if (DetectSonyPlaystation())
      return true;
   if (DetectNintendo())
      return true;
   if (DetectXbox())
      return true;
   else
      return false;
};

//**************************
// Detects if the current device is an Amazon Kindle (eInk devices only).
// Note: For the Kindle Fire, use the normal Android methods.
function DetectKindle()
{
   if (uagent.search(deviceKindle) > -1 &&
       !DetectAndroid())
      return true;
   else
      return false;
}

//**************************
// Detects if the current Amazon device is using the Silk Browser.
// Note: Typically used by the the Kindle Fire.
function DetectAmazonSilk()
{
   if (uagent.search(engineSilk) > -1)
      return true;
   else
      return false;
}

//**************************
// Detects if the current device is a mobile device.
//  This method catches most of the popular modern devices.
//  Excludes Apple iPads and other modern tablets.
function DetectMobileQuick()
{
   //Let's exclude tablets.
   if (DetectTierTablet())
      return false;

   //Most mobile browsing is done on smartphones
   if (DetectSmartphone())
      return true;

   if (uagent.search(deviceMidp) > -1 ||
        DetectBrewDevice())
      return true;

   if (DetectOperaMobile())
      return true;

   if (uagent.search(engineNetfront) > -1)
      return true;
   if (uagent.search(engineUpBrowser) > -1)
      return true;
   if (uagent.search(engineOpenWeb) > -1)
      return true;

   if (DetectDangerHiptop())
      return true;
     
   if (DetectMaemoTablet())
      return true;
   if (DetectArchos())
      return true;

   if ((uagent.search(devicePda) > -1) &&
        !(uagent.search(disUpdate) > -1))
      return true;
   if (uagent.search(mobile) > -1)
      return true;

   if (DetectKindle() ||
       DetectAmazonSilk())
      return true;
     
   return false;
};


//**************************
// Detects in a more comprehensive way if the current device is a mobile device.
function DetectMobileLong()
{
   if (DetectMobileQuick())
      return true;
   if (DetectGameConsole())
      return true;
   if (DetectSonyMylo())
      return true;

   //Detect for certain very old devices with stupid useragent strings.
   if (uagent.search(manuSamsung1) > -1 ||
        uagent.search(manuSonyEricsson) > -1 ||
        uagent.search(manuericsson) > -1)
      return true;

   if (uagent.search(svcDocomo) > -1)
      return true;
   if (uagent.search(svcKddi) > -1)
      return true;
   if (uagent.search(svcVodafone) > -1)
      return true;


   return false;
};


//*****************************
// For Mobile Web Site Design
//*****************************

//**************************
// The quick way to detect for a tier of devices.
//   This method detects for the new generation of
//   HTML 5 capable, larger screen tablets.
//   Includes iPad, Android (e.g., Xoom), BB Playbook, WebOS, etc.
function DetectTierTablet()
{
   if (DetectIpad()
        || DetectAndroidTablet()
        || DetectBlackBerryTablet()
        || DetectWebOSTablet())
      return true;
   else
      return false;
};

//**************************
// The quick way to detect for a tier of devices.
//   This method detects for devices which can
//   display iPhone-optimized web content.
//   Includes iPhone, iPod Touch, Android, Windows Phone 7, WebOS, etc.
function DetectTierIphone()
{
   if (DetectIphoneOrIpod())
      return true;
   if (DetectAndroidPhone())
      return true;
   if (DetectBlackBerryWebKit() && DetectBlackBerryTouch())
      return true;
   if (DetectWindowsPhone7())
      return true;
   if (DetectPalmWebOS())
      return true;
   if (DetectGarminNuvifone())
      return true;
   else
      return false;
};

//**************************
// The quick way to detect for a tier of devices.
//   This method detects for devices which are likely to be
//   capable of viewing CSS content optimized for the iPhone,
//   but may not necessarily support JavaScript.
//   Excludes all iPhone Tier devices.
function DetectTierRichCss()
{
    if (DetectMobileQuick())
    {
       //Exclude iPhone Tier and e-Ink Kindle devices
       if (DetectTierIphone() || DetectKindle())
          return false;
         
       //The following devices are explicitly ok.
       if (DetectWebkit())
          return true;
       if (DetectS60OssBrowser())
          return true;

       //Note: 'High' BlackBerry devices ONLY
       if (DetectBlackBerryHigh())
          return true;
         
       //Older Windows 'Mobile' isn't good enough for iPhone Tier.
       if (DetectWindowsMobile())
          return true;
         
       if (uagent.search(engineTelecaQ) > -1)
          return true;
         
       else
          return false;
    }
    else
      return false;
};

//**************************
// The quick way to detect for a tier of devices.
//   This method detects for all other types of phones,
//   but excludes the iPhone and RichCSS Tier devices.
// NOTE: This method probably won't work due to poor
//  support for JavaScript among other devices.
function DetectTierOtherPhones()
{
    if (DetectMobileLong())
    {
       //Exclude devices in the other 2 categories
       if (DetectTierIphone() || DetectTierRichCss())
          return false;

       //Otherwise, it's a YES
       else
          return true;
    }
    else
      return false;
};


//**************************
// Initialize Key Stored Values.
function InitDeviceScan()
{
    //We'll use these 4 variables to speed other processing. They're super common.
    isIphone = DetectIphoneOrIpod();
    isAndroidPhone = DetectAndroidPhone();
    isTierIphone = DetectTierIphone();
    isTierTablet = DetectTierTablet();

    //Optional: Comment these out if you don't need them.
    isTierRichCss = DetectTierRichCss();
    isTierGenericMobile = DetectTierOtherPhones();
};

//Now, run the initialization method.
