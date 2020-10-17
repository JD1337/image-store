const exifUtils = require('utif');

module.exports = switchfunc;

function switchfunc(action, data){
    
    switch(action) {
        case 'encode':
            return encode(data);
        case 'decode':
            return decode(data);
        default:
            throw new Error('Meta Action Not Supported: ' + action);
      }
}

function encode (data){
    return new exifUtils.encode(data);
 }


function decode (data){
    return new exifUtils.decode(data);
}
