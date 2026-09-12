import React, { useState } from 'react';
import { getStoredUsers, saveStoredUsers } from '../data/mockUsers';

export default function DashboardPc({ user, onLogout, onNavigateLanding }) {
  const [pecList, setPecList] = useState(() => {
    const all = getStoredUsers();
    return all.filter(u => u.role === 'pec');
  });

  const [selectedPec, setSelectedPec] = useState(null);
  const [rubricScores, setRubricScores] = useState({ c1: 5, c2: 4, c3: 4, c4: 5 });
  const [feedbackText, setFeedbackText] = useState("Excelente incorporación de los materiales autóctonos del bosque loretano y cálido apego en el diálogo familiar.");
  const [successToast, setSuccessToast] = useState('');

  const totalScore = rubricScores.c1 + rubricScores.c2 + rubricScores.c3 + rubricScores.c4;

  const handleOpenReview = (pec) => {
    setSelectedPec(pec);
    if (pec.portfolioScore) {
      // Si ya tenía nota, aproximar los criterios
      setRubricScores({ c1: 5, c2: 4, c3: 4, c4: pec.portfolioScore >= 18 ? 5 : 4 });
    }
  };

  const handleSaveEvaluation = () => {
    if (!selectedPec) return;

    const updated = pecList.map(p => {
      if (p.id === selectedPec.id) {
        return {
          ...p,
          portfolioScore: totalScore,
          portfolioStatus: totalScore >= 14 ? "Aprobado" : "En Revisión",
          portfolioSubmitted: true
        };
      }
      return p;
    });

    setPecList(updated);

    // Guardar en la base de usuarios global
    const allUsers = getStoredUsers().map(u => {
      if (u.id === selectedPec.id) {
        return {
          ...u,
          portfolioScore: totalScore,
          portfolioStatus: totalScore >= 14 ? "Aprobado" : "En Revisión",
          portfolioSubmitted: true
        };
      }
      return u;
    });
    saveStoredUsers(allUsers);

    setSuccessToast(`¡Portafolio de ${selectedPec.name} calificado con éxito (${totalScore}/20)!`);
    setTimeout(() => setSuccessToast(''), 4000);
    setSelectedPec(null);
  };

  return (
    <div className="min-h-screen bg-stone-100/60 flex flex-col">
      
      {/* Barra de Navegación Superior */}
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
                  WarmiClass <span className="text-blue-700">DOCENTE</span>
                </span>
                <span className="block text-[10px] font-bold text-blue-800">
                  Panel de la Profesora Coordinadora (PC)
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
              className="w-9 h-9 rounded-full object-cover border-2 border-blue-600"
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

      {/* Contenido */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 sm:py-8 space-y-6 flex-1">
        
        {/* Notificación Toast de éxito */}
        {successToast && (
          <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-bold flex items-center gap-2 animate-slide-down">
            <i className="fa-solid fa-circle-check text-emerald-600 text-lg"></i>
            <span>{successToast}</span>
          </div>
        )}

        {/* Tarjeta de Encabezado */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-3">
            <span className="px-3 py-1 rounded-full bg-blue-400 text-stone-950 text-[10px] font-black uppercase tracking-wider">
              Acompañamiento Técnico-Pedagógico • Loreto
            </span>

            <h1 className="text-2xl sm:text-3xl font-black font-['Poppins'] leading-tight">
              Bienvenida, {user.name}
            </h1>

            <p className="text-stone-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Supervisión pedagógica y evaluación de Portafolios según la <strong>RVM 081-2025-MINEDU</strong> y protocolos de protección infantil <strong>RVM 127-2026-MINEDU</strong>.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm">
                <span className="text-[10px] uppercase font-bold text-blue-200">PECs Asignadas</span>
                <p className="text-xl font-black text-amber-400">{pecList.length} Promotoras</p>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm">
                <span className="text-[10px] uppercase font-bold text-blue-200">Portafolios Aprobados</span>
                <p className="text-xl font-black text-emerald-400">
                  {pecList.filter(p => p.portfolioStatus === 'Aprobado').length}
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm">
                <span className="text-[10px] uppercase font-bold text-blue-200">En Revisión</span>
                <p className="text-xl font-black text-amber-300">
                  {pecList.filter(p => p.portfolioStatus === 'En Revisión').length}
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm">
                <span className="text-[10px] uppercase font-bold text-blue-200">Créditos UCV</span>
                <p className="text-xl font-black text-white">5.0 / PEC</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de Promotoras a cargo */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden space-y-4 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-stone-900 font-['Poppins']">
                Red de Promotoras Educativas Comunitarias (PEC)
              </h2>
              <p className="text-xs text-stone-500">
                Monitorea el avance de los 6 módulos y califica el portafolio para la certificación oficial.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-stone-50 text-stone-700 font-bold border-b border-stone-200">
                  <th className="p-3.5">Promotora PEC</th>
                  <th className="p-3.5">Jurisdicción / PRONOEI</th>
                  <th className="p-3.5">Avance Módulos</th>
                  <th className="p-3.5">Estado Portafolio</th>
                  <th className="p-3.5">Calificación /20</th>
                  <th className="p-3.5 text-right">Acción Pedagógica</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {pecList.map(pec => (
                  <tr key={pec.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={pec.avatar}
                          alt={pec.name}
                          className="w-9 h-9 rounded-full object-cover border border-stone-200"
                        />
                        <div>
                          <p className="font-bold text-stone-900 leading-tight">{pec.name}</p>
                          <span className="text-[11px] text-stone-400">D.N.I.: {pec.dni}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <p className="font-semibold text-stone-800">{pec.ugel}</p>
                      <span className="text-[11px] text-stone-500">{pec.comunidad}</span>
                    </td>

                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-800">
                          {pec.completedModules?.length || 1} / 6
                        </span>
                        <div className="w-16 h-2 bg-stone-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-600 rounded-full"
                            style={{ width: `${((pec.completedModules?.length || 1) / 6) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        pec.portfolioStatus === 'Aprobado'
                          ? 'bg-emerald-100 text-emerald-800'
                          : pec.portfolioStatus === 'En Revisión'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-stone-100 text-stone-600'
                      }`}>
                        {pec.portfolioStatus || "En curso"}
                      </span>
                    </td>

                    <td className="p-3.5">
                      {pec.portfolioScore ? (
                        <span className="font-black text-stone-900 text-sm">
                          {pec.portfolioScore} / 20 pts
                        </span>
                      ) : (
                        <span className="text-xs text-stone-400 italic">Sin calificar</span>
                      )}
                    </td>

                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleOpenReview(pec)}
                        className="px-3.5 py-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-sm transition-colors flex items-center gap-1.5 ml-auto"
                      >
                        <i className="fa-solid fa-clipboard-check"></i>
                        <span>Calificar Rúbrica</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Modal de Calificación con Rúbrica sobre 20 */}
      {selectedPec && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 max-w-3xl w-full overflow-hidden max-h-[92vh] flex flex-col">
            
            <div className="p-5 bg-gradient-to-r from-blue-900 to-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-stone-950 text-[10px] font-black uppercase">
                  Rúbrica Institucional UCV - DREL
                </span>
                <h3 className="text-lg font-bold mt-1 font-['Poppins']">
                  Evaluación de Portafolio: {selectedPec.name}
                </h3>
                <p className="text-xs text-stone-300">
                  D.N.I.: {selectedPec.dni} | {selectedPec.ugel}
                </p>
              </div>
              <button
                onClick={() => setSelectedPec(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-sm text-stone-700">
              
              {/* Resumen de Nota */}
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-blue-900 text-sm">Calificación Total de la Rúbrica:</h4>
                  <p className="text-xs text-blue-700">
                    {totalScore >= 14 ? "Apto para Certificado Oficial UCV (120 Horas / 5.0 Créditos)" : "Requiere subsanación"}
                  </p>
                </div>
                <div className="text-3xl font-black text-blue-900 font-['Poppins']">
                  {totalScore} <span className="text-base font-normal text-stone-400">/ 20</span>
                </div>
              </div>

              {/* Los 4 Criterios de la Rúbrica */}
              <div className="space-y-4">
                {[
                  { id: 'c1', title: '1. Diagnóstico y Acogida Integral', desc: 'Caracterización sensible de las necesidades socioemocionales del niño.' },
                  { id: 'c2', title: '2. Planificación Didáctica con Identidad Amazónica', desc: 'Uso de proyectos lúdicos y materiales locales (semillas, arcilla, madera).' },
                  { id: 'c3', title: '3. Organización de Sectores Seguros y Libres', desc: 'Espacios accesibles que promueven la autonomía infantil.' },
                  { id: 'c4', title: '4. Articulación Familiar y Protección (RVM 127-2026)', desc: 'Evidencias de encuentros con familias y rutas de alerta temprana.' },
                ].map(c => (
                  <div key={c.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-stone-900 text-xs sm:text-sm">{c.title}</span>
                      <span className="px-2.5 py-1 rounded-xl bg-white border border-stone-300 font-bold text-xs text-blue-900">
                        {rubricScores[c.id]} / 5 pts
                      </span>
                    </div>
                    <p className="text-xs text-stone-500">{c.desc}</p>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={rubricScores[c.id]}
                      onChange={(e) => setRubricScores({ ...rubricScores, [c.id]: Number(e.target.value) })}
                      className="w-full accent-blue-700"
                    />
                  </div>
                ))}
              </div>

              {/* Retroalimentación cualitativa */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Observaciones y Retroalimentación Pedagógica para la Promotora:
                </label>
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  rows={3}
                  className="w-full p-3 rounded-xl border border-stone-300 text-stone-900 text-xs focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                ></textarea>
              </div>

            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end gap-3">
              <button
                onClick={() => setSelectedPec(null)}
                className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEvaluation}
                className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-md flex items-center gap-2"
              >
                <i className="fa-solid fa-check"></i>
                <span>Aprobar Portafolio y Guardar Nota ({totalScore}/20)</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
