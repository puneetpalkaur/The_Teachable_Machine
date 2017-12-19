>>>>>>In Progress<<<<<<<<


# cs632
Deep Learning Assignments

## Project 1: The Incredible Teachable Machine

### Demo available on YouTube: ##### https://youtu.be/h8MURZyYB_E

### Setup: 
Go to https://github.com/cgross/generator-cg-angular to install required componets (Getting Started)

#### Directory Layout:
```sh
Flask_Main..............................Python Code goes here (backend)
    /app.py.............................main server file to collect images and send/receive http requests
    /teachablemodel.py..................Keras code to train and predict
partial.................................Contains HTML, CSS, js (UI)
    /MainPage...........................Main Page on load
        /MainPage.html..................HTML Page
        /MainPage.js....................javascript File
        /MainPage.less..................CSS file
service.................................angular services folder
        /MainService.js.................sends http request to server
app.less ...............................main app-wide styles
app.js .................................angular module initialization and route setup
index.html .............................main HTML file
bower_component.........................3rd party libraries managed by bower
node_modules ...........................npm managed libraries used by grunt
```
