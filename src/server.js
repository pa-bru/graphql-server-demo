import { graphql, buildSchema } from 'graphql'

const query = '{ hello }'

const schema = buildSchema(`
type Query {
  hello: String
}
`)

const resolvers = {
  hello() {
    return 'Hello World'
  },
}

graphql(schema, query, resolvers).then(response => {
  console.info(response)
  return response
})
