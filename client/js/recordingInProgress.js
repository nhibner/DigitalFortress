// Digital Fortress -- recording-in-progress

///////////////////////////////////////////////////////////////////////////////
// Recording-In-Progress Template - Helpers

Template.recordingInProgress.helpers({

	isLoadingVisible: function() {
		if (DF.loadingSession()) {
			return "";
		} else {
			return "display: none";
		}
	},

	isRecordingPanelVisible: function() {
		if (DF.loadingSession()) {
			return "display: none";
		} else {
			return "";
		}
	}
});

///////////////////////////////////////////////////////////////////////////////
// Recording-In-Progress Template - Events

Template.recordingInProgress.events({

	'click #btn-stop-recording': function() {
		// If button is not disabled, end the session
		if(!($('#btn-stop-recording').hasClass('disabled'))) { 
			DF.endSession();
			Session.set('isRecording', false);
		}
	},

	'keyup #session-password-input': function(event){
		var password = $('#session-password-input').val();
		if(password == DF.sessionPassword()){
			$("#btn-stop-recording").removeClass("disabled");
		} else {
			$("#btn-stop-recording").addClass("disabled");
		}
	}
});