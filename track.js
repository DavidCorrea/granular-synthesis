class Track {
  constructor(sample) {
    this._sample = sample;
    this._randomness = 2;
    this._grainLength = 1; // Seconds.
    this._fadeInLength = 0.03; // Seconds.
    this._fadeOutLength = 0.03; // Seconds.
  }

  get sample() {
    return this._sample;
  }

  get randomness() {
    return this._randomness;
  }

  set randomness(newRandomness) {
    this._randomness = newRandomness;
  }

  get grainLength() {
    return this._grainLength;
  }

  get grainLengthInMiliseconds() {
    return this._grainLength * 1000;
  }

  set grainLength(newGrainLength) {
    this._grainLength = newGrainLength;
  }

  get fadeInLength() {
    return this._fadeInLength;
  }

  set fadeInLength(newFadeInLength) {
    this._fadeInLength = newFadeInLength;
  }

  get fadeOutLength() {
    return this._fadeOutLength;
  }

  get fadeOutLengthInMiliseconds() {
    return this._fadeOutLength * 1000;
  }

  set fadeOutLength(newFadeOutLength) {
    this._fadeOutLength = newFadeOutLength;
  }
}