###
	Class providing client-side methods to save an image in Digital Fortress
###

class DFImageSaver

	######################################################################

	### Constants ###
	HASHLENGTH = 40

	######################################################################

	### Private Methods ###

	###
		Given a dataURL, generate a filename for the image and save it to the server.
	###
	saveImage = (dataURL) ->
		blob = dataURL.replace /^data:image\/(png|jpg);base64,/, ''
		filename = generateHash + '.png'
		filepath = generateFilePath()
		Meteor.call 'saveImage', blob, filename, filepath, 'base64'

		capture = {
			filename: filename
			time: new Date().getTime()
		}

		Meteor.call 'addCapture', capture

	######################################################################

	### Private Methods ###
	
	###
		Returns a random hash string.
	###
	generateHash = ->
		result = ''
		chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
		randomChar = -> chars[Math.round (Math.random() * (chars.length - 1))]
		for i in [0 ... HASHLENGTH]
			result +=  randomChar 
		return result

	###
		Returns a valid file path in the 'static' folder to save the image
	###
	generateFilePath = ->
		'captures'