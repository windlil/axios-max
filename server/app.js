const express = require('epxress')

const app = express()
app.use((req, res, next) => {
  res.header({
    'Access-Control-Allow-Origin': '*'
  })
  next()
})

app.get('/a', (req, res) => [
  res.send({
    code: 1
  })
])

app.listen(3080, () => {
  console.log('server running')
})