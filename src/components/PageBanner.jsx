import React from 'react';

export default function PageBanner({
  badge,
  title,
  subtitle,
  breadcrumb,
  onNavigateHome
}) {
  return (
    <div className="bg-gradient-to-r from-red-950 via-brand-darkRed to-red-900 text-white py-10 sm:py-14 border-b border-red-800/40 relative overflow-hidden">
      
      {/* Luces de ambiente flotantes */}
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-400/15 rounded-full blur-3xl animate-float-slow pointer-events-none"></div>
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-red-500/20 rounded-full blur-3xl animate-float pointer-events-none"></div>

      {/* Ícono de fondo decorativo flotante */}
      <div className="absolute right-8 -bottom-10 opacity-10 text-white text-9xl pointer-events-none animate-float-slow select-none">
        <i className="fa-solid fa-graduation-cap"></i>
      </div>

      {/* Textura decorativa suave */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay"
        style={{ backgroundImage: "url('/hero_banner.jpg')" }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 z-10">
        
        {/* Migas de pan (Breadcrumbs) */}
        <div className="flex items-center gap-2 text-xs text-amber-200/90 font-medium">
          <button
            onClick={onNavigateHome}
            className="hover:text-white transition-colors flex items-center gap-1 group cursor-pointer"
          >
            <i className="fa-solid fa-house text-[10px] group-hover:-translate-y-0.5 transition-transform"></i>
            <span>Inicio</span>
          </button>
          <span>/</span>
          <span className="text-white font-semibold">{breadcrumb || title}</span>
        </div>

        {/* Badge y Título */}
        <div className="space-y-2">
          {badge && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 text-[10px] font-black uppercase tracking-wider shadow-sm animate-fade-in">
              <i className="fa-solid fa-award text-xs"></i>
              <span>{badge}</span>
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-['Poppins'] leading-tight drop-shadow-sm animate-slide-up">
            {title}
          </h1>
          {subtitle && (
            <p className="text-stone-200 text-xs sm:text-sm lg:text-base max-w-3xl mt-1.5 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
