// Digital Fortress -- server

///////////////////////////////////////////////////////////////////////////////
// Server Lifecycle and Routing

Meteor.startup(function() {

	// Add server-side routes
	Meteor.Router.add({
		// Nothing yet
	});

	// Make sure user account login services are configured
	Accounts.loginServiceConfiguration.remove();
	Accounts.loginServiceConfiguration.insert({
		"service": "google",
		"clientId": "721224193710.apps.googleusercontent.com",
		"secret": "0i3OqYQBKCbbZkUJZMsvhQ2T"
	});
});

///////////////////////////////////////////////////////////////////////////////
// Published Data

// Allow the client access to their Google login data
// Needed for Google integration
Meteor.publish("users", function () {
  	return Meteor.users.find({_id: this.userId}, 
  		{fields: {'services': 1, 'profile': 1}});
});

// Only publish captures for the current session (TODO)
Meteor.publish('myCaptures', function() {
	if(this.userId) {
		return Captures.find({owner: this.userId })
	}
})

///////////////////////////////////////////////////////////////////////////////
// Server-side Methods

Meteor.methods({

	// Simple function to send an email
  	sendEmail: function (to, from, subject, html) {
	    // Let other method calls from the same client start running,
	    // without waiting for the email sending to complete.
	    this.unblock();

	    Email.send({
	      	to: to,
	      	from: from,
	      	subject: subject,
	      	html: html
	    });
  	},

	// Function to create session data structure on server
	createSessionOnServer: function(sessionProps) {
		// Insert session properties into the database for the user
		sessionProps.startTime = new Date();
		Meteor.users.update({_id: this.userId}, 
			{$addToSet: {"profile.sessions": sessionProps}});
		return sessionProps;
	},

	endSessionOnServer: function(sessionProps) {
		// Set the endTimeDate for the session on the server
		Meteor.users.update({
				_id: this.userId,
				'profile.sessions.startTime': sessionProps.startTime
			},
			{
				$set: {
					'profile.sessions.$.endTime': new Date()
				}	
			}
		);
	},

	// Function to add a capture for a user
	addCapture: function(capture) {
		Meteor.users.update({_id: this.userId},
			{$addToSet: {"profile.captures": capture}});
	},

	// Function to save an image file
  	saveImage: function(sessionProps, dataURL) {

  		// Convert dataURL to buffer
		var regex = /^data:.+\/(.+);base64,(.*)$/;
		var matches = dataURL.match(regex);
		var data = matches[2];
		var buffer = new Buffer(data, 'base64');

  		// Save the image
  		filename = Random.id() + '.png';
  		fileId = Captures.storeBuffer(filename, buffer);
  		console.log('Saving image... ' + filename);

  		var fs = Npm.require('fs');
  		fs.writeFileSync(filename, buffer);

  		// Store photo info in the proper session
		Meteor.users.update({
				_id: this.userId,
				'profile.sessions.startTime': sessionProps.startTime
			},
			{
				$addToSet: {
					'profile.sessions.$.captures': fileId
				}	
			}
		);

		return fileId;
	}
});