// Crear carta con efecto de carga y volteo
export const crearCarta = (carta, turno, divCartasJugadores) => {
  // Mostrar carta de reverso primero
  const backCard = document.createElement("img");
  backCard.classList.add("carta");
  backCard.style.opacity = "1";
  backCard.src =
    turno === 0 ? "assets/cartas/red_back.png" : "assets/cartas/grey_back.png";

  if (divCartasJugadores[turno].children.length === 0) {
    backCard.style.marginLeft = "0";
  }

  divCartasJugadores[turno].appendChild(backCard);

  // Después de un delay, voltear la carta
  setTimeout(() => {
    const imgCarta = document.createElement("img");
    imgCarta.classList.add("carta", "card-flip");
    imgCarta.style.opacity = "0";

    if (divCartasJugadores[turno].children.length === 1) {
      imgCarta.style.marginLeft = "0";
    }

    imgCarta.onload = () => {
      // Remover la carta de reverso
      backCard.remove();
      imgCarta.style.opacity = "1";
      imgCarta.style.transform = "scale(1.1)";
      setTimeout(() => {
        imgCarta.style.transform = "scale(1)";
      }, 200);
    };

    imgCarta.onerror = () => {
      backCard.remove();
      // Mostrar carta genérica si falla la carga
      const cardText = document.createElement("div");
      cardText.classList.add("carta");
      cardText.style.backgroundColor = "#fff";
      cardText.style.color = "#000";
      cardText.style.display = "flex";
      cardText.style.alignItems = "center";
      cardText.style.justifyContent = "center";
      cardText.style.fontSize = "12px";
      cardText.style.fontWeight = "bold";
      cardText.textContent = carta;

      if (divCartasJugadores[turno].children.length === 0) {
        cardText.style.marginLeft = "0";
      }

      divCartasJugadores[turno].appendChild(cardText);
    };

    imgCarta.src = `assets/cartas/${carta}.png`;
    divCartasJugadores[turno].appendChild(imgCarta);
  }, 500);
};
