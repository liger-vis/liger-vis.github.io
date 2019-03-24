
import os
from flask import Flask
import json, ast
from flask import stream_with_context, Response, current_app,send_from_directory, request, jsonify, abort
import csv
#from keras.models import Sequential
#from keras.layers import Dense, Dropout, Activation
#from keras.optimizers import SGD
#import keras as keras
import numpy as np
import pandas as pd

# Generate dummy data
import numpy as np

app = Flask(__name__)

@app.route("/ping")
def isOnline():
    return "Server Online."


@app.route("/")
def loadIndex():
    return send_from_directory("../","index.html")

@app.route('/postmethod', methods = ['POST'])
def get_post_javascript_data():
    jsdata = request.form['javascript_data']
    jsdata = json.loads(jsdata)
    jsdata = ",".join([str(x) for x in jsdata] )

    file = open('trainingData.txt','a')
    file.write(str(jsdata)+ '\n')
    # MLPCode();

@app.route('/interactionLogs', methods = ['POST'])
def get_post_interaction_logs():
    jsdata = request.form['javascript_data']
    jsdata = json.loads(jsdata)
    jsdata = ",".join([str(x) for x in jsdata] )

    file = open('interactionLogs.txt','a')
    file.write(str(jsdata)+ '\n')
    # MLPCode();

@app.route("/getAllData")
def getAllData():
    infile =  open("data.csv")
    def generate():
        for line in infile:
             yield str(line)
    return Response(stream_with_context(generate()))


@app.route('/mlModel', methods = ['POST'])
def get_post_MlModel():
    jsdata = request.form['Ml_list']
    jsdata = json.loads(jsdata)
    jsdata = ast.literal_eval(json.dumps(jsdata)) 
    print jsdata
    if 'logestic' in jsdata:
        data = basicClassifiers('logestic', "cal")
    if 'decision' in jsdata:
        data = basicClassifiers('decision', "cal")
    return jsonify({"results":data})

@app.route('/exportModel', methods = ['POST'])
def get_post_exportModel():
    jsdata = request.form['Ml_list']
    jsdata = json.loads(jsdata)
    jsdata = ast.literal_eval(json.dumps(jsdata)) 
    print jsdata
    if 'logestic' in jsdata:
        data = basicClassifiers('logestic', "export")
    if 'decision' in jsdata:
        data = basicClassifiers('decision', "export")

@app.route('/frontend/<path:path>')
def send_frontend(path):
    return send_from_directory('../frontend', path)


def MLPCode():
    x_train = np.random.random((1000, 20))
    y_train = keras.utils.to_categorical(np.random.randint(10, size=(1000, 1)), num_classes=10)
    x_test = np.random.random((100, 20))
    y_test = keras.utils.to_categorical(np.random.randint(10, size=(100, 1)), num_classes=10)

    model = Sequential()

    model.add(Dense(64, activation='relu', input_dim=20))
    model.add(Dropout(0.5))
    model.add(Dense(64, activation='relu'))
    model.add(Dropout(0.5))
    model.add(Dense(10, activation='softmax'))

    sgd = SGD(lr=0.01, decay=1e-6, momentum=0.9, nesterov=True)
    model.compile(loss='categorical_crossentropy',
                  optimizer=sgd,
                  metrics=['accuracy'])

    model.fit(x_train, y_train,
              epochs=20,
              batch_size=128)
    score = model.evaluate(x_test, y_test, batch_size=128)
    print score


def basicClassifiers(model, status):
    X = np.loadtxt('trainingData.txt', delimiter=',', usecols=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17])
    Y = np.loadtxt('trainingData.txt', delimiter=',', dtype=np.str, usecols=[18])
    from sklearn.cross_validation import train_test_split
    from sklearn.preprocessing import StandardScaler

    scaler = StandardScaler()
    X= scaler.fit_transform(X)

    X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.4, random_state=42)

    from sklearn import linear_model
    from sklearn import tree

    if model == "decision":
        classifier = tree.DecisionTreeClassifier()
    else:
        classifier = linear_model.LogisticRegression(C=1, penalty='l2', random_state=111)
    
    classifier.fit(X_train, Y_train)

    if model != "decision":
        a = classifier.coef_;
        print a

    if status == "cal":
        from sklearn.metrics import accuracy_score
        accuracy = accuracy_score(Y_test,classifier.predict(X_test))
 
        from sklearn.metrics import confusion_matrix
        Y_pred = classifier.predict(X_test);
        v = pd.crosstab(Y_test, Y_pred, rownames=['True'], colnames=['Predicted'], margins=True)
        print v
        list1 = v.stack().reset_index().values.tolist()
        list1 = list1 + [["Accuracy", accuracy]]
        print list1
        return list1
    else:
        import pickle
        filename = model+'model.sav'
        pickle.dump(classifier, open(filename, 'wb'))


if __name__ == "__main__":
	app.run()
