var boom = require('boom');
var <%= Resource %> = require('../models/<%= resource %>Model');

module.exports.handler = function (request, reply) {
    var <%= resource %> = new <%= Resource %>({ <% for(var i=0; i<fields.length; i++) {%>
           <%= fields[i].name %>: request.payload.<%= fields[i].name %><%if (i != fields.length -1) { %>,<% } %><% } %>
    });

    <%= resource %>.save(function (err, <%= resource %>) {
        if (err) {
            return reply(boom.badImplementation(err));
        }

        <%if (userabbitmq) { %>var rabbit = request.server.plugins['hapi-rabbit'];
        rabbit.createContext(function(err, context){
            if(err){
                console.error(err);
            }

            rabbit.publish(context, '<%= resources %>', 'new', '{ "href": "/v1/<%= resources %>/'+ <%= resource %>._id.toString() +'" }', function(err, data){
                if(err){
                    console.error(err);
                }
            });
        });<% } %>

        reply(<%= resource %>._id.toString());
    });
};
