// Digital Fortress -- data model
// Loaded on both the client and the server

///////////////////////////////////////////////////////////////////////////////
// UserData

// Collection to store the user's data

UserData = new Meteor.Collection('userData');

UserData.allow({

	insert: function (userId, doc) {
    	// the user must be logged in, and the document must be owned by the user
    	return (userId && userId == doc.uid);
  	},

  	update: function (userId, doc, fields, modifier) {
    	// can only change your own documents
    	return  userId == doc.uid;
    },

    remove: function (userId, doc) {
    	// can only remove your own documents
    	return doc.owner === userId;
	}
});

///////////////////////////////////////////////////////////////////////////////
// Captures

// Collection to store information about the user's captures

Captures = new Meteor.Collection('captures');

Captures.allow({

	insert: function (userId, doc) {
    	// the user must be logged in, and the document must be owned by the user
    	return (userId && userId == doc.uid);
  	},

  	update: function (userId, doc, fields, modifier) {
    	// can only change your own documents
    	return doc.owner === userId;
    },

    remove: function (userId, doc) {
    	// can only remove your own documents
    	return doc.owner === userId;
	}
});

///////////////////////////////////////////////////////////////////////////////
// CapturesFS

// Collection that actually holds the files in question

CapturesFS = new CollectionFS('capturesFS', { autopublish: false });

CapturesFS.allow({

	insert: function(userId, myFile) {
		return false;
	},

	update: function(userId, files, fields, modifier) {
		return _.all(files, function (myFile) {
			return false;
        });
	},

	remove: function(userId, files) { 
		return false;
	}
});

CapturesFS.fileHandlers({
	default: function(options) {

		/*
		 * Options contains blob and fileRecord - same is expected in return if should 
		 * be saved on filesytem, can be modified.
		*/

		// Collect variables to use when updating capture
		var filename = options.fileRecord.filename;
		var dest = options.destination().fileData.url;

		// Update the capture source for the user
		Captures.update({
			'filename': filename
		}, {
			$set: {
				'source': dest
			}
		});

		console.log('Saved file to: ' + dest);

		// Return the blob and fileRecord to save
		return { blob: options.blob, fileRecord: options.fileRecord }; //if no blob then save result in fileHandle (added createdAt)
	}
});

///////////////////////////////////////////////////////////////////////////////
// Users

// Handled by Meteor
// To access, use Meteor.users
