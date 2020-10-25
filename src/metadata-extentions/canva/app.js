const textUtils = require('text-encoding');

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

function encode (designid){
    return textUtils.TextEncoder("utf-8").encode(designid);
    
}

function decode (data){
    return new TextDecoder("utf-8").decode(data);
}

