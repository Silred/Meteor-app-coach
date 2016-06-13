

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
    ready: function() {
        return Router.current().profile.ready();

    }
});
Template.profile.onCreated(function() {
});


Template.profile.events({
    'click #follow' : function() {
var following = $("#following").val();

        Meteor.users.update({_id:Router.current().params._id }, {$inc: {

            "profile.followedby": 1
        }

        });
       Meteor.users.update({ _id: Meteor.userId() },{ $push: {
           "profile.following": Router.current().params._id
       }

       });
    }
});