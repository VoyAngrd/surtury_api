const usetube = require('usetube')
const { isObjectEmpty, currentLocalDate, timelessDate } = require('./utilityFunctions')
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
        updateNightbotMessage()
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
        updateNightbotMessage()
        return console.log(`The video list has been updated (${currentLocalDate()})`)
    }

    console.log(`Unable to update video list (${currentLocalDate()})`)
    console.log(`Trying again in 10 minutes...`)
    return setTimeout(updateVideoList, 600000)
}

function updateNightbotMessage() {
    let videoURL = `https://youtu.be/${channelVideoList[0].id}`
    let videoPublishDate = timelessDate(channelVideoList[0].publishedAt)
    let today = timelessDate(new Date());

    switch (videoPublishDate) {
        case today:
            module.exports.nightbotMessage = `Saiu vídeo novo hoje! Assiste lá depois! ${videoURL}`
            break

        case sub(today, {days: 1}):
            module.exports.nightbotMessage = `Saiu vídeo novo ontem! Assiste lá depois! ${videoURL}`
            break

        case sub(today, {days: 2}):
            module.exports.nightbotMessage = `Saiu vídeo novo anteontem! Assiste lá depois! ${videoURL}`
            break

        default:
            module.exports.nightbotMessage = nightbotDefaultMessage
            break
    }
}

module.exports.nightbotDefaultMessage = `Também faço vídeos para o YouTube! Assiste lá depois! https://www.youtube.com/c/aSuSurtury`

module.exports.start = async () => {
    await createVideoList()
    setTimeout(updateVideoList, 600000)
}