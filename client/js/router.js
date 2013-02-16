// Digital Fortress -- router

///////////////////////////////////////////////////////////////////////////////
// Router (Client Side only)

// All routes for Digital Fortress
Meteor.Router.add({
	'/': 'home',
	'/app': 'app',
	'/webrtc': 'hello'
});

// Specific filters for routes
Meteor.Router.filters({

	// Forces user to login before viewing page
	'requireLogin': function(page) {
		if (Meteor.user()) {
      		return page;
    	} else {
      		return 'home';
    	}
	}
});

// Always force login when attempting to access app template
Meteor.Router.filter('requireLogin', {only: 'app'});
