import React, { useState } from 'react';
import { INITIAL_USERS, getStoredUsers, saveStoredUsers, saveStoredSession } from '../data/mockUsers';

export default function AuthPage({ onLoginSuccess, onBackToLanding }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  
  // Estados para Login
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Estados para Registro
  const [regName, setRegName] = useState('');
  const [regDni, setRegDni] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regUgel, setRegUgel] = useState('UGEL Maynas (Iquitos)');
  const [regRole, setRegRole] = useState('pec'); // 'pec' | 'pc'
  const [regComunidad, setRegComunidad] = useState('');
  const [regPronoei, setRegPronoei] = useState('');
  const [regError, setRegError] = useState('');

  const ugels = [
    "UGEL Maynas (Iquitos)",
    "UGEL Loreto - Nauta",
    "UGEL Requena",
    "UGEL Alto Amazonas (Yurimaguas)",
    "UGEL Ucayali (Contamana)"
  ];

  // Acceso Demo Rápido con 1 Clic
  const handleQuickLogin = (role) => {
    const users = getStoredUsers();
    let target = users.find(u => u.role === role);
    if (!target) {
      target = INITIAL_USERS.find(u => u.role === role);
    }
    if (target) {
      if (rememberMe) {
        saveStoredSession(target);
      }
      onLoginSuccess(target);
    }
  };

  // Manejo de Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');

    if (!loginIdentifier.trim()) {
      setLoginError('Por favor ingresa tu número de D.N.I. o correo institucional.');
      return;
    }

    const users = getStoredUsers();
    const found = users.find(
      u => u.dni === loginIdentifier.trim() || u.email.toLowerCase() === loginIdentifier.trim().toLowerCase()
    );

    if (found) {
      if (rememberMe) {
        saveStoredSession(found);
      }
      onLoginSuccess(found);
    } else {
      setLoginError('No encontramos una cuenta registrada con ese D.N.I. o correo. Puedes usar los accesos demo arriba o registrarte.');
    }
  };

  // Manejo de Registro
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegError('');

    if (!regName.trim() || !regDni.trim() || !regEmail.trim() || !regPassword.trim()) {
      setRegError('Por favor completa todos los campos marcados como obligatorios.');
      return;
    }

    if (regDni.trim().length !== 8 || isNaN(Number(regDni.trim()))) {
      setRegError('El D.N.I. debe constar exactamente de 8 dígitos numéricos.');
      return;
    }

    const users = getStoredUsers();
    if (users.some(u => u.dni === regDni.trim())) {
      setRegError('Ya existe un usuario registrado con este D.N.I. Por favor inicia sesión.');
      return;
    }

    const newUser = {
      id: `user-${regRole}-${Date.now()}`,
      name: regName.trim(),
      dni: regDni.trim(),
      email: regEmail.trim(),
      role: regRole,
      roleLabel: regRole === 'pec' ? 'Promotora PEC' : 'Docente Coordinadora (PC)',
      ugel: regUgel,
      comunidad: regComunidad.trim() || "Comunidad Ribereña",
      pronoieName: regPronoei.trim() || "PRONOEI Comunitario",
      phone: regPhone.trim() || "No registrado",
      completedModules: [1],
      portfolioSubmitted: false,
      portfolioScore: null,
      portfolioStatus: "En curso",
      coordinator: regRole === 'pec' ? "Lic. Ruth Elena Silvano" : null,
      assignedPecsCount: regRole === 'pc' ? 12 : null,
      avatar: regRole === 'pec'
        ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
        : "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    };

    const updatedUsers = [newUser, ...users];
    saveStoredUsers(updatedUsers);
    if (rememberMe) {
      saveStoredSession(newUser);
    }
    onLoginSuccess(newUser);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-950 to-red-950/80 flex items-center justify-center p-3 sm:p-6 lg:p-8 font-['Poppins'] relative overflow-hidden">
      
      {/* Luces de ambiente decorativas en el fondo */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-950/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* CONTENEDOR PRINCIPAL SPLIT-SCREEN FLOTANTE CON ELEVADA ESTÉTICA */}
      <div className="w-full max-w-6xl min-h-[720px] bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-stone-800/20 overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10">
        
        {/* =========================================================================
            COLUMNA IZQUIERDA: HERO VISUAL INMERSIVO (5 COLUMNAS EN DESKTOP)
            ========================================================================= */}
        <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-8 xl:p-10 text-white overflow-hidden bg-stone-950">
          
          {/* Fotografía de fondo con ambientación y gradientes cálidos amazónicos */}
          <img
            src="/gallery_intercultural_storytelling.jpg"
            alt="Educación comunitaria en la Amazonía de Loreto"
            className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-red-950/75"></div>

          {/* 1. Header Institucional Superior */}
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-700 to-red-900 border border-amber-400/40 p-1.5 shadow-lg shadow-red-950/40 flex items-center justify-center">
                <img
                  src="/logowarmi.png"
                  alt="Logo WarmiClass"
                  className="w-full h-full object-contain filter drop-shadow"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-300">
                    Alianza Interinstitucional
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[10px] text-emerald-300 font-bold">
                    2026
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <img
                    src="/ucv-virtual-logo.png"
                    alt="Logo UCV Virtual"
                    className="h-8 w-auto object-contain rounded-md shadow-xs"
                  />
                  <span className="text-white text-xs font-bold">& DRE Loreto</span>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-amber-200 text-xs font-semibold shadow-xs">
              <i className="fa-solid fa-award text-amber-400"></i>
              <span>Programa Formativo Oficial PRONOEI</span>
            </div>
          </div>

          {/* 2. Mensaje Editorial y Testimonio Humanizado */}
          <div className="relative z-10 my-auto py-6 space-y-5">
            <div className="space-y-2">
              <span className="text-amber-400/80 text-3xl font-serif leading-none block">“</span>
              <h2 className="text-xl xl:text-2xl font-black leading-tight text-white drop-shadow-md">
                La labor más noble de nuestra Amazonía comienza con el juego, la afectividad y el amor comunitario.
              </h2>
            </div>

            <p className="text-stone-300 text-xs xl:text-sm leading-relaxed">
              Campus virtual de formación continua para <strong>1,200 Promotoras Educativas Comunitarias (PEC)</strong> y <strong>80 Profesoras Coordinadoras (PC)</strong> de las 5 UGEL de la Región Loreto.
            </p>

            {/* Testimonio Card Glassmorphic */}
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-xl space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                    alt="Rosa Huamán"
                    className="w-8 h-8 rounded-full object-cover border-2 border-amber-400 shadow-sm"
                  />
                  <div>
                    <span className="font-bold text-white text-xs block leading-tight">Rosa Elvira Huamán</span>
                    <span className="text-[10px] text-amber-300">Promotora PEC • Río Nanay</span>
                  </div>
                </div>
                <div className="flex text-amber-400 text-[10px] gap-0.5">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>
              <p className="text-xs text-stone-200 italic leading-snug">
                "En el aula PRONOEI enseñamos jugando con lo nuestro: la chambira, los cantos kukama y la calidez de nuestras madres."
              </p>
            </div>
          </div>

          {/* 3. Indicadores de Acreditación Oficial */}
          <div className="relative z-10 pt-4 border-t border-white/15 space-y-3">
            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div className="p-2.5 rounded-2xl bg-black/40 backdrop-blur-xs border border-white/10">
                <span className="text-lg font-black text-amber-400 block font-['Poppins']">120h</span>
                <span className="text-[10px] text-stone-300 uppercase tracking-wider font-medium">Horas Lectivas</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-black/40 backdrop-blur-xs border border-white/10">
                <span className="text-lg font-black text-amber-400 block font-['Poppins']">5.0</span>
                <span className="text-[10px] text-stone-300 uppercase tracking-wider font-medium">Créditos UCV</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-black/40 backdrop-blur-xs border border-white/10">
                <span className="text-lg font-black text-emerald-400 block font-['Poppins']">100%</span>
                <span className="text-[10px] text-stone-300 uppercase tracking-wider font-medium">Gratuito</span>
              </div>
            </div>

            <div className="text-[10px] text-stone-400 text-center flex items-center justify-center gap-1.5">
              <i className="fa-solid fa-shield-halved text-emerald-400"></i>
              <span>RVM N.° 081-2025-MINEDU • Ley Universitaria 30220</span>
            </div>
          </div>

        </div>

        {/* =========================================================================
            COLUMNA DERECHA: FORMULARIO Y ACCESOS RÁPIDOS (7 COLUMNAS EN DESKTOP)
            ========================================================================= */}
        <div className="lg:col-span-7 bg-[#fffdfa] flex flex-col justify-between p-6 sm:p-8 xl:p-10 overflow-y-auto">
          
          {/* Barra Superior con Navegación y Marca */}
          <div className="flex items-center justify-between pb-5 border-b border-stone-200/80">
            <button
              onClick={onBackToLanding}
              className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 text-xs font-semibold transition-all flex items-center gap-2 group"
            >
              <i className="fa-solid fa-arrow-left text-xs group-hover:-translate-x-0.5 transition-transform"></i>
              <span>Volver al Portal</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <img
                  src="/ucv-virtual-logo.png"
                  alt="Logo UCV Virtual"
                  className="h-7 w-auto object-contain rounded-md shadow-2xs"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-700 to-red-900 border border-amber-400/30 p-1 shadow-sm flex items-center justify-center">
                  <img
                    src="/logowarmi.png"
                    alt="Logo WarmiClass"
                    className="w-full h-full object-contain filter drop-shadow"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-stone-900 text-sm leading-tight">
                    WarmiClass <span className="text-red-700">PRONOEI</span>
                  </span>
                  <span className="text-[10px] text-stone-500 font-medium">
                    Campus Virtual Loreto
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Cuerpo Central */}
          <div className="my-auto py-5 max-w-lg mx-auto w-full space-y-5">
            
            {/* Título de bienvenida */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                {activeTab === 'login' ? 'Bienvenida a tu Aula Virtual' : 'Crear Cuenta Docente o PEC'}
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                {activeTab === 'login'
                  ? 'Selecciona un perfil demo para entrar en 1 clic o ingresa con tu D.N.I.'
                  : 'Completa tus datos para registrar tu usuario y acceder a los módulos de aprendizaje.'}
              </p>
            </div>

            {/* =====================================================================
                ACCESOS RÁPIDOS DEMO ESTILO VIP (3 PERFILES AUTORIZADOS)
                ===================================================================== */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-50/90 via-orange-50/50 to-amber-50/90 border border-amber-200/80 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase text-amber-950 tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  <i className="fa-solid fa-bolt text-amber-600 text-xs"></i>
                  Accesos Demo Rápidos (1 Clic)
                </span>
                <span className="text-[10px] text-amber-800 font-semibold bg-amber-200/60 px-2 py-0.5 rounded-full">
                  Sin contraseñas
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                
                {/* 1. Tarjeta Demo PEC */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin('pec')}
                  className="p-2.5 rounded-xl bg-white hover:bg-emerald-50/80 border border-emerald-200 hover:border-emerald-400 shadow-xs hover:shadow-md transition-all text-left flex items-center sm:flex-col sm:items-start justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2 sm:mb-1.5">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                      alt="Rosa Huamán"
                      className="w-7 h-7 rounded-full object-cover border-2 border-emerald-500 shrink-0"
                    />
                    <div>
                      <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase inline-block">
                        Promotora PEC
                      </span>
                      <span className="font-bold text-stone-900 text-xs block leading-tight group-hover:text-emerald-800 transition-colors">
                        Rosa Huamán
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full text-[10px] text-stone-400 group-hover:text-emerald-700">
                    <span className="hidden sm:inline truncate">UGEL Maynas</span>
                    <span className="font-semibold text-emerald-600 flex items-center gap-1">
                      Entrar <i className="fa-solid fa-arrow-right text-[9px] group-hover:translate-x-1 transition-transform"></i>
                    </span>
                  </div>
                </button>

                {/* 2. Tarjeta Demo Docente PC */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin('pc')}
                  className="p-2.5 rounded-xl bg-white hover:bg-blue-50/80 border border-blue-200 hover:border-blue-400 shadow-xs hover:shadow-md transition-all text-left flex items-center sm:flex-col sm:items-start justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2 sm:mb-1.5">
                    <img
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
                      alt="Lic. Ruth Silvano"
                      className="w-7 h-7 rounded-full object-cover border-2 border-blue-500 shrink-0"
                    />
                    <div>
                      <span className="px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 text-[9px] font-black uppercase inline-block">
                        Docente PC
                      </span>
                      <span className="font-bold text-stone-900 text-xs block leading-tight group-hover:text-blue-800 transition-colors">
                        Lic. Ruth Silvano
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full text-[10px] text-stone-400 group-hover:text-blue-700">
                    <span className="hidden sm:inline truncate">Red Nauta</span>
                    <span className="font-semibold text-blue-600 flex items-center gap-1">
                      Entrar <i className="fa-solid fa-arrow-right text-[9px] group-hover:translate-x-1 transition-transform"></i>
                    </span>
                  </div>
                </button>

                {/* 3. Tarjeta Demo Administrador */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin('admin')}
                  className="p-2.5 rounded-xl bg-white hover:bg-purple-50/80 border border-purple-200 hover:border-purple-400 shadow-xs hover:shadow-md transition-all text-left flex items-center sm:flex-col sm:items-start justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2 sm:mb-1.5">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                      alt="Dr. Carlos Ramírez"
                      className="w-7 h-7 rounded-full object-cover border-2 border-purple-500 shrink-0"
                    />
                    <div>
                      <span className="px-1.5 py-0.2 rounded bg-purple-100 text-purple-800 text-[9px] font-black uppercase inline-block">
                        Administrador
                      </span>
                      <span className="font-bold text-stone-900 text-xs block leading-tight group-hover:text-purple-800 transition-colors">
                        Dr. C. Ramírez
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full text-[10px] text-stone-400 group-hover:text-purple-700">
                    <span className="hidden sm:inline truncate">UCV / DREL</span>
                    <span className="font-semibold text-purple-600 flex items-center gap-1">
                      Entrar <i className="fa-solid fa-arrow-right text-[9px] group-hover:translate-x-1 transition-transform"></i>
                    </span>
                  </div>
                </button>

              </div>
            </div>

            {/* Separador elegante */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-stone-200 w-full"></div>
              <span className="bg-[#fffdfa] px-3 text-[11px] font-bold text-stone-400 uppercase tracking-wider relative">
                O ingresa con tus credenciales
              </span>
            </div>

            {/* Selector de Pestañas: Iniciar Sesión / Registro */}
            <div className="flex p-1 bg-stone-100/90 rounded-2xl border border-stone-200">
              <button
                type="button"
                onClick={() => { setActiveTab('login'); setLoginError(''); }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'login'
                    ? 'bg-white text-red-700 shadow-sm'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                <i className="fa-solid fa-right-to-bracket text-xs"></i>
                <span>Iniciar Sesión</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('register'); setRegError(''); }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'register'
                    ? 'bg-white text-red-700 shadow-sm'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                <i className="fa-solid fa-user-plus text-xs"></i>
                <span>Crear Cuenta Docente/PEC</span>
              </button>
            </div>

            {/* =============================================================
                FORMULARIO DE INICIO DE SESIÓN
                ============================================================= */}
            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4 animate-fade-in">
                
                {loginError && (
                  <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2.5 animate-slide-down">
                    <i className="fa-solid fa-circle-exclamation text-base shrink-0 text-red-600"></i>
                    <span>{loginError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    D.N.I. o Correo Institucional
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400 pointer-events-none">
                      <i className="fa-solid fa-id-card text-sm"></i>
                    </span>
                    <input
                      type="text"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="Ej. 47891234 o tu correo institucional"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 text-stone-900 text-sm focus:border-red-600 focus:ring-4 focus:ring-red-600/15 bg-white transition-all outline-hidden placeholder:text-stone-400"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                      Contraseña
                    </label>
                    <span className="text-[11px] text-stone-400 italic">
                      (Cualquiera en modo demo)
                    </span>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400 pointer-events-none">
                      <i className="fa-solid fa-lock text-sm"></i>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 rounded-xl border border-stone-300 text-stone-900 text-sm focus:border-red-600 focus:ring-4 focus:ring-red-600/15 bg-white transition-all outline-hidden placeholder:text-stone-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-700 cursor-pointer"
                      title={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                    >
                      <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-xs`}></i>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-stone-600 select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-red-700 focus:ring-red-600 border-stone-300 cursor-pointer"
                    />
                    <span>Recordar mi sesión en este equipo</span>
                  </label>
                  <a href="#faq" className="font-semibold text-red-700 hover:underline">
                    ¿Necesitas soporte?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold text-sm shadow-md shadow-red-900/20 hover:shadow-xl hover:shadow-red-900/30 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2.5 mt-2 cursor-pointer"
                >
                  <i className="fa-solid fa-arrow-right-to-bracket"></i>
                  <span>Ingresar al Aula Virtual</span>
                </button>

                <p className="text-center text-xs text-stone-500 pt-2">
                  ¿Aún no tienes cuenta en el programa?{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('register')}
                    className="text-red-700 font-bold hover:underline cursor-pointer"
                  >
                    Regístrate aquí
                  </button>
                </p>
              </form>
            )}

            {/* =============================================================
                FORMULARIO DE REGISTRO DE USUARIO
                ============================================================= */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-4 animate-fade-in">
                
                {regError && (
                  <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2.5 animate-slide-down">
                    <i className="fa-solid fa-circle-exclamation text-base shrink-0 text-red-600"></i>
                    <span>{regError}</span>
                  </div>
                )}

                {/* Selector Visual de Rol */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Selecciona tu Rol en el Programa PRONOEI *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <label
                      onClick={() => setRegRole('pec')}
                      className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                        regRole === 'pec'
                          ? 'border-emerald-600 bg-emerald-50/70 shadow-xs text-emerald-950'
                          : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="regRole"
                        checked={regRole === 'pec'}
                        onChange={() => setRegRole('pec')}
                        className="text-emerald-700 focus:ring-emerald-600"
                      />
                      <div>
                        <span className="font-bold text-xs block">Promotora (PEC)</span>
                        <span className="text-[10px] text-stone-500 leading-tight block">
                          Atención en aula comunitaria
                        </span>
                      </div>
                    </label>

                    <label
                      onClick={() => setRegRole('pc')}
                      className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                        regRole === 'pc'
                          ? 'border-blue-600 bg-blue-50/70 shadow-xs text-blue-950'
                          : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="regRole"
                        checked={regRole === 'pc'}
                        onChange={() => setRegRole('pc')}
                        className="text-blue-700 focus:ring-blue-600"
                      />
                      <div>
                        <span className="font-bold text-xs block">Docente Coordinadora (PC)</span>
                        <span className="text-[10px] text-stone-500 leading-tight block">
                          Acompañamiento y evaluación
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Nombres y DNI */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-8">
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Nombres y Apellidos *
                    </label>
                    <input
                      type="text"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Ej. Rosa Elvira Huamán Tamani"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:border-red-600 focus:ring-4 focus:ring-red-600/15 outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      D.N.I. (8 dígitos) *
                    </label>
                    <input
                      type="text"
                      value={regDni}
                      onChange={(e) => setRegDni(e.target.value)}
                      placeholder="47891234"
                      maxLength={8}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:border-red-600 focus:ring-4 focus:ring-red-600/15 outline-hidden"
                    />
                  </div>
                </div>

                {/* Correo y Teléfono */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="correo@pronoei.edu.pe"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:border-red-600 focus:ring-4 focus:ring-red-600/15 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Celular / WhatsApp
                    </label>
                    <input
                      type="text"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="965-812-345"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:border-red-600 focus:ring-4 focus:ring-red-600/15 outline-hidden"
                    />
                  </div>
                </div>

                {/* UGEL y Contraseña */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Jurisdicción UGEL (Loreto) *
                    </label>
                    <select
                      value={regUgel}
                      onChange={(e) => setRegUgel(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-xs focus:border-red-600 focus:ring-4 focus:ring-red-600/15 bg-white outline-hidden cursor-pointer"
                    >
                      {ugels.map(u => (
                        <option key={u} value={u}>{u}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Contraseña *
                    </label>
                    <input
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:border-red-600 focus:ring-4 focus:ring-red-600/15 outline-hidden"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
                >
                  <i className="fa-solid fa-user-check"></i>
                  <span>Crear Cuenta e Ingresar</span>
                </button>

                <p className="text-center text-xs text-stone-500 pt-1">
                  ¿Ya tienes una cuenta creada?{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('login')}
                    className="text-red-700 font-bold hover:underline cursor-pointer"
                  >
                    Inicia sesión aquí
                  </button>
                </p>
              </form>
            )}

          </div>

          {/* Pie del Formulario con Sellos de Confianza y Seguridad */}
          <div className="pt-5 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-stone-400 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-lock text-stone-400"></i>
              <span>Plataforma Oficial con certificación UCV & DRE Loreto</span>
            </div>
            <span>RVM N.° 081-2025-MINEDU</span>
          </div>

        </div>

      </div>

    </div>
  );
}
