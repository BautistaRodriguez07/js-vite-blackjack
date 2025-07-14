import { pedirCarta } from "./";

export const turnoComputadora = (
  puntosMinimos,
  deck,
  juegoEnCurso,
  acumularPuntos,
  crearCarta,
  divCartasJugadores,
  btnNuevo,
  mostrarResultado,
  determinarGanador
) => {
  if (juegoEnCurso) return;

  juegoEnCurso = true;
  btnNuevo.disabled = true;

  let puntosComputadora = 0;
  let delay = 0;

  const jugarCartaComputadora = () => {
    if (puntosComputadora < puntosMinimos && puntosMinimos <= 21) {
      setTimeout(() => {
        if (!juegoEnCurso) return;
        const carta = pedirCarta(deck);
        puntosComputadora = acumularPuntos(carta, 1);
        crearCarta(carta, 1, divCartasJugadores);
        jugarCartaComputadora();
      }, delay);
      delay = 1500;
    } else {
      setTimeout(() => {
        juegoEnCurso = false;
        btnNuevo.disabled = false;
        determinarGanador();
      }, 800);
    }
  };

  if (puntosMinimos > 21) {
    setTimeout(() => {
      const carta = pedirCarta(deck);
      puntosComputadora = acumularPuntos(carta, 1);
      crearCarta(carta, 1, divCartasJugadores);
      juegoEnCurso = false;
      btnNuevo.disabled = false;
      mostrarResultado(
        "lose",
        `La computadora ganó, ya que te pasaste con ${puntosMinimos} puntos.`
      );
    }, delay);
  } else {
    jugarCartaComputadora();
  }
};
