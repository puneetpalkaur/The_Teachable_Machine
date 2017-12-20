# cs632
Deep Learning Assignments

## Project 1: The Incredible Teachable Machine

### Demo available on YouTube: https://youtu.be/h8MURZyYB_E

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
#### About:
This project showcase use of image classification models to classify new images, given that the model is trained.
* Number of Categories: 3
* Model: Sequential with Conv2D layer
* Epochs: 6
* Number of Training Images per Category: 70
* Number of Validation Images per Category: 30

For front end , I am using a simple Angular framework. 
![alt text](https://github.com/pk60313n/cs632_Final_Project_TeachableMachine/blob/master/sh.PNG)


#### Considerations:

 ##### Extract frames : 
 Frames are being extracted from webcam stream using javascript API 
 

```sh
navigator.getUserMedia()
```

 ##### Input preprocessing: 
 The images captured are of size 500 * 500, which are then preprocessed and resized to 150 * 150 using 
 
```sh
keras.preprocessing.image.ImageDataGenerator
```

 ##### Transfer learning :
 Since my training an dvalidation data is small, it does make it idea to use a ore trained model which is already trained on huge data and then use it by freezing few layers.
 
 ##### Underfitting vs. Overfitting :
 Initially,model was trained for 20 epochs but it achieved 100% accuracy during 6th Epoch, so total epochs were set to 6. If model is trained for more number of epochs, it tend to overfit on the test data, as it remembers the data.
 
 ##### Performance:
 The model performs real well, when used via console. But when it runs with a UI, there is a time lag. As images are being sent to server, this step can be modified to increase performance and make it real time. Right now, user has to wait a few seconds to get prediction/output for the images.

#### Credits:
A big thanks to Professor [Joshua Gordon](https://github.com/random-forests) for teaching this amazing course on Machine Learning and Deep Learning!
Thanks to all the developers of API's and dependency files and used in the code.













