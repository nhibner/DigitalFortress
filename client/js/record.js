// Digital Fortress -- record

///////////////////////////////////////////////////////////////////////////////
// Record Template - Helpers

Template.record.helpers({

	isRecording: function() {
		return DF.isRecording();
	},

	shareURL: function() {
		return 'http://digitalfortress.meteor.com/share/' + Random.id();
	},

	userEmail: function() {
		if(Meteor.user() && Meteor.user().services) {
			return Meteor.user().services.google.email;
		} else {
			return "";
		}
	}
});

///////////////////////////////////////////////////////////////////////////////
// Record Template - Events

Template.record.events({

	'click #btn-start-recording': function(event) {

		// Check if text alerts is enabled without proper phone number entered
		var textnumber = $('#input-text').val();
		var textcheck = $('#checkbox-text').is(':checked');
		if(textnumber == "" && textcheck) {
			alert("You want to recieve text alerts, but have given no number to recieve them! Please enter a number or uncheck the text alerts checkbox");
			return;
		}
		
		// Form data is valid, start session if the button is not disabled
		if(!($('#btn-start-recording').hasClass('disabled'))) { 
			DF.startSession();
		}
	},

	'click #btn-stop-recording': function(event) {
		DF.endSession();
	},

	'click #checkbox-email': function(event) {
		$('#input-email').toggle();
		event.stopPropagation();
	},

	'click #checkbox-text': function(event) {
		$('#input-text').toggle();
		event.stopPropagation();
	},

	'keyup #input-password': function(event){
		var password = $('#input-password').val();
		var confirm = $('#input-confirm').val();
		if(password == confirm && password != undefined){
			$("#btn-start-recording").removeClass("disabled");
		} else {
			$("#btn-start-recording").addClass("disabled");
		}
	},

	'keyup #input-confirm': function(event){
		var password = $('#input-password').val();
		var confirm = $('#input-confirm').val();
		if(password == confirm && password != undefined){
			$("#btn-start-recording").removeClass("disabled");
		} else {
			$("#btn-start-recording").addClass("disabled");
		}
	}
});