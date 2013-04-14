// Digital Fortress -- home

///////////////////////////////////////////////////////////////////////////////
// Home Template - Helpers

Template.home.helpers({

	isBrowserCompatible: function() {
		return DF.isCompatible();
	}
});

///////////////////////////////////////////////////////////////////////////////
// Home Template - Events

Template.home.events({

	// Nothing yet
});

///////////////////////////////////////////////////////////////////////////////
// Home Template - Lifecycle

Template.home.rendered = function() {
	
	// If the browser is not compatible, show modal in middle of the page
	if(!DF.isCompatible()) {
		$('#incompatibilityModal').modal({
			'backdrop': true,
			'keyboard': true,
			'show': true
		});
	}
}