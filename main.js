const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

const tracks = [];

const fadeIn = (gainNode, duration) => {
  gainNode.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(1, audioContext.currentTime + duration);
};

const fadeOut = (gainNode, duration) => {
  gainNode.gain.setValueAtTime(gainNode.gain.value, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
};

const playSound = (audioElement, gainNode, randomness, grainLengthInMiliseconds, fadeInDuration, fadeOutDuration) => {
  fadeIn(gainNode, fadeInDuration);
  audioElement.play();
  audioElement.currentTime = Math.floor(Math.random() * randomness);

  window.setTimeout(() => {
    fadeOut(gainNode, fadeOutDuration); 
  }, grainLengthInMiliseconds - (fadeOutDuration * 1000));
};

const playSoundForever = (audioElement, gainNode, randomness, grainLengthInSeconds, grainFadeInDuration, grainFadeOutDuration) => {
  const secondsAsMiliseconds = grainLengthInSeconds * 1000;

  playSound(audioElement, gainNode, randomness, secondsAsMiliseconds, grainFadeInDuration, grainFadeOutDuration);

  window.setInterval(() => {
    playSound(audioElement, gainNode, randomness, secondsAsMiliseconds, grainFadeInDuration, grainFadeOutDuration);
  }, secondsAsMiliseconds);
};

const createDiv = () => {
  return document.createElement('div');
};

const createInput = (type) => {
  const input = document.createElement('input');
  input.setAttribute('type', type);

  return input;
};

const createRangeInput = (min, max, step) => {
  const rangeInput = createInput('range');
  rangeInput.setAttribute('min', min);
  rangeInput.setAttribute('max', max);
  rangeInput.setAttribute('step', step);

  return rangeInput;
};

const createAudioFileInput = () => {
  const input = createInput('file');
  input.setAttribute('accept', 'audio/*');

  return input;
};

const createAudio = () => {
  const audio = document.createElement('audio');
  audio.setAttribute('type', 'audio/mpeg');

  return audio;
};

const createButton = (role, text) => {
  const button = document.createElement('button');
  const buttonText = document.createElement('span');
  buttonText.innerText = text;
  button.setAttribute('role', role);
  button.appendChild(buttonText);

  return button;
};

document.addEventListener("DOMContentLoaded", () => {
  audioContext.resume();

  const addSourceButton = document.querySelector('button[role="addSource"]');

  addSourceButton.addEventListener('click', function() {
    const newTrack = {
      randomness: 2,
      grainLength: 1,
      fadeInLength: 0.03,
      fadeOutLength: 0.03
    };

    tracks.concat(newTrack);

    const body = document.querySelector('body');

    const div = createDiv();
    const audioInput = createAudioFileInput();
    const audio = createAudio();
    const playStopButton = createButton('playOrStop', 'Play/Pause');
    const randomnessInput = createRangeInput(1, 10, 1);
    const grainLengthInput = createRangeInput(0.1, 2, 0.1);
    const grainFadeInInput = createRangeInput(0, 2, 0.01);
    const grainFadeOutInput = createRangeInput(0, 2, 0.01);

    /* Processing Nodes */

    const trackNode = audioContext.createMediaElementSource(audio);
    const gainNode = audioContext.createGain();

    trackNode.connect(gainNode);
    gainNode.connect(audioContext.destination);

    /* Handlers */

    audioInput.onchange = function() {
      const file = this.files[0];
      const fileURL = window.URL.createObjectURL(file);
      audio.setAttribute('src', fileURL);
    };

    playStopButton.onclick = () => {
      div.style.backgroundColor = 'green';
      playSoundForever(audio, gainNode, newTrack.randomness, newTrack.grainLength, newTrack.fadeInLength, newTrack.fadeOutLength);
    };

    randomnessInput.onchange = function() {
      newTrack.randomness = this.value;
    };

    grainLengthInput.onchange = function() {
      newTrack.grainLength = this.value;
    };

    grainFadeInInput.onchange = function() {
      newTrack.fadeInLength = this.value;
    };

    grainFadeOutInput.onchange = function() {
      newTrack.fadeOutLength = this.value;
    };

    /* Tree Building */

    div.appendChild(audioInput);
    div.appendChild(audio);
    div.appendChild(playStopButton);
    div.appendChild(randomnessInput);
    div.appendChild(grainLengthInput);
    div.appendChild(grainFadeInInput);
    div.appendChild(grainFadeOutInput);

    body.appendChild(div);
  });
});