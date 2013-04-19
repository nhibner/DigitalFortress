// Digital Fortress -- record

///////////////////////////////////////////////////////////////////////////////
// Record Template - Helpers

Template.record.helpers({

	isRecording: function() {
		return DF.isRecording();
	},

	shareURL: function() {
		return 'http://digitalfortress.meteor.com/share/' + Random.id();
	}
});

///////////////////////////////////////////////////////////////////////////////
// Record Template - Events

Template.record.events({

	'click #btn-start-recording': function(event) {
		DF.startSession();
	},

	'click #btn-stop-recording': function(event) {
		DF.endSession();
	}
});