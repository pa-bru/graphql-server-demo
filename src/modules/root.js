export default {
  schema: `
    type Query {
      hello: String
    }

    schema {
      query: Query
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
