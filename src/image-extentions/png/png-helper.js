const pngMeta = require('./png-meta');

module.exports.getMeta = getMeta;
module.exports.insertMeta = insertMeta;
module.exports.upsertMeta = upsertMeta;
module.exports.deleteMeta = deleteMeta;

const knownTypes = 
    [
        { type: 'text', chunkName: 'tEXt' },
        { type: 'internationaltext', chunkName: 'iTXt' },
        { type: 'compressedtext', chunkName: 'zTXt' },
        { type: 'exif', chunkName: 'eXIf' },
        { type: 'canva', chunkName: 'cnVA' },
        { type: 'cropper', chunkName: 'crPr' }
    ];

function getMeta(image, types){

    console.log(image);

    const imagechunks = pngMeta.getImageChunks(image);

    console.log(imagechunks);

    var chunks = [];
    if (types == null)
        chunks = pngMeta.getMetaChunks(imagechunks);
    else
        chunks = pngMeta.getMetaChunks(imagechunks, knownTypes.filter( x => types.includes( x.type ).chunkName ));
    
    typesData = [];
    chunks.forEach(x => {      
        const namedType = knownTypes.find(y => { return y.chunkName == x.name; });
        if (namedType != null)
            typesData.push({
                type: namedType.type,
                data: x.data
            });
    }); 

    return typesData;
}

function insertMeta(image, [imageMeta]){
    const imagechunks = pngMeta.getImageChunks(image);

    var newChunks = []
    imageMeta.forEach(x => {      
        const chunkName = knownTypes.find(y => { return y.type == x.type; }).chunkName;
        newChunks.push({
            name: chunkName,
            data: x.data
        });
    }); 

    splicedChunks = pngMeta.setMetaChunks(imagechunks, newChunks);
    return pngMeta.encodeImage(splicedChunks);

}

function upsertMeta(image, [imageMeta]){
    const imagechunks = pngMeta.getImageChunks(image);

    newChunks = [];
    chunkList = [];
    imageMeta.forEach(x => {      
        const chunkName = knownTypes.find(y => { return y.type == x.type; }).chunkName;
        newChunks.push({
            name: chunkName,
            data: x.data
        })
        chunkList.push(chunkName);
    }); 

    filteredImageChunks = pngMeta.stripMetaChunks(imagechunks, chunkList);
    splicedChunks = pngMeta.setMetaChunks(imagechunks, newChunks);

    return pngMeta.encodeImage(splicedChunks);

}

function deleteMeta(image, metaList){
    const imagechunks = pngMeta.getImageChunks(image);

    filteredImageChunks = pngMeta.stripMetaChunks(imagechunks, metaList);

    return pngMeta.encodeImage(filteredImageChunks);

}