import { useState } from "react";

// Importar avatares
import ImgJose from './assets/jose-avatar.png'
import ImgMynor from './assets/Mynor/Mynor-avatar.png'

// Importar imágenes de José
import JoseImg0   from './assets/Image0.png'
import JoseImg12  from './assets/Image1-2.png'
import JoseImg1   from './assets/Image1.png'
import JoseImg2   from './assets/Image2.png'
import JoseImg3   from './assets/Image3.png'
import JoseImg5   from './assets/Image5.png'
import JoseImg8   from './assets/Image8.png'
import JoseImg13  from './assets/Image13.png'
import JoseImgInf from './assets/ImageInfinito.png'
import JoseImgQ   from './assets/ImageQuestion.png'
import JoseImgCafe from './assets/ImageCafe.png'

// Importar imágenes de Mynor
import MynorImg0   from './assets/Mynor/Image0.png'
import MynorImg12  from './assets/Mynor/Image1-2.png'
import MynorImg1   from './assets/Mynor/Image1.png'
import MynorImg2   from './assets/Mynor/Image2.png'
import MynorImg3   from './assets/Mynor/Image3.png'
import MynorImg5   from './assets/Mynor/Image5.png'
import MynorImg8   from './assets/Mynor/Image8.png'
import MynorImg13  from './assets/Mynor/Image13.png'
import MynorImgInf from './assets/Mynor/ImageInfinito.png'
import MynorImgQ   from './assets/Mynor/ImageQuestion.png'
import MynorImgCafe from './assets/Mynor/ImageCafe.png'

import "./PokerJoseGPT.css";

const PokerJoseGPT = () => {
  const [selectedEstimate, setSelectedEstimate] = useState(null);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [gameStatus, setGameStatus] = useState(
    "👋 ¡Bienvenido! Selecciona tu estimación para comenzar"
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedMaster, setSelectedMaster] = useState(null);
  const [showMasterSelector, setShowMasterSelector] = useState(true);

  // Lista de Scrum Masters disponibles con sus imágenes
  const scrumMasters = [
    {
      id: 'jose',
      name: 'José',
      avatar: ImgJose,
      color: '#4A90E2',
      images: {
        "0": JoseImg0,
        "½": JoseImg12,
        "1": JoseImg1,
        "2": JoseImg2,
        "3": JoseImg3,
        "5": JoseImg5,
        "8": JoseImg8,
        "13": JoseImg13,
        "∞": JoseImgInf,
        "?": JoseImgQ,
        "☕": JoseImgCafe,
      }
    },
    {
      id: 'mynor',
      name: 'Mynor',
      avatar: ImgMynor,
      color: '#E94B3C',
      images: {
        "0": MynorImg0,
        "½": MynorImg12,
        "1": MynorImg1,
        "2": MynorImg2,
        "3": MynorImg3,
        "5": MynorImg5,
        "8": MynorImg8,
        "13": MynorImg13,
        "∞": MynorImgInf,
        "?": MynorImgQ,
        "☕": MynorImgCafe,
      }
    },
  ];

  // Generar valores de estimación según el master seleccionado
  const getEstimateValues = () => {
    if (!selectedMaster) {
      return [
        { value: "0",  type: "fibonacci", image: JoseImg0 },
        { value: "½",  type: "fibonacci", image: JoseImg12 },
        { value: "1",  type: "fibonacci", image: JoseImg1 },
        { value: "2",  type: "fibonacci", image: JoseImg2 },
        { value: "3",  type: "fibonacci", image: JoseImg3 },
        { value: "5",  type: "fibonacci", image: JoseImg5 },
        { value: "8",  type: "fibonacci", image: JoseImg8 },
        { value: "13", type: "fibonacci", image: JoseImg13 },
        { value: "∞",  type: "special",   image: JoseImgInf },
        { value: "?",  type: "question",  image: JoseImgQ },
        { value: "☕", type: "special",    image: JoseImgCafe },
      ];
    }

    return [
      { value: "0",  type: "fibonacci", image: selectedMaster.images["0"] },
      { value: "½",  type: "fibonacci", image: selectedMaster.images["½"] },
      { value: "1",  type: "fibonacci", image: selectedMaster.images["1"] },
      { value: "2",  type: "fibonacci", image: selectedMaster.images["2"] },
      { value: "3",  type: "fibonacci", image: selectedMaster.images["3"] },
      { value: "5",  type: "fibonacci", image: selectedMaster.images["5"] },
      { value: "8",  type: "fibonacci", image: selectedMaster.images["8"] },
      { value: "13", type: "fibonacci", image: selectedMaster.images["13"] },
      { value: "∞",  type: "special",   image: selectedMaster.images["∞"] },
      { value: "?",  type: "question",  image: selectedMaster.images["?"] },
      { value: "☕", type: "special",    image: selectedMaster.images["☕"] },
    ];
  };

  const estimateValues = getEstimateValues();

  const selectMaster = (master) => {
    setSelectedMaster(master);
    setShowMasterSelector(false);
    setGameStatus(`👋 ¡Bienvenido ${master.name}! Selecciona tu estimación para comenzar`);
  };

  const changeMaster = () => {
    setShowMasterSelector(true);
    resetCard();
  };


  const selectValue = (value, type, image) => {
    setSelectedEstimate({ value, type, image });

    setGameStatus(
      `Estimación seleccionada - Haz clic en la carta para revelar`
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
      {/* Modal de selección de Scrum Master */}
      {showMasterSelector && (
        <div className="master-selector-overlay">
          <div className="master-selector-modal">
            <h2 className="master-selector-title">🎯 Selecciona tu Avatar</h2>
            <p className="master-selector-subtitle">Elige quién serás en esta sesión de Planning Poker</p>
            <div className="master-grid">
              {scrumMasters.map((master) => (
                <div
                  key={master.id}
                  className="master-card"
                  onClick={() => selectMaster(master)}
                  style={{ borderColor: master.color }}
                >
                  <div className="master-avatar">
                    <img src={master.avatar} alt={master.name} />
                  </div>
                  <h3 className="master-name">{master.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="poker-content">
        {/* Header */}
        <div className="poker-header">
          <h1 className="poker-title">{`🃏 Poker José  ${__APP_VERSION__}`}</h1>
          <p className="poker-subtitle">
            {selectedMaster ? `Jugando como: ${selectedMaster.name}` : 'Selecciona tu estimación y voltea tu carta'}
          </p>
          {selectedMaster && (
            <button className="change-master-btn" onClick={changeMaster}>
              🔄 Cambiar Avatar
            </button>
          )}
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
                  <span>
                    <img 
                      src={selectedMaster?.avatar || ImgJose} 
                      alt={selectedMaster?.name || 'Avatar'} 
                    />
                  </span>
                </div>
                <div className="jose-name">Poker</div>
                <div className="gpt-text">{selectedMaster?.name || 'José'}</div>
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
