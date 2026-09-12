import React, { useState } from 'react';
import { MODULES_DATA } from '../data/modulesData';
import ModuleModal from './ModuleModal';

export default function ModulesSection({ completedModules, onCompleteModule }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeModalModule, setActiveModalModule] = useState(null);

  const categories = [
    { id: 'all', label: 'Todos los Módulos' },
    { id: 'normativa', label: 'Normativa & Identidad' },
    { id: 'didactica', label: 'Desarrollo & Didáctica' },
    { id: 'comunidad', label: 'Familia & Nutrición' },
    { id: 'inclusion', label: 'Inclusión & EIB' },
    { id: 'proteccion', label: 'Protección Infantil' },
  ];

  const filteredModules = activeCategory === 'all'
    ? MODULES_DATA
    : MODULES_DATA.filter(m => m.category === activeCategory);

  return (
    <section id="modulos" className="py-16 lg:py-24 bg-stone-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado de sección con Scroll Reveal */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider mb-3">
            <i className="fa-solid fa-graduation-cap text-red-600"></i> Plan de Estudios Oficial (120 Horas)
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 font-['Poppins']">
            Módulos Formativos para la PEC
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
            Cada módulo articula fundamentos teóricos (8h), aplicación en aula comunitaria (10h) y elaboración de evidencias del Portafolio Pedagógico (2h).
          </p>
        </div>

        {/* Filtros por categoría con Scroll Reveal */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar reveal delay-75">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-red-700 text-white shadow-md shadow-red-900/20'
                  : 'bg-white border border-stone-200 text-stone-600 hover:border-red-300 hover:text-red-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grilla de módulos con Scroll Reveal y Hover-lift */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module, mIdx) => {
            const isCompleted = completedModules.includes(module.id);

            return (
              <div
                key={module.id}
                className={`bg-white rounded-3xl border border-stone-200/90 hover:border-red-400 shadow-xs hover-lift transition-all duration-300 flex flex-col overflow-hidden group reveal delay-${((mIdx % 3) + 1) * 120}`}
              >
                {/* Cabecera de la tarjeta */}
                <div className="p-5 sm:p-6 bg-gradient-to-br from-stone-50 to-amber-50/30 border-b border-stone-100 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-extrabold uppercase">
                        {module.number}
                      </span>
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                          <i className="fa-solid fa-circle-check text-emerald-600"></i> Completado
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-stone-100 text-stone-500 text-[11px] font-semibold">
                          <i className="fa-regular fa-circle text-stone-400"></i> En curso
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-red-700 transition-colors font-['Poppins'] leading-snug">
                      {module.title}
                    </h3>
                  </div>

                  <div className="text-xs text-stone-500 font-medium mt-4 flex items-center gap-2">
                    <i className="fa-regular fa-clock text-amber-600"></i>
                    <span>{module.hours}</span>
                  </div>
                </div>

                {/* Resumen y acción */}
                <div className="p-5 sm:p-6 bg-white space-y-4 flex flex-col justify-between">
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {module.summary}
                  </p>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-[11px] text-stone-400">
                      <i className="fa-solid fa-list-check text-stone-400"></i>
                      <span>Quiz formativo</span>
                    </div>

                    <button
                      onClick={() => setActiveModalModule(module)}
                      className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-red-700 text-white text-xs font-bold transition-colors flex items-center gap-2"
                    >
                      <span>Abrir Módulo</span>
                      <i className="fa-solid fa-arrow-right text-[10px]"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal interactivo */}
        {activeModalModule && (
          <ModuleModal
            module={activeModalModule}
            onClose={() => setActiveModalModule(null)}
            onComplete={(id) => onCompleteModule(id)}
          />
        )}

      </div>
    </section>
  );
}
