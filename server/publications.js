Meteor.publish('bookmarkCounts', function() {
  return BookmarkCounts.find();
});

Meteor.publish('news', function() {
  return News.find({}, {sort: {date: -1}, limit: 1});
});

Meteor.publish('latestActivity', function () {
  return Activities.latest();
});

Meteor.publish('feed', function() {
  return Activities.find({}, {sort: {date: -1}, limit: 10});
});

Meteor.publish('trainings', function() {
  return Trainings.find();
});

Meteor.publish('allUsers', function() {
  return Meteor.users.find({}, {fields:{username:1,emails:1,profile:1}})
});

Meteor.publish('recipes', function() {
  return Recipes.find();
});

Meteor.publish('comments', function() {
    return Comments.find();
});

Meteor.publish('recipe', function(name) {
  check(name, String);
  return [
    BookmarkCounts.find({recipeName: name}),
    Activities.find({recipeName: name})
  ];
});

// autopublish the user's bookmarks and admin status
Meteor.publish(null, function() {
  return Meteor.users.find(this.userId, {
    fields: {
      admin: 1,
      bookmarkedRecipeNames: 1,
      'services.twitter.profile_image_url_https': 1
    }
  });
});

Meteor.publish("userData", function () {
  return Meteor.users.find({_id: this.userId},
      {fields: {'profile': 1}});
});
