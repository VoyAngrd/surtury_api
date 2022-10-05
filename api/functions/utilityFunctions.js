function isObjectEmpty(object) {
    for (var property in object) {
        if (Object.prototype.hasOwnProperty.call(object, property)) {
            return false;
        }
    }
    
    return true;
}

function currentLocalDate() {
    return new Date().toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"})
}

function timelessDate(date) {
    return new Date(new Date(date).toLocaleString("en-US", {timeZone: "America/Sao_Paulo"})).setHours(0, 0, 0, 0)
}

module.exports = {
    isObjectEmpty,
    currentLocalDate,
    timelessDate
}