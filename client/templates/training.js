Template.training.helpers({


    trainings: function() {
        return Trainings.find({ trainingName: Router.current().params.name });
    },
    ready: function() {
        return Router.current().training.ready();

    }
});
Template.training.onCreated(function() {
    console.log(Router.current().params.name)
});
