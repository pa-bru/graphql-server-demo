const fakeDb = {
  users: [
    {
      id: 1,
      username: 'Polo',
      bio: 'The bio of Polo',
      age: 22,
      friends: [2, 3],
    },
    {
      id: 2,
      username: 'Chuck',
      bio: 'The bio of Chuck',
      age: 34,
      friends: [1],
    },
    {
      id: 3,
      username: 'Ricky',
      bio: 'The bio of Ricky',
      age: 56,
      friends: [1, 2],
    },
  ],
}

const getById = id => fakeDb.users.find(user => user.id === Number(id))

const schema = `
  type User {
    id: ID!
    username: String!
    age: Int!
    bio: String
    friends: [User]
  }

  extend type Query {
    user ( id: ID): User
  }
`

const resolvers = {
  Query: {
    user(_, { id }) {
      return getById(id)
    },
  },
  User: {
    friends(user) {
      return Promise.all(user.friends.map(getById))
    },
  },
}

export default {
  schema,
  resolvers,
}
