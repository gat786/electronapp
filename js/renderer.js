const {BrowserWindow} = require('electron').remote
const bing = require('./bing.js');
const electron = require('electron')
const fs = require('graceful-fs');
const https = require('https');
const child_process = require('child_process')
const reddit = require('./reddit')

const remote = electron.remote

const baseBingUrl = "https://www.bing.com/"
var imageName = ""
var url = ""

Object.defineProperty(exports, "__esModule", { value: true });
const custom_electron_titlebar = require("custom-electron-titlebar");
new custom_electron_titlebar.Titlebar({
    backgroundColor: custom_electron_titlebar.Color.fromHex("#2f3640"),
    shadow: true,
    // menu:NaN
});

$('#source_select').change(async ()=>{
    var selected = $('#source_select').val()
    if(selected.toString().includes("bing")){
        fetchBing();
        $('#country_btn').animate({opacity:100},600)
    }
    else if (selected.toString().includes("reddit")){
        fetchReddit();  
        $('#country_btn').animate({opacity:0},600)
    }
})

fetchBing("IN");

function fetchReddit(){
    reddit.getPost().then((val)=>{
        if(val[0]['domain']=="i.redd.it"){
            url = val[0]['url']
            console.log(url)
            setBodyBackgroundImage(url)
        }
    })
}

function fetchBing(region){
    const bingJson = bing.getData(region);
    bingJson.then((data)=>{
        imageName = data["copyright"];
        url = data["url"];
        setBodyBackgroundImage(baseBingUrl + url)
    })
}

function setBodyBackgroundImage(url){
    var body = document.getElementById("body");
    body.src = url
}

$('#us_button').click(()=>{
    $('#us_button').css("text-decoration","underline")
    $('#in_button').css("text-decoration","none")
    fetchBing("US");
    console.log("us active");
})


$('#in_button').click(()=>{
    $('#in_button').css("text-decoration","underline")
    $('#us_button').css("text-decoration","none")
    fetchBing("IN");
    console.log("in active");
})

saveBtn = document.getElementById("saveBtn");

$('#saveBtn').click(()=>{
    imageName = "Image" + new Date().getFullYear() + new Date().getMonth() + new Date().getDate() + ".jpg"

    var selected = $('#source_select').val()
    if(selected.toString().includes("bing")){
        https.get(baseBingUrl + url , (response)=>{
            const { dialog,app } = require('electron').remote
            options = {
                defaultPath : app.getPath('documents') + "/" + imageName,
            }
            dialog.showSaveDialog(null,options,(filename)=>{
                saveImageToFS(response,filename,()=>{
                    setWallpaper(filename)
                })
            });  
        })
    }else{
        https.get(url , (response)=>{
            const { dialog,app } = require('electron').remote
            options = {
                defaultPath : app.getPath('documents') + "/" + imageName,
            }
            dialog.showSaveDialog(null,options,(filename)=>{
                saveImageToFS(response,filename,()=>{
                    setWallpaper(filename)
                })
            });
        })
    }
    

})

function saveImageToFS(response,filename,callback){
    var file = fs.createWriteStream(filename)
    response.pipe(file)
    console.log(filename)
    callback();
}

function setWallpaper(filename){
    const arguments = [filename]
    child_process.execFile(__dirname+"/change.exe",arguments,function(err,data){
        console.log(err)
        console.log(data)
    })
}