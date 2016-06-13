/**
 * Created by nicolas on 13/06/2016.
 */
UserUtils = function() {};    //no var in front

UserUtils.findFollowingsTrainings = function(following) {
    var currentFollowings = Meteor.users.find({_id: { $in: following }
    }).fetch().map(function(data) {
        return data._id;
    });

    return currentFollowings;
};

UserUtils.findFollowingsRecipes = function(following) {
    var currentFollowings = Meteor.users.find({_id: { $in: following }
    }).fetch().map(function(data) {
        return data._id;
    });

    return currentFollowings;
};

UserUtils.checkIfFollowing = function(following,id) {
    var found = $.inArray(id, following) > -1;
    console.log(found);
    return found;
};