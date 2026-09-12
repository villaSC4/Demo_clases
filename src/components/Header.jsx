import React, { useState } from 'react';

export default function Header({
  activePage = 'home',
  onNavigate,
  currentUser,
  onNavigateAuth,
  onNavigateDashboard,
  onLogout
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'proposito', label: 'Propósito' },
    { id: 'modulos', label: 'Módulos', badge: '6' },
    { id: 'galeria', label: 'Galería' },
    { id: 'zoom', label: 'Talleres Zoom' },
    { id: 'portafolio', label: 'Portafolio' },
    { id: 'certificacion', label: 'Certificación' },
  ];

  const handleLinkClick = (pageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* =========================================================================
          1. TOPBAR DE COMUNICADO: ULTRA LIMPIA, DESACOPLADA Y ELEGANTE
          ========================================================================= */}
      <div className="bg-slate-950 text-slate-300 text-[11px] font-medium py-2 px-4 sm:px-6 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-semibold tracking-wide">
              <i className="fa-solid fa-graduation-cap text-xs"></i> UCV Virtual & DRE Loreto
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="hidden sm:inline text-slate-300">
              Programa Oficial de Formación PRONOEI 2026
            </span>
            <span className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">
              RVM 081-2025 & 127-2026-MINEDU
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              120 Horas Lectivas (5.0 Créditos Ley 30220)
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. NAVBAR PRINCIPAL MULTIPÁGINA: NAVEGACIÓN INDEPENDIENTE
          ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between gap-4">

          {/* LOGO DE MARCA: Conduce a la Página de Inicio */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 group shrink-0 text-left focus:outline-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-red-700 to-red-900 text-white flex items-center justify-center p-1.5 shadow-md shadow-red-900/20 group-hover:scale-105 transition-transform">
              <img
                src="/logowarmi.png"
                alt="Logo WarmiClass"
                className="w-full h-full object-contain filter drop-shadow"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-xl tracking-tight text-stone-900 font-['Poppins']">
                  WarmiClass
                </span>
                <span className="font-black text-xl tracking-tight text-red-700 font-['Poppins']">
                  PRONOEI
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold text-amber-900 bg-amber-100/90 border border-amber-300/80 rounded-full uppercase tracking-wider">
                  Loreto
                </span>
              </div>
              <span className="text-[11px] font-medium text-stone-500 tracking-normal">
                Campus Virtual de Formación Comunitaria
              </span>
            </div>
          </button>

          {/* NAVEGACIÓN MULTIPÁGINA EN 1 LÍNEA (WHITESPACE-NOWRAP) */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`px-3 py-2 text-[13px] rounded-xl transition-all duration-150 flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'bg-red-50 text-red-700 font-bold border-b-2 border-red-700 shadow-2xs'
                      : 'text-stone-600 hover:text-red-700 hover:bg-stone-100/80 font-semibold'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold leading-none">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* ACCIONES A LA DERECHA: Expediente y Login/Sesión */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* Botón a la Página de Expediente */}
            <button
              onClick={() => handleLinkClick('expediente')}
              className={`px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activePage === 'expediente'
                  ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                  : 'border-stone-200 hover:border-red-200 bg-stone-50 hover:bg-red-50/50 text-stone-700 hover:text-red-700'
              }`}
            >
              <i className="fa-regular fa-file-word text-blue-600 text-sm"></i>
              <span>Expediente DOCX</span>
            </button>

            {/* Sesión de Usuario */}
            {currentUser ? (
              <div className="flex items-center gap-2 bg-stone-50 p-1.5 rounded-2xl border border-stone-200">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover border border-stone-300"
                />
                
                <div className="flex flex-col text-left pr-1">
                  <span className="text-xs font-bold text-stone-900 truncate max-w-[120px]">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded w-fit ${
                    currentUser.role === 'pec'
                      ? 'bg-emerald-100 text-emerald-800'
                      : currentUser.role === 'pc'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {currentUser.role === 'pec' ? 'PEC' : currentUser.role === 'pc' ? 'Docente PC' : 'Admin'}
                  </span>
                </div>

                <button
                  onClick={() => onNavigateDashboard(currentUser.role)}
                  className={`px-3 py-1.5 rounded-xl text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 ${
                    currentUser.role === 'pec'
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : currentUser.role === 'pc'
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-purple-600 hover:bg-purple-700'
                  }`}
                >
                  <i className="fa-solid fa-table-columns text-xs"></i>
                  <span>Mi Panel</span>
                </button>

                <button
                  onClick={onLogout}
                  className="p-1.5 rounded-xl text-stone-400 hover:text-red-700 hover:bg-red-50 transition-colors"
                  title="Cerrar sesión"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket text-xs"></i>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigateAuth('login')}
                  className="px-3.5 py-2 rounded-xl border border-stone-200 hover:border-red-200 bg-stone-50 hover:bg-red-50/50 text-stone-700 hover:text-red-700 text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap"
                >
                  <i className="fa-solid fa-right-to-bracket text-red-600 text-xs"></i>
                  <span>Ingresar</span>
                </button>

                <button
                  onClick={() => onNavigateAuth('register')}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white text-xs font-bold shadow-sm hover:shadow transition-all flex items-center gap-2 whitespace-nowrap"
                >
                  <i className="fa-solid fa-user-plus text-xs"></i>
                  <span>Registrarse</span>
                </button>
              </div>
            )}
          </div>

          {/* BOTÓN MÓVIL */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-stone-600 hover:text-red-700 hover:bg-stone-100 transition-colors"
            aria-label="Abrir menú"
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
          </button>

        </div>

        {/* MENÚ MÓVIL DESPLEGABLE */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-stone-200 px-6 py-5 shadow-xl animate-slide-down">
            <nav className="flex flex-col gap-2">
              
              {/* Sección Usuario en Móvil */}
              {currentUser ? (
                <div className="p-3 mb-2 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold text-stone-900 text-xs">{currentUser.name}</p>
                      <span className="text-[10px] text-stone-500">{currentUser.roleLabel}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigateDashboard(currentUser.role);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-red-700 text-white font-bold text-xs"
                  >
                    Mi Panel
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 mb-3 pb-3 border-b border-stone-100">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigateAuth('login');
                    }}
                    className="w-full py-2.5 rounded-xl border border-stone-200 text-stone-800 font-bold text-xs text-center"
                  >
                    Iniciar Sesión
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigateAuth('register');
                    }}
                    className="w-full py-2.5 rounded-xl bg-red-700 text-white font-bold text-xs text-center"
                  >
                    Crear Cuenta
                  </button>
                </div>
              )}

              {[
                { id: 'home', label: 'Inicio', icon: 'fa-house' },
                { id: 'proposito', label: 'Propósito y Marco Legal', icon: 'fa-compass' },
                { id: 'modulos', label: 'Módulos Formativos (6)', icon: 'fa-book-bookmark' },
                { id: 'galeria', label: 'Galería Comunitaria', icon: 'fa-camera-retro' },
                { id: 'zoom', label: 'Talleres Zoom en Vivo', icon: 'fa-video' },
                { id: 'portafolio', label: 'Portafolio y Rúbrica /20', icon: 'fa-folder-open' },
                { id: 'certificacion', label: 'Certificación Oficial UCV', icon: 'fa-certificate' },
                { id: 'expediente', label: 'Expediente Técnico (.docx)', icon: 'fa-file-word' },
                { id: 'faq', label: 'Preguntas Frecuentes', icon: 'fa-circle-question' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-3 transition-colors ${
                    activePage === item.id
                      ? 'bg-red-50 text-red-700 font-bold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <i className={`fa-solid ${item.icon} text-red-600 w-5`}></i>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
