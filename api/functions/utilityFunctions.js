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

module.exports = {
    isObjectEmpty,
    currentLocalDate
}