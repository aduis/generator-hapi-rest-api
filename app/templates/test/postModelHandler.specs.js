var chai = require('chai');
chai.should();
var expect = chai.expect;
var sinon = require('sinon');

var postHandler = require('../lib/v1/handlers/post<%= Resource %>Handler.js');
var model = require('../lib/v1/models/<%= resource %>Model.js');

describe('post<%= Resource %>Handler', function () {

    describe('without error', function () {
        var request = {
            payload: { <% for(var i=0; i<fields.length; i++) {%>
                <%= fields[i].name %>: <%= fields[i].sample %><%if (i != fields.length -1) { %>,<% } %><% } %>
            }
        };

        var <%= resource %> = {
            _id: '554f284318f361904bda49e1'
        };

        var result, stub;

        before(function (done) {
            stub = sinon.stub(model.prototype, 'save').yields(null, <%= resource %>);

            postHandler.handler(request, function (code) {
                result = code;
                done();
            });
        });

        it('should return id of deleted <%= resource %>', function () {
            expect(result).to.equal(<%= resource %>._id);
        });

        after(function(){
            stub.restore();
        });

    });

    describe('with error', function () {
        var request = {
            payload: { <% for(var i=0; i<fields.length; i++) {%>
                <%= fields[i].name %>: <%= fields[i].sample %><%if (i != fields.length -1) { %>,<% } %><% } %>
            }
        };

        var result, stub;

        before(function (done) {
            stub = sinon.stub(model.prototype, 'save').yields('could not save', null);

            postHandler.handler(request, function (code) {
                result = code;
                done();
            });
        });

        it('should return error', function () {
            expect(result.toString()).to.equal('Error: Error: could not save');
        });

        after(function(){
            stub.restore();
        });

    });

});

