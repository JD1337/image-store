const text = require('./text/app');
const canva = require('./canva/app');
const exif = require('./exif/app');
const cropperjs = require('./cropperjs/app');

module.exports = switchfunc;

function switchfunc(action, dataType, data){
 
    switch(dataType) {
        case 'canva':
            return {
                type: dataType,
                data: canva(action, data)
            };
        case 'text':
        case 'internationaltext':
        case 'compressedtext':
            return {
                type: dataType,
                data: text(action, dataType, data)
            };
        case 'exif':
            return {
                type: dataType,
                data: exif(action, data)
            };
        case 'cropper':
            return {
                type: dataType,
                data: cropperjs(action, data)
            };
        default:
            throw new Error('Image Meta Not Supported: ' + dataType);
      }
}