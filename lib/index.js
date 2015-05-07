var Hapi = require('hapi');
var config = require('../config/config.js');
var server = new Hapi.Server();

server.connection({
    port: config.server.port,
    routes: {
        cors: true
    }
});

var plugins = [
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

server.start(function (err, server) {
    if (err) {
        console.log("err", err);
    }
});
