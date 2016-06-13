/**
 * Created by nicolas on 12/05/2016.
 */
Template.training_item.onRendered(function() {
    var self = this;

    // If the activity is in a list, scroll it into view. Note, we can't just use
    // element.scrollIntoView() because it attempts to scroll in the X direction
    // messing up our animations
    if (Router.current().params.trainingId === self.data._id) {
        var $training = $(self.firstNode);
        var top = $training.offset().top;
        var $parent = $(self.firstNode).closest('.content-scrollable');
        var parentTop = $parent.offset().top;
        $parent.scrollTop(top - parentTop);
    }
});

Template.training_item.helpers({
    firstName: function() {
        return this.userName.split(' ')[0];
    },
    recipeTitle: function() {
        return RecipesData[this.trainingName].title;
    },
    path: function() {
        return Router.path('recipe', { name: this.trainingName },
            { query: { trainingId: this._id } })
    },
    objectif: function(){
        return this.objectif;
    }
});