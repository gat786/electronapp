const {BrowserWindow} = require('electron').remote
const bing = require('./bing.js');
const electron = require('electron')
const fs = require('graceful-fs');
const https = require('https');
const wallpaper = require('wallpaper');

const remote = electron.remote

const baseBingUrl = "https://www.bing.com/"

Object.defineProperty(exports, "__esModule", { value: true });
const custom_electron_titlebar = require("custom-electron-titlebar");
new custom_electron_titlebar.Titlebar({
    backgroundColor: custom_electron_titlebar.Color.fromHex("#2f3640"),
    shadow: true
});

const bingJson = bing.getData();
var url = ""
var imageName = ""
bingJson.then((data)=>{
    imageName = data["copyright"];
    url = data["url"];
    var body = document.getElementById("body");
    body.src = baseBingUrl + url
    body.className += " img-responsive"
})

saveBtn = document.getElementById("saveBtn");

$('#saveBtn').click(()=>{
    
    imageName = imageName.replace("/"," ")

    const request = https.get(baseBingUrl + url , (response)=>{
        const { dialog,app } = require('electron').remote
        options = {
            defaultPath : app.getPath('documents') + "/" + imageName + ".jpg",
        }
        dialog.showSaveDialog(null,options,(filename)=>{
            var file = fs.createWriteStream(filename)
            var local = fs.createWriteStream("image.jpg")
            response.pipe(file)
            response.pipe(local)
            console.log(filename)
            setWallpaper(filename)
            setWallpaper(local)
        });

        
    })

})

async function setWallpaper(filename){
    await wallpaper.set(filename);
}