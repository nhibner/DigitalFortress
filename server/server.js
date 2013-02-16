// Allow the client access to their Google login data
// Needed for Google integration
Meteor.publish("users", function () {
  return Meteor.users.find({_id: this.userId},
                           {fields: {'services': 1, 'profile': 1}});
});