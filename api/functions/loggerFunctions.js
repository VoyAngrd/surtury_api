const chalk = require('chalk')
const { currentLocalDate } = require('./utilityFunctions')
const config = require('../config/loggerConfig')

function getLevelName(level) {
    return level && config.levels.hasOwnProperty(level) ? level : `info`
}

function writeToConsole(levelName, message, error = null) {
    let level = config.levels[levelName]

    let chalkFunction = chalk.hex(level.color)

    message = error ? `${error.message} \n ${error.stack}` : message

    let header = `[${levelName.toUpperCase()}] (${currentLocalDate()})`

    console.log(`${chalkFunction(header)}: ${chalkFunction(message)}`)
}