import {
  crearDeck,
  pedirCarta,
  valorCarta,
  turnoComputadora,
  crearCarta,
} from "./usecases";

(() => {
  "use strict";

  let deck = [];
  const tipos = ["C", "D", "H", "S"];
  const especiales = ["A", "J", "Q", "K"];
  let puntosJugadores = [];
  let juegoEnCurso = false;

  const btnPedir = document.querySelector("#btnPedir");
  const btnDetener = document.querySelector("#btnDetener");
  const btnNuevo = document.querySelector("#btnNuevo");
  const divCartasJugadores = document.querySelectorAll(".divCartas");
  const puntosHTML = document.querySelectorAll(".points");
  const gameResult = document.getElementById("gameResult");
  const overlay = document.getElementById("overlay");

  const inicializarJuego = numJugadores => {
    deck = crearDeck(tipos, especiales);
    puntosJugadores = Array(numJugadores).fill(0);
    juegoEnCurso = false;

    puntosHTML.forEach(elem => (elem.innerText = 0));
    divCartasJugadores.forEach(elem => (elem.innerHTML = ""));

    btnDetener.disabled = true;
    btnPedir.disabled = true;
    btnNuevo.disabled = false;
    hideResult();
  };

  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] += valorCarta(carta);
    puntosHTML[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  };

  const mostrarResultado = (resultado, mensaje) => {
    const resultTitle = document.getElementById("resultTitle");
    const resultMessage = document.getElementById("resultMessage");

    gameResult.className = "game-result show";

    switch (resultado) {
      case "win":
        gameResult.classList.add("win");
        resultTitle.textContent = "🎉 ¡Ganaste!";
        break;
      case "lose":
        gameResult.classList.add("lose");
        resultTitle.textContent = "😞 Perdiste";
        break;
      case "tie":
        gameResult.classList.add("tie");
        resultTitle.textContent = "🤝 Empate";
        break;
    }

    resultMessage.textContent = mensaje;
    overlay.classList.add("show");
  };

  const hideResult = () => {
    gameResult.classList.remove("show", "win", "lose", "tie");
    overlay.classList.remove("show");
  };

  window.closeResult = () => {
    hideResult();
    btnDetener.classList.add("d-none");
    btnPedir.classList.add("d-none");
    btnNuevo.classList.remove("d-none");
  };

  const determinarGanador = () => {
    const [puntosJugador, puntosComputadora] = puntosJugadores;

    setTimeout(() => {
      if (puntosJugador > 21) {
        mostrarResultado("lose", `Te pasaste con ${puntosJugador} puntos`);
      } else if (puntosComputadora > 21) {
        mostrarResultado(
          "win",
          `La computadora se pasó con ${puntosComputadora} puntos`
        );
      } else if (puntosJugador === puntosComputadora) {
        mostrarResultado("tie", `Ambos tienen ${puntosJugador} puntos`);
      } else if (puntosJugador > puntosComputadora) {
        mostrarResultado(
          "win",
          `${puntosJugador} vs ${puntosComputadora} puntos`
        );
      } else {
        mostrarResultado(
          "lose",
          `${puntosJugador} vs ${puntosComputadora} puntos`
        );
      }
    }, 1200);
  };

  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta(deck);
    const puntosJugador = acumularPuntos(carta, 0);
    crearCarta(carta, 0, divCartasJugadores);

    if (puntosJugador >= 21) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(
        puntosJugador,
        deck,
        juegoEnCurso,
        acumularPuntos,
        crearCarta,
        divCartasJugadores,
        btnNuevo,
        mostrarResultado,
        determinarGanador
      );
    }
  });

  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(
      puntosJugadores[0],
      deck,
      juegoEnCurso,
      acumularPuntos,
      crearCarta,
      divCartasJugadores,
      btnNuevo,
      mostrarResultado,
      determinarGanador
    );
  });

  btnNuevo.addEventListener("click", () => {
    btnDetener.classList.remove("d-none");
    btnPedir.classList.remove("d-none");
    btnNuevo.classList.add("d-none");
    juegoEnCurso = false;
    inicializarJuego(2);
    btnPedir.disabled = false;
    btnDetener.disabled = false;
  });

  inicializarJuego(2);
})();
