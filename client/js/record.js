// Digital Fortress -- record

///////////////////////////////////////////////////////////////////////////////
// Record Template - Helpers

Template.record.helpers({

	isRecording: function() {
		return DF.isRecording();
	}
});

///////////////////////////////////////////////////////////////////////////////
// Record Template - Events

Template.record.events({

	'click #btn-start-recording': function() {
		DF.startSession();
	},

	'click #btn-stop-recording': function() {
		DF.endSession();
	}
});