const textUtils = require('text-encoding');
//const zlib = require('zlib');

module.exports = switchfunc;

function encode (dataType, data){

    var uint8array = null;

    switch(dataType) {
        case 'internationaltext':
            uint8array = new textUtils.TextEncoder("utf-8").encode(data);
            break;
        case 'text':
            uint8array = new textUtils.TextEncoder('latin1', { NONSTANDARD_allowLegacyEncoding: true }).encode(data);
            break;
        //case 'compressedtext':
        //    var compressed = deflate(data);
        //    uint8array = new textUtils.TextEncoder('latin1', { NONSTANDARD_allowLegacyEncoding: true }).encode(compressed);
        //    break;
        default:
            throw new Error('Meta Action Not Supported: ' + dataType);
    }

    return uint8array;
}

function decode (dataType, data){

    var string = null;

    switch(dataType) {
        case 'internationaltext':
            string = new textUtils.TextDecoder("utf-8").decode(data);
            break;
        case 'text':
            string = new textUtils.TextDecoder("latin1").decode(data);
            break;
        //case 'compressedtext':
        //    var compressed = new textUtils.TextDecoder("latin1").decode(data);
        //    string = inflate(compressed);
        //    break;
        default:
            throw new Error('Meta Action Not Supported: ' + dataType);
    }

    return string;
    
}

//function deflate (data){
//    return zlib.deflatesync(data);
//}

//function inflate (data){
//    return zlib.inflatesync(data);
//}

function switchfunc(action, dataType, data){
    
    var result = null;

    switch(action) {
        case 'encode':
            result = encode(dataType, data);
            break;
        case 'decode':
            result = decode(dataType, data);
            break;
        default:
            throw new Error('Meta Action Not Supported: ' + action);
    }
    return result;
}