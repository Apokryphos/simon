import Game from 'Game';
import GameController from 'GameController';
import { getFailButton, getMatchButton } from './test-util';

describe('GameController', () => {
  it('Initial state OK', () => {
    const gameController = new GameController(new Game());
    expect(gameController.game !== null);
  });

  it('Reset OK', () => {
    const gameController = new GameController(new Game());
    gameController.reset(6);
    expect(gameController.game.getButtonCount() === 6);
  });

  it('toggleStrict toggles strict setting', () => {
    const gameController = new GameController(new Game());
    const strict = gameController.getStrict();
    expect(gameController.toggleStrict());
    expect(strict === gameController.getStrict());
  });

  it('submit does nothing after successful submit  when controller is busy', () => {
    const game = new Game();
    const gameController = new GameController(game);

    expect(gameController.game === game);

    gameController.submit(getMatchButton(game));
    expect(game.getSequenceLength() === 1);
    gameController.submit(getMatchButton(game));
    expect(game.getSequenceLength() === 1);
  });

  it('submit does nothing after failed submit when controller is busy', () => {
    const game = new Game();
    const gameController = new GameController(game);

    expect(gameController.game === game);

    gameController.submit(getFailButton(game));
    expect(game.getSequenceLength() === 1);
    gameController.submit(getFailButton(game));
    expect(game.getSequenceLength() === 1);
  });

  it('playSequence throws if sequence is zero length', () => {
    const gameController = new GameController(new Game());
    expect(() => gameController.playSequence([])).toThrow();
  });

  it('Get method results match game method results', () => {
    const game = new Game();
    const gameController = new GameController(game);
    expect(gameController.game === game);
    expect(gameController.getSequenceLength() === game.getSequenceLength());
    expect(gameController.getStrict() === game.getStrict());
  });

  it('Fires events when sequence is played', (done) => {
    const gameController = new GameController(new Game(), 100);

    let sequenceIndex = 0;
    const sequence = [4, 3, 2, 1, 0];

    function onActivate(button, success) {
      expect(success === true);
      expect(button === sequence[sequenceIndex]);
      if (sequenceIndex === sequence.length - 1) {
        done();
      }
      sequenceIndex++;
    }

    gameController.game.sequence = sequence;
    gameController.addListener('activateGameButton', onActivate);
    gameController.playSequence();
  });

  it('Fires event after successful submit', (done) => {
    const gameController = new GameController(new Game(), 100);

    const submitButton = gameController.game.getSequence()[0];
    const sequenceLength = gameController.getSequenceLength();

    function onActivate(button, success) {
      expect(button === submitButton);
      expect(success === true);
      expect(gameController.getSequenceLength() === sequenceLength + 1);
      done();
    }

    gameController.addListener('activateGameButton', onActivate);
    gameController.submit(submitButton);
  });

  it('Fires fail event after unsuccessful submit', (done) => {
    const gameController = new GameController(new Game(), 100);

    const submitButton = gameController.game.getSequence()[0] === 0 ? 1 : 0;

    function onFail(button, success) {
      expect(button === submitButton);
      expect(success === false);
      done();
    }

    gameController.addListener('activateGameButton', onFail);
    gameController.submit(submitButton);
  });

  it('Submit does nothing after victory', () => {
    const game = new Game();
    const gameController = new GameController(game, 100);

    for (let v = 0; v < gameController.getVictoryCount(); ++v) {
      expect(gameController.getSequenceLength === v);
      expect(gameController.getVictory() === false);
      gameController.submit(getMatchButton((game)));
    }

    expect(gameController.getSequenceLength === gameController.getVictoryCount() + 1);
    expect(gameController.getVictory() === true);

    gameController.submit(getMatchButton((game)));
    expect(gameController.getSequenceLength === gameController.getVictoryCount() + 1);
    expect(gameController.getVictory() === true);
  });
});
