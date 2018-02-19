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

## 05-aggregate-an-api

Now that we have a modular architecture, I replace the `fakeDatabase` object written statically in `src/modules/user.js` by a fake API thanks to [json-server]. So I defined a `db.json` file in the root directory and then added some commands in `package.json` to serve data from `db.json` in API exposed at http://localhost:5000/users.

I used [npm-run-all] to serve the GraphQL API and the user API in parallel.

Then, I added a mutation in the GraphQL server to enable adding new users to the user API.
A mutation is one the the 3 GraphQL operations (Query, Mutation, Subscription):

* Query: use it to perform read operations (like a GET in REST APIs). If no operation Type is specified in the client request, the Query operation is the default one.

* Mutation: any operations that performs writes should be sent explicitly via a mutation.(like a POST/PUT/PATCH in REST APIs)

* Subscription: used to subscribe to event based updates (web-socket). <br>E.g: When someone likes your post on Facebook, you get a notification.

## 06-optimizing-queries-with-dataloader

I you run the GraphQL server and try a query like this...

```graphql
{
  users {
    id
    username
    friends {
      id
      username
    }
  }
}
```

You can see that it works. You retrieve users and users's friends indeed.

However if you look at your terminal console you can figure out that you call same API endpoints several times.
This is because some users have friends that are users you already get in the query.

E.g: user #2 and #1 are each called 2 times

```shell
GET /users/ 200 0.585 ms - 390
GET /users/2 200 2.227 ms - 104
GET /users/3 200 1.163 ms - 111
GET /users/1 200 1.161 ms - 109
GET /users/1 200 1.185 ms - 109
GET /users/2 200 1.216 ms - 104
```

We can't have a production ready GraphQL server if we don't optimize GraphQL queries. So we need to batch API calls.

[Dataloader] is a Facebook package which can achieve that.

To make the batching work you have to instanciate a new Dataloader and pass to it a function to resolve your API calls by keys. Then instead of calling directly the user API in your resolver functions you need to call the `load(key)` function of your dataloader instance.

E.g

```js
import Dataloader from 'dataloader'

const userLoader = new Dataloader(ids => Promise.all(ids.map(getById)))

const user = userLoader.load(1) // returns user #1
```

Then if you run the query again, each API endpoint will be called juste once

```shell
GET /users/ 200 1.353 ms - 390
GET /users/2 200 1.612 ms - 104
GET /users/3 200 0.923 ms - 111
GET /users/1 200 0.948 ms - 109
```

[graphql.js]: https://github.com/graphql/graphql-js
[express.js]: http://expressjs.com/
[apollo-server-express]: https://github.com/apollographql/apollo-server
[graphiql]: https://github.com/graphql/graphiql
[graphql-tools]: https://github.com/apollographql/graphql-tools
[json-server]: https://github.com/typicode/json-server
[npm-run-all]: https://www.npmjs.com/package/npm-run-all
[dataloader]: https://github.com/facebook/dataloader
