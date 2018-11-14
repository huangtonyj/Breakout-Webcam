/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

const tf = require('@tensorflow/tfjs');
const ControllerDataset = require ('./controller_dataset');
const ui = require('./ui');
const Webcam = require('./webcam');

const NUM_CLASSES = 3;
const getLearningRate = 0.0001;
const getBatchSizeFraction = 0.4;
const getEpochs = 20;
const getDenseUnits = 100;
const CONTROLS = ['__', 'ArrowLeft', 'ArrowRight'];

class TfWebcamControl {

  constructor(platform) {
    this.platform = platform;
    this.webcam = new Webcam(document.getElementById('webcam'));
    this.controllerDataset = new ControllerDataset(NUM_CLASSES);

    this.init();

    document.getElementById('train').addEventListener('click', async () => {
      ui.trainStatus('Training...');
      await tf.nextFrame();
      await tf.nextFrame();
      this.isPredicting = false;
      this.train();
    });

    document.getElementById('predict').addEventListener('click', () => {
      ui.startTfPrediction();
      this.isPredicting = true;
      this.predict();
    });    
  }
  
  async init() {
    await this.loadSetupWebcam();

    this.decapitatedMobilenet = await this.loadDecapitatedMobilenet();

    tf.tidy(() => this.decapitatedMobilenet.predict(this.webcam.capture()));

    ui.init();

    // REFACTOR THIS LATER
    ui.setExampleHandler(label => {
      tf.tidy(() => {
        const img = this.webcam.capture();
        this.controllerDataset.addExample(this.decapitatedMobilenet.predict(img), label);

        // Draw the preview thumbnail.
        ui.drawThumb(img, label);
      });
    });

    // Load trained model
    this.model = await tf.loadModel('./scripts/tf_webcam_control/Breakout-model.json')
    console.log(this.model); 
  }

  async loadSetupWebcam () {
    try {
      await this.webcam.setup();
    } catch (e) {
      document.getElementById('no-webcam').style.display = 'block';
    }
  }

  async loadDecapitatedMobilenet() {
    const mobilenet = await tf.loadModel(
      'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');

    // Return a model that outputs an internal activation.
    const layer = mobilenet.getLayer('conv_pw_13_relu');
    return tf.model({
      inputs: mobilenet.inputs,
      outputs: layer.output
    });
  }

  async train() {
    if (this.controllerDataset.xs == null) {
      throw new Error('Add some examples before training!');
    }

    // Creates a 2-layer fully connected model. By creating a separate model,
    // rather than adding layers to the mobilenet model, we "freeze" the weights
    // of the mobilenet model, and only train weights from the new model.
    this.model = tf.sequential({
      layers: [
        // Flattens the input to a vector so we can use it in a dense layer. While
        // technically a layer, this only performs a reshape (and has no training
        // parameters).
        tf.layers.flatten({
          inputShape: this.decapitatedMobilenet.outputs[0].shape.slice(1)
        }),
        // Layer 1.
        tf.layers.dense({
          units: getDenseUnits,
          activation: 'relu',
          kernelInitializer: 'varianceScaling',
          useBias: true
        }),
        // Layer 2. The number of units of the last layer should correspond
        // to the number of classes we want to predict.
        tf.layers.dense({
          units: NUM_CLASSES,
          kernelInitializer: 'varianceScaling',
          useBias: false,
          activation: 'softmax'
        })
      ]
    });

    // Creates the optimizers which drives training of the model.
    const optimizer = tf.train.adam(getLearningRate);

    // We use categoricalCrossentropy which is the loss function we use for
    // categorical classification which measures the error between our predicted
    // probability distribution over classes (probability that an input is of each
    // class), versus the label (100% probability in the true class)>
    this.model.compile({
      optimizer: optimizer,
      loss: 'categoricalCrossentropy'
    });

    // We parameterize batch size as a fraction of the entire dataset because the
    // number of examples that are collected depends on how many examples the user
    // collects. This allows us to have a flexible batch size.
    const batchSize =
      Math.floor(this.controllerDataset.xs.shape[0] * getBatchSizeFraction);
    if (!(batchSize > 0)) {
      throw new Error(
        `Batch size is 0 or NaN. Please choose a non-zero fraction.`);
    }

    // Train the model! Model.fit() will shuffle xs & ys so we don't have to.
    this.model.fit(this.controllerDataset.xs, this.controllerDataset.ys, {
      batchSize,
      epochs: getEpochs,
      callbacks: {
        onBatchEnd: async (batch, logs) => {
          ui.trainStatus('Loss: ' + logs.loss.toFixed(5));
        }
      }
    });
  }

  async predict() {
    console.log(this.model);
    await this.model.save('downloads://Breakout-model')


    ui.isPredicting();
    while (this.isPredicting) {
      const predictedClass = tf.tidy(() => {
        // Capture the frame from the webcam.
        const img = this.webcam.capture();

        // Make a prediction through mobilenet, getting the internal activation of
        // the mobilenet model, i.e., "embeddings" of the input images.
        const embeddings = this.decapitatedMobilenet.predict(img);

        // Make a prediction through our newly-trained model using the embeddings
        // from mobilenet as input.
        const predictions = this.model.predict(embeddings);

        // Returns the index with the maximum probability. This number corresponds
        // to the class the model thinks is the most probable given the input.
        return predictions.as1D().argMax();
      });

      const classId = (await predictedClass.data())[0];
      predictedClass.dispose();

      ui.predictClass(classId);
      this.platform.handleMove(CONTROLS[classId])
      await tf.nextFrame();
    }
    ui.donePredicting();
  }

}

module.exports = TfWebcamControl;