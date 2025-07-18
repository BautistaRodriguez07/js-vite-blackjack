/**
 *
 * @param {string} carta
 * @returns {Number}
 */

export const valorCarta = carta => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : parseInt(valor);
};
