var config = require('../../../config/config');
var mongoose = require('mongoose');
mongoose.connect(config.mongo.uri + '/' + config.mongo.db);

var <%= resource %>Schema = new mongoose.Schema(
    {
        <% for(var i=0; i<fields.length; i++) {%>
           <%= fields[i].name %>:<%= fields[i].mongoose %><%if (i != fields.length -1) { %>,<% } %>
        <% } %>
    }
);

module.exports = mongoose.model('<%= Resource %>', <%= resource %>Schema);
