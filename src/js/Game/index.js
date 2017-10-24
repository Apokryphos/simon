function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * max);
}

function Game(buttonCount = 8, random = null) {
  this.strict = false;

  this.getRandomButton = random || (() => getRandomInt(0, this.buttonCount));

  this.reset(buttonCount);
}

Game.prototype.getButtonCount = function getButtonCount() {
  return this.buttonCount;
};

Game.prototype.getSequence = function getSequence() {
  return this.sequence.slice();
};

Game.prototype.getSequenceLength = function getSequenceLength() {
  return this.sequence.length;
};

Game.prototype.getStrict = function getStrict() {
  return this.strict;
};

Game.prototype.reset = function reset(buttonCount) {
  this.buttonCount = buttonCount || this.buttonCount;
  this.sequenceIndex = 0;
  this.sequence = [this.getRandomButton()];
};

Game.prototype.setStrict = function setStrict(strict) {
  this.strict = strict;
};

Game.prototype.submit = function submit(buttonIndex) {
  if (buttonIndex >= 0 && buttonIndex < this.buttonCount) {
    if (this.sequence[this.sequenceIndex] === buttonIndex) {
      ++this.sequenceIndex;

      if (this.sequenceIndex >= this.sequence.length) {
        this.sequence.push(this.getRandomButton());
        this.sequenceIndex = 0;
      }

      return true;
    }

    if (this.strict) {
      this.reset();
    } else {
      this.sequenceIndex = 0;
    }

    return false;
  }

  throw new Error('Button index out of range.');
};

export default Game;
