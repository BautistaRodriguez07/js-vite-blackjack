/**
 *
 * @param {Array<String>} deck
 * @returns {String}
 */

export const pedirCarta = deck => {
  if (!deck || deck.length === 0) {
    throw "No hay más cartas en el mazo";
  }
  return deck.pop();
};
