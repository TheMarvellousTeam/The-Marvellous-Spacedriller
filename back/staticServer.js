const express = require('express')

const app = express()

app.use(express.static('./front/.tmp'))

app.listen(80, () => {
  console.log('serving static file on port 80')
})
