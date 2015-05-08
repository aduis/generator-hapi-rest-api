var boom = require('boom');
var <%= Resource %> = require('../models/<%= resource %>Model');

module.exports.handler = function (request, reply) {
    var <%= resource %> = new <%= Resource %>({
        <% for(var i=0; i<fields.length; i++) {%>
           <%= fields[i].name %>: request.payload.<%= fields[i].name %><%if (i != fields.length -1) { %>,<% } %>
        <% } %>
    });

    <%= resource %>.save(function (err) {
        if (err) {
            return reply(boom.badImplementation(err));
        }

        reply('OK');
    });
};
