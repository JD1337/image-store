const textUtils = require('text-encoding');
const exifUtils = require('utif');

module.exports.encode = encode;
module.exports.decode = decode;

function encode (string, type){
    
    if (type == 'internationalText'){
        return {
            type: 'internationalText',
            data: new textUtils.TextEncoder("utf-8").encode(string)
        }
    }
    
    if (type == 'text'){
        const uint8array = new textUtils.TextEncoder(
            'latin1', { NONSTANDARD_allowLegacyEncoding: true }).encode(string);
        return {
            type: 'text',
            data: uint8array
        }
    }

    //if (type == 'compressedtext'){
    //    return {
    //        type: 'compressedtext',
    //        data: encoder.encode([string])
    //    }
    //}

    if (type == 'exif'){
        return {
            type: 'exif',
            data: new textUtils.TextEncoder("utf-8").encode(string)
        }
    }


        
}

function decode (data, type){

    if (type == 'internationalText'){
        return {
            type: 'internationalText',
            data: new textUtils.TextDecoder("utf-8").decode(data)
        }
    }
    
    if (type == 'text'){
        return {
            type: 'text',
            data: new textUtils.TextDecoder("latin1").decode(data)
        }
    }

    //if (type == 'compressedtext'){
    //    return {
     //       type: 'compressedtext',
    //        data: encoder.encode([string])
    //    }
    //}

    if (type == 'exif'){
        ifd = exifUtils.decode(data)
        console.log(ifd)
        ifd.forEach(x => {
            console.log(exifUtils.decodeImage(data, ifd))
        });
        
        return {
            type: 'exif',
            data: ifd
            
        }
    }
}
