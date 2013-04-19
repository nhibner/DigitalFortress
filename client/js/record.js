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
		DF.startSession();
	},

	'click #btn-stop-recording': function(event) {
		DF.endSession();
	},

	'click #checkbox-email': function(event) {
		var checkbox = $('#checkbox-email');
		checkbox.checked = !checkbox.checked;
		$('#input-email').toggle();
		event.stopPropagation();
	},

	'click #checkbox-text': function(event) {
		var checkbox = $('#checkbox-text');
		checkbox.checked = !checkbox.checked;
		$('#input-text').toggle();
		event.stopPropagation();
	}
});