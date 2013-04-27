Digital Fortress
================

About
-----

Digital Fortress is a Meteor-based website that allows users to use their computer's webcam and other sensory inputs as a security device. Users can have their computer take pictures when motion is detected, record audio, and track its own location. This information is stored on the site so that the user may access it later through a different computer (useful if the user's computer is not available).

Installation
------------

Digital Fortress requires OS X or Linux. It is not compatible with Windows, as the latest version of the Meteor web framework (0.6) is not compatible with Windows. Additionally, installation instructions vary slightly depending on the platform. The below instructions should serve as a suitable guideline.

1. Install Node.js

2. Install the Node Package Manager (NPM)

3. Install Meteorite (http://oortcloud.github.io/meteorite/). Meteorite automates the installation of Meteor and additional 3rd-party packages for us.

Running
-------

In the terminal, run these commands:

	cd /path/to/digitalfortress
	mrt

Once this is done, visit http://localhost:3000 (assuming default port) to view the site.