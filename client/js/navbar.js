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
		var display = event.target.text;
		var tab = _.find(NavbarTabs, function(tab) {
			return tab.DISPLAY == display;
		});
		if(tab) {
			Meteor.Router.to('/' + tab.ROUTE);
		}
	}
});