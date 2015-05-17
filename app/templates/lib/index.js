var Hapi = require('hapi');
var config = require('../config/config.js');
var server = new Hapi.Server();

server.connection({
    port: config.server.port,
    routes: {
        cors: true
    }
});

var good_options = {
    opsInterval: 1000,
    reporters: [{
        reporter: require('good-console'),
        events: {log: '*', response: '*'}
    }]
};

var plugins = [
    {
        register: require('good'),
        options: good_options
    },
    {
        register: require('./v1'),
        options: config.server.options
    },
    {
        register: require('hapi-swagger')
    }
];

server.register(plugins, function (err) {
    if (err) {
        console.log('Failed loading plugin');
    }
});

server.start(function (err) {
    if (err) {
        console.log("err", err);
    }

    console.info('Server started at ' + server.info.uri);
});
