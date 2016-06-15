


Template.trainings.helpers({


  trainings: function() {
    return Trainings.find({},{sort:{'date': -1}});
  },
  ready: function() {
    return Router.current().trainings.ready();

  }
})