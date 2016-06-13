Template.training.helpers({


    trainings: function() {
        return Trainings.find({ _id: Router.current().params._id });
    },
    ready: function() {
        return Router.current().training.ready();
    },
    objectif: function(){
        return this.objectif;
    },
    shareData: function() {
        return { title: "Je viens de finir l'entrainement "+ this.trainingName + " de FIT, l'application pour vous maintenir en forme !"  }
    }
});
Template.training.onCreated(function() {
    console.log(Router.current().params)
});
