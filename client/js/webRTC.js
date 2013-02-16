var video;
var lastImage;
var currCanvas;
var resultCanvas;
var currContext;
var resultContext;
var movementDetected;
var timeLeft;

function startVideoStream()
{
	navigator.getUserMedia ||
	  (navigator.getUserMedia = navigator.mozGetUserMedia ||
	  navigator.webkitGetUserMedia || navigator.msGetUserMedia);
 
	if (navigator.getUserMedia) 
	{
	    navigator.getUserMedia({
	      video: true, 
	      audio: false
	    }, onSuccess, onError);
	} else 
	{
	    alert('getUserMedia is not supported in this browser.');
	}
}

function onSuccess(stream) 
{	
    video = document.getElementById('cam');
	var videoSource;

	if(window.webkitURL)
	{
		videoSource = window.webkitURL.createObjectURL(stream);
	}
	else
	{
		videoSource = stream;
	}

	video.autoplay = true;
	video.src = videoSource;

	currCanvas = document.createElement('canvas');
	currCanvas.width = 640;
	currCanvas.height = 480;
	currContext = currCanvas.getContext('2d');
	resultCanvas = document.getElementById('resultCanvas');
	resultContext = resultCanvas.getContext('2d');
	timeLeft = 2;

	setTimeout(countdown, 1000);
}
 
function onError() 
{
    alert('There has been a problem retrieving the streams - did you allow access?');
}

function countdown()
{
	resultCanvas.width = resultCanvas.width;
	if(timeLeft <= 0)
	{
		update();
	}
	else
	{
		resultContext.fillText("Detecting motion in " + timeLeft + " seconds.", 20, 20);
		timeLeft--;
		setTimeout(countdown, 1000);
	}
}

function update() 
{
	currContext.drawImage(video, 0, 0, video.width, video.height);
	blend();
	timeOut = setTimeout(update, 1000/60);
}

function fastAbs(value)
{
	return (value ^ (value >> 31)) - (value >> 31);
}

function differenceAccuracy(result, data1, data2) 
{
	movementDetected = false;
	if (data1.length != data2.length) return null;
	var i = 0;
	while (i < (data1.length * 0.25)) 
	{
		var average1 = (data1[4*i] + data1[4*i+1] + data1[4*i+2]) / 3;
		var average2 = (data2[4*i] + data2[4*i+1] + data2[4*i+2]) / 3;
		var diff = threshold(fastAbs(average1 - average2));
		if(diff != 0 && !movementDetected)
		{
			movementDetected = true;
		}
		result[4*i] = diff;
		result[4*i+1] = diff;
		result[4*i+2] = diff;
		result[4*i+3] = 0xFF;
		i++;
	}
}

function threshold(value) 
{
	return (value > 0x30) ? 0xFF : 0;
}

function blend()
{
	var width = currCanvas.width;
	var height = currCanvas.height;
	var sourceData = currContext.getImageData(0, 0, width, height);
	var blendedData = currContext.createImageData(width, height);
	if(!lastImage) lastImage = currContext.getImageData(0, 0, width, height);

	differenceAccuracy(blendedData.data, sourceData.data, lastImage.data);
	resultContext.putImageData(blendedData, 0, 0);
	if(movementDetected)
	{
		saveImage(currCanvas.toDataURL("image/png"));
	}
	lastImage = sourceData;
}
