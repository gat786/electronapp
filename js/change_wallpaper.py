import os
import sys
import ctypes

if __name__ == "__main__":
    if(len(sys.argv)>1):
        if (sys.argv[1]=="h"):
            print("way to use script is")
            print("change_wallpaper /way/to/file.jpg")
        else:
            path = os.path.normpath(sys.argv[1])
            if(os.path.exists(path)):
                ctypes.windll.user32.SystemParametersInfoW(20,0,path,0)
                print("wallpaper changed")
            else:
                print("this file does not exist")
    else:
        print("Wallpaper Changing Script type h as parameter for help")
