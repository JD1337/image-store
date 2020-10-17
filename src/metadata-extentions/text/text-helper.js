const textUtils = require('text-encoding');

module.exports = switchfunc;

function encode (dataType, data){

    switch(dataType) {
        case 'internationalText':
            return new textUtils.TextEncoder("utf-8").encode(data);
        case 'text':
            return new textUtils.TextEncoder('latin1', { NONSTANDARD_allowLegacyEncoding: true }).encode(data);
        case 'compressedtext':
            throw new Error('Encode Action Not Completed: ' + dataType);
        default:
            throw new Error('Meta Action Not Supported: ' + dataType);
      }
        
}

function decode (dataType, data){

    switch(dataType) {
        case 'internationalText':
            return new textUtils.TextDecoder("utf-8").decode(data);
        case 'text':
            return new textUtils.TextDecoder("latin1").decode(data);
        case 'compressedtext':
            throw new Error('Action Not Completed: ' + dataType);
        default:
            throw new Error('Meta Action Not Supported: ' + dataType);
      }
    
}

function switchfunc(action, dataType, data){
    
    switch(action) {
        case 'encode':
            return encode(dataType, data);
        case 'decode':
            return decode(dataType, data);
        default:
            throw new Error('Meta Action Not Supported: ' + action);
      }
}