###
	Class containing general methods for the Digital Fortress site
###

class @DF

	######################################################################

	# Variable to store the current Digital Fortress session
	@currentSession = null

	# Convenience method to get the user's data
	this.userData = ->
		id = Meteor.userId() || this.userId
		if not id then null
		else UserData.findOne({uid: id});

	# Helper Methods for handling sessions
	this.startSession = ->
		if @currentSession?
			@currentSession.stopSession
		@currentSession = new DFSession
		@currentSession.start()

	this.endSession = ->
		if @currentSession?
			@currentSession.stop()
			@currentSession = null

	# Determine if the user's browser is compatible with Digital Fortress
	this.isCompatible = ->
		hasWebRTC = navigator.getUserMedia ||
					navigator.mozGetUserMedia ||
					navigator.webkitGetUserMedia ||
					navigator.msGetUserMedia
		return hasWebRTC && Modernizr.audio && Modernizr.video && Modernizr.geolocation

	######################################################################

	### Session Getters/Setters ###

	this.emailEnabled = -> Session.get 'emailEnabled'
	this.setEmailEnabled = (value) -> Session.set 'emailEnabled', value

	this.isRecording = -> Session.get 'isRecording'
	this.setIsRecording = (value) -> Session.set 'isRecording', value

	this.saveImages = -> Session.get 'saveImages'
	this.setSaveImages = (value) -> Session.set 'saveImages', value

	this.requestingCamPermission = -> Session.get 'requestingCamPermission'
	this.setRequestingCamPermission = (value) -> Session.set 'requestingCamPermission', value

	this.loadingSession = -> Session.get 'loadingSession'
	this.setLoadingSession = (value) -> Session.set 'loadingSession', value

	this.viewSessionId = -> Session.get 'viewSessionId'
	this.setViewSessionId = (value) -> Session.set 'viewSessionId', value

	this.clearSettings = ->
		# Default values
		@setEmailEnabled false
		@setIsRecording false
		@setSaveImages false
		@requestingCamPermission false
		@loadingSession false

# Start the app with the default values for Session variables
do DF.clearSettings