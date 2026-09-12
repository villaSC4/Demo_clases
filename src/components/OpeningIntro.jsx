import React, { useState, useEffect } from 'react';

export default function OpeningIntro({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isOpening, setIsOpening] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // 1. Simulación de carga fluida en 1.3 segundos
    const startTime = Date.now();
    const duration = 1300;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        // Pequeña pausa de celebración y luego se abren las cortinas
        setTimeout(() => {
          handleOpenDoors();
        }, 250);
      }
    }, 25);

    return () => clearInterval(interval);
  }, []);

  const handleOpenDoors = () => {
    if (isOpening || isFinished) return;
    setIsOpening(true);

    // Duración de la apertura de compuertas: 800ms
    setTimeout(() => {
      setIsFinished(true);
      if (onComplete) onComplete();
    }, 850);
  };

  if (isFinished) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden transition-opacity duration-700 select-none ${
        isOpening ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
    >
      
      {/* =========================================================================
          CORTINA IZQUIERDA (Se desliza hacia la izquierda: translateX(-100%))
          Sin líneas divisorias en el medio
          ========================================================================= */}
      <div
        className={`absolute inset-y-0 left-0 w-1/2 bg-gradient-to-br from-stone-950 via-stone-900 to-red-950 transition-transform duration-800 ease-in-out z-20 ${
          isOpening ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        {/* Luz ambiental en la cortina izquierda */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
        {/* Patrón de líneas sutiles */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>

      {/* =========================================================================
          CORTINA DERECHA (Se desliza hacia la derecha: translateX(100%))
          Sin líneas divisorias en el medio
          ========================================================================= */}
      <div
        className={`absolute inset-y-0 right-0 w-1/2 bg-gradient-to-bl from-stone-950 via-stone-900 to-red-950 transition-transform duration-800 ease-in-out z-20 ${
          isOpening ? 'translate-x-full' : 'translate-x-0'
        }`}
      >
        {/* Luz ambiental en la cortina derecha */}
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        {/* Patrón de líneas sutiles */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>

      {/* Botón superior para saltar la intro de inmediato */}
      <button
        onClick={handleOpenDoors}
        className={`absolute top-6 right-6 z-40 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 hover:text-white text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer ${
          isOpening ? 'opacity-0 scale-90' : 'opacity-100'
        }`}
      >
        <span>Ingresar de inmediato</span>
        <i className="fa-solid fa-forward-step text-[10px]"></i>
      </button>

      {/* =========================================================================
          EMBLEMA CENTRAL INSTITUCIONAL Y BARRA DE PROGRESO
          ========================================================================= */}
      <div
        className={`relative z-30 text-center px-4 max-w-lg mx-auto flex flex-col items-center justify-center transition-all duration-500 ease-out ${
          isOpening
            ? 'scale-110 opacity-0 blur-xs'
            : 'scale-100 opacity-100'
        }`}
      >
        
        {/* Logo Oficial WarmiClass PRONOEI */}
        <div className="relative mb-6">
          <div className="absolute -inset-4 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 rounded-3xl blur-xl opacity-60 animate-pulse"></div>
          
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-red-700 via-red-800 to-brand-darkRed border-2 border-amber-400/80 shadow-2xl flex items-center justify-center p-3.5 sm:p-4">
            <img
              src="/logowarmi.png"
              alt="Logo WarmiClass PRONOEI"
              className="w-full h-full object-contain filter drop-shadow animate-pulse-subtle"
            />
          </div>

          <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-amber-400 text-stone-950 font-black text-[10px] uppercase tracking-wider shadow-md">
            2026
          </div>
        </div>

        {/* Título de Marca */}
        <div className="space-y-1.5 mb-5">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-amber-300 text-xs font-bold tracking-wider uppercase mb-1 backdrop-blur-md shadow-md">
            <img
              src="/ucv-virtual-logo.png"
              alt="Logo UCV Virtual"
              className="h-6 w-auto object-contain rounded-md shadow-2xs"
            />
            <span className="text-white font-black">&</span>
            <span>DRE Loreto</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white font-['Poppins'] tracking-tight">
            WarmiClass <span className="text-red-500 underline decoration-amber-400/50">PRONOEI</span>
          </h1>

          <p className="text-stone-300 text-xs sm:text-sm font-medium tracking-wide">
            Campus Virtual de Fortalecimiento Pedagógico Comunitario
          </p>
        </div>

        {/* Barra de Progreso Dinámica */}
        <div className="w-64 sm:w-72 space-y-2 mt-2">
          <div className="flex items-center justify-between text-[11px] font-bold">
            <span className="text-stone-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {progress < 100 ? 'Iniciando aula comunitaria...' : '¡Bienvenida! Abriendo campus...'}
            </span>
            <span className="text-amber-400 font-mono">{progress}%</span>
          </div>

          <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden p-0.5 border border-stone-700/60 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-red-600 via-amber-400 to-amber-500 rounded-full transition-all duration-75 ease-out shadow-lg shadow-amber-400/30"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="text-[10px] text-stone-400 text-center tracking-wider uppercase pt-1">
            120 Horas Lectivas • 5.0 Créditos Oficiales (Ley 30220)
          </div>
        </div>

      </div>

    </div>
  );
}
