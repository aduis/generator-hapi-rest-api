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
            },
            plugins: {
                hal: {
                    <%if (links.length > 0) { %>links: { <% for(var i=0; i<links.length; i++) {%>
                        '<%= links[i].name %>': '<%= links[i].link %>{<%= links[i].property %>}'<%if (i != links.length -1) { %>,<% } %><% } %>
                    },
                    ignore: [<% for(var i=0; i<links.length; i++) {%>'<%= links[i].property %>'<%if (i != links.length -1) { %>,<% } %><% } %>, '_id'],<% } %>
                    prepare: function (rep, next) {

                        if(rep.entity._customer){
                            rep.embed('customer', '/v1/customers/' + rep.entity._customer._id, rep.entity._customer);
                            rep.ignore('_customer');
                        }

                        if(rep.entity.cart){
                            rep.entity.cart.forEach(function (cartItem) {

                                var link = '/v1/' + (cartItem._room ? 'rooms' : 'services') + '/' + cartItem._id;
                                var embed = rep.embed('cart', link, cartItem);
                                embed.ignore('_room');
                                embed.ignore('_service');
                            });
                            rep.ignore('cart');
                        }
                        next();
                    }
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
