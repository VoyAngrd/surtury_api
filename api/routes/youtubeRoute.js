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

routes.get('/youtube/nightbot-message', (req, res) => {
    if (youtube.nightbotMessage) {
        return res.status(200).json({
            "message": youtube.nightbotMessage
        })
    }

    return res.status(200).json({
        "message": youtube.nightbotDefaultMessage
    })
})

module.exports = routes