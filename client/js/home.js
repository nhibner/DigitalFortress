// Digital Fortress -- home

///////////////////////////////////////////////////////////////////////////////
// Home Template - Helpers

Template.record.helpers({

	isBrowserCompatible: function() {

		// Check for WebRTC compatibility (not in Modernizr)
		var hasWebRTC = navigator.getUserMedia ||
						navigator.mozGetUserMedia ||
						navigator.webkitGetUserMedia ||
						navigator.msGetUserMedia;
		//	Checks whether or not the browser supports WebRTC
		var hasAudio = Modernizr.audio;
		//	Checks whether or not the browser supports HTML5 Audio
		var hasVideo = Modernizr.video;
		//	Checks whether or not the browser supports HTML5 Video
		var hasGeolocation = Modernizr.geolocation;
		//	Checks whether or not the browser supports Geolocation API
		return hasWebRTC&&hasGeolocation&&hasVideo&&hasAudio;
	}
});

///////////////////////////////////////////////////////////////////////////////
// Home Template - Events

Template.record.events({

	// Nothing yet
});