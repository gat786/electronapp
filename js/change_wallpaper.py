from os import path
from sys import argv
from ctypes import windll

if __name__ == "__main__":
    if(len(argv)>1):
        if (argv[1]=="h"):
            print("way to use script is")
            print("change_wallpaper /way/to/file.jpg")
        else:
            pathToImage = path.normpath(argv[1])
            if(path.exists(pathToImage)):
                SPI_SETDESKWALLPAPER = 20
                SPIF_UPDATEINIFILE = 1
                windll.user32.SystemParametersInfoW(SPI_SETDESKWALLPAPER,0,pathToImage,SPIF_UPDATEINIFILE)
                print("wallpaper changed")
            else:
                print("this file does not exist")
    else:
        print("Wallpaper Changing Script type h as parameter for help")
