Template.subscribe.helpers({

    user: function() {
        return Meteor.users.find({ _id: Router.current().params._id });
    },
    trainings: function() {
        return Trainings.find();
    },
    recipes: function() {
        return Recipes.find();
    },
    ready: function() {
        return Router.current().training.ready();

    }

});
Template.subscribe.onCreated(function() {
    console.log(Meteor.userId())
});
