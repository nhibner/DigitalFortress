// Digital Fortress -- server

///////////////////////////////////////////////////////////////////////////////
// Server Lifecycle and Routing

Meteor.startup(function() {

	// Make sure user account login services are configured
	Accounts.loginServiceConfiguration.remove();
	Accounts.loginServiceConfiguration.insert({
		"service": 'google',
		"clientId": '721224193710.apps.googleusercontent.com',
		"secret": '0i3OqYQBKCbbZkUJZMsvhQ2T'
	});
});

// Configure new users
Accounts.onCreateUser(function(options, user) {

	// Create userData entry for user
	UserData.insert({
		uid: user._id,
		sessions: [],
		settings: {}
	});

	// Return default user object
	if(options.profile) {
		user.profile = options.profile;
	}
	return user;
});

///////////////////////////////////////////////////////////////////////////////
// Published Data

// Allow the client access to their Google login data
// Needed for Google integration
Meteor.publish('users', function () {
	return Meteor.users.find({_id: this.userId});
});

Meteor.publish('userData', function() {
	return UserData.find({uid: this.userId});
})

Meteor.publish('captures', function() {
	return Captures.find({
		uid: this.userId
	});
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

		// Set the start time of the session using the server's time
		sessionProps.startTime = new Date();

		// Insert the session properties into the database for the user
		UserData.update({
			uid: this.userId
		}, {
			$addToSet: {
				"sessions": sessionProps
			}
		});

		// Return the new session properties
		return sessionProps;
	},

	endSessionOnServer: function(sessionProps) {
		// Set the endTimeDate for the session on the server
		UserData.update({
				uid: this.userId,
				'sessions.sessionId': sessionProps.sessionId
			}, {
				$set: {
					'sessions.$.endTime': new Date()
				}	
			}
		);
	},

	// Function to save an image file
  	saveImage: function(dataURL, capture) {

  		// Convert dataURL to buffer
		var regex = /^data:.+\/(.+);base64,(.*)$/;
		var matches = dataURL.match(regex);
		var buffer = new Buffer(matches[2], 'base64');

		// Create metadata
		var options = {
			metadata: {
				'userId': this.userId,
				'sessionId': capture.sessionId
			}
		};

  		// Save the image
  		var fileId = CapturesFS.storeBuffer(capture.filename, buffer, 'base64', options);

  		// Update the capture fileId for the user
  		var capture = Captures.findOne({'filename': capture.filename});
		Captures.remove({'filename': capture.filename});
		capture.fileId = fileId;
		Captures.insert(capture);

		return capture;
	}
});
