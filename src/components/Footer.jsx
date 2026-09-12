import React from 'react';

export default function Footer({ onNavigate, onReplayIntro }) {
  const handleNav = (pageId) => {
    if (onNavigate) {
      onNavigate(pageId);
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Columna Marca (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-700 text-white flex items-center justify-center p-1.5 shadow-sm">
                <img
                  src="/logowarmi.png"
                  alt="Logo WarmiClass"
                  className="w-full h-full object-contain filter drop-shadow"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl text-white font-['Poppins']">WarmiClass</span>
                <span className="font-black text-xl text-red-600 font-['Poppins']">PRONOEI</span>
              </div>
            </div>

            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
              Plataforma virtual de fortalecimiento pedagógico para Promotoras Educativas Comunitarias (PEC) y Profesoras Coordinadoras de la Región Loreto. Impulsado por la Universidad César Vallejo y la DRE Loreto.
            </p>

            <div className="pt-2 flex items-center gap-3 text-stone-400">
              <a href="#" className="w-8 h-8 rounded-lg bg-stone-900 hover:bg-red-700 hover:text-white flex items-center justify-center transition-colors">
                <i className="fa-brands fa-facebook-f text-xs"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-stone-900 hover:bg-red-700 hover:text-white flex items-center justify-center transition-colors">
                <i className="fa-brands fa-youtube text-xs"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-stone-900 hover:bg-red-700 hover:text-white flex items-center justify-center transition-colors">
                <i className="fa-solid fa-globe text-xs"></i>
              </a>
            </div>
          </div>

          {/* Columna Navegación Rápida (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              Páginas del Campus
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-amber-400 transition-colors text-left">
                  Inicio
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('proposito')} className="hover:text-amber-400 transition-colors text-left">
                  Propósito y Base Legal
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('modulos')} className="hover:text-amber-400 transition-colors text-left">
                  Módulos Formativos (6)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('galeria')} className="hover:text-amber-400 transition-colors text-left">
                  Galería Comunitaria
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('zoom')} className="hover:text-amber-400 transition-colors text-left">
                  Conferencias Zoom en Vivo
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('portafolio')} className="hover:text-amber-400 transition-colors text-left">
                  Portafolio & Rúbrica /20
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('certificacion')} className="hover:text-amber-400 transition-colors text-left">
                  Generador de Certificado
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('expediente')} className="hover:text-amber-400 transition-colors text-left">
                  Expediente Técnico DOCX
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('faq')} className="hover:text-amber-400 transition-colors text-left">
                  Preguntas Frecuentes
                </button>
              </li>
            </ul>
          </div>

          {/* Columna Marco Institucional (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              Marco Normativo
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>RVM 081-2025-MINEDU</li>
              <li>RVM 127-2026-MINEDU</li>
              <li>Ley Universitaria 30220</li>
              <li>DRE Loreto - Convenio</li>
              <li>5 Sedes UGEL Loreto</li>
            </ul>
          </div>

          {/* Columna Protección Infantil (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              Canales de Protección
            </h4>
            <p className="text-stone-400 text-xs leading-relaxed">
              Ante cualquier sospecha o evidencia de vulneración de derechos o violencia contra niñas y niños de PRONOEI:
            </p>
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-red-950/60 border border-red-800/60 text-red-200 text-xs font-bold">
                <i className="fa-solid fa-phone-volume text-amber-400"></i>
                <span>Línea 100 (MIMP) - Gratuita 24/7</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 text-xs">
                <i className="fa-solid fa-shield-halved text-blue-400"></i>
                <span>Portal SíseVe (MINEDU)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright inferior */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400 text-center sm:text-left">
          <p>© 2026 WarmiClass PRONOEI. Universidad César Vallejo & Dirección Regional de Educación de Loreto.</p>
          
          <div className="flex items-center gap-4">
            <p className="text-stone-400 hidden md:inline">
              Diseñado para la revaloración formativa de las PEC.
            </p>
            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-stone-300 hover:text-amber-400 text-xs transition-all cursor-pointer"
                title="Reproducir animación inicial de apertura de compuertas"
              >
                <i className="fa-solid fa-play text-[9px] text-amber-400"></i>
                <span>Ver intro del campus</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
}
