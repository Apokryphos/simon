//  Always returns a button that will fail when submitted
function getFailButton(game) {
  return game.getSequence()[0] === 0 ? 1 : 0;
}

//  Always returns a button that will succeed when submitted
function getMatchButton(game) {
  return game.getSequence()[0];
}

module.exports = {
  getFailButton,
  getMatchButton,
};
