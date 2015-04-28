//todo: insert placholders

var boom = require('boom');
var Model = require('../models/modelModel');

module.exports.handler = function (request, reply) {
    Model.remove({ _id: request.params.id }, function (err) {
      if (err)
        return reply(boom.badImplementation(err));

      reply('OK');
    });
};
