function isObjectEmpty(object) {
    for (var property in object) {
        if (Object.prototype.hasOwnProperty.call(object, property)) {
            return false;
        }
    }
    
    return true;
}

module.exports = {
    isObjectEmpty
}