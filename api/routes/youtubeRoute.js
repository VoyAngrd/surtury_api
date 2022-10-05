const youtube = require('../functions/youtubeFunctions')
const { isObjectEmpty } = require('../functions/utilityFunctions')
const { Router } = require('express')
const routes = Router()

youtube.start()

routes.get('/youtube/channel-video-list', (req, res) => {
    if (isObjectEmpty(youtube.channelVideoList)) {
        return res.status(500).json({
            "message": "Channel video list hasn't been created yet"
        })
    }

    return res.status(200).json({
        "message": youtube.channelVideoList
    })
})

module.exports = routes