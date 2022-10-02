const express = require('express')
const routes = require('./routes')
const port = 3000

const server = express()

routes(server)

server.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

module.exports = server