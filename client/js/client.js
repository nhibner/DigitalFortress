///////////////////////////////////////////////////////////////////////////////
// Accounts Configuration

// Configure general Meteor Accounts settings
Accounts.config({
	sendVerificationEmail: false,
	forbidClientAccountCreation: true
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