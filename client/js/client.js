Template.hello.greeting = function () {
	return "Welcome to Digital Fortress.";
};

Template.hello.events({
	'click input' : function () {
		// template data, if any, is available in 'this'
		alert("You pressed the button!");
	}
});