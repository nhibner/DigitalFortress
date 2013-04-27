// Digital Fortress -- navbar

///////////////////////////////////////////////////////////////////////////////
// Navbar Template - Constants

Navbar = {

	Tabs: [
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
	],

	click: function(route) {

		// Navigate route
		Meteor.Router.to('/' + route);

		// If 'view' was selected, set the current session to the latest one.
		if(route == 'view') {

			// Get the sessions
			var sessions = DF.userData().sessions;

			// Get the latest session
			var session = _.max(sessions, function(session) {
				return session.startTime;
			});

			// Set the view session id
			if(session) {
				DF.setViewSessionId(session.sessionId);
			}
		}
	}

};

///////////////////////////////////////////////////////////////////////////////
// Navbar Template - Helpers

Template.navbar.helpers({

	appName: function() {
		return AppConfig.NAME;
	},

	navbarTabs: function() {
		var tabs = Navbar.Tabs;
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
		var tab = _.find(Navbar.Tabs, function(tab) {
			return tab.DISPLAY == display;
		});

		// If tab is found, click it
		if(tab) {
			Navbar.click(tab.ROUTE);
		}
	}
});