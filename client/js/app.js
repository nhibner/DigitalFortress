// Digital Fortress -- app

///////////////////////////////////////////////////////////////////////////////
// App Template

Template.app.events({
	'click #btn-start-recording': function() { startVideoStream(); },
	'click #btn-send-image': function() { saveImage(); }
});

function saveImage(dataURL) {
	var blob = getBlob(); // UNTIL PASSED ACTUAL DATAURL
	//var blob = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
	Meteor.call('saveFile', blob, genFilePath(), "", "base64");
}

// TEST FUNCTION
function getBlob() {
	var img = document.getElementById('file');

    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    var dataURL = canvas.toDataURL("image/png");
    //return dataURL;
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function randomString(length) {
    var result = '';
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = length; i > 0; --i) {
    	result += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    return result;
}

function genFilePath() {
	var result = Meteor.users().services.google.id + '/' randomString(40) + '.png';
}