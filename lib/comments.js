Comments = new Mongo.Collection('Comments');

Comments.allow({
    insert: function () {
        return true;
    },

    remove: function (){
        return true;
    },

    update: function() {
        return true;
    }

});


