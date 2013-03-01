// Digital Fortress -- router

///////////////////////////////////////////////////////////////////////////////
// Router (Client Side only)

// All routes for Digital Fortress
Meteor.Router.add({
	'/': 'home',
	'/app': 'app',
	'/view': 'view'
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

// Always force login when attempting to access app template
Meteor.Router.filter('requireLogin', {only: ['app', 'view']});