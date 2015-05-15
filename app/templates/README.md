# <%= resource %> REST API

## documentation 

    http://localhost:<%= port %>/documentation

## model

    <% for(var i=0; i<fields.length; i++) {%>
       <%= fields[i].name %>: <%= fields[i].type %><%if (i != fields.length -1) { %>,<% } %>
    <% } %>
    
    /lib/v1/models/<%= resource %>Model.js

## request schema 

    /lib/v1/schemas/<%= resource %>Schema.js

## routes 

    ping -> /lib/v1/handlers/get<%= Resource %>Handler.js
    get -> /lib/v1/handlers/get<%= Resource %>Handler.js
    post -> /lib/v1/handlers/post<%= Resource %>Handler.js
    put -> /lib/v1/handlers/put<%= Resource %>Handler.js
    delete -> /lib/v1/handlers/delete<%= Resource %>Handler.js
    
## tests

    grunt test

## License

MIT
