var photoUrl = "http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-IN";

async function getData(){
    const response = await fetch(photoUrl);
    const json = await response.json();
    var imageData = json["images"][0];
    return imageData
}

exports.getData = getData;