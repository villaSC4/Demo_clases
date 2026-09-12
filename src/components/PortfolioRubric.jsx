import React, { useState } from 'react';

export default function PortfolioRubric() {
  const [checklist, setChecklist] = useState({
    ev1: true,
    ev2: true,
    ev3: false,
    ev4: false
  });

  const [rubricScores, setRubricScores] = useState({
    c1: 5,
    c2: 4,
    c3: 4,
    c4: 5
  });

  const toggleCheck = (key) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const setScore = (criterion, val) => {
    setRubricScores(prev => ({ ...prev, [criterion]: Number(val) }));
  };

  const totalScore = rubricScores.c1 + rubricScores.c2 + rubricScores.c3 + rubricScores.c4;

  let verdict = { text: "En Proceso de Mejora", color: "text-amber-600 bg-amber-50 border-amber-200" };
  if (totalScore >= 18) {
    verdict = { text: "Excelente / Sobresaliente (Aprobado con Mención)", color: "text-emerald-700 bg-emerald-50 border-emerald-300" };
  } else if (totalScore >= 14) {
    verdict = { text: "Logrado / Aprobado Oficialmente", color: "text-blue-700 bg-blue-50 border-blue-200" };
  }

  const rubricCriteria = [
    { id: 'c1', label: '1. Pertinencia del Diagnóstico y Acogida Integral', desc: 'Identifica necesidades emocionales y ritmos madurativos respetando el contexto amazónico.' },
    { id: 'c2', label: '2. Planificación Didáctica con Saberes Comunitarios', desc: 'Diseño de experiencias lúdicas incorporando recursos y cultura de la comunidad.' },
    { id: 'c3', label: '3. Organización de Espacios y Materiales Desestructurados', desc: 'Sectores seguros, accesibles y con pertinencia ecológica (semillas, arcilla, chambira).' },
    { id: 'c4', label: '4. Articulación Familiar y Prevención de Violencia', desc: 'Evidencias de encuentros con familias y aplicación de la RVM 127-2026.' }
  ];

  return (
    <section id="portafolio" className="py-16 lg:py-24 bg-stone-50/70 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <i className="fa-solid fa-folder-open text-amber-700"></i> Evaluación Auténtica Comunitaria
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 font-['Poppins']">
            Portafolio Pedagógico y Rúbrica de Evaluación
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
            El Portafolio es el producto integrador mediante el cual la Promotora Educativa Comunitaria (PEC) demuestra sus competencias ante su Profesora Coordinadora (PC) y la UGEL.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Checklist de Evidencias (5 columnas) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg">
                <i className="fa-solid fa-list-check"></i>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  Las 4 Evidencias Obligatorias
                </h3>
                <p className="text-xs text-stone-500">Marca las evidencias que vas completando</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { id: 'ev1', title: 'Evidencia 1: Ficha de Diagnóstico y Acogida', desc: 'Caracterización socioemocional de las niñas y niños del aula.' },
                { id: 'ev2', title: 'Evidencia 2: Planificación Contextualizada', desc: 'Diseño de experiencia de aprendizaje con pertinencia loretana.' },
                { id: 'ev3', title: 'Evidencia 3: Fotoreportaje de Sectores', desc: 'Registro de sectores organizados con insumos locales y seguros.' },
                { id: 'ev4', title: 'Evidencia 4: Acta de Encuentro con Familias', desc: 'Diálogo sobre nutrición, agua segura y pautas de crianza positiva.' },
              ].map(item => (
                <label
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`flex items-start gap-3.5 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    checklist[item.id]
                      ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checklist[item.id]}
                    onChange={() => toggleCheck(item.id)}
                    className="mt-1 h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold leading-tight">{item.title}</h4>
                    <p className="text-xs text-stone-500 mt-0.5 leading-snug">{item.desc}</p>
                  </div>
                </label>
              ))}
            </div>

            <div className="pt-2 text-xs text-stone-500 bg-stone-50 p-3.5 rounded-xl border border-stone-200">
              <i className="fa-solid fa-circle-info text-blue-600 mr-1.5"></i>
              La revisión y retroalimentación se efectúa en los talleres de interaprendizaje presenciales de la UGEL.
            </div>
          </div>

          {/* Calculadora Interactiva de Rúbrica /20 (7 columnas) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  Simulador de Rúbrica Institucional (UCV - DREL)
                </h3>
                <p className="text-xs text-stone-500">Escala de 1 (Inicio) a 5 (Destacado) por criterio</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-stone-400 font-semibold uppercase">Calificación</div>
                  <div className="text-2xl sm:text-3xl font-black text-red-700 font-['Poppins']">
                    {totalScore} <span className="text-sm text-stone-400 font-medium">/ 20</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Veredicto dinámico con animación */}
            <div className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all duration-300 ${verdict.color}`}>
              <i className="fa-solid fa-medal text-base animate-wiggle"></i>
              <span>Veredicto: {verdict.text}</span>
            </div>

            {/* Barra de progreso de puntaje animada */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-stone-500">
                <span>Avance de la Calificación</span>
                <span>{Math.round((totalScore / 20) * 100)}%</span>
              </div>
              <div className="w-full bg-stone-200 h-3 rounded-full overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${
                    totalScore >= 18
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                      : totalScore >= 14
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                      : 'bg-gradient-to-r from-amber-500 to-amber-600'
                  }`}
                  style={{ width: `${(totalScore / 20) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Sliders / Selectores de criterios */}
            <div className="space-y-4">
              {rubricCriteria.map(crit => (
                <div key={crit.id} className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                      {crit.label}
                    </h4>
                    <span className="px-2.5 py-1 rounded-xl bg-white border border-stone-300 text-stone-900 font-bold text-xs shrink-0">
                      {rubricScores[crit.id]} / 5 pts
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {crit.desc}
                  </p>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={rubricScores[crit.id]}
                    onChange={(e) => setScore(crit.id, e.target.value)}
                    className="w-full accent-red-700 h-2 bg-stone-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 font-semibold">
                    <span>1 (Inicio)</span>
                    <span>2 (En proceso)</span>
                    <span>3 (Básico)</span>
                    <span>4 (Logrado)</span>
                    <span>5 (Destacado)</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
