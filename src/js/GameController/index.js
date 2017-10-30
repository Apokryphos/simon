import EventEmitter from '../EventEmitter';

const GameState = {
  READY: 0,
  BUSY: 1,
};

function GameController(game, playDelay) {
  this.playDelay = playDelay || 1100;
  this.game = game;
  this.victoryCount = 20;
  this.playSequenceTimeoutId = null;
  this.reset();
}

GameController.prototype = new EventEmitter();

GameController.prototype.getSequenceLength = function getSequenceLength() {
  return this.game.getSequenceLength();
};

GameController.prototype.getStrict = function getStrict() {
  return this.game.getStrict();
};

GameController.prototype.getVictory = function getVictory() {
  return this.game.getSequenceLength() > this.victoryCount;
};

GameController.prototype.getVictoryCount = function getVictory() {
  return this.victoryCount;
};

GameController.prototype.playSequence = function playSequence(sequence) {
  const seq = sequence || this.game.getSequence();

  if (seq.length > 0) {
    let seqIndex = 0;

    this.state = GameState.BUSY;

    const play = () => {
      this.emitEvent('activateGameButton', [seq[seqIndex++], true]);

      if (seq.length > seqIndex) {
        this.playSequenceTimeoutId = setTimeout(play, this.playDelay);
      } else {
        this.state = GameState.READY;
      }
    };

    play();
  } else {
    throw new Error('Sequence length must be greater than zero.');
  }
};

GameController.prototype.reset = function reset(buttonCount = 8) {
  clearTimeout(this.playSequenceTimeoutId);
  this.game.reset(buttonCount);
  this.state = GameState.READY;
};

GameController.prototype.submit = function submit(buttonIndex) {
  if (this.getVictory()) {
    return;
  }

  if (this.state === GameState.READY) {
    const playSeq = () => {
      this.playSequenceTimeoutId = setTimeout(() => this.playSequence(), this.playDelay);
    };

    const lastSequenceLength = this.game.getSequence().length;
    if (this.game.submit(buttonIndex)) {
      this.emitEvent('activateGameButton', [buttonIndex, true]);
      if (lastSequenceLength !== this.game.getSequence().length) {
        //  Don't play sequence after winning
        if (!this.getVictory()) {
          playSeq();
        }
      }
    } else {
      this.emitEvent('activateGameButton', [buttonIndex, false]);
      this.state = GameState.BUSY;
      playSeq();
    }
  }
};

GameController.prototype.toggleStrict = function toggleStrict() {
  this.game.setStrict(!this.game.getStrict());
};

export default GameController;
