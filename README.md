# cleeper

**The project is currently WIP, so no stable version available at the moment.**

cleeper is a tool for pasting images and texts of clipboard to a chrome browser view.
It is based on the python eel library which communicates between python and the browser. 

Currently cleeper only shows the history of the clipboard and is only tested on windows with python 3.7. 

### How to 
* Install pipenv packages 
* Run app.py 
* Use `ctrl+l` to paste clipboard items to browser

## Download Versions

### Alpha Versions
http://www.phipluspi.com/cleeper/cleeper-0.0.1-alpha.exe
  

### Export app with Pyinstaller 
See build-exe.sh or just use this command. Do not forget to set correct config.
`python -m eel app.py browser/app/build --exclude win32com --exclude numpy --exclude cryptography --onefile --noconsole --name cleeper`
