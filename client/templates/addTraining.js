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
        var objectif = $(event.target).find('[name=objectif]').val();
        var exercices = $(event.target).find('[name=array_final]').val();
        var likes = $(event.target).find('[name=likes]').val();
        var followed = $(event.target).find('[name=followed]').val();
        Trainings.insert({ trainingName: trainingName, date: new Date,text: description, objectif: objectif,exercices:exercices,likes: likes, followed:followed });

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
    isLastTab();
}
