// Digital Fortress -- server

///////////////////////////////////////////////////////////////////////////////
// Server Lifecycle and Routing

Meteor.startup(function() {

	// Tell Meteor to not auto-reload when files change in "static" directory
	connect = __meteor_bootstrap__.require('connect')
	app = __meteor_bootstrap__.app
	app.use(connect.static('static'));
	app.use(connect.static('static/captures'));

	// Add server-side routes
	Meteor.Router.add({
		'/captures/:hash.png': function(hash) {
			var res = this.response;
			var fs = __meteor_bootstrap__.require('fs');
			var img = fs.readFileSync('static/captures/' + hash + '.png');
			res.writeHead(200, {'Content-Type': 'image/png'});
			res.end(img, 'binary');
		}
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
  	saveImage: function(sessionProps, blob) {

  		// Save the image
  		capture = DFImageSaver.save(sessionProps, blob);

  		// Store photo info in the proper session
		Meteor.users.update({
				_id: this.userId,
				'profile.sessions.startTime': sessionProps.startTime
			},
			{
				$addToSet: {
					'profile.sessions.$.captures': capture
				}	
			}
		);

		return capture;
	}
});