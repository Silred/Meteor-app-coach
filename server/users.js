Accounts.onCreateUser(function(options, user) {

    user.profile = {
      Programme : {actif : false, objectif : "", disponnibilite : 0, notification : ""},
      Recette : {actif : false, casher : false, vegetarien : false, halal: false},
      Experience : 0,
        Niveau : 1,
        imgpro: '',
        pseudo: ''
    };

  if (Meteor.users.find().count() === 0)
    user.admin = true;

  return user;
});