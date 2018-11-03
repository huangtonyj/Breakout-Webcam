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

import * as tf from '@tensorflow/tfjs';

import {
  ControllerDataset
} from './controller_dataset';
import * as ui from './ui';
import {
  Webcam
} from './webcam';

const NUM_CLASSES = 3;
const getLearningRate = 0.0001;
const getBatchSizeFraction = 0.4;
const getEpochs = 20;
const getDenseUnits = 100;

class TfWebcamPrediction {

  constructor(platform) {
    this.platform = platform;
    this.webcam = new Webcam(document.getElementById('webcam'));
    this.controllerDataset = new ControllerDataset(NUM_CLASSES);
    // this.decapitatedMobilenet;
    // this.model;
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

}
