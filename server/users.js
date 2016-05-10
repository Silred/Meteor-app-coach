Accounts.onCreateUser(function(options, user) {
  
  var Programme = {actif : false, objectif : "", disponnibilite : 0, notification : ""};
  var Recette = {actif : false};
  var Experience = "0";

  user.experience = Experience;
  user.programme = Programme;
  user.recette = Recette;

  if (options.profile)
    user.profile = options.profile;

  if (Meteor.users.find().count() === 0)
    user.admin = true;

  return user;
});