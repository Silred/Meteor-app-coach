

Template.profile.helpers({


    profiles: function() {
        return Meteor.users.find({ _id: Router.current().params._id});
    },
    trainings: function() {
        return Trainings.find({ id: Router.current().params._id});
    },
    recipes: function() {
        return Recipes.find({ id: Router.current().params._id});
    },
    isfollowing: function(){
        var following = Meteor.users.findOne({_id: Meteor.userId()}).profile.following;
        console.log(following);
        var currentFollowings = UserUtils.checkIfFollowing(following,Router.current().params._id);
        return currentFollowings;
    },
    ready: function() {
        return Router.current().profile.ready();

    }
});
Template.profile.onCreated(function() {
});


Template.profile.events({
    'click #follow' : function() {

        Meteor.users.update({_id:Router.current().params._id }, {$inc: {

            "profile.followedby": 1
        }

        });
       Meteor.users.update({ _id: Meteor.userId() },{ $push: {
           "profile.following": Router.current().params._id
       }

       });
    },
    'click #unfollow' : function() {

        Meteor.users.update({ _id: Meteor.userId() },{ $pull: {
            "profile.following": Router.current().params._id
        }

        });
        console.log(Router.current().params._id);
        Meteor.users.update({_id: Router.current().params._id }, {$inc: {

            "profile.followedby": -1
        }

        });
    }

});