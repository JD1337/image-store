const textUtils = require('text-encoding');

module.exports.encode = encode;
module.exports.decode = decode;

function encode (designid){
    return {
        type: 'canva',
        data: new textUtils.TextEncoder("utf-8").encode(designid)
      }
    
}

function decode (data){
    return new TextDecoder("utf-8").decode(data);
}

