const youtube = require('./youtubeRoute')

module.exports = (server) => {
    server.use(youtube)
}