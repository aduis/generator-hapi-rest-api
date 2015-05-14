var chai = require('chai');
chai.should();
var expect = chai.expect;
var sinon = require('sinon');

var deleteHandler = require("../lib/v1/handlers/delete<%= Resource %>Handler.js");
var model = require('../lib/v1/models/<%= resource %>Model.js');

describe('delete<%= Resource %>Handler', function () {

    describe('without error', function () {

        var request = {
            params: {
                id: '554f284318f361904bda49e1'
            }
        };

        var result, stub;

        before(function (done) {
            stub = sinon.stub(model.prototype, 'remove').yields(null, 1);

            deleteHandler.handler(request, function (code) {
                result = code;
                done();
            });
        });

        it('should return id of deleted <%= resource %>', function () {
            expect(result).to.equal(request.params.id);
        });

        after(function(){
            stub.restore();
        });

    });

    describe('with error', function () {

        var request = {
            params: {
                id: '554f284318f361904bda49e1'
            }
        };

        var result, stub;

        before(function (done) {
            stub = sinon.stub(model, 'remove').yields('could not delete', null);

            deleteHandler.handler(request, function (code) {
                result = code;
                done();
            });
        });

        it('should return error', function () {
            expect(result.toString()).to.equal('Error: could not delete');
        });

        after(function(){
            stub.restore();
        });

    });

});

