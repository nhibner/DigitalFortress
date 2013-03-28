###
	Class containing general methods for the Digital Fortress site
###

class DF

	######################################################################

	# Variable to store the current Digital Fortress session
	@currentSession = null

	### Helper Methods to Manage Sessions ###

	this.startSession = ->
		if @currentSession?
			@currentSession.stopSession
		@currentSession = new DFSession
		@currentSession.start()

	this.endSession = ->
		if @currentSession?
			@currentSession.stop()
			@currentSession = null

	######################################################################

	### Session Getters/Setters ###

	this.emailEnabled = -> Session.get('emailEnabled')
	this.setEmailEnabled = (value) -> Session.set('emailEnabled', value)

	this.isRecording = -> Session.get('isRecording')
	this.setIsRecording = (value) -> Session.set('isRecording', value)

	this.saveImages = -> Session.get('saveImages')
	this.setSaveImages = (value) -> Session.set('saveImages', value)

	this.clearSettings = ->
		# Default values
		@setEmailEnabled false
		@setIsRecording false
		@setSaveImages false

# Start the app with the default values for Session variables
do DF.clearSettings