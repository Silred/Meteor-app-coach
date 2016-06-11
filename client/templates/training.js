Template.training.helpers({


    trainings: function() {
        return Trainings.find({ _id: Router.current().params._id });
    },
    ready: function() {
        return Router.current().training.ready();

    }
});
Template.training.onCreated(function() {
    console.log(Router.current().params)
});
