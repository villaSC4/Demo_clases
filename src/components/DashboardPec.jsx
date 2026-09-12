import React, { useState } from 'react';
import { MODULES_DATA } from '../data/modulesData';
import { ZOOM_SESSIONS_DATA } from '../data/zoomSessionsData';
import ModuleModal from './ModuleModal';
import CertificateGenerator from './CertificateGenerator';

export default function DashboardPec({ user, onLogout, onNavigateLanding }) {
  const [activeTab, setActiveTab] = useState('cursos');
  const [activeModalModule, setActiveModalModule] = useState(null);
  const [completedModules, setCompletedModules] = useState(user.completedModules || [1, 2]);
  
  // Evidencias del portafolio
  const [portfolioEvidence, setPortfolioEvidence] = useState([
    { id: 1, title: "1. Ficha de Diagnóstico y Acogida Integral", status: "Entregado", score: "4.5 / 5 pts", feedback: "Excelente caracterización de los niños del Nanay." },
    { id: 2, title: "2. Planificación Didáctica con Identidad Amazónica", status: "Entregado", score: "4.5 / 5 pts", feedback: "Muy buena integración de las semillas locales." },
    { id: 3, title: "3. Fotoreportaje de Sectores de Juego Libre", status: user.portfolioSubmitted ? "Entregado" : "Pendiente", score: user.portfolioSubmitted ? "4.5 / 5 pts" : "Sin calificar", feedback: user.portfolioSubmitted ? "Sectores amplios y seguros." : "Falta subir registro fotográfico." },
    { id: 4, title: "4. Acta de Encuentro Familiar y Nutrición", status: user.portfolioSubmitted ? "Entregado" : "Pendiente", score: user.portfolioSubmitted ? "4.5 / 5 pts" : "Sin calificar", feedback: user.portfolioSubmitted ? "Gran participación de las madres." : "Pendiente de adjuntar acta comunal." }
  ]);

  const [pecName, setPecName] = useState(user.name);
  const [pecDni, setPecDni] = useState(user.dni);
  const [selectedUgel, setSelectedUgel] = useState(user.ugel || "UGEL Maynas (Iquitos)");

  const progressPercent = Math.round((completedModules.length / MODULES_DATA.length) * 100);

  const handleComplete = (modId) => {
    if (!completedModules.includes(modId)) {
      setCompletedModules(prev => [...prev, modId]);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100/60 flex flex-col">
      
      {/* Barra de Navegación Superior del Aula Virtual */}
      <nav className="sticky top-0 z-40 bg-white border-b border-stone-200 px-4 sm:px-8 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateLanding}
              className="p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              title="Volver al Portal Público"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>

            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-700 to-red-900 border border-amber-400/40 p-1 flex items-center justify-center shadow-sm">
                <img
                  src="/logowarmi.png"
                  alt="Logo WarmiClass"
                  className="w-full h-full object-contain filter drop-shadow"
                />
              </div>
              <div className="leading-tight">
                <span className="font-black text-stone-900 text-sm sm:text-base font-['Poppins']">
                  WarmiClass <span className="text-red-700">PRONOEI</span>
                </span>
                <span className="block text-[10px] font-bold text-emerald-700">
                  Aula Virtual de la Promotora (PEC)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-stone-900">{user.name}</span>
              <span className="text-[10px] text-stone-500">{user.ugel}</span>
            </div>

            <img
              src={user.avatar}
              alt={user.name}
              className="w-9 h-9 rounded-full object-cover border-2 border-emerald-500"
            />

            <button
              onClick={onLogout}
              className="p-2 rounded-xl bg-stone-100 hover:bg-red-50 text-stone-600 hover:text-red-700 transition-colors text-xs font-bold flex items-center gap-1.5"
              title="Cerrar Sesión"
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <span className="hidden md:inline">Salir</span>
            </button>
          </div>

        </div>
      </nav>

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 sm:py-8 space-y-6 flex-1">
        
        {/* Tarjeta de Bienvenida y Progreso */}
        <div className="bg-gradient-to-r from-red-950 via-brand-darkRed to-red-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="px-3 py-1 rounded-full bg-amber-400 text-stone-900 text-[10px] font-black uppercase tracking-wider">
              Promotora Activa • Loreto 2026
            </span>
            
            <h1 className="text-2xl sm:text-3xl font-black font-['Poppins'] leading-tight">
              ¡Bienvenida, {user.name.split(' ')[0]}!
            </h1>
            
            <p className="text-stone-200 text-xs sm:text-sm leading-relaxed">
              Jurisdicción: <strong>{user.ugel}</strong> | Comunidad: <strong>{user.comunidad || "Nanay"}</strong> | Coordinadora: <strong>{user.coordinator || "Lic. Ruth Elena Silvano"}</strong>
            </p>

            {/* Barra de progreso global */}
            <div className="pt-2 space-y-1.5 max-w-md">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-amber-200">Avance de Módulos Formativos:</span>
                <span className="text-amber-400">{completedModules.length} de {MODULES_DATA.length} ({progressPercent}%)</span>
              </div>
              <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/20">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Pestañas del Dashboard */}
        <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'cursos', label: 'Mis Cursos (6 Módulos)', icon: 'fa-book-open' },
            { id: 'portafolio', label: 'Mi Portafolio Comunitario', icon: 'fa-folder-open' },
            { id: 'zoom', label: 'Conferencias Zoom', icon: 'fa-video' },
            { id: 'certificado', label: 'Mi Certificado UCV', icon: 'fa-certificate' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-red-700 shadow-sm border border-stone-200'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
              }`}
            >
              <i className={`fa-solid ${tab.icon} ${activeTab === tab.id ? 'text-red-700' : 'text-stone-400'}`}></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ================= PESTAÑA: MIS CURSOS ================= */}
        {activeTab === 'cursos' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-stone-900 font-['Poppins']">
                  Plan Formativo: 120 Horas Lectivas (5.0 Créditos)
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Haz clic en cualquier módulo para ver la videoclase oficial de MINEDU, descargar guías y rendir el Boleto de Salida.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MODULES_DATA.map(m => {
                const isCompleted = completedModules.includes(m.id);

                return (
                  <div
                    key={m.id}
                    className="bg-white rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
                  >
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-black uppercase">
                          {m.number}
                        </span>
                        {isCompleted ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                            <i className="fa-solid fa-circle-check"></i> Aprobado
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center gap-1">
                            <i className="fa-regular fa-clock"></i> Pendiente
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-stone-900 font-['Poppins'] leading-snug">
                        {m.title}
                      </h3>

                      <p className="text-stone-600 text-xs line-clamp-3 leading-relaxed">
                        {m.summary}
                      </p>
                    </div>

                    <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-[11px] text-stone-500 font-medium">
                        <i className="fa-regular fa-clock mr-1 text-amber-600"></i> 20 Horas
                      </span>

                      <button
                        onClick={() => setActiveModalModule(m)}
                        className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                          isCompleted
                            ? 'bg-stone-200 hover:bg-stone-300 text-stone-700'
                            : 'bg-red-700 hover:bg-red-800 text-white shadow-sm'
                        }`}
                      >
                        {isCompleted ? 'Repasar Módulo' : 'Estudiar Módulo'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= PESTAÑA: MI PORTAFOLIO ================= */}
        {activeTab === 'portafolio' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase">
                  Producto Acreditable UCV
                </span>
                <h2 className="text-xl font-bold text-stone-900 font-['Poppins'] mt-1">
                  Portafolio Pedagógico Comunitario
                </h2>
                <p className="text-xs text-stone-500">
                  Supervisado por: <strong>{user.coordinator || "Lic. Ruth Elena Silvano"}</strong> (Profesora Coordinadora)
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-stone-500 font-semibold block">Nota Final de Rúbrica:</span>
                <span className="text-2xl font-black text-emerald-700 font-['Poppins']">
                  {user.portfolioScore || 18} <span className="text-sm text-stone-400 font-normal">/ 20 pts</span>
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {portfolioEvidence.map(item => (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 rounded-2xl border border-stone-200 bg-stone-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-stone-900">{item.title}</h4>
                    <p className="text-xs text-stone-600">
                      <strong>Retroalimentación de la PC:</strong> {item.feedback}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="px-3 py-1 rounded-xl bg-white border border-stone-200 text-xs font-bold text-emerald-800">
                      {item.score}
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
              <i className="fa-solid fa-circle-check text-amber-600 text-base mt-0.5"></i>
              <div>
                <strong>Portafolio Aprobado Satisfactoriamente:</strong> Cumples con todos los criterios de la Rúbrica Institucional. Tu certificado oficial de 120 horas se encuentra habilitado para descarga.
              </div>
            </div>
          </div>
        )}

        {/* ================= PESTAÑA: SESIONES ZOOM ================= */}
        {activeTab === 'zoom' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-stone-900 font-['Poppins']">
              Conferencias Magistrales en Vivo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ZOOM_SESSIONS_DATA.map((s, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-xl">
                      {s.session}
                    </span>
                    <span className="text-xs text-stone-400">{s.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900 leading-snug">{s.title}</h3>
                  <p className="text-xs text-stone-500">Expositor: {s.speaker}</p>
                  <a
                    href={s.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
                  >
                    <i className="fa-solid fa-video"></i>
                    <span>Ingresar a la Sala</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= PESTAÑA: CERTIFICADO ================= */}
        {activeTab === 'certificado' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
                Acreditación Universitaria
              </span>
              <h2 className="text-2xl font-black text-stone-900 font-['Poppins'] mt-2">
                Tu Diploma Oficial (120 Horas / 5.0 Créditos)
              </h2>
              <p className="text-stone-500 text-xs sm:text-sm mt-1">
                Otorgado por la Universidad César Vallejo y la Dirección Regional de Educación de Loreto conforme a la Ley Universitaria 30220.
              </p>
            </div>

            <CertificateGenerator
              pecName={pecName}
              setPecName={setPecName}
              pecDni={pecDni}
              setPecDni={setPecDni}
              selectedUgel={selectedUgel}
              setSelectedUgel={setSelectedUgel}
            />
          </div>
        )}

      </div>

      {/* Modal de Módulo */}
      {activeModalModule && (
        <ModuleModal
          module={activeModalModule}
          onClose={() => setActiveModalModule(null)}
          onComplete={handleComplete}
        />
      )}

    </div>
  );
}
