// Digital Fortress -- record

///////////////////////////////////////////////////////////////////////////////
// Record Template - Helpers

Template.record.helpers({

	isRecording: function() {
		return Session.get('isRecording');
	}
});

///////////////////////////////////////////////////////////////////////////////
// Record Template - Events

Template.record.events({

	'click #btn-start-recording': function() {
		Session.set('isRecording', true);
		startVideoStream(); 
	},

	'click #btn-stop-recording': function() {
		stopVideoStream(); 
		Session.set('isRecording', false);
	}
});

///////////////////////////////////////////////////////////////////////////////
// TODO - EXTRACT BELOW FUNCTIONS INTO OWN CLASS

function saveImage(dataURL, emailEnabled) {
	var blob = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
	var filename = genFileName();
	var filepath = genFilePath();
	Meteor.call('saveImage', blob, filename, filepath, "base64");

	var capture = {
		filename: filename,
		time: new Date().getTime()
	};
	Meteor.call('addCapture', capture);

	if(emailEnabled) {
		//sendEmail(capture);
	}
}

function sendEmail(capture)
{
	var from = Meteor.user().services.google.email;
	var to = Meteor.user().services.google.email;
	var subject = 'Motion Detected by Digital Fortress';
	var body = "<h3>Motion Detected</h3><a src='http://localhost:3001/captures/" + capture.filename + "' />";

	Meteor.call('sendEmail', to, from, subject, body);
}

function genFilePath() {
	// var result = Meteor.user().services.google.id + '';
	var result = 'captures';
	return result;
}

function genFileName() {
	var result = randomString(40) + '.png';
	return result;
}

function randomString(length) {
    var result = '';
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = length; i > 0; --i) {
    	result += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    return result;
}
