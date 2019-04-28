maxbutton = document.getElementById("maxbtn")
minbutton = document.getElementById("minbtn")
closebutton = document.getElementById("closebtn")

const {BrowserWindow} = require('electron').remote

maxbutton.addEventListener("click",(e) => {
    var window = BrowserWindow.getFocusedWindow();
    if(window.isMaximized){
        window.unmaximize()
    }else{
        window.maximize()
    }
})


minbutton.addEventListener("click",(e) => {
    var window = BrowserWindow.getFocusedWindow();
    if(window.isMaximized){
        window.unmaximize()
    }else{
        window.maximize()
    }
})

closebutton.addEventListener("click",(e) => {
    var window = BrowserWindow.getFocusedWindow();
    window.close()
})