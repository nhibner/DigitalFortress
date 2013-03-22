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
		DFStreamer.startVideoStream(); 
	},

	'click #btn-stop-recording': function() {
		DFStreamer.stopVideoStream(); 
		Session.set('isRecording', false);
	}
});