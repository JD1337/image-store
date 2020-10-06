const ft = require('./filetype-helper')
const png = require('./png-helper')


module.exports.brokerAction = brokerAction;

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
            handle:'getmeta',
            function:[
                {
                    type:'png', func:png.getMeta
                }
            ]
        }
    ]

function brokerAction (action, image, data){
    const fileType = ft.getFileType(image)
    const handle = handlers.find(x => { return action == x.handle }).function
    const func = handle.find(x => { return fileType.ext == x.type }).func
    return {
        extention: fileType.ext,
        mimeType: fileType.mime,
        data: func(image, data)
    }
}

