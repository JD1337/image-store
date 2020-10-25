const helper = require('./png-helper');

module.exports = switchfunc;

function switchfunc(action, image, data){
    
    switch(action) {
        case 'insertmeta':
            console.log('perform action')
            console.log(image);
            console.log([data]);
            return helper.insertMeta(image, data);
        case 'upsertmeta':
            return helper.upsertMeta(image, data);
        case 'getmeta':
            return helper.getMeta(image, data);
        case 'getminimalimage':
            return helper.deleteMeta(image, data)
        default:
            throw new Error('Filetype Action Not Supported: PNG ' + action);
      }
}

