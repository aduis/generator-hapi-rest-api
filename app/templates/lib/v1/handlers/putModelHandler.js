//todo: insert placholders

var boom = require('boom');
var Model = require('../models/modelModel');

module.exports.handler = function (request, reply) {
    Model.update({_id: request.param.id}, request.param.payload, {multi: false}, function (err, numAffected) {
        if (err) {
            return reply(boom.badImplementation(err));
        }

        reply('OK');
    })
};

