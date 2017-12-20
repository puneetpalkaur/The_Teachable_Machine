from keras.preprocessing.image import ImageDataGenerator, array_to_img, img_to_array, load_img
from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D
from keras.layers import Activation, Dropout, Flatten, Dense
from keras.models import load_model
from scipy import ndimage, misc
import numpy as np
import os
import os.path as path

train_path = 'Train'
val_path = 'Validation'
model_path = 'Model'

nb_train_samples = 70
nb_validation_samples = 30
batch_size = 16

def train():
    model = Sequential()
    model.add(Conv2D(32, (3, 3), input_shape=(150, 150, 3)))
    model.add(Activation('relu'))

    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Conv2D(32, (3, 3)))
    model.add(Activation('relu'))
    model.add(MaxPooling2D(pool_size=(2, 2)))

    model.add(Conv2D(64, (3, 3)))
    model.add(Activation('relu'))
    model.add(MaxPooling2D(pool_size=(2, 2)))

    model.add(Flatten())
    model.add(Dense(64))
    model.add(Activation('relu'))
    model.add(Dropout(0.5))
    model.add(Dense(3))
    model.add(Activation('softmax'))
    # Train the model using RMSprop
    model.compile(loss='categorical_crossentropy',
                  optimizer='rmsprop',
                  metrics=['accuracy'])

    train_datagen = ImageDataGenerator(
        rescale=1. / 255,
        shear_range=0.2,
        zoom_range=0.2,
        horizontal_flip=True)

    test_datagen = ImageDataGenerator(rescale=1. / 255)

    train_generator = train_datagen.flow_from_directory(
        train_path,
        target_size=(150, 150),
        batch_size=batch_size,
        class_mode='categorical')

    validation_generator = test_datagen.flow_from_directory(
        val_path,
        target_size=(150, 150),
        batch_size=batch_size,
        class_mode='categorical')

    model.fit_generator(
        train_generator,
        steps_per_epoch=nb_train_samples // batch_size,
        epochs=6,
        validation_data=validation_generator,
        validation_steps=nb_validation_samples // batch_size)

    if not path.exists(model_path):
        os.makedirs(model_path)
    model.save(model_path+'/teachablemodel.h5')

def predict(imgPath):
    model = load_model(model_path+'/teachablemodel.h5')
    img = load_img(imgPath)
    ir = misc.imresize(img, (150, 150))
    # print(ir.shape)
    x = ir.reshape((1,) + ir.shape)
    predictions = model.predict(x, 16, verbose=1)
    print(predictions)
    print(np.argmax(predictions))
    return np.argmax(predictions)
