
const ftbroker = require('./image-extentions/filetype-broker').brokerAction;
const databroker = require('./metadata-extentions/datatype-broker').brokerAction;

var getMeta = function(image, types){

    const filteredMeta = ftbroker('getmeta', image, [types]);

    return decodeMeta(filteredMeta);
    
}

var insertMeta = function(image, metaArray){
    const encodedMeta = encodeMeta(metaArray);

    return ftbroker('insertmeta', image, [encodedMeta])

}

var replaceMeta = function(image, metaArray){
    const newImage = ftbroker('getminimalimage', image);

    return addMeta(newImage, metaArray)
}

var upsertMeta = function(image, metaArray){
    const encodedMeta = encodeMeta(metaArray);

    return ftbroker('upsertmeta', image, [encodedMeta])
}

var encodeMeta = function(metaArray){

    encodedMeta = []

    metaArray.forEach(x => {
        const encoded = databroker('encode', x.type, x.data);
        if (encoded != null)
                encodedMeta.push({
                type: namedType.type,
                data: x.data
            });
    });

    return encodedMeta;
}

var decodeMeta = function(metaArray){

    decodedMeta = [];

    metaArray.forEach(x => {
        const decoded = databroker('decode', x.type, x.data);
        if (deccoded != null)
                decodedMeta.push({
                type: namedType.type,
                data: x.data
            });
    });

    return decodedMeta;
}

/* module.exports.getMeta = getMeta;
module.exports.insertMeta = insertMeta;
module.exports.replaceMeta = replaceMeta;
module.exports.upsertMeta = upsertMeta;

*/

/*export{
    getMeta,
    insertMeta,
    replaceMeta,
    upsertMeta
}*/

window.myapp = {
    getMeta: getMeta
}
