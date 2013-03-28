###
Class for managing the Digital Fortress video stream (via WebRTC)
###

class DFStreamer

	### Constants ###

	THRESHOLD = 0x40 					# movement detection threshold
	FPS = 30 							# how often to check for movement in frames/sec
	VIDEO_CAM_ID = 'cam'				# id of the video element for webcam footage
	CANVAS_RESULT_ID = 'resultCanvas'	# id of the canvas element for movementment detecting footage
	SHOW_BLENDED_IMAGE = true			# boolean for whether the blended image should be displayed or not

	######################################################################

	constructor: ->
		@stream = null
		@lastImage = null
		@video = null

		@currCanvas = null
		@curContext = null
		@resultCanvas = null
		@resultContext = null

	######################################################################

	### Public Interface ###

	start: =>

		# Get the UserMedia object if available
		if not navigator.getUserMedia
			navigator.getUserMedia = navigator.mozGetUserMedia or 
				navigator.webkitGetUserMedia or 
				navigator.msGetUserMedia

		# Start streaming if available
		if navigator.getUserMedia

			###
			When we call 'navigator.getUserMedia', user should
			be prompted for permissions. Hence, we set a Session
			variable here to track the permission dialog.
			###
			Session.set 'requestingCamPermission', true

			# Start the cam, requesting permission if necessary
			navigator.getUserMedia {
				video: true
				audio: true
			}, @onStartSuccess, @onStartError

		else
			# Browser does not support WebRTC
			alert 'getUserMedia is not supported in this browser.'

	stop: =>
		@stream.stop()
		@stream = null
		this.video.src = ''

	######################################################################

	### Private Interface ###
	
	onStartSuccess: (stream) =>

		# Permission received and now recording
		Session.set 'requestingCamPermission', false

		# Save the stream to the class instance
		@stream = stream

		# Get the video element from the page
		@video = document.getElementById VIDEO_CAM_ID

		# Setup the video source
		videoSource = null
		if window.webkitURL
			videoSource = window.webkitURL.createObjectURL stream
		else
			videoSource = @stream

		# Configure video element to display videoSource
		@video.autoplay = true
		@video.src = videoSource

		# Setup the current canvas (holds current video frame)
		@currCanvas = document.createElement 'canvas'
		@currCanvas.setAttribute "id", "currentImage"
		@currCanvas.width = @video.width
		@currCanvas.height = @video.height
		@currContext = @currCanvas.getContext '2d'
		
		# Setup the result canvas (blends images to detect motion)
		@resultCanvas = document.getElementById CANVAS_RESULT_ID
		@resultCanvas.width = @video.width
		@resultCanvas.height = @video.height
		@resultContext = @resultCanvas.getContext '2d'

		# Start detecting movement
		@update()

	onStartError: =>
		Session.set 'requestingCamPermission', false
		alert 'There has been a problem retrieving the streams ' +
		      '- did you allow access?'

	###
		Function that represents the drawing loop for the streamer
	###
	update: =>
		# Draw the current frame on currCanvas
		@currContext.drawImage @video, 0, 0, @video.width, @video.height
		@blend()

		# Update frame after a short sleep continuously
		Meteor.setTimeout @update, 1000/FPS

	###
		Function that blends images to detect movement
	###
	blend: =>

		width = @currCanvas.width
		height = @currCanvas.height

		# Get image data from the webcam
		sourceData = @currContext.getImageData 0, 0, width, height

		# Create an image if the previous one does not exist
		if not @lastImage
			@lastImage = @currContext.getImageData 0, 0, width, height

		# Create an ImageData instance to receive the blended result
		blendedData = @currContext.createImageData width, height

		# Blend images, checking for movement if the threshold is exceeded
		movementDetected = 
			@differenceAccuracy blendedData.data, sourceData.data, @lastImage.data

		# Draw the resulting image on the canvas if necessary
		if SHOW_BLENDED_IMAGE
			@resultContext.putImageData blendedData, 0, 0

		# If movement was detected...
		if movementDetected

			# If session exists (it should), notify session of movement
			DF.currentSession?.onMovementDetected()

		# Store the current webcam image
		@lastImage = sourceData

	###
		Blend two ImageData instances (data1 and data2) into
		a new ImageData instance (result) using the threshold
		as a guide.
	###
	differenceAccuracy: (result, data1, data2) =>

		# Movement not detected by default
		movementDetected = false

		# Blended images must be of the same length
		if data1.length isnt data2.length
			return null

		else

			###
				Loop through every index in the ImageData instances.
				Note that the loop goes 4 at a time since a group of 4 elements
				in the array represent RGBA values.
			###
			i = 0
			while i < (data1.length * 0.25)
			  average1 = (data1[4 * i] + data1[4 * i + 1] + data1[4 * i + 2]) / 3
			  average2 = (data2[4 * i] + data2[4 * i + 1] + data2[4 * i + 2]) / 3
			  diff = threshold(fastAbs(average1 - average2))
			  movementDetected = true  if diff isnt 0 and not movementDetected
			  result[4 * i] = diff
			  result[4 * i + 1] = diff
			  result[4 * i + 2] = diff
			  result[4 * i + 3] = 0xFF
			  i++
		return movementDetected

	# Fast method of calculating an absolute value
	fastAbs = (value) ->
		(value ^ (value >>31)) - (value >> 31)

	# Check if a value exceeds the threshold
	# If it does, movement is detected (otherwise, returns 0)
	threshold = (value) ->
		if (value > THRESHOLD) then 0xFF else 0
