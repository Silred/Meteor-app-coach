

Template.likedTrainings.helpers({


    trainings: function() {
        var liked = Meteor.users.findOne({_id: Meteor.userId()}).profile.liked;

        var currentLikes = UserUtils.findLikedTrainings(liked);
        console.log(currentLikes);
        return Trainings.find({_id: { $in: currentLikes }},{sort:{'date': -1}});
    },
    ready: function() {
        return Router.current().trainings.ready();

    }
})
