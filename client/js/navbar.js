// Digital Fortress -- navbar

///////////////////////////////////////////////////////////////////////////////
// Navbar Template - Constants

// Pages in navigation bar in the app
NavbarTabs = [
	{
		ROUTE: 'record',
		DISPLAY: 'Record'
	},
	{
		ROUTE: 'view',
		DISPLAY: 'View'
	},
	{
		ROUTE: 'help',
		DISPLAY: 'Help'
	}
];

///////////////////////////////////////////////////////////////////////////////
// Navbar Template - Helpers

Template.navbar.helpers({

	appName: function() {
		return AppConfig.NAME;
	},

	navbarTabs: function() {
		var tabs = NavbarTabs;
		_.each(tabs, function(tab) {
			if(tab.ROUTE == Meteor.Router.page()) {
				tab.isActive = 'active';
			} else {
				tab.isActive = '';
			}
		})
		return tabs;
	}
});

///////////////////////////////////////////////////////////////////////////////
// Navbar Template - Events

Template.navbar.events({

	'click .btn-nav': function(event) {

		// Get the text behind the navbar link
		var display = event.target.text;

		// Get the corresponding tab object
		var tab = _.find(NavbarTabs, function(tab) {
			return tab.DISPLAY == display;
		});

		// If a tab is found, navigate to it
		if(tab) {
			Meteor.Router.to('/' + tab.ROUTE);
		}

		// If 'view' was selected, set the current session to the latest one.
		if(tab.ROUTE == 'view') {

			// Get the sessions
			var sessions = Meteor.user().profile.sessions;

			// Get the latest session
			var session = _.max(sessions, function(session) {
				return session.startTime;
			});

			// Set the view session id
			DF.setViewSessionId(session.id);
		}
	}
});