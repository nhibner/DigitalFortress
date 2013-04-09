// Digital Fortress -- view

///////////////////////////////////////////////////////////////////////////////
// View Template - Helpers

Template.view.helpers({

	captures: function() {

		// Get the user
		var user = Meteor.user();
		if(!user) {
			return null;
		}

		// Get the user's sessions
		var sessions = Meteor.user().profile.sessions;
		if(sessions && sessions[0])
			return sessions[0].captures;
		else
			return null
	}
});

///////////////////////////////////////////////////////////////////////////////
// View Template - Events

Template.view.events({

	// Nothing yet
});