// Digital Fortress -- app

///////////////////////////////////////////////////////////////////////////////
// App Template

Template.app.events({
	'click #btn-start-recording': function() { startVideoStream(); }
});

function saveImage(dataURL) {
	var blob = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
	var filename = genFileName();
	var filepath = genFilePath();
	Meteor.call('saveFile', blob, filename, filepath, "base64");
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