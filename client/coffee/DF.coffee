###
	Class containing general methods for the Digital Fortress site
###

class @DF

	######################################################################

	# Variable to store the current Digital Fortress session
	@recordingSession = null

	### Helper Methods to Manage Sessions ###

	this.startSession = ->
		if @recordingSession?
			@recordingSession.stopSession
		@recordingSession = new DFSession
		@recordingSession.start()

	this.endSession = ->
		if @recordingSession?
			@recordingSession.stop()
			@recordingSession = null

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