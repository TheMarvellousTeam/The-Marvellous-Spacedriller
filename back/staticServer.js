const express = require('express')

const app = express()

app.use(express.static('./front/.tmp'))

app.listen(31415, () => {
  console.log('serving static file on port 31415')
})
