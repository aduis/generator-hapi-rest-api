//todo: insert placholders

var boom = require('boom');
var Model = require('../models/modelModel');

module.exports.handler = function (request, reply) {
    var model = new Model({
        name: request.payload.name,
        image: request.payload.image
    });

    model.save(function (err) {
        if (err) {
            return reply(boom.badImplementation(err));
        }

        reply('OK');
    });
};
