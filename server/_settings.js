// Provide defaults for Meteor.settings
//
// To configure your own Twitter keys, see:
//   https://github.com/meteor/meteor/wiki/Configuring-Twitter-in-Local-Market

ServiceConfiguration.configurations.remove({
    service: 'facebook',
    service: 'twitter'
});

ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: "823727304393759",
    secret: '2156a83b4ce18b2a3ae9a7d451a8544a',

    service: 'twitter',
    consumerKey: "dw5YpSTtqeaPuI43ylHePuV4p",
    secret: "PRBzQNQrSbsZd4EPIpAbwN5lRL5EnLAsco7DDqEsJ2lsMHA02S"
});

