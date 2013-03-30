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
		DF.endSession();
		Session.set('isRecording', false);
	}
});