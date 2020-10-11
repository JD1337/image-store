const decode = require('png-chunks-extract')
const encode = require('png-chunks-encode')
 //Common PNG Chunks
const pngImageChunks = ["IHDR", "PLTE", "IDAT", "IEND", "cHRM", "gAMA", "iCCP", "sBIT", "sRGB", "bKGD", "hIST", "tRNS", "pHYs", "sPLT", "tIME"];

module.exports.getMetaChunks = getMetaChunks;
module.exports.setMetaChunks = setMetaChunks;
module.exports.getImageChunks = getImageChunks;
module.exports.encodeImage = encodeImage;
module.exports.stripMetaChunks = stripMetaChunks;

function getImageChunks(image){ return decode(image) }
function encodeImage (chunks){ return encode(chunks) }

function setMetaChunks(imagechunks, chunks){

    splicedchunks = imagechunks
    
    chunks.forEach(x => { 
        // Add new chunks before the IEND chunk
        splicedchunks.splice(-1, 0, x)

      }); 

      return splicedchunks
}


function getMetaChunks(imagechunks, chunkList){

    if (chunkList == null)
        return imagechunks.filter( x => !pngImageChunks.includes( x.name ) );
    else
        return imagechunks.filter( x => chunkList.includes(x.name) )
}

function stripMetaChunks(imagechunks, chunkList){

    if (chunkList == null)
        return imagechunks.filter( x => pngImageChunks.includes( x.name ) );
    else
        return imagechunks.filter( x => !chunkList.includes( x.name ) );
}


