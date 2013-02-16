// Digital Fortress -- app

///////////////////////////////////////////////////////////////////////////////
// App Template

Template.app.isRecording = function() {
	return Session.get('isRecording'); 
}

Template.app.events({

	'click #btn-start-recording': function() {
		Session.set('isRecording', true);
		startVideoStream(); 
	},

	'click #btn-stop-recording': function() {
		Session.set('isRecording', false);
		stopVideoStream(); 
	},

	'click #btn-nav-record': function() {
		Meteor.Router.to('/app');
	},

	'click #btn-nav-view': function() {
		Meteor.Router.to('/view');
	}
});

function saveImage(dataURL) {
	var blob = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
	var filename = genFileName();
	var filepath = genFilePath();
	Meteor.call('saveImage', blob, filename, filepath, "base64");

	var capture = {
		filename: filename,
		time: new Date().getTime()
	};
	Meteor.call('addCapture', capture);
}

function sendEmail()
{
	var from = Meteor.user().services.google.email;
	var to = Meteor.user().services.google.email;
	var body = "You just got robbed!";

	Meteor.call('sendEmail', to, from, '', body);
}

function genFilePath() {
	// var result = Meteor.user().services.google.id + '';
	result = 'captures';
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
