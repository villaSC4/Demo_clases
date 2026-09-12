import React from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import ObjectiveSection from '../components/ObjectiveSection';
import GallerySection from '../components/GallerySection';
import { MODULES_DATA } from '../data/modulesData';

export default function HomePage({ onNavigate, onNavigateAuth }) {
  // Lista de páginas especializadas del Campus Virtual
  const specializedPages = [
    {
      id: 'zoom',
      badge: 'Encuentros Sincrónicos',
      title: 'Conferencias Zoom en Vivo',
      desc: 'Cronograma de clases magistrales de los sábados, ponentes de posgrado y enlaces a salas virtuales y grabaciones.',
      icon: 'fa-video',
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: 'portafolio',
      badge: 'Evaluación Auténtica',
      title: 'Portafolio Comunitario & Rúbrica /20',
      desc: 'Guía de las 4 evidencias prácticas de aula y simulador interactivo de calificación sobre 20 puntos para coordinadoras.',
      icon: 'fa-folder-open',
      color: 'from-amber-600 to-amber-800'
    },
    {
      id: 'certificacion',
      badge: '5.0 Créditos UCV',
      title: 'Generador de Certificado Universitario',
      desc: 'Diploma oficial co-firmado en Canvas de 120 horas lectivas, emitido por UCV Virtual y la DRE Loreto con descarga en PNG.',
      icon: 'fa-certificate',
      color: 'from-red-700 to-brand-darkRed'
    },
    {
      id: 'expediente',
      badge: 'Documento Word Oficial',
      title: 'Expediente Técnico y Presupuesto',
      desc: 'Visor estructurado de la propuesta de 12 semanas, presupuesto de S/ 114,800 y descarga directa del archivo .docx.',
      icon: 'fa-file-word',
      color: 'from-blue-700 to-indigo-900'
    },
    {
      id: 'faq',
      badge: 'Soporte y Orientación',
      title: 'Preguntas Frecuentes',
      desc: 'Respuestas claras sobre gratuidad del programa, conectividad en selva, rol de la coordinadora y entrega de diplomas.',
      icon: 'fa-circle-question',
      color: 'from-stone-700 to-stone-900'
    }
  ];

  return (
    <div className="space-y-0 pb-16">
      
      {/* 1. BANNER HERO PRINCIPAL */}
      <Hero
        onNavigate={onNavigate}
        onNavigateAuth={onNavigateAuth}
      />

      {/* 2. BARRA DE MÉTRICAS CLAVE */}
      <Stats />

      {/* 3. SECCIÓN DESTACADA 1: EL PROPÓSITO INSTITUCIONAL Y LA BASE LEGAL */}
      <div className="relative">
        <ObjectiveSection />
        
        {/* Acceso para profundizar en la página completa de propósito */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 p-3 bg-white rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-xs text-stone-600">
              ¿Deseas consultar el análisis detallado de las RVM 081-2025 y 127-2026?
            </span>
            <button
              onClick={() => onNavigate('proposito')}
              className="px-4 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Ver Propósito y Marco Legal Completo</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </button>
          </div>
        </div>
      </div>

      {/* 4. SECCIÓN DESTACADA 2: LA GALERÍA COMUNITARIA DE LOS PRONOEI */}
      <div className="relative">
        <GallerySection />

        {/* Acceso para ver la galería en página dedicada */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 p-3 bg-white rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-xs text-stone-600">
              Fotografías de alta resolución tomadas en comunidades ribereñas de Maynas, Nauta y Requena.
            </span>
            <button
              onClick={() => onNavigate('galeria')}
              className="px-4 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Abrir Galería en Pantalla Completa</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </button>
          </div>
        </div>
      </div>

      {/* 5. SECCIÓN DESTACADA 3: RESUMEN EJECUTIVO DE LOS 6 MÓDULOS FORMATIVOS */}
      <section className="py-16 bg-gradient-to-b from-stone-50 to-[#fffdfa] border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 reveal">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider mb-3">
                <i className="fa-solid fa-book-open text-red-600"></i> Plan Formativo Oficial
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-['Poppins']">
                Los 6 Módulos de Especialización Pedagógica
              </h2>
              <p className="text-stone-600 text-sm mt-2 leading-relaxed">
                120 horas académicas diseñadas con pertinencia amazónica para fortalecer las competencias de las promotoras comunitarias en el marco de la RVM 081-2025-MINEDU.
              </p>
            </div>

            <button
              onClick={() => onNavigate('modulos')}
              className="px-5 py-3 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer self-start md:self-end"
            >
              <span>Ver Plan de Estudios Completo e Iniciar</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </button>
          </div>

          {/* Grilla de los 6 Módulos con Micro-animaciones Dinámicas y Scroll Reveal */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODULES_DATA.map((mod, modIdx) => (
              <div
                key={mod.id}
                onClick={() => onNavigate('modulos')}
                className={`bg-white rounded-3xl border border-stone-200 hover:border-red-400 p-6 shadow-xs hover-lift transition-all duration-300 cursor-pointer flex flex-col justify-between group reveal delay-${((modIdx % 3) + 1) * 150}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-xl bg-red-50 text-red-700 text-xs font-black tracking-wide group-hover:bg-red-700 group-hover:text-white transition-colors">
                      {mod.number}
                    </span>
                    <span className="text-[11px] text-stone-400 font-medium">
                      20 Horas
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 font-['Poppins'] group-hover:text-red-700 transition-colors leading-snug">
                    {mod.title}
                  </h3>

                  <p className="text-stone-600 text-xs mt-2.5 leading-relaxed line-clamp-3">
                    {mod.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-400 font-medium flex items-center gap-1.5">
                    <i className="fa-regular fa-circle-play text-red-600 group-hover:scale-110 transition-transform"></i> Video MINEDU
                  </span>
                  <span className="text-red-700 font-bold group-hover:translate-x-1.5 transition-transform flex items-center gap-1">
                    Explorar <i className="fa-solid fa-chevron-right text-[10px]"></i>
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. SECCIÓN 4: PÁGINAS Y HERRAMIENTAS ESPECIALIZADAS DEL CAMPUS */}
      <section className="py-16 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-bold uppercase tracking-wider mb-2">
              <i className="fa-solid fa-layer-group text-stone-600"></i> Servicios Especializados del Campus
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-['Poppins']">
              Herramientas de Apoyo y Gestión Formativa
            </h2>
            <p className="text-stone-600 text-sm mt-2">
              Accede a las salas de videoconferencia, rúbricas de portafolio sobre 20, descarga de certificados oficiales y documentación técnica.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {specializedPages.map((page, pIdx) => (
              <div
                key={page.id}
                onClick={() => onNavigate(page.id)}
                className={`bg-stone-50/90 hover:bg-white rounded-3xl border border-stone-200 hover:border-red-400 p-5 shadow-xs hover-lift transition-all duration-300 cursor-pointer flex flex-col justify-between group reveal delay-${((pIdx % 5) + 1) * 100}`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${page.color} text-white flex items-center justify-center text-lg shadow-sm mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <i className={`fa-solid ${page.icon}`}></i>
                  </div>

                  <span className="text-[10px] font-black uppercase tracking-wider text-red-700 block mb-1">
                    {page.badge}
                  </span>

                  <h3 className="text-sm font-bold text-stone-900 group-hover:text-red-700 transition-colors leading-snug">
                    {page.title}
                  </h3>

                  <p className="text-stone-500 text-xs mt-2 leading-relaxed">
                    {page.desc}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-stone-200/60 flex items-center text-red-700 text-xs font-bold gap-1 group-hover:gap-2 transition-all">
                  <span>Ingresar</span>
                  <i className="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. BANNER FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="rounded-3xl bg-gradient-to-r from-red-950 via-brand-darkRed to-red-900 text-white p-8 sm:p-12 shadow-xl border border-red-900/50 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden reveal-scale">
          
          <div className="space-y-3 text-center lg:text-left relative z-10 max-w-2xl">
            <span className="px-3 py-1 rounded-full bg-amber-400 text-stone-900 text-xs font-extrabold uppercase tracking-wider inline-block">
              Alianza UCV & DRE Loreto
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-['Poppins'] text-white">
              ¿Lista para comenzar tu formación comunitaria?
            </h3>
            <p className="text-stone-200 text-xs sm:text-sm leading-relaxed">
              Ingresa al Aula Virtual o explora los perfiles demo de Promotora, Docente Coordinadora y Administrador para vivir la experiencia completa.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10 w-full lg:w-auto">
            <button
              onClick={onNavigateAuth}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-stone-900 font-extrabold text-sm shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-right-to-bracket"></i>
              <span>Ingresar al Aula Virtual</span>
            </button>

            <button
              onClick={() => onNavigate('modulos')}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm backdrop-blur-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-graduation-cap text-amber-300"></i>
              <span>Ver Plan de Estudios</span>
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
