const fileType = require('file-type-es5');
const png = require('./png/app.js');

module.exports = switchfunc;

function switchfunc(action, image, data){
    const filemeta = fileType(image);
    if (filemeta === null){
        throw new Error('Image Filetype could not be determined');
    }

    switch(filemeta.ext) {
        case 'png':
            return {
                extention: filemeta.ext,
                mimeType: filemeta.mime,
                data: png(action, image, data)
            };
        default:
            throw new Error('Image Filetype Not Supported: ' + fileType.ext + ' ' + action);
      }
}


