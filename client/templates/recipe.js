
Template.recipe.helpers({


  recipes: function() {
    return Recipes.find({ _id: Router.current().params._id });
  },
  ready: function() {
    return Router.current().recipe.ready();

  },
  shareData: function() {
    return { title: "Je viens de faire la recette : "+ this.trainingName + " de FIT, l'application pour vous maintenir en forme !"  }
  }
});
Template.recipe.onCreated(function() {
    console.log(Router.current().params)
});
