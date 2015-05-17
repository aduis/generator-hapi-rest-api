var joi = require('joi');

var ping = require('./handlers/pingHandler.js');

var post<%= Resource %> = require('./handlers/post<%= Resource %>Handler.js');
var get<%= Resource %> = require('./handlers/get<%= Resource %>Handler.js');
var put<%= Resource %> = require('./handlers/put<%= Resource %>Handler.js');
var delete<%= Resource %> = require('./handlers/delete<%= Resource %>Handler.js');

var <%= resource %>Schema = require('./schemas/<%= resource %>Schema.js');

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
        path: "/v1/<%= resources %>/{id?}",
        method: "GET",
        handler: get<%= Resource %>.handler,
        config: {
            description: 'get <%= Resource %>',
            tags: ['api'],
            validate: {
                params: {
                    id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
                },
                query: { <% for(var i=0; i<query.length; i++) {%>
                    <%= query[i].name %>: joi.<%= query[i].joi %>()<%if (i != query.length -1) { %>,<% } %><% } %>
                }
            }
        }
    });

    plugin.route({
        path: "/v1/<%= resources %>",
        method: "POST",
        handler: post<%= Resource %>.handler,
        config: {
            description: 'add new <%= Resource %>',
            tags: ['api'],
            validate: {
                payload: <%= resource %>Schema
            }
        }
    });

    plugin.route({
        path: "/v1/<%= resources %>/{id}",
        method: "PUT",
        handler: put<%= Resource %>.handler,
        config: {
            description: 'update <%= Resource %>',
            tags: ['api'],
            validate: {
                payload: <%= resource %>Schema,
                params: {
                    id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
                }
            }
        }
    });

    plugin.route({
        path: "/v1/<%= resources %>/{id}",
        method: "DELETE",
        handler: delete<%= Resource %>.handler,
        config: {
            description: 'delete <%= Resource %>',
            tags: ['api'],
            validate:{
                params: {
                    id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
                }
            }
        }
    });

    next();
};

module.exports.register.attributes = {
    pkg: require('../../package.json')
};
