Template.recipes.helpers({


    recipes: function() {
        return Recipes.find();
    },
    ready: function() {
        return Router.current().recipes.ready();

    }
})
