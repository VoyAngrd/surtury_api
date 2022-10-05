const usetube = require('usetube')
const { isObjectEmpty, currentLocalDate } = require('./utilityFunctions');

var channelVideoList = [{}]

async function getChannelVideos(publishedAfter) {
    const channelID = `UCcNST01YviJ0tMunSa0OwTg`

    let videoList = await usetube.getChannelVideos(channelID, publishedAfter)

    if (isObjectEmpty(videoList[0])) {
        return false
    }

    channelVideoList = videoList
    module.exports.channelVideoList = channelVideoList
    return true
}

async function createVideoList() {
    let success = await getChannelVideos()

    if (success) {
        return console.log(`The video list has been created (${currentLocalDate()})`)
    }

    console.log(`Unable to create video list (${currentLocalDate()})`)
    console.log(`Trying again in 10 minutes...`)

    setTimeout(createVideoList, 600000)
}

module.exports = {
    getChannelVideos,
    createVideoList
}