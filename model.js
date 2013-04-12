// Digital Fortress -- data model
// Loaded on both the client and the server

///////////////////////////////////////////////////////////////////////////////
// Captures

Captures = new CollectionFS('captures', { autopublish: false });

Captures.allow({

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

Captures.fileHandlers({
	default: function(options) {

		/*
		 * Options contains blob and fileRecord - same is expected in return if should 
		 * be saved on filesytem, can be modified.
		*/

		// Update the capture in the user's record
		var userId = options.fileRecord.metadata.userId;
		var sessionId = options.fileRecord.metadata.sessionId;
		var fileId = options.fileRecord._id;

		// Get the user
		var user = Meteor.users.findOne({
				_id: userId
			}
		);

		// Get the session
		var session = null;
		for(var i = 0; i < user.profile.sessions.length; i++) {
			if(user.profile.sessions[i].sessionId = sessionId) {
				session = user.profile.sessions[i];
				break;
			}
		}

		// Update the source variable in the session capture
		for(var i = 0; i < session.captures.length; i++) {
			if(session.captures[i].fileId == fileId) {
				session.captures[i].source = options.destination().fileData.url;
				break;
			}
		}

		// Replace the session with the updated one
		Meteor.users.update({
			_id: userId,
			'profile.sessions.sessionId': sessionId,
		}, {
			$set: {
				'profile.sessions.$': session
			}
		});

		console.log('saved');

		// Return the blob and fileRecord to save
		return { blob: options.blob, fileRecord: options.fileRecord }; //if no blob then save result in fileHandle (added createdAt)
	}
});

///////////////////////////////////////////////////////////////////////////////
// Users

// Handled by Meteor
// To access, use Meteor.users