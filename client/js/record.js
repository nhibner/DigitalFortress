// Digital Fortress -- record

///////////////////////////////////////////////////////////////////////////////
// Record Template - Helpers

Template.record.helpers({

	isRecording: function() {
		return Session.get('isRecording');
	}
});

///////////////////////////////////////////////////////////////////////////////
// Record Template - Events

Template.record.events({

	'click #btn-start-recording': function() {
		Session.set('isRecording', true);
		DF.startSession();
	},

	'click #btn-stop-recording': function() {
		DF.endSession();
		Session.set('isRecording', false);
	}
});