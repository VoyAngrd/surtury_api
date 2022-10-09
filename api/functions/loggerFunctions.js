const config = require('../config/loggerConfig')

function getLevelName(level) {
    return level && config.levels.hasOwnProperty(level) ? level : `info`
}