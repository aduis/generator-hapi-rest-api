//todo: insert placholders

var boom = require('boom');
var Model = require('../models/modelModel');

module.exports.handler = function (request, reply) {
    if (request.params.id) {
        Model.findById(request.params.id, function (err, model) {
            if (err)
                return reply(boom.badImplementation(err));

            reply(model);
        });
    } else {
        Model.find({}, function (err, models) {
            if (err)
                return reply(boom.badImplementation(err));

            reply(models);
        });
    }
};
