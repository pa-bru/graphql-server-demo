import axios from 'axios'

const fakeApiUrl = 'http://localhost:5000'

export const getById = id => {
  return axios.get(`${fakeApiUrl}/users/${id}`).then(res => {
    return res.data
  })
}
const getUsers = limit => {
  let query = ''
  if (limit) {
    query = `?_limit=${limit}`
  }
  return axios.get(`${fakeApiUrl}/users/${query}`).then(res => {
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
    age: Int! @cost(complexity: 2)
    bio: String
    friends: [User] @cost
  }

  extend type Mutation {
    addUser(id: ID!, age: Int!, username: String!, bio: String, friends: [Int]): User
  }

  extend type Query {
    user ( id: ID): User
    users(limit: Int = 1): [User] @cost(multipliers:["limit"])
  }
`

const resolvers = {
  Query: {
    user(root, { id }, ctx) {
      return ctx.userLoader.load(id)
    },
    users(_, { limit }) {
      return getUsers(limit)
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
