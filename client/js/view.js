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
		var sessions = UserData.findOne({
			uid: Meteor.userId()
		}).sessions;
		$.each(sessions, function(index, session) {
			session['title'] = moment(session.startTime).format('MM/DD/YYYY - h:mm a');
			session['isCurrent'] = (session.sessionId == DF.viewSessionId()) ? "bold" : "";
			sessions[index] = session;
		});

		return sessions.reverse();
	},

	currentSessionTitle: function() {

		// Get the current session
		var sessions = UserData.findOne({
			uid: Meteor.userId()
		}).sessions;
		var session = _.find(sessions, function(session) {
			return session.sessionId == DF.viewSessionId();
		});

		// Return the formatted datetime string
		return moment(session.startTime).format('MM/DD/YYYY - h:mm a');
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
