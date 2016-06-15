

Template.likedRecipes.helpers({


    recipes: function() {
        var liked = Meteor.users.findOne({_id: Meteor.userId()}).profile.liked;

        var currentLikes = UserUtils.findLikedRecipes(liked);
        console.log(currentLikes);
        return Recipes.find({_id: { $in: currentLikes }});
    },
    ready: function() {
        return Router.current().recipes.ready();

    }
})
