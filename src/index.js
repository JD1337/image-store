import 'babel-polyfill';

const ftbroker = require('./image-extentions/filetype-broker');
const databroker = require('./metadata-extentions/datatype-broker');

function getMeta(image, types){

    const filteredMeta = ftbroker('getmeta', image, types).data;

    if (filteredMeta === null){
        return null;
    }
    return decodeMeta([filteredMeta]);
    
}

function insertMeta(image, [metaArray]){
    const encodedMeta = encodeMeta([metaArray]);

    return ftbroker('insertmeta', image, [encodedMeta]);

}

function replaceMeta(image, [metaArray]){
    const newImage = ftbroker('getminimalimage', image);
    
    return insertMeta(newImage, [metaArray]);
}

function upsertMeta(image, [metaArray]){
    const encodedMeta = encodeMeta(metaArray);

    return ftbroker('upsertmeta', image, [encodedMeta]);
}

function encodeMeta([metaArray]){
    var encodedMeta = [];
    if (metaArray !== null && typeof metaArray !== 'undefined'){
        metaArray.forEach(x => {
            const encoded = databroker('encode', x.type, x.data);
            if (encoded != null)
                    encodedMeta.push({
                    type: encoded.type,
                    data: encoded.data
                });
        });
    }

    return encodedMeta;
}

function decodeMeta([metaArray]){

    var plainMeta = [];
    metaArray.forEach(x => {
        const decoded = databroker('decode', x.type, x.data);
        if (decoded != null)
                plainMeta.push({
                type: decoded.type,
                data: decoded.data
            });
    });

    return plainMeta;
}


window.myapp = {
    getMeta: getMeta,
    insertMeta: insertMeta,
    replaceMeta: replaceMeta,
    upsertMeta: upsertMeta
};