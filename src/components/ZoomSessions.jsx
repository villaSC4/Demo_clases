import React from 'react';
import { ZOOM_SESSIONS_DATA } from '../data/zoomSessionsData';

export default function ZoomSessions() {
  return (
    <section id="zoom" className="py-16 lg:py-24 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <i className="fa-solid fa-video text-blue-600"></i> Aprendizaje Sincrónico Magistral
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 font-['Poppins']">
            Conferencias Magistrales en Vivo vía Zoom
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
            Espacios interactivos quincenales los sábados por la mañana con especialistas nacionales en primera infancia. Si no puedes conectarte en vivo, accede a las grabaciones en el aula virtual.
          </p>
        </div>

        {/* Grilla de sesiones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ZOOM_SESSIONS_DATA.map((s, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl border border-stone-200 hover:border-blue-400 bg-stone-50/50 hover:bg-white shadow-xs hover-lift transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold">
                    {s.session}
                  </span>
                  {s.status === 'live' ? (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold border border-red-200">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                      </span>
                      <span>Próxima en Vivo</span>
                    </span>
                  ) : (
                    <span className="text-xs text-stone-500 font-semibold bg-stone-100 px-2.5 py-0.5 rounded-full">
                      Programada
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-stone-900 font-['Poppins'] leading-snug mb-2">
                  {s.title}
                </h3>

                <div className="space-y-1.5 text-xs text-stone-600 mb-4">
                  <div className="flex items-center gap-2">
                    <i className="fa-regular fa-calendar text-blue-600 w-4"></i>
                    <span><strong>Fecha:</strong> {s.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-regular fa-clock text-amber-600 w-4"></i>
                    <span><strong>Horario:</strong> {s.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-user-tie text-stone-500 w-4"></i>
                    <span><strong>Expositor(a):</strong> {s.speaker}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-2"
                >
                  <i className="fa-solid fa-video"></i>
                  <span>Unirse a la Sala Zoom</span>
                </a>

                {s.recordingAvailable && (
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                    <i className="fa-solid fa-circle-play text-emerald-600"></i>
                    <span>Grabación en Campus</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
