Trainings = new Mongo.Collection('Trainings');

Trainings.allow({
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

Trainings.latest = function() {
    return Trainings.find({}, {sort: {date: -1}, limit: 1});
}

Meteor.methods({
    createTraining: function(training, tweet, loc) {
        check(Meteor.userId(), String);
        check(training, {
            trainingName: String,
            text: String,
            image: String
        });
        check(tweet, Boolean);
        check(loc, Match.OneOf(Object, null));

        training.userId = Meteor.userId();
        training.userAvatar = Meteor.user().services.twitter.profile_image_url_https;
        training.userName = Meteor.user().profile.name;
        training.date = new Date;

        if (! this.isSimulation && loc)
            training.place = getLocationPlace(loc);

        var id = Trainings.insert(training);

        if (! this.isSimulation && tweet)
            tweetTraining(training);

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

    var tweetTraining = function(training) {
        // creates the tweet text, optionally truncating to fit the appended text
        function appendTweet(text, append) {
            var MAX = 117; // Max size of tweet with image attached

            if ((text + append).length > MAX)
                return text.substring(0, (MAX - append.length - 3)) + '...' + append;
            else
                return text + append;
        }

        // we need to strip the "data:image/jpeg;base64," bit off the data url
        var image = training.image.replace(/^data.*base64,/, '');

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
                    status: appendTweet(training.text, ' #localmarket'),
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
    console.log(Trainings.find().count());

if(Meteor.isServer && Trainings.find().count() === 0){
    Trainings.insert({
        trainingName: 'azjkaehkabka',
        text: 'azhkezakjhaz',
        image: '/img/activity/activity-placeholder-strawberry-640x640.jpg',
        userAvatar: 'https://avatars3.githubusercontent.com/u/204768?v=2&s=400',
        userName: 'Matt Debergalis',
        place: 'SoMA, San Francisco',
        date: new Date
    } );

    Trainings.insert({
        trainingName: '79798798798',
        text: 'popopo',
        image: '/img/activity/activity-placeholder-strawberry-640x640.jpg',
        userAvatar: 'https://avatars3.githubusercontent.com/u/204768?v=2&s=400',
        userName: 'Matt Debergalis',
        place: 'SoMA, San Francisco',
        date: new Date
    } );

    Trainings.insert({
        trainingName: 'JULIO CEZAR',
        text: 'mmmmmmmmmmmmmz',
        image: '/img/activity/activity-placeholder-strawberry-640x640.jpg',
        userAvatar: 'https://avatars3.githubusercontent.com/u/204768?v=2&s=400',
        userName: 'Matt Debergalis',
        place: 'SoMA, San Francisco',
        date: new Date
    } );


}

});

