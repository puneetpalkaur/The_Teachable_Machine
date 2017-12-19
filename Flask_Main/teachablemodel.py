from keras.preprocessing.image import ImageDataGenerator, array_to_img, img_to_array, load_img
from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D
from keras.layers import Activation, Dropout, Flatten, Dense
from keras.models import load_model
from scipy import ndimage, misc
import numpy as np


def train():
    model = Sequential()
    model.add(Conv2D(32, (3, 3), input_shape=(150, 150, 3)))
    model.add(Activation('relu'))

    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Conv2D(32, (3, 3)))
    model.add(Activation('relu'))
    model.add(MaxPooling2D(pool_size=(2, 2)))

    #
    model.add(Conv2D(64, (3, 3)))
    model.add(Activation('relu'))
    model.add(MaxPooling2D(pool_size=(2, 2)))
    #
    model.add(Flatten())  # this converts our 3D feature maps to 1D feature vectors
    model.add(Dense(64))
    model.add(Activation('relu'))
    model.add(Dropout(0.5))
    model.add(Dense(3))
    model.add(Activation('softmax'))

    # initiate RMSprop optimizer


    # Train the model using RMSprop
    model.compile(loss='categorical_crossentropy',
                  optimizer='rmsprop',
                  metrics=['accuracy'])

    batch_size = 16

    # this is the augmentation configuration we will use for training
    train_datagen = ImageDataGenerator(
        rescale=1. / 255,
        shear_range=0.2,
        zoom_range=0.2,
        horizontal_flip=True)
    #
    ## this is the augmentation configuration we will use for testing:
    ## only rescaling
    test_datagen = ImageDataGenerator(rescale=1. / 255)
    #
    ## this is a generator that will read pictures found in
    ## subfolers of 'data/train', and indefinitely generate
    ## batches of augmented image data
    train_generator = train_datagen.flow_from_directory(
        'C:/Users/Puneet Billing/Desktop/Teachable_Images',  # this is the target directory
        target_size=(150, 150),  # all images will be resized to 150x150
        batch_size=batch_size,
        class_mode='categorical')
    ##
    #### this is a similar generator, for validation data
    validation_generator = test_datagen.flow_from_directory(
        'C:/Users/Puneet Billing/Desktop/DL_Project - Val',
        target_size=(150, 150),
        batch_size=batch_size,
        class_mode='categorical')
    #
    nb_train_samples = 176
    nb_validation_samples = 117
    #
    #
    batch_size = 16
    ##
    generator = train_datagen.flow_from_directory(
        'C:/Users/Puneet Billing/Desktop/Teachable_Images/',
        target_size=(150, 150),
        batch_size=batch_size,
        class_mode=None,  # this means our generator will only yield batches of data, no labels
        shuffle=False)  # our data will be in order, so all first 1000 images will be cats, then 1000 dogs

    model.fit_generator(
        train_generator,
        steps_per_epoch=nb_train_samples // batch_size,
        epochs=6,
        validation_data=validation_generator,
        validation_steps=nb_validation_samples // batch_size)
    #
    # model.save_weights('C:/Users/Puneet Billing/Desktop/first_try.h5')
    model.save('C:/Users/Puneet Billing/Desktop/first_try.h5')

def predict(imgPath):
    model = load_model('C:/Users/Puneet Billing/Desktop/first_try.h5')
    print('loaded')
    img = load_img(imgPath)

    # print('printing shape here')

    ir = misc.imresize(img, (150, 150))
    # print(ir.shape)


    # x = img_to_array(img)  # this is a Numpy array with shape (3, 150, 150)
    x = ir.reshape((1,) + ir.shape)

    # print(x.shape)
    # x = img_to_array(img)

    predictions = model.predict(x, 16, verbose=1)
    #
    #
    print(predictions)
    print(np.argmax(predictions))
    return np.argmax(predictions)
