###
	Class providing client-side methods to save an image in Digital Fortress
###

class DFImageSaver

	######################################################################

	### Constants ###

	HASH_LENGTH = 40
	IMG_TYPE = '.png'

	###
		Given a dataURL, generate a filename for the image and save it to the server.
	###
	this.saveImage = (dataURL) ->
		blob = dataURL.replace /^data:image\/(png|jpg);base64,/, ''
		filename = generateHash + IMG_TYPE
		filepath = generateFilePath()
		Meteor.call 'saveImage', blob, filename, filepath, 'base64'

		capture = {
			filename: filename
			time: new Date().getTime()
		}

		Meteor.call 'addCapture', capture
	
	###
		Returns a random hash string.
	###
	generateHash = ->
		result = ''
		chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
		randomChar = -> chars[Math.round (Math.random() * (chars.length - 1))]
		for i in [0 ... HASH_LENGTH]
			result +=  randomChar 
		return result

	###
		Returns a valid file path in the 'static' folder to save the image
	###
	generateFilePath = ->
		'captures'