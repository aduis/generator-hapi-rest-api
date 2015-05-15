var joi = require('joi');

module.exports = {
    <% for(var i=0; i<fields.length; i++) {%>
        <%= fields[i].name %>: joi.<%= fields[i].joi %>().required()<%if (i != fields.length -1) { %>,<% } %><% } %>
};
