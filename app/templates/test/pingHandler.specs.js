var chai = require('chai');
chai.should();
var expect = chai.expect;

var pingHandler = require("../lib/v1/handlers/pingHandler.js");

describe('pingHandler', function () {

    var request = { };
    var result;

    before(function (done) {
        pingHandler.handler(request, function (code) {
            result = code;
            done();
        });
    });

    it('should return pong', function () {
        expect(result).to.equal('pong');
    });

});

