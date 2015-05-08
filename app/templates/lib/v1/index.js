var ping = require('./handlers/pingHandler.js');

var post<%= Resource %> = require('./handlers/post<%= Resource %>Handler.js');
var get<%= Resource %> = require('./handlers/get<%= Resource %>Handler.js');
var put<%= Resource %> = require('./handlers/put<%= Resource %>Handler.js');
var delete<%= Resource %> = require('./handlers/delete<%= Resource %>Handler.js');

var <%= Resource %>Schema = require('./schemas/<%= Resource %>Schema.js');

//todo: validate id url param

module.exports.register = function (plugin, options, next) {

    plugin.bind({
        config: plugin.app.config
    });

    plugin.route({
        path: "/v1/ping",
        method: "GET",
        handler: ping.handler,
        config: {
            description: 'ping route',
            tags: ['api']
        }
    });

    plugin.route({
        path: "/v1/<%= Resources %>/{id}",
        method: "GET",
        handler: get<%= Resource %>.handler,
        config: {
            description: 'get <%= Resource %>',
            tags: ['api']
        }
    });

    plugin.route({
        path: "/v1/<%= Resources %>/{id}",
        method: "POST",
        handler: post<%= Resource %>.handler,
        config: {
            description: 'add new <%= Resource %>',
            tags: ['api'],
            validate: {
                payload: <%= Resource %>Schema
            }
        }
    });

    plugin.route({
        path: "/v1/<%= Resources %>/{id}",
        method: "PUT",
        handler: put<%= Resource %>.handler,
        config: {
            description: 'update <%= Resource %>',
            tags: ['api'],
            validate: {
                payload: <%= Resource %>Schema
            }
        }
    });

    plugin.route({
        path: "/v1/<%= Resources %>/{id}",
        method: "DELETE",
        handler: delete<%= Resource %>.handler,
        config: {
            description: 'delete <%= Resource %>',
            tags: ['api']
        }
    });

    next();
};

module.exports.register.attributes = {
    pkg: require('../../package.json')
};
