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

///////////////////////////////////////////////////////////////////////////////
// View Template - Lifecycle

Template.view.created = function() {
	// Get user data
	var userData = DF.userData();
	if(!userData || !userData.settings.firstTimeView || userData.sessions.length == 0) return;

	// User is new, give them a tour
	UserData.update({
		_id: DF.userData()._id
	}, {
		$set: {
			'settings.firstTimeView': false
		}
	});

	isFirstTimeView = true;
}

Template.view.rendered = function() {
	if(isFirstTimeView) {
		isFirstTimeView = false;
		tourShown = true;
		createViewTour();
	}
}

function createViewTour() {
	// Create the tour
	var tour = new Tour({
		name: Random.id(),
	    labels: {
	        next: "Next »",
	        prev: "« Prev",
	        end: "End tour"
	    },
	    keyboard: true,
	    useLocalStorage: true,
	});

	// Add the steps
	tour.addStep({
		element: '#session-nav ul',
		title: 'Your Sessions',
		backdrop: true,
		content: 'Any sessions you record will be listed here. Since you just recorded your first session, it is the only one listed.'
	});

	tour.addStep({
		element: '#tour-location ul',
		title: 'Location Tracking',
		backdrop: true,
		placement: 'left',
		content: "Track your device on a map if it moves while it is recording a session."
	});

	tour.addStep({
		element: '#tour-audio ul',
		title: 'Audio Playback',
		backdrop: true,
		placement: 'left',
		content: 'Listen to the audio from the session.'
	});

	tour.addStep({
		element: '#tour-pictures ul .ca-button',
		title: 'Pictures',
		backdrop: true,
		placement: 'left',
		content: 'View pictures taken by the device while recording a session. Images are taken whenever motion is detected.'
	});

	// Start the tour
	tour.start(true);
}
