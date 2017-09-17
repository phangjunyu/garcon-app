$(function(){
	$('.btn-go').on('click', function(e){
		var e = document.getElementById("mood");
		var mood = e.options[e.selectedIndex].value;
		
		window.location.href = "https://f4f4cab1.ngrok.io/mainpage/" + mood
	})
})
