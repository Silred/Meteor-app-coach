Template.recipes.helpers({


    recipes: function() {
        return Recipes.find({},{sort:{'date': -1}});
    },
    ready: function() {
        return Router.current().recipes.ready();

    }
})
