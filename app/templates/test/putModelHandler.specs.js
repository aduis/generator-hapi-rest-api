var chai = require('chai');
chai.should();
var expect = chai.expect;
var sinon = require('sinon');

var putHandler = require("../lib/v1/handlers/put<%= Resource %>Handler.js");
var model = require('../lib/v1/models/<%= resource %>Model.js');

describe('put<%= Resource %>Handler', function () {

    describe('without error', function () {

        var request = {
            params: {
                id: '554f284318f361904bda49e1'
            },
            payload: {
            <% for(var i=0; i<fields.length; i++) {%>
                <%= fields[i].name %>: <%= fields[i].sample %><%if (i != fields.length -1) { %>,<% } %>
            <% } %>
            }
        };

        var <%= resource %> = {
            _id: '554f284318f361904bda49e1'
        };

        var result, stub;

        before(function (done) {
            stub = sinon.stub(model.prototype, 'update').yields(null, <%= resource %>);

            putHandler.handler(request, function (code) {
                result = code;
                done();
            });
        });

        it('should return id of updated <%= resource %>', function () {
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
            },
            payload: {
            <% for(var i=0; i<fields.length; i++) {%>
                <%= fields[i].name %>: <%= fields[i].sample %><%if (i != fields.length -1) { %>,<% } %>
            <% } %>
            }
        };

        var result, stub;

        before(function (done) {
            stub = sinon.stub(model, 'update').yields('could not update', null);

            putHandler.handler(request, function (code) {
                result = code;
                done();
            });
        });

        it('should return error', function () {
            expect(result.toString()).to.equal('Error: could not update');
        });

        after(function(){
            stub.restore();
        });

    });

});

