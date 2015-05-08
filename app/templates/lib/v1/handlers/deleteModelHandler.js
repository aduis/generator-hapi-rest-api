var boom = require('boom');
var <%= Resource %> = require('../models/<%= resource %>Model');

module.exports.handler = function (request, reply) {
    <%= Resource %>.remove({ _id: request.params.id }, function (err) {
      if (err)
        return reply(boom.badImplementation(err));

      reply('OK');
    });
};
