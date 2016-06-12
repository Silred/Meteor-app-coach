
Template.recipe.helpers({


  recipes: function() {
    return Recipes.find({ _id: Router.current().params._id });
  },
  ready: function() {
    return Router.current().recipe.ready();

  }
});
Template.recipe.onCreated(function() {
    console.log(Router.current().params)
});
