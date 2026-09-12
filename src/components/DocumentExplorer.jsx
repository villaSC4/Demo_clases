import React, { useState } from 'react';
import { DOCUMENT_DATA } from '../data/documentData';

export default function DocumentExplorer() {
  const [activeTab, setActiveTab] = useState('resumen');

  const tabs = [
    { id: 'resumen', label: 'Resumen y Metas', icon: 'fa-file-lines' },
    { id: 'normativa', label: 'Marco Legal & Normas', icon: 'fa-scale-balanced' },
    { id: 'cronograma', label: 'Cronograma 12 Semanas', icon: 'fa-calendar-days' },
    { id: 'presupuesto', label: 'Presupuesto Detallado', icon: 'fa-coins' },
  ];

  return (
    <section id="documento" className="py-16 lg:py-24 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <i className="fa-regular fa-file-word text-blue-600"></i> Expediente Técnico Completo
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 font-['Poppins']">
            Propuesta Formativa Oficial PRONOEI 2026
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
            Documento técnico estructurado conforme a la RVM N.° 081-2025-MINEDU, RVM N.° 127-2026-MINEDU y la Ley Universitaria 30220. Sin marcas de agua ni marcadores pendientes.
          </p>

          <div className="mt-6 flex items-center justify-center">
            <a
              href="/PROGRAMA_FORMATIVO_PRONOEI_2026_VERSION_OFICIAL.docx"
              download
              className="px-6 py-3.5 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 cursor-pointer btn-press"
            >
              <i className="fa-regular fa-file-word text-lg"></i>
              <span>Descargar Expediente Oficial (.docx)</span>
            </a>
          </div>
        </div>

        {/* Pestañas de navegación con Scroll Reveal */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden reveal delay-100">
          
          <div className="flex border-b border-stone-200 overflow-x-auto bg-stone-50/50 p-2 gap-1.5 no-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white text-red-700 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                }`}
              >
                <i className={`fa-solid ${tab.icon} ${activeTab === tab.id ? 'text-red-700' : 'text-stone-400'}`}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Contenido dinámico según pestaña */}
          <div className="p-6 sm:p-8 text-stone-700 text-sm leading-relaxed">
            
            {activeTab === 'resumen' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-stone-900 mb-2 font-['Poppins']">
                    Objetivo General y Alcance Territorial
                  </h3>
                  <p className="text-stone-600">
                    Fortalecer las capacidades pedagógicas, socioemocionales e inclusivas de <strong>1,200 Promotoras Educativas Comunitarias (PEC)</strong> y <strong>80 Profesoras Coordinadoras (PC)</strong> de los PRONOEI públicos de la Región Loreto, promoviendo prácticas de cuidado sensible, apego seguro y aprendizaje contextualizado con pertinencia amazónica.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
                    <span className="text-xs font-bold text-amber-900 uppercase">Población Meta</span>
                    <p className="text-base font-extrabold text-stone-900 mt-1">1,200 PEC + 80 PC</p>
                    <span className="text-xs text-stone-500">5 Sedes UGEL Loreto</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-red-50/60 border border-red-200">
                    <span className="text-xs font-bold text-red-900 uppercase">Carga Académica</span>
                    <p className="text-base font-extrabold text-stone-900 mt-1">120 Horas Lectivas</p>
                    <span className="text-xs text-stone-500">5.0 Créditos Universitarios</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200">
                    <span className="text-xs font-bold text-blue-900 uppercase">Modalidad</span>
                    <p className="text-base font-extrabold text-stone-900 mt-1">Híbrida Flexibilizada</p>
                    <span className="text-xs text-stone-500">Virtual asincrónica + Talleres presenciales</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'normativa' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-stone-900 mb-2 font-['Poppins']">
                  Base Legal y Resoluciones Viceministeriales Vigentes
                </h3>
                <div className="space-y-3">
                  {DOCUMENT_DATA.normative.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
                      <i className="fa-solid fa-check text-emerald-600 mt-1"></i>
                      <span className="text-xs sm:text-sm text-stone-800">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'cronograma' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-stone-900 mb-2 font-['Poppins']">
                  Plan de Trabajo y Cronograma de Ejecución (12 Semanas)
                </h3>
                <div className="space-y-3">
                  {DOCUMENT_DATA.schedule.map((sch, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-stone-50 border border-stone-200 gap-2">
                      <span className="text-xs font-extrabold text-red-700 bg-red-50 px-3 py-1 rounded-xl shrink-0">
                        {sch.semana}
                      </span>
                      <span className="text-xs sm:text-sm text-stone-700 font-medium">
                        {sch.actividad}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'presupuesto' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-stone-900 font-['Poppins']">
                    Presupuesto Institucional Consolidado (Alianza UCV - DREL)
                  </h3>
                  <div className="text-base sm:text-lg font-black text-red-700">
                    Total: {DOCUMENT_DATA.budgetTotal}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-stone-100 text-stone-800 font-bold border-b border-stone-200">
                        <th className="p-3">Rubro de Inversión</th>
                        <th className="p-3 text-right">Monto Estimado</th>
                        <th className="p-3 text-right">%</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                      {DOCUMENT_DATA.budgetItems.map((b, idx) => (
                        <tr key={idx} className="hover:bg-stone-50/50">
                          <td className="p-3 text-stone-800 font-medium">{b.rubro}</td>
                          <td className="p-3 text-right font-bold text-stone-900 whitespace-nowrap">{b.monto}</td>
                          <td className="p-3 text-right text-stone-500 font-semibold">{b.porcentaje}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
