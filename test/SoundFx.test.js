import SoundFx from 'SoundFx';

describe('SoundFx', () => {
  it('Plays OK', () => {
    expect(() => {
      SoundFx.playSuccess(1);
    }).not.toThrow();
    expect(() => {
      SoundFx.playFail(1);
    }).not.toThrow();
  });

  it('Play throws when index is out of bounds', () => {
    expect(() => {
      SoundFx.playSuccess(-1);
    }).toThrow();
    expect(() => {
      SoundFx.playFail(-1);
    }).toThrow();
  });

  it('Play throws when index is out of bounds', () => {
    expect(() => {
      SoundFx.playSuccess(16);
    }).toThrow();
    expect(() => {
      SoundFx.playFail(16);
    }).toThrow();
  });
});
