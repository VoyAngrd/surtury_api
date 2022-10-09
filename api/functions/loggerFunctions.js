const chalk = require('chalk')
const { existsSync, mkdirSync, appendFileSync } = require('node:fs')
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

function writeToFile(levelName, message) {
    let logsDir = `./logs`

    let data = `{"level": "${levelName.toUpperCase()}", "message": "${message}", "timestamp": "${currentLocalDate()}"}\r\n`

    if (!existsSync(logsDir)) {
        mkdirSync(logsDir)
    }

    let options = {
        encoding: `UTF8`,
        mode: 438
    }

    appendFileSync(`${logsDir}/${levelName}.log`, data, options)
}

function write(options) {
    let levelName = getLevelName(options.level)
    let message = options.message ?? `Unidentified error`
    let error = options.error ?? null

    writeToConsole(levelName, message, error)

    if (config.levels[levelName].writeToFile) {
        writeToFile(levelName, message, error)
    }
}