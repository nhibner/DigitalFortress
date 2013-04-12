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
	default: function(options) { //Options contains blob and fileRecord - same is expected in return if should be saved on filesytem, can be modified
		return { blob: options.blob, fileRecord: options.fileRecord }; //if no blob then save result in fileHandle (added createdAt)
	}
});

///////////////////////////////////////////////////////////////////////////////
// Users

// Handled by Meteor
// To access, use Meteor.users