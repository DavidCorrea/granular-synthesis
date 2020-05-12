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