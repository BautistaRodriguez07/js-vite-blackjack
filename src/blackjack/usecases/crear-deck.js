import { shuffle } from "underscore";

/**
 *
 * @param {Array<String>} tiposDeCarta Ej: ["C", "D", "H", "S"]
 * @param {Array<String>} tiposEspeciales Ej: ["A", "J", "Q", "K"]
 * @returns {Array<String>}
 */

export const crearDeck = (tiposDeCarta, tiposEspeciales) => {
  const newDeck = [];

  for (let i = 2; i <= 10; i++) {
    for (let tipo of tiposDeCarta) {
      newDeck.push(i + tipo);
    }
  }

  for (let tipo of tiposDeCarta) {
    for (let esp of tiposEspeciales) {
      newDeck.push(esp + tipo);
    }
  }

  return shuffle(newDeck);
};
