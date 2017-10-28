import { Howl } from 'howler';

const SFX_COUNT = 8;

function getSrc(prefix, index) {
  const base = `sound/${prefix}-${index + 1}`;
  return [`${base}.ogg`, `${base}.mp3`];
}

export default (function SoundFx() {
  const sounds = [];

  for (let s = 0; s < SFX_COUNT; ++s) {
    const sfx = new Howl({ src: getSrc('simon', s) });
    sounds.push(sfx);
  }

  for (let s = 0; s < SFX_COUNT; ++s) {
    const sfx = new Howl({ src: getSrc('fail', s) });
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
