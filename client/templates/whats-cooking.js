


Template.trainings.helpers({


  trainings: function() {
      return Trainings.find();
  },
  ready: function() {
    return Router.current().trainings.ready();

  }
})