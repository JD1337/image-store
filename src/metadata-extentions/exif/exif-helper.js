
function encode (string, type){
    return {
        type: 'exif',
        data: new textUtils.TextEncoder("utf-8").encode(string)
    }
 }


function decode (data, type){
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
