###
	Class representing a recording session in Digital Fortress

	Note: This class manages all data sources for a session
	(i.e. video, audio, geolocation, etc.) 
###

class DFSession

	######################################################################

	constructor: ->
		@dfstreamer = null
		@id = null
		@startTime = null
		@endTime = null
		@captures = []
		@locations = []
		@audio = null

	start: =>
		@dfstreamer = new DFStreamer
		@dfstreamer.start()

	onCamPermissionReceived: =>
		DF.setIsRecording true
		props = @getProperties()
		Meteor.call 'createSessionOnServer', props, (error, result) =>
			if @startTime?
				@startTime = result.startTime

	stop: =>
		@dfstreamer.stop()
		@dfstreamer = null
		DF.setIsRecording false

		props = @getProperties()
		Meteor.call 'endSessionOnServer', props, (error, result) =>
			if @endTime?
				@endTime = result.endTime

	getProperties: =>
		return {
			@startTime
			@endTime
			@captures
			@locations
			@audio
		}
	
	# Whenever movement is detected (called from DFStreamer)...
	onMovementDetected: =>
		
		# If called for, save the current image
		if DF.isRecording() and DF.saveImages()

			# Stop saving images
			DF.setSaveImages false

			# Get the image blob
			blob = @dfstreamer.currCanvas.toDataURL 'image/png'
			blob = blob.replace /^data:image\/(png|jpg);base64,/, ''

			# Save the image
			Meteor.call 'saveImage', (@getProperties()), blob, (error, result) =>
				@captures.push(result)

			Meteor.setTimeout (-> DF.setSaveImages true), AppConfig.IMAGE_DELAY