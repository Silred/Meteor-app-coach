Template.subscribe.helpers({

    user: function() {
        return Meteor.users.find({ _id: Router.current().params._id });
    },
    trainings: function() {

        var following = Meteor.users.findOne({_id: Meteor.userId()}).profile.following;

        var currentFollowings = UserUtils.findFollowings(following);
        console.log(currentFollowings);
        return Trainings.find({id: { $in: currentFollowings }});
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
