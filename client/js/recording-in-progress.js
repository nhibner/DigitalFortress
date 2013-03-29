// Digital Fortress -- recording-in-progress

///////////////////////////////////////////////////////////////////////////////
// Recording-In-Progress Template - Helpers

Template.record.helpers({

	// Nothing yet
});

///////////////////////////////////////////////////////////////////////////////
// Recording-In-Progress Template - Events

Template.record.events({

	'click #btn-stop-recording': function() {
		DF.endSession();
		Session.set('isRecording', false);
	}
});