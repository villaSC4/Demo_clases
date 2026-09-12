import React from 'react';

export default function ObjectiveSection() {
  const pillars = [
    {
      icon: "fa-graduation-cap",
      badge: "Formación Universitaria Gratuita",
      title: "120 Horas y 5.0 Créditos Oficiales",
      desc: "Garantizar que las 1,200 Promotoras Educativas Comunitarias (PEC) y 80 Profesoras Coordinadoras (PC) de Loreto accedan a formación universitaria de calidad sin costo alguno, acreditada bajo el Art. 39 de la Ley Universitaria 30220."
    },
    {
      icon: "fa-leaf",
      badge: "Enfoque Territorial y Cultural",
      title: "Didáctica con Identidad Amazónica",
      desc: "Implementar la RVM N.° 081-2025-MINEDU respetando la cosmovisión ribereña e indígena, promoviendo el juego libre con recursos naturales de la selva (semillas, chambira, madera) y la valoración de las lenguas originarias (EIB)."
    },
    {
      icon: "fa-shield-heart",
      badge: "Protección y Bienestar Integral",
      title: "Protocolos contra la Violencia Infantil",
      desc: "Dotar a cada promotora de herramientas concretas para aplicar la RVM N.° 127-2026-MINEDU (julio 2026), convirtiendo cada PRONOEI en un espacio seguro de apego, nutrición saludable, agua segura y prevención de la anemia."
    }
  ];

  return (
    <section id="objetivo" className="py-16 lg:py-24 bg-gradient-to-b from-[#fffdfa] to-amber-50/40 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado de la sección con Scroll Reveal */}
        <div className="text-center max-w-3xl mx-auto mb-14 reveal">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider mb-3">
            <i className="fa-solid fa-compass text-red-600"></i> Propósito Institucional
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 font-['Poppins']">
            ¿Por qué existe este Campus Virtual?
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
            Revalorar, profesionalizar y certificar la vocación de las mujeres que educan y cuidan a la primera infancia en los rincones más alejados de la Amazonía peruana.
          </p>
        </div>

        {/* Bloque central: El Problema y la Misión */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14">
          
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/90 shadow-sm space-y-4 reveal-left">
            <div className="flex items-center gap-3 text-red-700 font-bold text-xs uppercase tracking-wide">
              <span className="w-8 h-0.5 bg-red-700"></span>
              <span>La Realidad de los PRONOEI en Loreto</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 font-['Poppins'] leading-snug">
              Una plataforma creada para quienes sostienen la educación inicial donde no hay escuelas formales
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              En el Perú, más de <strong>148,000 niñas y niños de 0 a 5 años</strong> dependen de los Programas No Escolarizados de Educación Inicial (PRONOEI). En la Región Loreto, cientos de comunidades ribereñas y pueblos originarios no cuentan con colegios iniciales formales del Estado; allí, la labor recae en las <strong>Promotoras Educativas Comunitarias (PEC)</strong>: madres y lideresas elegidas por su propia comunidad que dedican su vida al cuidado sensible infantil a cambio de una propina voluntaria.
            </p>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              El objetivo de <strong>WarmiClass PRONOEI 2026</strong> es saldar esa deuda histórica: brindarles un entorno digital y presencial adaptado a la geografía de la selva, con guías descargables, sesiones Zoom, rúbricas de portafolio y un <strong>título oficial con valor universitario</strong> emitido por la <strong>Universidad César Vallejo</strong> en convenio con la <strong>DRE Loreto</strong>.
            </p>

            <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center gap-4 text-xs font-semibold text-stone-700">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <i className="fa-solid fa-circle-check"></i> 100% Gratuito
              </span>
              <span className="flex items-center gap-1.5 text-blue-700">
                <i className="fa-solid fa-wifi"></i> Accesible con o sin internet continuo
              </span>
              <span className="flex items-center gap-1.5 text-amber-800">
                <i className="fa-solid fa-certificate"></i> Valor oficial de ley
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-red-900 to-brand-darkRed text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-5 relative overflow-hidden reveal-right">
            <div className="absolute -right-10 -bottom-10 opacity-10 text-white text-9xl pointer-events-none">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            
            <span className="px-3 py-1 rounded-full bg-amber-400 text-stone-900 text-xs font-bold uppercase tracking-wider">
              Compromiso 2026
            </span>

            <h4 className="text-lg sm:text-xl font-bold font-['Poppins'] leading-snug text-white">
              "No son simples cuidadoras: son mediadoras de vida, apego y cultura"
            </h4>

            <p className="text-stone-200 text-xs sm:text-sm leading-relaxed">
              La plataforma WarmiClass acompaña el tránsito hacia la implementación plena de la <strong>RVM N.° 081-2025-MINEDU</strong> y los protocolos de protección infantil de la <strong>RVM N.° 127-2026-MINEDU</strong>, articulando a la promotora con su Profesora Coordinadora (PC) y las 5 sedes UGEL de Loreto.
            </p>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm">
              <div className="text-2xl font-black text-amber-400 font-['Poppins']">
                5 Sedes UGEL
              </div>
              <div className="text-xs text-stone-300 mt-1">
                Maynas (Iquitos), Loreto-Nauta, Requena, Alto Amazonas (Yurimaguas) y Ucayali (Contamana).
              </div>
            </div>
          </div>

        </div>

        {/* Los 3 Pilares con Micro-animaciones Dinámicas y Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl bg-white border border-stone-200 hover:border-red-400 shadow-xs hover-lift transition-all duration-300 flex flex-col justify-between group cursor-pointer reveal delay-${(idx + 1) * 150}`}
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-700 flex items-center justify-center text-xl mb-4 group-hover:bg-red-700 group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xs">
                  <i className={`fa-solid ${pillar.icon}`}></i>
                </div>
                <span className="text-[11px] font-black text-red-700 uppercase tracking-wider block">
                  {pillar.badge}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-stone-900 font-['Poppins'] mt-1 mb-2 group-hover:text-red-700 transition-colors">
                  {pillar.title}
                </h4>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
