Template.account.onCreated(function(){
    Meteor.subscribe('userData');
});

Template.account.onRendered(function() {

    $(function() {
        var $this = $(this);

        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            isLastTab();
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

Template.account.helpers({



    actif: function() {
       return Meteor.user().profile.Programme.actif;
    },
    niveau: function() {
        return Meteor.user().profile.Experience;
    },
    objectif: function() {
        return Meteor.user().profile.Programme.objectif;
    },
    halal: function() {
        return Meteor.user().profile.Recette.halal;
    }

});



Template.account.events({

    'click .logintwitter': function() {
        Meteor.loginWithTwitter();
    },

    'click .loginfacebook': function() {
        Meteor.loginWithFacebook();
    },

    'click .logout': function () {
        Meteor.logout();
    },

    'click .btnNext' : function() {
    if(isLastTab())
        alert('submitting the form...');
    else
        nextTab();
    },

    "click #signup": function(e) {
        e.preventDefault();

        var email = $('input[name="email"]').val();
        var username = email;
        var password = $('input[name="password"]').val();

        var user = {
            username: username,
            email: email,
            password: password,

        };

        Accounts.createUser(user, function(err) {
            if (err) {
                alert(err.reason);
            } else {
                Router.go('home');
            }
        });
    },

    "click #login": function(e) {
        e.preventDefault();

        var user = $("input[name='email']").val();
        var password = $("input[name='password']").val();


        Meteor.loginWithPassword({
            email: user
        }, password, function(err) {
            if (err) {
                alert(err.reason)
            }
        });
    },

    "click .submit-rest": function(e) {

            e.preventDefault();

        var casher;
        var vegetarien;
        var halal;
        var objectif;

        if($('#vegetarien').prop('checked')){
            vegetarien = true;
        }
        else {
            vegetarien = false;
        }
        
        if($('#halal').prop('checked')){
            halal = true;
        }
        else{
            halal = false;
        }
        
        if($('#casher').prop('checked')){
            casher = true;
        }
        else {
            casher = false;
        }

        
        if($('#muscler').prop('checked')){
            objectif  = $('#muscler').val();
        }

        else if($('#maintient').prop('checked')){
            objectif  = $('#maintient').val();
        }

        else if($('#maigrir').prop('checked')){
            objectif  = $('#maigrir').val();
        }



            var programmeactif = true;
            var recetteactif = true;

            Meteor.users.update(Meteor.userId(), {$set: {
                "profile.Recette.halal": halal,
                "profile.Recette.vegetarien": vegetarien,
                "profile.Recette.casher": casher,
                "profile.Programme.objectif": objectif,
                "profile.Programme.actif": programmeactif,
                "profile.Recette.actif": recetteactif
            }

            });
        },

    "click .modif": function(e) {

        e.preventDefault();


        var programmeactif = false;
        var recetteactif = false;

        Meteor.users.update(Meteor.userId(), {$set: {
            "profile.Programme.actif": programmeactif,
            "profile.Recette.actif": recetteactif
        }

        });
    }

});

function nextTab() {
    var e = $('ul[role="tablist"] li.active').next().find('a[data-toggle="tab"]');
    if(e.length > 0) e.click();
    isLastTab();
}

function isLastTab() {
    var e = $('ul[role="tablist"] li:last').hasClass('active');
    return e;
}