//const textUtils = require('text-encoding');
const BSON = require('bson');
//const Buffer = require('buffer/').Buffer;

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

    if (typeof data !== 'object'){
        throw new Error('Not Valid Javascript Object');
    }
    // Should check for correct JS object Type for CropperJS Data

    const encoded = new Uint8Array(BSON.serialize(data).buffer);

    return encoded;
    
}

function decode (data){
    // Should check for correct JS object Type for CropperJS Data 
    return BSON.deserialize(data);
}

