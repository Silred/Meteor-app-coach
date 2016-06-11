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
        var description = $(event.target).find('[name=description]').val();
        if($('#muscler').prop('checked')) {
            var objectif = "muscler";
        }
        if($('#maintient').prop('checked')) {
            var objectif = "maintient";
        }
        if($('#maigrir').prop('checked')) {
            var objectif = "maigrir";
        }

        var exercices = $(event.target).find('[id=final]').val();
        exercices = JSON.parse(exercices);
        var likes = $(event.target).find('[name=likes]').val();
        var email = $(event.target).find('[name=email]').val();
        var auteur = $(event.target).find('[name=auteur]').val();
        var imgpro = $(event.target).find('[name=imgpro]').val();
        Trainings.insert({ trainingName: trainingName, date: new Date,text: description, objectif: objectif,exercices:exercices,likes: likes, auteur:auteur,email:email,imgpro : imgpro });

        alert('Entrainement sauveguardé !');
        window.location = "/trainings";
    },
    'click .btnNext' : function() {

            nextTab();
    },

    'click .login': function() {
        Meteor.loginWithTwitter();
    }
});

Template.addTraining.onRendered(function() {

    $(function() {
        var $this = $(this);

        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        });

        $('.tab-form-wrap .tab-content fieldset').on('click', function() {
            $this.children('.input-clear').focus();
        });

        $('.tab-form-wrap .tab-content fieldset .input-clear')
            .on('focus', function() {
                $this.parent().addClass('focus');
            })
            .on('focusout', function() {
                $this.parent().removeClass('focus');
            });
    });

});

function nextTab() {
    var e = $('ul[role="tablist"] li.active').next().find('a[data-toggle="tab"]');
    if(e.length > 0) e.click();
}
