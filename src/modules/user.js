import axios from 'axios'

const fakeApiUrl = 'http://localhost:5000'

export const getById = id => {
  return axios.get(`${fakeApiUrl}/users/${id}`).then(res => {
    return res.data
  })
}
const getUsers = () => {
  return axios.get(`${fakeApiUrl}/users/`).then(res => {
    return res.data
  })
}

const addUser = data => {
  return axios.post(`${fakeApiUrl}/users/`, data).then(res => {
    return res.data
  })
}

const schema = `
  type User {
    id: ID!
    username: String!
    age: Int!
    bio: String
    friends: [User]
  }

  extend type Mutation {
    addUser(id: ID!, age: Int!, username: String!, bio: String, friends: [Int]): User
  }

  extend type Query {
    user ( id: ID): User
    users: [User]
  }
`

const resolvers = {
  Query: {
    user(root, { id }, ctx) {
      return ctx.userLoader.load(id)
    },
    users() {
      return getUsers()
    },
  },
  User: {
    friends(user, args, ctx) {
      return ctx.userLoader.loadMany(user.friends)
    },
  },
  Mutation: {
    addUser(_, { id, age, username, bio = '', friends = [] }) {
      return addUser({ id, age, bio, username, friends })
    },
  },
}

export default {
  schema,
  resolvers,
}
