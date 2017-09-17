$(function(){
	$('.btn-go').on('click', function(e){
		var e = document.getElementById("mood");
		var mood = e.options[e.selectedIndex].value;

		window.location.href = "https://f4f4cab1.ngrok.io/mainpage/" + mood
	})
	$('.btn-pref').on('click', function(e){
		var modal = new tingle.modal({
		    footer: true,
		    stickyFooter: false,
		    closeMethods: ['overlay', 'button', 'escape'],
		    closeLabel: "Close",
		    cssClass: ['custom-class-1', 'custom-class-2'],
		    onOpen: function() {
		        console.log('modal open');
		    },
		    onClose: function() {
		        console.log('modal closed');
		    },
		    beforeClose: function() {
		        // here's goes some logic
		        // e.g. save content before closing the modal
		        return true; // close the modal
		    	return false; // nothing happens
		    }
		});
		// set content
		modal.setContent('<h1>here\'s some content</h1>');

		// add a button
		modal.addFooterBtn('Button label', 'tingle-btn tingle-btn--primary', function() {
		    // here goes some logic
		    modal.close();
		});
	
		modal.open();
	});
})
