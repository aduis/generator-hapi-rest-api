//todo: insert placholders
//todo: generic model

var joi = require('joi');

module.exports = {
    name: joi.string().required(),
    image: joi.string().required()
};
