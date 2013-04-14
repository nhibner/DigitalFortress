// Digital Fortress -- view

///////////////////////////////////////////////////////////////////////////////
// View Template - Helpers

Template.view.helpers({

	captures: function() {

		// Get the session id
		var sessionId = DF.viewSessionId();

		// Return the captures
		if(!sessionId) {
			return [];
		} else { 
			return Captures.find({
				'sessionId': sessionId
			}).fetch();
		}
	},

	sessions: function() {
		// Get the user's sessions
		return UserData.findOne({
			uid: Meteor.userId()
		}).sessions;
	}
});

///////////////////////////////////////////////////////////////////////////////
// View Template - Events

Template.view.events({

	'click .session-nav-link': function(event) {
		var id = event.target.id;
		DF.setViewSessionId(id);
	},

	// Colorful Accordion
	'click li.ca-button a': function(event){

		// Use the 'easeOutBounce' animation
		$.easing.def = "easeOutBounce";

		// Finding the drop down list that corresponds to the current section:
		var dropDown = $(event.target).parent().next();
		
		// Closing all other drop down sections, except the current one
		// $('.dropdown').not(dropDown).slideUp('slow');
		dropDown.slideToggle('slow');
		
		// Preventing the default event (which would be to navigate the browser to the link's address)
		event.preventDefault();
	}
});
