var FEATURED_COUNT = 4;

Template.home.helpers({
  // selects FEATURED_COUNT number of recipes at random
  featuredRecipes: function() {
    var recipes = _.values(Recipes);
    var selection = [];
    
    for (var i = 0;i < FEATURED_COUNT;i++)
      selection.push(recipes.splice(_.random(recipes.length - 1), 1)[0]);

    return selection;
  },
  
  activities: function() {
    return Activities.latest();
  },
  recipes: function() {
    return Recipes.find({},{sort: {_id: -1}, limit: 4});
  },
  trainings: function() {
    return Trainings.find({},{sort: {_id: -1}, limit: 4});
  },
  latestNews: function() {
    return News.latest();
  }
});