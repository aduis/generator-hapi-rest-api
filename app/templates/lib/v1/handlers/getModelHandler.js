var boom = require('boom');
var <%= Resource %> = require('../models/<%= resource %>Model');

//todo get all
module.exports.handler = function (request, reply) {
    if (request.params.id) {
        <%= Resource %>.findById(request.params.id, function (err, <%= resource %>) {
            if (err)
                return reply(boom.badImplementation(err));

            reply(<%= resource %>);
        });
    } else {
        <%= Resource %>.find({}, function (err, <%= resources %>) {
            if (err)
                return reply(boom.badImplementation(err));

            reply(<%= resources %>);
        });
    }
};
