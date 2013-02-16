// Allow the client access to their Google login data
// Needed for Google integration
Meteor.publish("users", function () {
  	return Meteor.users.find({_id: this.userId}, 
  		{fields: {'services': 1, 'profile': 1}});
});

// Server-side methods
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

  	// Function to save an image file
  	saveFile: function(blob, name, path, encoding) {
	    var path = cleanPath(path),
	    	  fs = __meteor_bootstrap__.require('fs'),
	        name = cleanName(name || 'file'),
	    encoding = encoding || 'binary',
	      chroot = Meteor.chroot || 'public';

	    // Clean up the path. Remove any initial and final '/' -we prefix them-,
	    // any sort of attempt to go to the parent directory '..' and any empty directories in
	    // between '/////' - which may happen after removing '..'
	    path = chroot + (path ? '/' + path + '/' : '/');
	    
	    // TODO Add file existance checks, etc...
	    fs.writeFile(path + name, blob, encoding, function(err) {
	      	if (err) {
	        	throw (new Meteor.Error(500, 'Failed to save file.', err));
	      	} else {
	        	console.log('The file ' + name + ' (' + encoding + ') was saved to ' + path);
	      	}
	    }); 
	 
	    function cleanPath(str) {
	    	return str;
	      	if (str) {
	        	return str.replace(/\.\./g,'').replace(/\/+/g,'').
	         		replace(/^\/+/,'').replace(/\/+$/,'');
	      	}
	    }
	    function cleanName(str) {
	      	return str.replace(/\.\./g,'').replace(/\//g,'');
	    }
	  }
});