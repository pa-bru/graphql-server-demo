import axios from 'axios'

const fakeApiUrl = 'http://localhost:5000'
const getById = id => {
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
    user(_, { id }) {
      return getById(id)
    },
    users() {
      return getUsers()
    },
  },
  User: {
    friends(user) {
      return user.friends.map(id => getById(id))
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
