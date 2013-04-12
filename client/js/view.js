// Digital Fortress -- view

///////////////////////////////////////////////////////////////////////////////
// View Template - Helpers

Template.view.helpers({

	captures: function() {

		// Get the current viewing session id
		var id = DF.viewSessionId();

		// Get the session with that id
		var sessions = Meteor.user().profile.sessions;
		var session = _.find(sessions, function(session) {
			return id = session.id;
		});

		// Get the captures from the session if available
		if(session) {
			return session.captures;
		} else {
			return null;
		}
	},

	sessions: function() {
		// Get the user
		var user = Meteor.user();
		if(!user) {
			return null;
		}

		// Get the user's sessions
		return Meteor.user().profile.sessions;
	}
});

///////////////////////////////////////////////////////////////////////////////
// View Template - Events

Template.view.events({

	'click .session-nav-link': function(event) {
		var id = event.target.id;
		DF.setViewSessionId(id);
	}
});

//////////////////////////////////////////////////////////////////////////////
// Colorful Accordion JS
$(document).ready(function(){
	/* This code is executed after the DOM has been completely loaded */

	/* Changing thedefault easing effect - will affect the slideUp/slideDown methods: */
	$.easing.def = "easeOutBounce";

	/* Binding a click event handler to the links: */
	$('li.button a').click(function(e){
	
		/* Finding the drop down list that corresponds to the current section: */
		var dropDown = $(this).parent().next();
		
		/* Closing all other drop down sections, except the current one */
		/*$('.dropdown').not(dropDown).slideUp('slow');*/
		dropDown.slideToggle('slow');
		
		/* Preventing the default event (which would be to navigate the browser to the link's address) */
		e.preventDefault();
	})
	
});
