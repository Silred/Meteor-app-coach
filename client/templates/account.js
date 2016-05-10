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
        return Meteor.user().programme.actif;
    },
    niveau: function() {
        return floor(Meteor.user().experience() % 1300); 
    },
    experience: function() {
        return ;
    },

})


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

    "submit form": function(e, template) {

        var action = $('input[name="action"]').val();

        if ( action == 'logIn'){

            var user = $("input[name='email']").val();
            var password = $("input[name='password']").val();


            Meteor.loginWithPassword({
                email: user
            }, password, function(err) {
                if (err) {
                    alert(err.reason)
                }
            });
        }
        else if (action == 'signUp'){
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
        }

    },


});

function nextTab() {
    var e = $('ul[role="tablist"] li.active').next().find('a[data-toggle="tab"]');
    if(e.length > 0) e.click();
    isLastTab();
}

function isLastTab() {
    var e = $('ul[role="tablist"] li:last').hasClass('active');
    if( e ) $('.btnNext').text('submit');
    else $('.btnNext').text('next step');
    return e;
}