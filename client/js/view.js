// Digital Fortress -- view

///////////////////////////////////////////////////////////////////////////////
// View Template - Helpers

Template.view.helpers({

	captures: function() {
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