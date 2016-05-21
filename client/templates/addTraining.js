Template.addTraining.helpers({
    isAdmin: function() {
        return Meteor.user() && Meteor.user().admin;
    },

    latestNews: function() {
        return News.latest();
    }
});

Template.addTraining.events({
    'submit form': function(event) {
        event.preventDefault();

        var trainingName = $(event.target).find('[name=trainingName]').val();
        Trainings.insert({ trainingName: trainingName, date: new Date });

        alert('Entrainement sauveguardé !');
    },

    'click .login': function() {
        Meteor.loginWithTwitter();
    }
})

