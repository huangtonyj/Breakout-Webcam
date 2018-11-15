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
const Webcam = require('./webcam');

const NUM_CLASSES = 3;
const CONTROLS = ['__', 'ArrowLeft', 'ArrowRight'];

class TfWebcamControl {

  constructor(platform) {
    this.platform = platform;
    this.webcam = new Webcam(document.getElementById('webcam'));
    this.controllerDataset = new ControllerDataset(NUM_CLASSES);

    this.init();
  }
  
  async init() {
    await this.loadSetupWebcam();

    this.decapitatedMobilenet = await this.loadDecapitatedMobilenet();

    // Load trained model
    this.model = await tf.loadModel('./scripts/tf_webcam_control/Breakout-model.json')
      // console.log(this.model); 
      
    setTimeout(() => {
      document.getElementById('modal-loading').style.display = 'none';
      this.isPredicting = true;
      this.predict();
    }, 3000);    
  }

  async loadSetupWebcam () {
    try {
      await this.webcam.setup();
    } catch (e) {
      document.getElementById('no-webcam').style.display = 'block';
    }
  }

  async loadDecapitatedMobilenet() {
    const mobilenet = await tf.loadModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');

    // Return a model that outputs an internal activation.
    const layer = mobilenet.getLayer('conv_pw_13_relu');
    return tf.model({
      inputs: mobilenet.inputs,
      outputs: layer.output
    });
  }

  async predict() {
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

      // console.log(CONTROLS[classId]);
      this.platform.handleMove(CONTROLS[classId])
      await tf.nextFrame();
    }
  }

}

module.exports = TfWebcamControl;