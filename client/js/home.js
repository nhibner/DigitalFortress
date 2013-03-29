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

		// Modify the return statement to use Modernizr to also check
		// for geolocation API access and HTML 5 video/audio compatibility
		return hasWebRTC;
	}
});

///////////////////////////////////////////////////////////////////////////////
// Home Template - Events

Template.record.events({

	// Nothing yet
});