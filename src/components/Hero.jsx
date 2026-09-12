import React from 'react';

export default function Hero({ onNavigate, onNavigateAuth }) {
  const handleScrollToGallery = () => {
    const el = document.getElementById('galeria');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (onNavigate) {
      onNavigate('galeria');
    }
  };

  const handleScrollToObjective = () => {
    const el = document.getElementById('objetivo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (onNavigate) {
      onNavigate('proposito');
    }
  };

  return (
    <section id="hero" className="relative bg-gradient-to-br from-red-950 via-brand-darkRed to-red-900 text-white py-12 sm:py-16 lg:py-24 overflow-hidden">
      
      {/* Esferas de luz ambiental animadas */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl animate-float-slow pointer-events-none"></div>
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-float pointer-events-none"></div>

      {/* Imagen de fondo con overlay suave */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay scale-105 transition-transform duration-1000"
        style={{ backgroundImage: "url('/hero_banner.jpg')" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-red-950 via-transparent to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Contenido textual con animación de entrada */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-200 text-xs font-semibold backdrop-blur-sm animate-fade-in shadow-xs">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <i className="fa-solid fa-seedling text-amber-400 animate-wiggle"></i>
              <span>ESTRATEGIA FORMATIVA DE EDUCACIÓN INICIAL COMUNITARIA 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white font-['Poppins'] animate-slide-up">
              Promotoras que <span className="text-amber-400 underline decoration-amber-400/50 decoration-wavy">Dejan Huella</span>:<br/>
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-100">Jugar, Explorar y Acompañar para Aprender</span>
            </h1>

            <p className="text-stone-200 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Programa de especialización pedagógica, socioemocional e inclusiva para <strong>1,200 Promotoras Educativas Comunitarias (PEC)</strong> y <strong>80 Profesoras Coordinadoras (PC)</strong> de los PRONOEI públicos en la Región Loreto.
            </p>

            {/* Botones de acción directa con micro-interacciones */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                type="button"
                onClick={() => onNavigate ? onNavigate('modulos') : (window.location.hash = 'modulos')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-stone-900 font-extrabold text-sm shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/35 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <i className="fa-solid fa-book-open-reader text-base group-hover:scale-110 transition-transform"></i>
                <span>Ver Módulos Formativos</span>
              </button>

              <button
                type="button"
                onClick={handleScrollToGallery}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 hover:border-amber-400/60 text-white font-bold text-sm backdrop-blur-sm hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <i className="fa-solid fa-camera-retro text-amber-300 text-base group-hover:scale-110 group-hover:rotate-6 transition-transform"></i>
                <span>Ver Galería Comunitaria</span>
              </button>

              <button
                type="button"
                onClick={handleScrollToObjective}
                className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-black/30 hover:bg-black/50 border border-white/15 hover:border-white/30 text-stone-200 hover:text-white font-medium text-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <i className="fa-solid fa-compass text-amber-400"></i>
                <span>Nuestro Propósito</span>
              </button>
            </div>

            {/* Badges descriptivos con micro-hover */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 text-xs text-amber-200/90 border-t border-white/10">
              <div className="flex items-center gap-2 hover:text-white transition-colors">
                <i className="fa-regular fa-calendar-check text-amber-400"></i>
                <span>Septiembre – Noviembre 2026</span>
              </div>
              <div className="flex items-center gap-2 hover:text-white transition-colors">
                <i className="fa-solid fa-map-location-dot text-amber-400"></i>
                <span>Región Loreto (5 UGEL)</span>
              </div>
              <div className="flex items-center gap-2 hover:text-white transition-colors">
                <i className="fa-solid fa-award text-amber-400"></i>
                <span>120 Horas / 5.0 Créditos UCV</span>
              </div>
            </div>
          </div>

          {/* Video oficial MINEDU con marco animado */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-400/30 hover:border-amber-400/60 transition-all duration-500 bg-black/60 group hover:shadow-amber-500/20">
              <div className="aspect-video w-full">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/w2mDHHBguqw?enablejsapi=1"
                  title="Campaña Oficial PRONOEI MINEDU - Promotoras que dejan huella"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4 bg-stone-900/95 text-xs text-stone-300 flex items-center justify-between border-t border-stone-800">
                <div className="flex items-center gap-2">
                  <i className="fa-brands fa-youtube text-red-500 text-base group-hover:scale-110 transition-transform"></i>
                  <span className="font-semibold text-white">Video Oficial: La labor de la PEC en PRONOEI</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-red-600 text-white font-bold text-[10px] animate-pulse">MINEDU TV</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
