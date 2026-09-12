import React, { useState } from 'react';
import { FAQ_DATA } from '../data/zoomSessionsData';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-white border-t border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-bold uppercase tracking-wider mb-3">
            <i className="fa-solid fa-circle-question text-stone-500"></i> Orientación a la Comunidad
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 font-['Poppins']">
            Preguntas Frecuentes
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Respuestas claras sobre la gratuidad, conectividad en selva, evaluación y entrega de diplomas.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl border border-stone-200 overflow-hidden bg-stone-50/40 hover:border-red-300 transition-all reveal delay-${((idx % 4) + 1) * 75}`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-stone-900 text-sm sm:text-base hover:text-red-700 transition-colors"
                >
                  <span>{item.q}</span>
                  <i className={`fa-solid fa-chevron-down text-xs transition-transform duration-200 ${isOpen ? 'rotate-180 text-red-700' : 'text-stone-400'}`}></i>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 bg-white animate-slide-down">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
