###
	Class representing a recording session in Digital Fortress

	Note: This class manages all data sources for a session
	(i.e. video, audio, geolocation, etc.) 
###

class DFSession

	######################################################################

	constructor: ->
		@dfstreamer = null

	start: =>
		@dfstreamer = new DFStreamer
		@dfstreamer.start()

	stop: =>
		@dfstreamer.stop()
		@dfstreamer = null
	
	# Whenever movement is detected (called from DFStreamer)...
	onMovementDetected: =>
		
		# If called for, save the current image
		if DF.saveImages()
			DFImageSaver.saveImage (@dfstreamer.currCanvas.toDataURL 'image/png')