var boom = require('boom');
var <%= Resource %> = require('../models/<%= resource %>Model');

module.exports.handler = function (request, reply) {
    <%= Resource %>.remove({ _id: request.params.id }, function (err) {
        if (err)
            return reply(boom.badImplementation(err));

        <%if (userabbitmq) { %>var rabbit = request.server.plugins['hapi-rabbit'];
        rabbit.createContext(function(err, context){
            if(err){
                console.error(err);
            }

            rabbit.publish(context, '<%= resources %>', 'delete', '{ "href": "/v1/<%= resources %>/'+ request.params.id +'" }', function(err, data){
                if(err){
                    console.error(err);
                }
            });
        });<% } %>

        reply(request.params.id);
    });
};
