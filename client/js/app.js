// Digital Fortress -- app

///////////////////////////////////////////////////////////////////////////////
// Accounts Configuration

// Configure general Meteor Accounts settings
Accounts.config({
	sendVerificationEmail: true,
	forbidClientAccountCreation: false
});

// Configure account permissions
Accounts.ui.config({
	requestPermissions: {
	    google: ['https://www.googleapis.com/auth/userinfo.profile',
	    		 'https://www.googleapis.com/auth/userinfo.email']
	}
});

///////////////////////////////////////////////////////////////////////////////
// App Lifecycle

// Control login flow
Meteor.autorun(function () {
  if (Meteor.userId()) {
    // on login
    Meteor.Router.to('/record');
  } else {
    // on logout
    Meteor.Router.to('/');
  }
});

///////////////////////////////////////////////////////////////////////////////
// Data Subscriptions

// Subscribe to "users" collection
Meteor.subscribe("users");