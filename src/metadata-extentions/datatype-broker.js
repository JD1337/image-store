const text = require('./text/text-helper');
const canva = require('./canva/canva-helper');
const exif = require('./exif/exif-helper');

module.exports = switchfunc;

function switchfunc(action, dataType, data){
 
    switch(dataType) {
        case 'canva':
            return {
                type: dataType,
                data: new canva(action, data)
            };
        case 'text':
        case 'internationalText':
        case 'compressedtext':
            return {
                type: dataType,
                data: new text(action, dataType, data)
            };
        case 'exif':
            return {
                type: dataType,
                data: new exif(action, data)
            };
        default:
            throw new Error('Image Meta Not Supported: ' + dataType);
      }
}