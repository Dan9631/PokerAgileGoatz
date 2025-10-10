import { useState } from "react";

import Img0   from './assets/Image0.png'
import Img12  from './assets/Image1-2.png'
import Img1   from './assets/Image1.png'
import Img2   from './assets/Image2.png'
import Img3   from './assets/Image3.png'
import Img5   from './assets/Image5.png'
import Img8   from './assets/Image8.png'
import Img13  from './assets/Image13.png'
import ImgInf from './assets/ImageInfinito.png'
import ImgQ   from './assets/ImageQuestion.png'
import ImgCafe from './assets/ImageCafe.png'
import ImgJose from './assets/jose-avatar.png'
import "./PokerJoseGPT.css";

const PokerJoseGPT = () => {
  const [selectedEstimate, setSelectedEstimate] = useState(null);

  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const [gameStatus, setGameStatus] = useState(
    "👋 ¡Bienvenido! Selecciona tu estimación para comenzar"
  );
  
  const [isFullscreen, setIsFullscreen] = useState(false);
const estimateValues = [
  { value: "0",  type: "fibonacci", image: Img0 },
  { value: "½",  type: "fibonacci", image: Img12 },
  { value: "1",  type: "fibonacci", image: Img1 },
  { value: "2",  type: "fibonacci", image: Img2 },
  { value: "3",  type: "fibonacci", image: Img3 },
  { value: "5",  type: "fibonacci", image: Img5 },
  { value: "8",  type: "fibonacci", image: Img8 },
  { value: "13", type: "fibonacci", image: Img13 },
  { value: "∞",  type: "special",   image: ImgInf },
  { value: "?",  type: "question",  image: ImgQ },
  { value: "☕", type: "special",    image: ImgCafe },
]


  const selectValue = (value, type, image) => {
    setSelectedEstimate({ value, type, image });

    setGameStatus(
      `Estimación seleccionada: ${value} - Haz clic en la carta para revelar`
    );
  };

  const flipCard = () => {
    if (!selectedEstimate) {
      setGameStatus("⚠️ Primero selecciona una estimación");

      return;
    }

    setIsCardFlipped(!isCardFlipped);

    if (!isCardFlipped) {
      setGameStatus(`🎯 Tu estimación: ${selectedEstimate.value} puntos`);
    } else {
      setGameStatus(
        `Carta oculta - Haz clic para mostrar: ${selectedEstimate.value}`
      );
    }
  };

  const resetCard = () => {
    setSelectedEstimate(null);

    setIsCardFlipped(false);

    setGameStatus(
      "Selecciona un valor y haz clic en la carta para revelar tu estimación"
    );
  };

  const entrarPantallaCompleta = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="poker-container">
      <div className="poker-content">
        {/* Header */}
        <div className="poker-header">
          <h1 className="poker-title">{`🃏 Poker José  ${__APP_VERSION__}`}</h1>
          <p className="poker-subtitle">
            Selecciona tu estimación y voltea tu carta
          </p>
        </div>

        {/* Value Selector */}
        <div className={`value-selector`}>
          <h3 className="selector-title">Selecciona tu estimación:</h3>
          <div className="value-buttons">
            {estimateValues.map((estimate) => (
              <button
                key={estimate.value}
                onClick={() =>
                  selectValue(estimate.value, estimate.type, estimate.image)
                }
                className={`value-btn ${
                  selectedEstimate?.value === estimate.value ? "selected" : ""
                }`}
              >
                {estimate.value}
              </button>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="game-status">
          <p>{gameStatus}</p>
        </div>

        {/* boton para maximizar */}

        {/* Main Card */}
        <div className={` ${isFullscreen ? "fullscreen" : "card-container"}`}>
          <button className="expand-btn" onClick={entrarPantallaCompleta}>Fullscreen</button>
          <div
            className={`${isFullscreen ? "main-card-fullscreen" : "main-card"} ${isCardFlipped ? "flipped" : ""}`}
            onClick={flipCard}
          >
            <div className="card-inner">
              {/* Card Front */}
              <div className="card-front">
                <div className="jose-avatar">
                  <span><img src={ImgJose} alt="José" /></span>
                </div>
                <div className="jose-name">Poker</div>
                <div className="gpt-text">José</div>
              </div>

              {/* Card Back */}
              <div className="card-back">
                {selectedEstimate?.image ? (
                  <div className="estimate-with-image">
                    <img
                      src={selectedEstimate.image}
                      alt={`Estimación ${selectedEstimate.value}`}
                      className={`estimate-image ${isFullscreen ? "estimate-image-fullscreen" : ""}`}
                    />
                  </div>
                ) : (
                  <div className="estimate-only">
                    <div
                      className={`estimate-value-large ${
                        selectedEstimate?.type || "question"
                      }`}
                    >
                      {selectedEstimate?.value || "?"}
                    </div>
                    <div className="estimate-title">Tu estimación</div>
                    <div className="estimate-subtitle">Story Points</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="click-hint">
            💡{" "}
            {isCardFlipped
              ? "Haz clic para ocultar la estimación"
              : "Haz clic en la carta para voltearla y revelar tu estimación"}
          </div>
        </div>

        {/* Reset Button */}
        <button className="reset-btn" onClick={resetCard}>
          🔄 Nueva Estimación
        </button>

        {/* Instructions */}
        <div className="instructions">
          <h3>🎯 Instrucciones de uso:</h3>
          <ol>
            <li>
              <strong>Selecciona:</strong> tu estimación haciendo clic en uno
              de los valores
            </li>
            <li>
              <strong>Voltea:</strong> tu carta haciendo clic en ella cuando
              todos estén listos
            </li>
            <li>
              <strong>Compara:</strong> estimaciones con tu equipo
            </li>
            <li>
              <strong>Discute:</strong> las diferencias y llega a un consenso
            </li>
            <li>
              <strong>Reinicia:</strong> para una nueva historia de usuario
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default PokerJoseGPT;
