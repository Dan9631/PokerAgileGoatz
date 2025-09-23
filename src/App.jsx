import React, { useState } from "react";

import "./PokerJoseGPT.css";

const PokerJoseGPT = () => {
  const [selectedEstimate, setSelectedEstimate] = useState(null);

  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const [gameStatus, setGameStatus] = useState(
    "👋 ¡Bienvenido! Selecciona tu estimación para comenzar"
  );

  const estimateValues = [
    { value: "0", type: "fibonacci", image: "src/assets/Image0.png" },
    { value: "½", type: "fibonacci", image: "src/assets/Image1-2.png" },
    { value: "1", type: "fibonacci", image: "src/assets/Image1.png" },
    { value: "2", type: "fibonacci", image: "src/assets/Image2.png" },
    { value: "3", type: "fibonacci", image: "src/assets/Image3.png" },
    { value: "5", type: "fibonacci", image: "src/assets/Image5.png" },
    { value: "8", type: "fibonacci", image: "src/assets/Image8.png" },
    { value: "13", type: "fibonacci", image: "src/assets/Image13.png" },
    { value: "∞", type: "special", image: "src/assets/ImageInfinito.png" },
    { value: "?", type: "question", image: "src/assets/ImageQuestion.png" },
    { value: "☕", type: "special", image: "src/assets/ImageCafe.png" },

  ];

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

  return (
    <div className="poker-container">
      <div className="poker-content">
        {/* Header */}
        <div className="poker-header">
          <h1 className="poker-title">🃏 Poker José GPT</h1>
          <p className="poker-subtitle">
            Selecciona tu estimación y voltea tu carta
          </p>
        </div>

        {/* Value Selector */}
        <div className="value-selector">
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

        {/* Main Card */}
        <div className="card-container">
          <div
            className={`main-card ${isCardFlipped ? "flipped" : ""}`}
            onClick={flipCard}
          >
            <div className="card-inner">
              {/* Card Front */}
              <div className="card-front">
                <div className="jose-avatar">
                  <span>👨‍💻</span>
                </div>
                <div className="jose-name">José</div>
                <div className="gpt-text">GPT</div>
              </div>

              {/* Card Back */}
              <div className="card-back">
                {selectedEstimate?.image ? (
                  <div className="estimate-with-image">
                    <img
                      src={selectedEstimate.image}
                      alt={`Estimación ${selectedEstimate.value}`}
                      className="estimate-image"
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
              <strong>1. Selecciona:</strong> tu estimación haciendo clic en uno
              de los valores
            </li>
            <li>
              <strong>2. Voltea:</strong> tu carta haciendo clic en ella cuando
              todos estén listos
            </li>
            <li>
              <strong>3. Compara:</strong> estimaciones con tu equipo
            </li>
            <li>
              <strong>4. Discute:</strong> las diferencias y llega a un consenso
            </li>
            <li>
              <strong>5. Reinicia:</strong> para una nueva historia de usuario
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default PokerJoseGPT;
