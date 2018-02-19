# GraphQL Server

> This project is used as a demo to introduce GraphQL and how to use it on the server side.

To see the progression checkout to the following branches.

## 01-introducing-graphql-js

Use of the `graphql()` & `buildSchema()` functions of [GraphQL.js].
The GraphQL query is defined statically in the server.

## 02-expose-the-graphql-endpoint

Use of [Express.js] to expose the GraphQL API on a `/graphql` endpoint.
This time we pass the GraphQL query with the body request.

[graphql.js]: https://github.com/graphql/graphql-js
[express.js]: http://expressjs.com/
