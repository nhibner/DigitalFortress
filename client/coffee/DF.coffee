###
	BLAH
###

class DF

	### Public Methods ###

	###

	###
	this.saveImage = (dataURL, emailEnabled) ->
		blob = dataURL.replace /^data:image\/(png|jpg);base64,/, ''
		filename = generateHash 40 + '.png'
		filepath = generateFilePath()
		Meteor.call 'saveImage', blob, filename, filepath, 'base64'

		capture = {
			filename: filename
			time: new Date().getTime()
		}

		Meteor.call 'addCapture', capture


	### Private Methods ###
	
	###

	###
	generateHash = (length) ->
		result = ''
		chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
		result += chars[Math.round (Math.random() * (chars.length - 1))] for i in [0 ... length]
		return result

	generateFilePath = ->
		'captures'