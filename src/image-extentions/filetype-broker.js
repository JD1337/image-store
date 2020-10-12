const fileType = require('file-type-es5');
/*const fileType = require('file-type').fromBuffer;*/
const png = require('./png/png-helper');

const handlers = [
        {
            handle:'insertmeta',
            function:[
                {
                    type:'png', func:png.insertMeta
                }
            ]
        },
        {
            handle:'upsertmeta',
            function:[
                {
                    type:'png', func:png.upsertMeta
                }
            ]
        },
        {
            handle:'getmeta',
            function:[
                {
                    type:'png', func:png.getMeta
                }
            ]
        },
        {
            handle:'getminimalimage',
            function:[
                {
                    type:'png', func:png.deleteMeta
                }
            ]
        }
    ];

var brokerAction = function (action, image, data){
    const filemeta = fileType(image);
    if (filemeta === null){
        throw new Error('Filetype could not be determined');
    }
    const handle = handlers.find(x => { return action == x.handle; }).function;
    if (handle === null){
        throw new Error('Action Not Supported: ' + action);
    }
    const brokerfunction = handle.find(x => { return fileType.ext == x.type; });
    if (brokerfunction === null){
        throw new Error('Filetype Action Note Supported: ' + fileType.ext + ' ' + action);
    }
    return {
        extention: filemeta.ext,
        mimeType: filemeta.mime,
        data: brokerfunction.func(image, data)
    };
};

module.exports.brokerAction = brokerAction;

