// Digital Fortress -- main

///////////////////////////////////////////////////////////////////////////////
// Accounts Configuration

// Configure general Meteor Accounts settings
Accounts.config({
	sendVerificationEmail: false,
	forbidClientAccountCreation: true
});

Accounts.ui.config({
	requestPermissions: {
	    google: ['https://www.googleapis.com/auth/userinfo.profile',
	    		 'https://www.googleapis.com/auth/userinfo.email']
	}
});

// Control login flow
Meteor.autorun(function () {
  if (Meteor.userId()) {
    // on login
    Meteor.Router.to('/app');
  } else {
    // on logout
    Meteor.Router.to('/');
  }
});

// Subscribe to "users" collection
Meteor.subscribe("users");