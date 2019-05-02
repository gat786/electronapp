var photoUrl = "http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-";

async function getData(type){
    const response = await fetch(photoUrl+type);
    const json = await response.json();
    var imageData = json["images"][0];
    return imageData
}

exports.getData = getData;