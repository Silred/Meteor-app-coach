Template.account.onRendered(function() {

    $(function() {
        var $this = $(this);

        $('.btnNext').on('click', function() {
            if(isLastTab())
                alert('submitting the form...');
            else
                nextTab();
        });

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

    });

Template.account.helpers({
    actif: function() {
        return Meteor.user().programme.actif;
    },
    recipeTitle: function() {
        return RecipesData[this.recipeName].title;
    },

})


Template.account.events({
    'submit form': function(event) {
        event.preventDefault();

        Meteor.user().programme.type = $('input[name="type"]').val();
        Meteor.user().programme.actif = true;
    },

    'click .logintwitter': function() {
        Meteor.loginWithTwitter();
    },

    'click .loginfacebook': function() {
        Meteor.loginWithFacebook();
    },

    'click .logout': function () {
        Meteor.logout();
    }
})
