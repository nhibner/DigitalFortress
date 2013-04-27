// Digital Fortress -- record

///////////////////////////////////////////////////////////////////////////////
// Record Template - Helpers

Template.record.helpers({

	isRecording: function() {
		return DF.isRecording();
	},

	shareURL: function() {
		return 'http://digitalfortress.meteor.com/share/' + Random.id();
	},

	userEmail: function() {
		if(Meteor.user() && Meteor.user().services) {
			return Meteor.user().services.google.email;
		} else {
			return "";
		}
	}
});

///////////////////////////////////////////////////////////////////////////////
// Record Template - Events

Template.record.events({

	'click #btn-start-recording': function(event) {

		// Check if text alerts is enabled without proper phone number entered
		var textnumber = $('#input-text').val();
		var textcheck = $('#checkbox-text').is(':checked');
		if(textnumber == "" && textcheck) {
			alert("You want to recieve text alerts, but have given no number to recieve them! Please enter a number or uncheck the text alerts checkbox");
			return;
		}
		
		// Form data is valid, start session if the button is not disabled
		if(!($('#btn-start-recording').hasClass('disabled'))) {
			DF.setSessionPassword($('#input-password').val());
			DF.startSession();
		}
	},

	'click #checkbox-email': function(event) {
		$('#input-email').toggle();
		event.stopPropagation();
	},

	'click #checkbox-text': function(event) {
		$('#input-text').toggle();
		event.stopPropagation();
	},

	'keyup #input-password': function(event){
		var password = $('#input-password').val();
		var confirm = $('#input-confirm').val();
		if(password == confirm && password != undefined){
			$("#btn-start-recording").removeClass("disabled");
		} else {
			$("#btn-start-recording").addClass("disabled");
		}
	},

	'keyup #input-confirm': function(event){
		var password = $('#input-password').val();
		var confirm = $('#input-confirm').val();
		if(password == confirm && password != undefined){
			$("#btn-start-recording").removeClass("disabled");
		} else {
			$("#btn-start-recording").addClass("disabled");
		}
	}
});

///////////////////////////////////////////////////////////////////////////////
// Record Template - Lifecycle

Template.record.rendered = function() {

	// Get user data
	var userData = DF.userData();
	if(!userData || !userData.settings.firstTimeRecord) return;

	// User is new, give them a tour
	UserData.update({
		_id: DF.userData()._id
	}, {
		$set: {
			'settings.firstTimeRecord': false
		}
	});

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
		element: '#tour-alerts ul',
		title: 'Realtime Alerts',
		backdrop: true,
		content: 'Specify an email address or phone number to receive realtime notifications to your phone or computer whenever movement is detected.'
	});

	tour.addStep({
		element: '#tour-what-to-record ul',
		title: 'What to Record',
		backdrop: true,
		content: "Digital Fortress always records pictures when movement is detected. Optionally, we can also record the device's location and audio input."
	});

	tour.addStep({
		element: '#tour-share-session ul',
		title: 'Share a Session',
		backdrop: true,
		content: 'Before you start recording a new session, copy this URL and send it to a friend to allow them to watch your device.'
	});

	tour.addStep({
		element: '#tour-password ul',
		title: 'Session Password',
		backdrop: true,
		content: 'You must set a session password before recording a session. This password will be required to end the session later.'
	});

	tour.addStep({
		element: '#tour-btn-record',
		title: 'Start a Session',
		backdrop: true,
		content: 'Once a password is entered and options set, hit this button to start recording!'
	});

	// Start the tour
	tour.start(true);
}
