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

const playSound = (audioElement, gainNode, track) => {
  fadeIn(gainNode, track.fadeInLength);
  audioElement.play();
  audioElement.currentTime = Math.floor(Math.random() * track.randomness);

  window.setTimeout(() => {
    fadeOut(gainNode, track.fadeOutLength); 
  }, track.grainLengthInMiliseconds - track.fadeOutLengthInMiliseconds);
};

const playSoundForever = (audioElement, gainNode, track) => {
  playSound(audioElement, gainNode, track);

  window.setInterval(() => {
    playSound(audioElement, gainNode, track);
  }, track.grainLengthInMiliseconds);
};

document.addEventListener("DOMContentLoaded", () => {
  audioContext.resume();

  const addSourceButton = document.querySelector('button[role="addSource"]');

  addSourceButton.addEventListener('click', function() {
    let newTrack;
    
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
      newTrack = new Track(fileURL);
      audio.setAttribute('src', fileURL);
    };

    playStopButton.onclick = () => {
      div.style.backgroundColor = 'green';
      playSoundForever(audio, gainNode, newTrack);
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