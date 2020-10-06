const fileType = require('file-type-es5');

module.exports.getFileType = getType;

function getType(file){
    return fileType(file);
}

