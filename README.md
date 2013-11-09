Digital Fortress
================

Live Website:  (http://digitalfortress.meteor.com)

Overview
-----------

Digital Fortress is a Meteor-based website that allows users to use their computer's webcam and other sensory inputs as a security device. Users can have their computer take pictures when motion is detected, record audio, and track its own location. This information is stored on the site so that the user may access it later through a different computer (useful if the user's computer is not available).

Implementation
--------------

At its core, Digital Fortress is powered by Meteor (http://meteor.com/), itself built on top of Node.js. Meteor provides us with simple Google sign-in and real-time page updates (i.e. images load when ready without refreshing the page). To accomplish video input and processing, we utilize WebRTC, a cutting-edge protocol for telecommunication on the Internet without the traditional plugins (such as Flash). The majority of the site consists of JavaScript; however, a few server-side classes are written in CoffeeScript for greater readability. Also noteworthy, the HTML files use Meteor's HTML templating system for additional flexibility when it comes to laying out the site's design. Finally, we opted to stick with pure CSS for styling instead of using a preprocessor (i.e. LESS, Sass, Stylus, etc.).

One notable implementation decision was the choice to utilize purely HTML 5. Most importantly, we are using WebRTC for video input and processing, which is only supported in a select few web browsers (Google Chrome and Mozilla Firefox). In making this decision, we are limiting the potential audience of our site. However, we noticed that other browsers plan to add WebRTC capability soon. As a result, we expect the number of users with a Digital Fortress compatible web rowser to increase greatly in the coming months. Note that we designed the site to work for any browser that has a few specific HTML 5 features using Modernizr, an open-source feature detection library. We do not depend on user agent strings for browser detection.

Current Features
----------------

- Recording pictures
- Session password
- Google sign-in
- Browser compatibility detection
- Help section
- View old sessions and images
- About information
- Privacy information
- Prompt to accept webcam permissions
- Home page
- Display spinning icon for images until fully loaded
- Site tutorial for new users

Feature Wish List
-----------------

Digital Fortress was designed with the following additional features in mind. However, due to minimal time and excessive complexity, our team decided to focus on the existing user interface and features rather than additional functionality outside the core user experience. Note that some of the following features have placeholders in the current code for future implementation.

- Recording audio
- Tracking location
- Alerts
- Public link to a session
- Sharing a session with a friend
- Delete image/session/user functionality

How to Use
----------

To access Digital Fortress, you have one of two options:

1. Visit the site online at http://digitalfortress.meteor.com

2. Run the site locally following the instructions below.

Currently, the site only runs in the latest version of Google Chrome or Mozilla Firefox. Please visit the site using one of those two browsers.

Once on the site, log in via your Google account. To start recording a session, configure your session options on the "Record" screen. Alerts, geolocation/audio recording, and the URL to share the session are only visible placeholders:  their functionality has yet to be implemented. Before starting a session, be sure to remember to input a password specific for this session. Once that's done, hit the "Start Recording" button and accept the permissions.

To finish recording a session, enter the password for the session and hit the "Stop Recording" button.

Now that your session is done, you can view your data under the "View" tab. Note that the map and audio player (corresponding to geolocation and audio recording) are not functional. However, once the server has saved your images, your page should automatically load the captured images into view.

Finally, for any questions, you may look at the "Help" tab for answers.

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

Contributors
------------
* nhibner
* hzeera
* shogun21
* bcguy390
* iyer6
* ajain15
* jatinpandey

Open-Source
-----------

Digital Fortress would not have been possible without open-source libraries and frameworks. The following is a list of open-source projects utilized in Digital Fortress:

- Meteor (http://meteor.com)
- Node.js (http://nodejs.org/)
- Bootstrap (http://twitter.github.io/bootstrap/)
- Underscore (http://underscorejs.org/)
- jQuery (http://jquery.com/)
- Bootstrap Tour (http://bootstraptour.com/)
- CollectionFS (http://raix.github.io/Meteor-CollectionFS/)
- Modernizr (http://modernizr.com/)
- Moment.js (http://momentjs.com/)
