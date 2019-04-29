const {BrowserWindow} = require('electron').remote
const bing = require('./bing.js');
const electron = require('electron')
const remote = electron.remote

const baseBingUrl = "https://www.bing.com/"

Object.defineProperty(exports, "__esModule", { value: true });
const custom_electron_titlebar = require("custom-electron-titlebar");
new custom_electron_titlebar.Titlebar({
    backgroundColor: custom_electron_titlebar.Color.fromHex("#2f3640"),
    shadow: true
});

const bingJson = bing.getData();

bingJson.then((data)=>{
    const imageName = data["copyright"];
    const url = data["url"];
    var body = document.getElementsByTagName('body')[0];
    body.style.backgroundImage = 'url('+ baseBingUrl + url +')';
    body.className += " img-responsive"
})