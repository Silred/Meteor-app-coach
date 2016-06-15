



Template.comments.helpers({


    profiles: function() {
        return Meteor.users.find({ _id: Router.current().params._id});
    },
    trainings: function() {
        return Trainings.find({ _id: Router.current().params._id});
    },
    recipes: function() {
        return Recipes.find({ _id: Router.current().params._id});
    },
    comments: function() {
        return Comments.find({ idpost: Router.current().params._id});
    },
    ready: function() {
        return Router.current().trainings.ready();

    }
});


Template.comments.events({

    'submit form' : function(event) {
        event.preventDefault();
        console.log('submit');
        var text = $(event.target).find('[name=text]').val();
        var id = $(event.target).find('[name=id]').val();
        var email = $(event.target).find('[name=email]').val();
        var auteur = $(event.target).find('[name=auteur]').val();
        var imgpro = $(event.target).find('[name=imgpro]').val();
        var imagepro = $(event.target).find('[name=imagepro]').val();
        var idpost = Router.current().params._id;
        console.log(id);
        console.log(auteur);
        console.log(imgpro);
        console.log(imagepro);
        console.log( Router.current().params._id);
        console.log(text.length);
        if(text.length !== 0) {
            Comments.insert({id: id, auteur: auteur, imgpro: imgpro, imagepro: imagepro, idpost: idpost,text: text});
        }else{
            alert("Pas de commentaire ecrit")
        }




    }


});