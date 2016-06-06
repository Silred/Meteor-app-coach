Recipes = new Mongo.Collection('Recipes');

Recipes.allow({
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

Recipes.latest = function() {
    return Recipes.find({}, {sort: {date: -1}, limit: 1});
}

Meteor.methods({
    createrecipe: function(recipe, tweet, loc) {
        check(Meteor.userId(), String);
        check(recipe, {
            recipeName: String,
            text: String,
            image: String
        });
        check(tweet, Boolean);
        check(loc, Match.OneOf(Object, null));

        recipe.userId = Meteor.userId();
        recipe.userAvatar = Meteor.user().services.twitter.profile_image_url_https;
        recipe.userName = Meteor.user().profile.name;
        recipe.date = new Date;

        if (! this.isSimulation && loc)
            recipe.place = getLocationPlace(loc);

        var id = Recipes.insert(recipe);

        if (! this.isSimulation && tweet)
            tweetrecipe(recipe);

        return id;
    }
});

if (Meteor.isServer) {
    var twitterOauth = function(options) {
        var config = Meteor.settings.twitter
        var userConfig = Meteor.user().services.twitter;

        return {
            consumer_key: config.consumerKey,
            consumer_secret: config.secret,
            token: userConfig.accessToken,
            token_secret: userConfig.accessTokenSecret
        };
    }

    var tweetrecipe = function(recipe) {
        // creates the tweet text, optionally truncating to fit the appended text
        function appendTweet(text, append) {
            var MAX = 117; // Max size of tweet with image attached

            if ((text + append).length > MAX)
                return text.substring(0, (MAX - append.length - 3)) + '...' + append;
            else
                return text + append;
        }

        // we need to strip the "data:image/jpeg;base64," bit off the data url
        var image = recipe.image.replace(/^data.*base64,/, '');

        var response = HTTP.post(
            'https://upload.twitter.com/1.1/media/upload.json', {
                params: { media: image },
                npmRequestOptions: { oauth: twitterOauth() }
            }
        );

        if (response.statusCode !== 200)
            throw new Meteor.Error(500, 'Unable to post image to twitter');

        if (! response.data)
            throw new Meteor.Error(500, 'Did not receive attachment from twitter');

        var attachment = response.data;

        response = HTTP.post(
            'https://api.twitter.com/1.1/statuses/update.json', {
                params: {
                    status: appendTweet(recipe.text, ' #localmarket'),
                    media_ids: attachment.media_id_string
                },
                npmRequestOptions: { oauth: twitterOauth() }
            }
        );

        if (response.statusCode !== 200)
            throw new Meteor.Error(500, 'Unable to create tweet');
    }

    var getLocationPlace = function(loc) {
        var url = 'https://api.twitter.com/1.1/geo/reverse_geocode.json'
            + '?granularity=neighborhood'
            + '&max_results=1'
            + '&accuracy=' + loc.coords.accuracy
            + '&lat=' + loc.coords.latitude
            + '&long=' + loc.coords.longitude;

        var response = HTTP.get(url,
            {npmRequestOptions: { oauth: twitterOauth() } });

        if (response.statusCode === 200 && response.data) {
            var place = _.find(response.data.result.places, function(place) {
                return place.place_type === 'neighborhood';
            });

            return place && place.full_name;
        }
    }
}

// Initialize a seed activity
Meteor.startup(function() {
    console.log(Recipes.find().count());

    if(Meteor.isServer && Recipes.find().count() === 0){
        Recipes.insert({

            "title": "Fromage Fort",
            "highlighted": true,
            "excerpt": "When I’ve got too many cheese bits on hand, it's now fromage fort to the rescue",
            "source": {
                "name": "David Lebovitz",
                "url": "http://www.davidlebovitz.com/2014/04/fromage-forte-cheese-dip-spread-recipe/"
            },
            "cookTime": "15 min",
            "ingredients": [
                "8 ounces (225g) cheese pieces, hard rinds removed",
                "1 to 2 ounces (30 to 60g) cream cheese",
                "1/4 cup (60ml) dry white wine",
                "1 garlic clove, peeled and minced",
                "a few turns of freshly ground black pepper",
                "pinch of cayenne or red pepper powder",
                "1 tablespoon minced chives or flat-leaf parsley",
                "chives or parsley, for garnish"
            ],
            "directions": [
                "Cut the cheese into bite-sized cubes and put them in the bowl of a food processor with 1 ounce (30g) of the cream cheese, wine, garlic, and the black and red peppers.",
                "Process the mixture until completely smooth. If it is not completely smooth (which may happen if you are starting with an assortment of harder cheeses), add the additional cream cheese, and continue to process."
            ],
            "name": "spring-fromage-fort"
        } );
        Recipes.insert({

            "title": "Classic Ragu Bolognese",
            "excerpt": "A certain magic happens as the beef and aromatic vegetables slowly cook down with wine, tomato paste, and broth",
            "source": {
                "name": "Bon Appétit",
                "url": "http://www.bonappetit.com/recipe/classic-rag-bolognese"
            },
            "cookTime": "1 hr 10 min",
            "ingredients": [
                "2 Tbsp. extra-virgin olive oil",
                "2 medium onions, finely chopped (about 1 1/2 cups)",
                "2 celery stalks, finely chopped (about 1 cup)",
                "2 carrots, peeled, finely chopped (about 3/4 cup)",
                "6 oz. ground beef (85% lean)",
                "6 oz. ground veal",
                "3 oz. thinly sliced pancetta, finely chopped",
                "1/2 cup dry red wine",
                "3 cups (about) beef stock or chicken stock, divided",
                "3 Tbsp. tomato paste",
                "Kosher salt and freshly ground black pepper",
                "1 cup whole milk",
                "1 lb. tagliatelle or fettuccine (preferably fresh egg)",
                "Finely grated Parmesan (for serving)"
            ],
            "directions": [
                "Heat oil in a large heavy pot over medium-high heat.",
                "Add onions, celery, and carrots."
            ],
            "name": "spring-ragu-bolognese"
        } );
        Recipes.insert({
            "title": "Animal-Cracker Cookies",
            "excerpt": "Create and decorate magical cookies that are as much fun as a day at the circus!",
            "source": {
                "name": "Williams-Sonoma",
                "url": "http://www.williams-sonoma.com/recipe/animal-cracker-cookies.html"
            },
            "cookTime": "1 hr",
            "ingredients": [
                "2 1/2 cups all-purpose flour",
                "1 tsp. baking powder",
                "1/2 tsp. salt",
                "1/8 tsp. freshly grated nutmeg",
                "1/8 tsp. mace",
                "12 Tbs. (1 1/2 sticks) unsalted butter, at room temperature",
                "1 cup sugar",
                "1 egg",
                "1 tsp. vanilla extract"
            ],
            "directions": [
                "Over a small bowl, sift together the flour, baking powder, salt, nutmeg and mace. Set aside.",
                "In the bowl of an electric mixer fitted with the flat beater, beat the butter on high speed for 2 minutes. Reduce the speed to medium, slowly add the sugar and beat for 2 minutes, stopping the mixer occasionally to scrape down the sides of the bowl. Add the egg and vanilla and beat for 1 minute, stopping the mixer once to scrape down the sides of the bowl."
            ],
            "name": "spring-animal-cracker-cookies"
        } );
        Recipes.insert({
            "title": "Chicken in Molé",
            "excerpt": "If there is one dish that could be considered Mexican haute cuisine, then Mole Poblano is surely it",
            "source": {
                "name": "Epicurious",
                "url": "http://www.epicurious.com/recipes/food/views/Chicken-in-Mole-Puebla-Style-238185"
            },
            "cookTime": "2 hr",
            "ingredients": [
                "4 pounds chicken pieces, skin on",
                "Sea salt and ground black pepper to taste",
                "2 tablespoons sesame seeds, toasted, for garnish",
                "white rice",
                "9 mulato chiles",
                "7 pasilla chiles",
                "6 ancho chiles",
                "1 cup plus 9 tablespoons vegetable oil or lard plus additional as needed",
                "4 or 5 tomatillos, husked and cooked until soft",
                "5 whole cloves",
                "20 whole black peppercorns",
                "1-inch piece of a Mexican cinnamon stick",
                "1 tablespoon seeds from the chiles, toasted",
                "1/2 teaspoon anise seeds, toasted",
                "1/4 teaspoon coriander seeds, toasted",
                "8 tablespoons sesame seeds, toasted",
                "4 garlic cloves, roasted",
                "3 tablespoons raisins",
                "20 whole almonds, blanched",
                "1/4 cup pumpkin seeds",
                "2 corn tortillas, torn into pieces",
                "3 stale French rolls, cut into 1-inch slices",
                "6 to 7 cups reserved chicken broth as needed",
                "1 1/2 ounces Mexican chocolate, chopped"
            ],
            "directions": [
                "In a large stock pot, parboil the chicken in water seasoned with salt and pepper to taste. Drain, reserving cooking broth, and refrigerate until ready to assemble the dish.",
                "Prepare the Mole Poblano. Clean the chiles by removing stems, veins, and seeds; reserve 1 tablespoon of the seeds."
            ],
            "name": "spring-chicken-in-mole"
        } );
        Recipes.insert({
            "title": "Spanish Asparagus Revuelto",
            "excerpt": "In Spain, wild asparagus is very popular, and it’s a sure sign of spring",
            "source": {
                "name": "NY Times",
                "url": "http://www.nytimes.com/recipes/1016240/spanish-asparagus-revuelto.html"
            },
            "cookTime": "30 min",
            "ingredients": [
                "Olive oil",
                "2 peeled garlic cloves, plus 1/2 teaspoon minced garlic",
                "2 cups bread cubes, made with day-old bread, cut in 1/2-inch cubes",
                "Salt and pepper",
                "2 ounces diced Spanish chorizo",
                "1 bunch thin asparagus, about 1 1/2 pounds, cut in 1- to 2-inch lengths",
                "1 bunch green onions, chopped",
                "8 large eggs, beaten",
                "1/2 teaspoon pimentón",
                "2 tablespoons roughly chopped Italian parsley"
            ],
            "directions": [
                "Put 3 tablespoons olive oil in a cast-iron skillet over medium-high heat. Add peeled garlic cloves and let them sizzle until lightly browned, then remove.",
                "Add bread cubes, season with salt and pepper, lower heat to medium and gently fry until lightly browned and crisp, about 2 minutes. Remove bread and set aside to cool."
            ],
            "name": "spring-spanish-asparagus-revuelto"
        } );



    }

});

