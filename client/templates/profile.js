Template.profile.helpers({


    profiles: function() {
        return Meteor.users.find({ _id: Router.current().params._id});
    },
    ready: function() {
        return Router.current().profile.ready();

    }
});
Template.profile.onCreated(function() {
});