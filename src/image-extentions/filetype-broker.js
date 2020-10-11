const fileType = require('file-type-es5');
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
    const handle = handlers.find(x => { return action == x.handle; }).function;
    const func = handle.find(x => { return fileType.ext == x.type; }).func;
    return {
        extention: filemeta.ext,
        mimeType: filemeta.mime,
        data: func(image, data)
    };
}

module.exports.brokerAction = brokerAction;

