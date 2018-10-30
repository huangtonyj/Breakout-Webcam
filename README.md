# Breakout-Webcam

Breakout-Webcam is a classic Atari game controlled with hand movements captured from webcam.

## Background and Overview

Breakout-Webcam is a reproduction of the classic Atari breakout game but played with waving hand movement captured by device's webcam.

The webcam gesture uses a low latency and light weight image recognition model trained with TensorFlow. It recognizes images of hands on the left and right side of the screen and control the movement of the platform respectively.

## Functionality and MVP Features

In building Breakout-Webcam, users will be able to:

- [ ] Learn how to play from instructions rendered from a modal upon initialization
- [ ] Control moving platform with arrow keys or mouse input
- [ ] Move platform to reflect a ball upward
- [ ] Destroy bricks upon collion from ball trajetory
- [ ] Control moving platform with hand gesture movements

## Architecture and Technologies

- `Vanilla Javascript` for overall game logic
- `HTML5 Canvas` for rendering game objects
- `React.js` for updating reactive components (i.e. scoreboard)
- `Tensorflow and Mobilenet` for image recognition
- `Webpack/Parcel` to bundle up scripts

## Implementation Timeline

- Day 1
  - [ ] Initialize project and environment
  - [ ] Learn Canvas
- Day 2
  - [ ] Render objects in canvas
  - [ ] Implement controls to move block left and right
  - [ ] Implement ball bounce within wall boundaries
- Day 3
  - [ ] Render bricks
  - [ ] Destroy brick upon collision
  - [ ] Implement gravitational/accelerated ball motion
- Day 4
  - [ ] Finalize game
  - [ ] Style webpage
  - [ ] Start implementing image recognition
- Day 5
  - [ ] Fully implement hand image recognition controls
- Day 6 & 7
  - [ ] Iron out bugs
  - [ ] Deploy to Github Pages


## Bonus Features

- Multiple Levels
- Randomized brick arrangements
- Add gun prize to shoot bricks from platfom
- Custom controls by training new model
