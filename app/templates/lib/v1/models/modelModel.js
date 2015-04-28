//todo: insert placholders
//todo: generic model

var config = require('../../../config/config');
var mongoose = require('mongoose');
mongoose.connect(config.mongo.uri + '/' + config.mongo.db);

var modelSchema = new mongoose.Schema(
    {
        name: String,
        image: String
    }
);

module.exports = mongoose.model('Model', modelSchema);
