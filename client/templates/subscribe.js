Template.subscribe.helpers({

    user: function() {
        return Meteor.users.find({ _id: Router.current().params._id });
    },
    trainings: function() {

        var following = Meteor.users.findOne({_id: Meteor.userId()}).profile.following;

        var currentFollowings = UserUtils.findFollowingsTrainings(following);
        console.log(currentFollowings);
        return Trainings.find({id: { $in: currentFollowings }});
    },
    recipes: function() {


        var following = Meteor.users.findOne({_id: Meteor.userId()}).profile.following;

        var currentFollowings = UserUtils.findFollowingsRecipes(following);
        console.log(currentFollowings);
        return Recipes.find({id: { $in: currentFollowings }});

    },
    ready: function() {
        return Router.current().training.ready();

    }

});
Template.subscribe.onCreated(function() {
    console.log(Meteor.userId())
});

