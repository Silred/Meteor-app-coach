
Template.recipe.helpers({


  recipes: function() {
    return Recipes.find({ _id: Router.current().params._id });
  },
  ready: function() {
    return Router.current().recipe.ready();

  },
  isLiked: function(){
    var liked = Meteor.users.findOne({_id: Meteor.userId()}).profile.liked;
    var currentLikes = UserUtils.checkIfLiked(liked,Router.current().params._id);
    console.log(currentLikes);
    return currentLikes;
  },
  shareData: function() {
    return { title: "Je viens de faire la recette : "+ this.trainingName + " de FIT, l'application pour vous maintenir en forme !"  }
  }
});
Template.recipe.onCreated(function() {
    console.log(Router.current().params)
});

Template.recipe.events({
  'click #like' : function() {
    Recipes.update({_id:Router.current().params._id }, {$inc: {

      "likes": 1
    }

    });
    Meteor.users.update({ _id: Meteor.userId() },{ $push: {
      "profile.liked": Router.current().params._id
    }

    });
  },
  'click #dislike' : function() {

    Meteor.users.update({ _id: Meteor.userId() },{ $pull: {
      "profile.liked": Router.current().params._id
    }

    });
    console.log(Router.current().params._id);
    Recipes.update({_id: Router.current().params._id }, {$inc: {

      "likes": -1
    }

    });
  }

});
