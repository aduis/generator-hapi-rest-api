var ping = require('./handlers/pingHandler.js');

var postModel = require('./handlers/postModelHandler.js');
var getModel = require('./handlers/getModelHandler.js');
var putModel = require('./handlers/putModelHandler.js');
var deleteModel = require('./handlers/deleteModelHandler.js');

var modelSchema = require('./schemas/modelSchema.js');

//todo: validate id url param
//todo: insert placholders

module.exports.register = function (plugin, options, next) {

    plugin.bind({
        config: plugin.app.config
    });

    plugin.route({
        path: "/v1/ping",
        method: "GET",
        handler: ping.handler,
        config: {
            description: 'ping route',
            tags: ['api']
        }
    });

    plugin.route({
        path: "/v1/models/{id}",
        method: "GET",
        handler: getModel.handler,
        config: {
            description: 'get model',
            tags: ['api']
        }
    });

    plugin.route({
        path: "/v1/models/{id}",
        method: "POST",
        handler: postModel.handler,
        config: {
            description: 'add new model',
            tags: ['api'],
            validate: {
                payload: modelSchema
            }
        }
    });

    plugin.route({
        path: "/v1/models/{id}",
        method: "PUT",
        handler: putModel.handler,
        config: {
            description: 'update model',
            tags: ['api'],
            validate: {
                payload: modelSchema
            }
        }
    });

    plugin.route({
        path: "/v1/models/{id}",
        method: "DELETE",
        handler: deleteModel.handler,
        config: {
            description: 'delete model',
            tags: ['api']
        }
    });

    next();
};

module.exports.register.attributes = {
    pkg: require('../../package.json')
};
