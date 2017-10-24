import Game from 'Game';
import { getFailButton } from './test-util';

describe('Game', () => {
  it('Initial state OK', () => {
    const game = new Game(4);
    expect(game.getButtonCount() === 4);
    expect(game.getSequence().length === 1);
    expect(game.getStrict() === false);
  });

  it('Strict can be set OK', () => {
    const game = new Game();
    expect(game.setStrict(false));
    expect(game.getStrict() === false);
    expect(game.setStrict(true));
    expect(game.getStrict() === true);
  });

  it('Submit throws on out of bounds index', () => {
    const game = new Game();
    expect(() => game.submit(-1)).toThrow();
    expect(() => game.submit(game.getButtonCount())).toThrow();
  });

  it('Submit false when match fails', () => {
    const game = new Game();
    const button = getFailButton(game);
    expect(game.submit(button) === false);
  });

  it('Submit resets when strict is enabled', () => {
    const game = new Game();
    game.setStrict(true);

    const sequence = game.getSequence();

    const button = getFailButton(game);
    expect(game.submit(button) === false);

    expect(sequence !== game.getSequence());
  });

  it('Reset sets expected values', () => {
    const game = new Game(4);

    const buttonCount = game.getButtonCount();
    const sequence = game.getSequence();

    game.reset(8);

    expect(buttonCount !== game.getButtonCount());
    expect(sequence !== game.getSequence());
    expect(game.sequenceIndex === 0);
  });

  it('Submit true when match succeeds', () => {
    const game = new Game();
    const button = game.getSequence()[0];
    expect(game.submit(button) === true);
  });

  it('Sequence grows when previous sequence is matched', () => {
    const game = new Game();

    const submitMatch = function submitMatch(index) {
      const button = game.getSequence()[index];
      expect(game.submit(button) === true);
    };

    expect(game.getSequence().length === 1);
    expect(game.getSequenceLength() === 0);
    submitMatch(0);

    expect(game.getSequence().length === 2);
    expect(game.getSequenceLength() === 1);
    submitMatch(0);
    submitMatch(1);

    expect(game.getSequence().length === 3);
    expect(game.getSequenceLength() === 2);
    submitMatch(0);
    submitMatch(1);
    submitMatch(2);

    expect(game.getSequenceLength().length === 4);
  });
});
