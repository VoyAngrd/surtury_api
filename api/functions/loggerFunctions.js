const chalk = require('chalk')
const path = require('node:path')
const readLine = require('node:readline')
const { existsSync, mkdirSync, appendFileSync, createReadStream } = require('node:fs')
const { currentLocalDate } = require('./utilityFunctions')
const config = require('../config/loggerConfig')

var logsDir = `./logs`

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

async function read(fileName = null) {
    return new Promise((resolve, reject) => {

        let file = path.join(
            logsDir,
            `${fileName}.log`
        )

        let lineReader = readLine.createInterface({
            input: createReadStream(file)
        })

        let logs = []

        lineReader.on('line', (line) => {
            logs.push(JSON.parse(line))
        })

        lineReader.on('close', () => {
            console.log(
                chalk.yellow(`${fileName.toUpperCase()} logs have been accessed!`)
            )
            console.table(logs)
            resolve(logs)
        })

        lineReader.on('error', (error) => {
            reject(error)
        })
    })
}

function access(message) {
    return write({level: `access`, message})
}

function warn(message) {
    return write({level: `warn`, message})
}

function debug(message) {
    return write({level: `debug`, message})
}

function system(message) {
    return write({level: `system`, message})
}

function info(message) {
    return write({level: `info`, message})
}

module.exports = {
    read,
    access,
    warn,
    debug,
    system,
    info
}