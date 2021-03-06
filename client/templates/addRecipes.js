Template.addRecipe.helpers({
    isAdmin: function() {
        return Meteor.user() && Meteor.user().admin;
    },

    latestNews: function() {
        return News.latest();
    },

    "files": function(){
        return S3.collection.find();
    }
});

var urlImage = '';

Template.addRecipe.events({

    'click .picture': function(event, template) {

        MeteorCameraUI.getPicture( {width: 200, height:200}, function(error,uriData){

            S3.upload({
                file:uriData,
                path:"recettes",
                encoding: "base64"
            },function(e,r){
               urlImage =  r.url;
            });

        });


    },

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
        var exercices2 = $(event.target).find('[id=final2]').val();
        console.log(exercices2);
        exercices2 = JSON.parse(exercices2);
        var exercices = $(event.target).find('[id=final]').val();
        exercices = JSON.parse(exercices);
        var likes = $(event.target).find('[name=likes]').val();
        var id = $(event.target).find('[name=id]').val();
        var email = $(event.target).find('[name=email]').val();
        var auteur = $(event.target).find('[name=auteur]').val();
        var imgRecette = "/img/recipes/320x350/spring-animal-cracker-cookies.jpg";
        var imgpro = $(event.target).find('[name=imgpro]').val();
        var imagepro = $(event.target).find('[name=imagepro]').val();
        Recipes.insert({ title: trainingName, date: new Date,exerpt: description, ingredients: exercices2,directions:exercices,likes: Number(likes), auteur:auteur,email:email,imgpro : imgpro,imagepro:imagepro, id :id, imgRecette: imgRecette, imgUrl: urlImage });

        alert('Recette sauveguardé !');
        window.location = "/recipes";
    },
    'click .btnNext' : function() {

        nextTab();
    },

    'click .login': function() {
        Meteor.loginWithTwitter();
    }
});

Template.addRecipe.onRendered(function() {

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