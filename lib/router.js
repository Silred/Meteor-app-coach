var trainings;
var recipes;
// Handle for launch screen possibly dismissed from app-body.js
dataReadyHold = null;

// Global subscriptions
if (Meteor.isClient) {
  Meteor.subscribe('news');
  Meteor.subscribe('bookmarkCounts');
  trainings = Meteor.subscribe('trainings');
  recipes = Meteor.subscribe('recipes');
}

Router.configure({
  layoutTemplate: 'appBody',
  notFoundTemplate: 'notFound'
});

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  dataReadyHold = LaunchScreen.hold();
}

HomeController = RouteController.extend({
  onBeforeAction: function () {
    Meteor.subscribe('latestActivity', function () {
      dataReadyHold.release();
    });
  }
});

trainingsController = RouteController.extend({
  onBeforeAction: function () {
    this.trainings = trainings;
  }
});

allrecipesController= RouteController.extend({
  onBeforeAction: function () {
    this.recipes = recipes;
  }
});

RecipesController = RouteController.extend({
  onBeforeAction: function () {
    this.recipes = recipes;
  }
});

BookmarksController = RouteController.extend({
  onBeforeAction: function () {
    if (Meteor.user())
      Meteor.subscribe('bookmarks');
    else
      Overlay.open('authOverlay');
  },
  data: function () {
    if (Meteor.user())
      return _.values(_.pick(RecipesData, Meteor.user().bookmarkedRecipeNames));
  }
});

RecipeController = RouteController.extend({
  onBeforeAction: function () {
    Meteor.subscribe('recipe', this.params.name);
  },
  data: function () {
    return RecipesData[this.params.name];
  }
});

AdminController = RouteController.extend({
  onBeforeAction: function () {
    Meteor.subscribe('news');
  }
});

Router.route('home', {
  path: '/'
});

Router.route('trainings');

Router.route('recipes');

Router.route('allrecipes');

Router.route('bookmarks');

Router.route('account');

Router.route('recipe', {
  path: '/recipes/:name'
});

Router.route('profile', {
  path: '/profile/:name'
});

Router.route('admin', {
  layoutTemplate: null
});

Router.route('addTraining', {
  layoutTemplate: null
});

Router.onBeforeAction('dataNotFound', {
  only: 'recipe'
});
