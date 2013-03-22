// Digital Fortress -- router

///////////////////////////////////////////////////////////////////////////////
// Router (Client Side only)

// All routes for Digital Fortress
Meteor.Router.add({
	'/': 'home',
	'/home': 'home',
	'/:tab': function(tab) {
		var names = _.pluck(NavbarTabs, 'NAME');
		if(_.contains(names, tab)) {
			return tab;
		} else {
			return 'home';
		}
	}
});

// Specific filters for routes
Meteor.Router.filters({

	// Forces user to login before viewing a page other than home
	'requireLogin': function(page) {
		if(Meteor.user()) {
      		return page;
    	} else {
      		return 'home';
    	}
	}
});

// Always force login when attempting to access any navbar tab (in app template)
Meteor.Router.filter('requireLogin', {only: function() {
	return _.pluck(NavbarTabs, 'NAME');
}})