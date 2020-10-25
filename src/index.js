import 'babel-polyfill';

const ftbroker = require('./image-extentions/filetype-broker');
const databroker = require('./metadata-extentions/datatype-broker');

function getMeta(image, types){

    const filteredMeta = ftbroker('getmeta', image, types).data;

    if (filteredMeta === null){
        return null;
    }
    console.log(filteredMeta);
    return decodeMeta([filteredMeta]);
    
}

function insertMeta(image, [metaArray]){
    const encodedMeta = encodeMeta([metaArray]);

    return ftbroker('insertmeta', image, [encodedMeta])

}

function replaceMeta(image, [metaArray]){
    const newImage = ftbroker('getminimalimage', image);

    return addMeta(newImage, metaArray)
}

function upsertMeta(image, [metaArray]){
    const encodedMeta = encodeMeta(metaArray);

    return ftbroker('upsertmeta', image, [encodedMeta])
}

function encodeMeta([metaArray]){
    console.log(metaArray)
    var encodedMeta = [];
    if (metaArray !== null){
        metaArray.forEach(x => {
            const encoded = databroker('encode', x.type, x.data);
            if (encoded != null)
                    encodedMeta.push({
                    type: encoded.type,
                    data: encoded.data
                });
        });
    }else{
        console.log('No Meta exists to encode')
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
    getMeta: getMeta,
    insertMeta: insertMeta,
    replaceMeta: replaceMeta,
    upsertMeta: upsertMeta
};