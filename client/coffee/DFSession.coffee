###
	Class representing a recording session in Digital Fortress
###

class DFSession

	######################################################################

	### Instance Methods ###

	constructor: (emailEnabled) ->
		@emailEnabled = emailEnabled
		@isRecording = false

	######################################################################

	### Static Methods ###

	this.startSession = ->
		DFStreamer.startVideoStream

	this.stopSession = ->
		DFStreamer.stopVideoStream