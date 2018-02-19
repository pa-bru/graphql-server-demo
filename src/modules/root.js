export default {
  schema: `
    type Query {
      hello: String
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
