Template.view.captures = function() {
	return Meteor.user().profile.captures;
}

Template.view.events({

	'click #btn-nav-record': function() {
		Meteor.Router.to('/app');
	},

	'click #btn-nav-view': function() {
		Meteor.Router.to('/view');
	}
});