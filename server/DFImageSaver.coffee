###
	Class providing client-side methods to save an image in Digital Fortress
###

class DFImageSaver

	######################################################################

	### Constants ###

	HASH_LENGTH = 40
	IMG_TYPE = '.png'
	ENCODING = 'base64'

	###
		Given a dataURL, generate a filename for the image and save it to the server.
	###
	this.save = (sessionProps, blob) ->

		# Generate the file name and path
		filename = DFImageSaver.generateHash() + IMG_TYPE
		root = 'static/'
		folderpath = DFImageSaver.generateFilePath()
		path = root + '/' + folderpath + '/' + filename

		fs = __meteor_bootstrap__.require('fs')
		fs.writeFile path, blob, ENCODING, (error) =>
			if error
				console.log(error)
				#throw new Meteor.Error 500, 'Failed to save file.', error
			else
				console.log(path)

		# Build structure to store photo info
		relImagePath = folderpath + '/' + filename
		return capture =
			url: relImagePath
			date: new Date()

	###
		Returns a random hash string.
	###
	this.generateHash = ->
		result = ''
		chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
		randomChar = -> chars[Math.round (Math.random() * (chars.length - 1))]
		for i in [0 ... HASH_LENGTH]
			result +=  randomChar()
		return result

	###
		Returns a valid file path in the 'static' folder to save the image
	###
	this.generateFilePath = ->
		'captures'