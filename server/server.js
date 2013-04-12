// Digital Fortress -- server

///////////////////////////////////////////////////////////////////////////////
// Server Lifecycle and Routing

Meteor.startup(function() {

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
				'profile.sessions.sessionId': sessionProps.sessionId
			}, {
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
  	saveImage: function(sessionProps, dataURL, dateTime) {

  		// Convert dataURL to buffer
		var regex = /^data:.+\/(.+);base64,(.*)$/;
		var matches = dataURL.match(regex);
		var buffer = new Buffer(matches[2], 'base64');

		// Create metadata
		var options = {
			metadata: {
				'userId': Meteor.user()._id,
				'sessionId': sessionProps.sessionId
			}
		};

  		// Save the image
  		var filename = Random.id() + '.png';
  		var fileId = Captures.storeBuffer(filename, buffer, 'base64', options);

  		// Create the capture
  		var capture = {
  			'date': dateTime,
  			'fileId': fileId,
  			'filename': filename,
  			'source': '' // empty until server updates it
  		};

  		// Store photo info in the proper session
		Meteor.users.update({
				_id: this.userId,
				'profile.sessions.sessionId': sessionProps.sessionId
			}, {
				$addToSet: {
					'profile.sessions.$.captures': capture
				}	
			}
		);

		return capture;
	}
});