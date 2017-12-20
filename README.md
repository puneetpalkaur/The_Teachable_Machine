# cs632
Deep Learning Assignments

## Project 1: The Incredible Teachable Machine

### Demo available on YouTube: https://youtu.be/h8MURZyYB_E

### Setup: 
Go to https://github.com/cgross/generator-cg-angular to install required components (Getting Started)

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

The input takes live video stream from webcam. Progress shows the progress of images being collected for each category. Three buttons **'Collect Red'**, **'Collect Green'**, **'Collect Blue'** are provided to user to collect image data for three categories, once the images are collected, an example is shown under the Example heading for each category. At the bottom there are two buttons **'Train'** to train model after collecting images. **'Predict'** to make predictions for current live input from webcam. Prediction is displayed in color coded scheme along with the color name, under the heading 'Output'.

#### Considerations:

 ##### Extract frames: 
 Frames are being extracted from webcam stream using JavaScript API 
 

```sh
navigator.getUserMedia()
```

 ##### Input preprocessing: 
 The images captured are of size 500 * 500, which are then preprocessed and resized to 150 * 150 using 
 
```sh
keras.preprocessing.image.ImageDataGenerator
```

 ##### Transfer learning:
 Since, for this project the training and validation data is small, it does make it ideal to use a pre trained model which is already trained on huge data and then use it by freezing few layers and making small changes. 
 
 ##### Underfitting vs. Overfitting:
 Initially, model was trained for 20 epochs but it achieved 100% accuracy during 6th Epoch, so total epochs were set to 6. If model is trained for more number of epochs, it tends to over fit on the test data, as it remembers the data.
 
 ##### Performance:
 The model performs really well, when used via console. But when it runs with a UI, there is a time lag. As images are being sent to server, this step can be modified to increase performance and make it real time. Right now, user has to wait a few seconds to get prediction/output for the input test images.

#### What's next:
- Figuring a way to temporarily save images instead of passing to server to make it real time.
- Display the accuracy , like how much confident is the model when it says the output as Red/Green/Blue. Right now the model shows one of the colors for test images that does not belong to any of the three categories (false positives). Need to modify this logic.
- Training a model to recognize sounds .... sounds fun! 

#### Credits:
A big thanks to Professor [Joshua Gordon](https://github.com/random-forests) for teaching this amazing course on Machine Learning and Deep Learning!

Thanks to all the developers for the APIs and dependency files that are used in this code.
