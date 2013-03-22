###
	BLAH
###

class DFStreamer

	### Class Variables (all private) ###

	this.saveEnabled = false
	this.emailEnabled = false
	this.movementDetected = false
	this.timeLeft = 0

	this.video = null
	this.lastImage = null
	this.currCanvas = null
	this.resultCanvas = null
	this.currContext = null
	this.resultContext = null


	### Public Methods ###

	###

	###
	this.startVideoStream = ->
		# Get the UserMedia object if available
		if not navigator.getUserMedia
			navigator.getUserMedia = navigator.mozGetUserMedia or 
				navigator.webkitGetUserMedia or 
				navigator.msGetUserMedia

		# Start streaming if available
		if navigator.getUserMedia
			navigator.getUserMedia {
				video: true
				audio: false
			}, onStartSuccess, onStartError
		else
			alert 'getUserMedia is not supported in this browser.'

	###

	###
	this.stopVideoStream = ->
		this.video.src = ''

	###

	###
	this.enableSave = ->
		this.saveEnabled = true

	###

	###
	this.enableEmail = ->
		this.emailEnabled = true


	### Private Methods ###
	
	###

	###
	onStartSuccess = (stream) ->
		this.video = document.getElementById 'cam'
		videoSource = null

		if window.webkitURL
			videoSource = window.webkitURL.createObjectURL stream
		else
			videoSource = stream

		this.video.autoplay = true
		this.video.src = videoSource

		this.currCanvas = document.createElement 'canvas'
		this.currCanvas.width = 640
		this.currCanvas.height = 480

		this.currContext = currCanvas.getContext '2d'
		this.resultCanvas = document.getElementById 'resultCanvas'
		this.resultContext = resultCanvas.getContext '2d'

		this.timeLeft = 2
		this.saveEnabled = true
		this.emailEnabled = true

		setTimeout countdown, 1000

	###

	###
	onStartError = ->
		alert 'There has been a problem retrieving the streams ' +
		      '- did you allow access?'

	###

	###
	countdown = ->
		this.resultCanvas.width = this.resultCanvas.width
		if this.timeLeft <= 0
			update()
		else
			this.resultContext.fillText 'Detecting motion in ' + this.timeLeft + ' seconds.', 20, 20
			this.timeLeft--
			setTimeout countdown, 1000

	###

	###
	update = ->
		this.currContext.drawImage this.video, 0, 0, this.video.width, this.video.height
		blend()
		setTimeout update, 1000/60 #60 fps

	###

	###
	fastAbs = (value) ->
		(value ^ (value >>31)) - (value >> 31)

	###

	###
	threshold = (value) ->
		if (value > 0x50) then 0xFF else 0

	###

	###
	differenceAccuracy = (result, data1, data2) ->
		this.movementDetected = false
		if data1.length isnt data2.length
			return null
		else
			i = 0
			while i < (data1.length * 0.25)
			  average1 = (data1[4 * i] + data1[4 * i + 1] + data1[4 * i + 2]) / 3
			  average2 = (data2[4 * i] + data2[4 * i + 1] + data2[4 * i + 2]) / 3
			  diff = threshold(fastAbs(average1 - average2))
			  this.movementDetected = true  if diff isnt 0 and not movementDetected
			  result[4 * i] = diff
			  result[4 * i + 1] = diff
			  result[4 * i + 2] = diff
			  result[4 * i + 3] = 0xFF
			  i++

	###

	###
	blend = ->
		width = this.currCanvas.width
		height = this.currCanvas.height
		sourceData = this.currContext.getImageData 0, 0, width, height
		blendedData = this.currContext.createImageData width, height

		if not this.lastImage
			this.lastImage = this.currContext.getImageData 0, 0, width, height

		differenceAccuracy blendedData.data, sourceData.data, lastImage.data
		this.resultContext.putImageData blendedData, 0, 0

		if this.movementDetected

			if this.saveEnabled
				DF.saveImage (currCanvas.toDataURL 'image/png'), this.emailEnabled
				this.saveEnabled = false
				setTimeout enableSave, 1000

			if this.emailEnabled
				this.emailEnabled = false
				setTimeout enableEmail, 30000

		this.lastImage = sourceData