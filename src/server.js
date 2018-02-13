import { graphql, buildSchema } from 'graphql'
import express from 'express'
import bodyParser from 'body-parser'

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

const app = express()
app.use(bodyParser.json())
app.use('/graphql', (req, res) => {
  console.log('Query received', req.body.query)
  graphql(schema, req.body.query, resolvers).then(result => {
    console.log('result', result)
    res.send(result)
  })
})

app.listen(4000, () =>
  console.log('App is listening on localhost:4000/graphql')
)

// Now try this request:
// curl -X POST \
//   http://localhost:4000/graphql \
//   -H 'content-type: application/json' \
//   -d '{"query":"{hello}"}'
