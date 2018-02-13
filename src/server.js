import { graphql, buildSchema } from 'graphql'
import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'

const schema = buildSchema(`
type User {
  id: ID!
  username: String!
  age: Int!
  bio: String
}

type Query {
  hello: String

  user ( id: ID): User
}
`)

const fakeDb = {
  users: [
    {
      id: 1,
      username: 'Polo',
      bio: 'The bio of Polo',
      age: 22,
    },
    {
      id: 2,
      username: 'Chuck',
      bio: 'The bio of Chuck',
      age: 34,
    },
    {
      id: 3,
      username: 'Ricky',
      bio: 'The bio of Ricky',
      age: 56,
    },
  ],
}

const resolvers = {
  hello() {
    return 'Hello World'
  },
  user({ id }) {
    return fakeDb.users.find(user => user.id === Number(id))
  },
}

const app = express()
app.use(bodyParser.json())

app.use('/graphql', graphqlExpress({ schema, rootValue: resolvers }))

app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(4000, () =>
  console.log('App is listening on localhost:4000/graphql')
)
