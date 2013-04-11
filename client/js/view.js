// Digital Fortress -- view

///////////////////////////////////////////////////////////////////////////////
// View Template - Helpers

Template.view.helpers({

	captures: function() {

		// Get the current viewing session id
		var id = DF.viewSessionId();

		// Get the session with that id
		var sessions = Meteor.user().profile.sessions;
		var session = _.find(sessions, function(session) {
			return id = session.id;
		});

		// Get the captures from the session if available
		if(session) {
			return session.captures;
		} else {
			return null;
		}
	},

	sessions: function() {
		// Get the user
		var user = Meteor.user();
		if(!user) {
			return null;
		}

		// Get the user's sessions
		return Meteor.user().profile.sessions;
	}
});

///////////////////////////////////////////////////////////////////////////////
// View Template - Events

Template.view.events({

	'click .session-nav-link': function(event) {
		var id = event.target.id;
		DF.setViewSessionId(id);
	}
});