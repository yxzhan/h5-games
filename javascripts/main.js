
$(document).ready(function(){
	var w=225;
	var h=400;
	var qrcodeAddress="images/qrcode/";
	var gameAddress="games/";
	$(".game_button").click(function(){
		event.preventDefault();
		// console.log(event.target.href);
		var gameName=event.target.value;
		var address=gameAddress+gameName;
		$("#fake_iphone > embed").remove();
		var str= "<embed  id='fake_screen'' src="+address+" height='"+h+"' width='"+w+"'/>";
		$("#fake_iphone").html(str);
		$("#qrcode > img").attr("src",qrcodeAddress+gameName+".png");
	});


});


