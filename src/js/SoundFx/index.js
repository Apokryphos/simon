import { Howl } from 'howler';

const SFX_COUNT = 8;

export default (function SoundFx() {
  const sounds = [];

  for (let s = 0; s < SFX_COUNT; ++s) {
    const sfx = new Howl({ src: [`sound/simon-${s + 1}.mp3`] });
    sounds.push(sfx);
  }

  for (let s = 0; s < SFX_COUNT; ++s) {
    const sfx = new Howl({ src: [`sound/fail-${s + 1}.mp3`] });
    sounds.push(sfx);
  }

  function play(index) {
    if (index >= 0 && index < sounds.length) {
      sounds[index].play();
    } else {
      throw new Error('Index out of range.');
    }
  }

  function playFail(index) {
    if (index >= 0) {
      play(SFX_COUNT + index);
    } else {
      throw new Error('Index out of range.');
    }
  }

  function playSuccess(index) {
    play(index);
  }

  return {
    playFail,
    playSuccess,
  };
}());
