Accounts.onCreateUser(function(options, user) {
  var Programme = {actif : false};
  var Recette = {actif : false};

  user.programme = Programme;
  user.recette = Recette;

  if (options.profile)
    user.profile = options.profile;

  if (Meteor.users.find().count() === 0)
    user.admin = true;

  return user;
});