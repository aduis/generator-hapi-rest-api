var boom = require('boom');
var <%= Resource %> = require('../models/<%= resource %>Model');

module.exports.handler = function (request, reply) {
    <%= Resource %>.update({_id: request.param.id}, request.param.payload, {multi: false}, function (err, numAffected) {
        if (err) {
            return reply(boom.badImplementation(err));
        }

        reply('OK');
    })
};

