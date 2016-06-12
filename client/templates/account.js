Template.account.onRendered(function() {

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

Template.account.helpers({

    actif: function() {
       return Meteor.user().profile.Programme.actif;
    },
    niveau: function() {
        return Meteor.user().profile.Experience;
    },
    experience: function() {
        return Meteor.user().profile.Niveau;
    },
    maigrir: function() {
        return Meteor.user().profile.Programme.objectif == "maigrir";
    },
    maintient: function() {
        return Meteor.user().profile.Programme.objectif == "maintient";
    },
    muscler: function() {
        return Meteor.user().profile.Programme.objectif == "muscler";
    },
    casher: function() {
        return Meteor.user().profile.Recette.casher;
    },
    vegetarien: function() {
        return Meteor.user().profile.Recette.vegetarien;
    },
    halal: function() {
        return Meteor.user().profile.Recette.halal;
    },
    profileimage: function () {
        if (Meteor.user().profile.imagepro == ''){
            return Meteor.user().profile.imgpro;
        }
        else{
            return Meteor.user().profile.imagepro;
        }
    },

    upload: function() {
        if (Meteor.user().profile.imagepro == ''){
            return false
        }
        else{
            return true
        }
    },

    "files": function(){
        return S3.collection.find();
    }

});



Template.account.events({

    'click .picture': function(event, template) {

        MeteorCameraUI.getPicture( {width: 200, height:200}, function(error,uriData){

            S3.upload({
                file:uriData,
                path:"profile",
                encoding: "base64"
            },function(e,r){
                Meteor.users.update(Meteor.userId(), {$set: {
                    "profile.imagepro": r.url}
                });
            });

        });

        
    },

    'click .btn-twitter': function() {
        Meteor.loginWithTwitter({loginStyle: 'redirect'});
    },

    'click .btn-facebook': function() {
        Meteor.loginWithFacebook({loginStyle: 'redirect'});
    },

    'click #one fieldset': function(e) {
        selectPhoto($(e.target));
    },

    'click .loginfacebook': function() {
        Meteor.loginWithFacebook();
    },

    'click .logout': function () {
        Meteor.logout();
    },

    'click .btnNext' : function() {
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
            password: password

        };

        Accounts.createUser(user, function(err) {
            if (err) {
                alert(err.reason);
            } else {
                Router.go('account');
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

        else if($('#maigrir').prop('checked')){
            objectif  = $('#maigrir').val();
        }

        else if($('#maintient').prop('checked')){
            objectif  = $('#maintient').val();
        }

        var pseudo = $("#pseudo").val();
        var programmeactif = true;
        var recetteactif = true;

        var pro = $('#one .active').val();

            Meteor.users.update(Meteor.userId(), {$set: {
                "profile.imgpro": pro,
                "profile.pseudo": pseudo,
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
}


function  selectPhoto(e) {

    $('#one fieldset label').removeClass('active');
    e.addClass('active');

    $this = e.parent().find('input');

    $('#one fieldset input').removeClass('active');
    $this.addClass('active');
}
