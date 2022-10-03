const usetube = require('usetube')
const { isObjectEmpty } = require('./utilityFunctions');

const channelID = `UCcNST01YviJ0tMunSa0OwTg`
var channelVideoList = {}

async function getChannelVideos() {
    let videoList = await usetube.getChannelVideos(channelID)

    if (isObjectEmpty(videoList)) {
        return false
    }

    channelVideoList = videoList
    module.exports.channelVideoList = channelVideoList
    return true
}

module.exports = {
    getChannelVideos
}