


Template.allrecipes.helpers({


    recipes: function() {
        return Recipes.find();
    },
    ready: function() {
        return Router.current().allrecipes.ready();

    }
})