
Template.recipe.helpers({


  recipes: function() {
    return Recipes.find({ name: Router.current().params.name });
  },
  ready: function() {
    return Router.current().recipe.ready();

  }
});
Template.recipe.onCreated(function() {
    console.log(Router.current().params.name)
});
