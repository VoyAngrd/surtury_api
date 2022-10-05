const usetube = require('usetube')
const { isObjectEmpty, currentLocalDate } = require('./utilityFunctions')
const { sub } = require('date-fns')

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
    if (await getChannelVideos()) {
        return console.log(`The video list has been created (${currentLocalDate()})`)
    }

    console.log(`Unable to create video list (${currentLocalDate()})`)
    console.log(`Trying again in 10 minutes...`)

    setTimeout(createVideoList, 600000)
}

async function updateVideoList() {
    if (isObjectEmpty(channelVideoList[0])) {
        console.log(`Video list hasn't been created yet (${currentLocalDate()})`)
        console.log(`Trying to create...`)

        return async () => {
            await createVideoList()
            setTimeout(updateVideoList, 600000)
        }
    }

    if (await getChannelVideos(sub(channelVideoList[0].publishedAt, {days: 1}))) {
        return console.log(`The video list has been updated (${currentLocalDate()})`)
    }

    console.log(`Unable to update video list (${currentLocalDate()})`)
    console.log(`Trying again in 10 minutes...`)
    return setTimeout(updateVideoList, 600000)
}

module.exports = {
    getChannelVideos,
    createVideoList,
    updateVideoList
}