# GraphQL Server

> This project is used as a demo to introduce GraphQL and how to use it on the server side.

To see the progression checkout to the following branches.

## 01-introducing-graphql-js

Use of the `graphql()` & `buildSchema()` functions of [GraphQL.js].
The GraphQL query is defined statically in the server.

## 02-expose-the-graphql-endpoint

Use of [Express.js] to expose the GraphQL API on a `/graphql` endpoint.
This time we pass the GraphQL query with the body request.

## 03-graphql-http-server-middleware

We stopped using directly the `graphql()` function but started using the [apollo-server-express] middleware which execute the `graphql()` function for us but manage other things like HTTP issues, [GraphiQL], GraphQL validation rules, extensions, etc.

GraphiQL is an in-browser IDE to test GraphQL queries, see what is available in the schema, autocomplete queries...

We also added a fake users list to simulate a user API.

## 04-setup-a-modular-architecture

In this branch we decided to dispatch our GraphQL server into several modules. The purpose is to have a maintainable architecture and to make it easy to work with several developers on the same project.
Now there is a `/modules` folder where we can put some files or folders in which each module has to return an object containing `{schema, resolvers}`. Then theses modules will be merged by `makeExecutableSchema()`.

To achieve that we used the [graphql-tools] package of Apollo. It's a utility package which enable the generation of a schema from several substrings.

[graphql.js]: https://github.com/graphql/graphql-js
[express.js]: http://expressjs.com/
[apollo-server-express]: https://github.com/apollographql/apollo-server
[graphiql]: https://github.com/graphql/graphiql
[graphql-tools]: https://github.com/apollographql/graphql-tools
