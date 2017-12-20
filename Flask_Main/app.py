from flask import Flask,json, jsonify, request
import os
import os.path as path
from flask_cors import CORS
import ast
import base64
from Flask_Main import teachablemodel
app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', 'http://localhost:9001')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  response.headers.add('Access-Control-Allow-Credentials', 'true')
  return response


@app.route('/')
def homepage():
    return "Welcome!"


# route for collecting images
@app.route('/collect', methods=['POST'])
def collectImgs():
    data = ast.literal_eval(json.dumps(request.json, ensure_ascii=False))
    folder = data['id']
    num = 0
    val_path = 'Validation/'+folder
    train_path = 'Train/'+folder
    if not path.exists(train_path):
        os.makedirs(train_path)
    if not path.exists(val_path):
        os.makedirs(val_path)

    for d in data['content']:
        s = d.__str__()
        image_64_decode = base64.decodebytes(str.encode(s[22:]))
        if(num<=69):
            image_result = open(train_path + "\\" + num.__str__() + '.png', 'wb')
        else:
            image_result = open(val_path + "\\" + num.__str__() + '.png', 'wb')
        image_result.write(image_64_decode)
        num = num+1
    num = 0
    success = {
        "message":
            {
            'id':"success"
            }
    }
    return jsonify(success)


# route to train model
@app.route('/train', methods=['POST'])
def trainModel():
    print('training model')
    teachablemodel.train()
    success = {
        "message": {
            'id': "success"
        }
    }
    return jsonify(success)


# route to predict
@app.route('/predict', methods=['POST'])
def makePrediction():

    file_path = 'Temp/'
    if not path.exists(file_path):
        os.makedirs(file_path)
    data = ast.literal_eval(json.dumps(request.json, ensure_ascii=False))
    s = data['content'].__str__()
    image_64_decode = base64.decodebytes(str.encode(s[22:]))
    image_result = open(file_path+"\\"+'1'+'.png', 'wb')
    image_result.write(image_64_decode)
    temp_img = teachablemodel.predict('Temp/1.png')
    success = {
        "message": {
            'id': temp_img.__str__()
        }
    }
    return jsonify(success)


if __name__ == "__main__":
    app.run(debug=True)
