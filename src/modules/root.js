export default {
  schema: `
    type Query {
      hello: String @cost(complexity: 5)
    }
    type Mutation

    schema {
      query: Query
      mutation: Mutation
    }
  `,
  resolvers: {
    Query: {
      hello() {
        return 'Hello World'
      },
    },
  },
}
