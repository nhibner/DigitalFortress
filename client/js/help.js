// Digital Fortress -- help

///////////////////////////////////////////////////////////////////////////////
// Help Template - Helpers

Template.help.helpers({

	// Nothing yet
});

///////////////////////////////////////////////////////////////////////////////
// Help Template - Events

Template.help.events({

	// Colorful Accordion
	'click li.ca-button a': function(event){

		// Use the 'easeOutBounce' animation
		$.easing.def = "easeOutBounce";

		// Finding the drop down list that corresponds to the current section:
		var dropDown = $(event.target).parent().next();
		
		// Closing all other drop down sections, except the current one
		// $('.dropdown').not(dropDown).slideUp('slow');
		dropDown.slideToggle('slow');
		
		// Preventing the default event (which would be to navigate the browser to the link's address)
		event.preventDefault();
	}
});