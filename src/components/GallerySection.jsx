import React, { useState, useEffect } from 'react';

export default function GallerySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState('cine'); // 'cine' o 'mosaico'
  const [isPlaying, setIsPlaying] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const galleryItems = [
    {
      id: 1,
      title: "Sectores de Aprendizaje con Insumos Amazónicos",
      subtitle: "Juego libre y exploración sensorial con recursos propios de la selva",
      desc: "Promotora comunitaria facilitando el juego autónomo con semillas nativas, maderas pulidas, arcilla de río y fibras naturales. Conforme al enfoque didáctico de la RVM 081-2025-MINEDU, el espacio educativo no depende de plásticos comerciales, sino de la riqueza bio-cultural de la comunidad.",
      image: "/gallery_sector_juego.jpg",
      location: "Río Nanay • UGEL Maynas (Iquitos)",
      module: "Módulo 3: Planificación & Didáctica Amazónica",
      tag: "Ciclo I y II",
      aspect: "landscape"
    },
    {
      id: 2,
      title: "Narración de Cuentos y Revitalización Lingüística Kukama",
      subtitle: "Educación Intercultural Bilingüe (EIB) en la primera infancia",
      desc: "La PEC promueve la acogida en lengua originaria a través de la tradición oral, canciones ancestrales y libros ilustrados en círculo. La identidad y el apego afectivo se fortalecen cuando la niña y el niño ven reflejada su cultura ribereña en el aula comunitaria.",
      image: "/gallery_intercultural_storytelling.jpg",
      location: "Comunidad Nativa • UGEL Loreto - Nauta",
      module: "Módulo 5: Inclusión & Enfoque EIB",
      tag: "Pertinencia Cultural",
      aspect: "wide"
    },
    {
      id: 3,
      title: "Agua Segura, Higiene y Prácticas Saludables Cotidianas",
      subtitle: "Cuidado de la salud y prevención de enfermedades en el aula",
      desc: "Rutina alegre y compartida de lavado de manos con agua segura tratada y jabón, acompañada de meriendas nutritivas con frutas de temporada (aguaje, plátano, camu camu). La promotora modela hábitos protectores que los niños replican en sus hogares.",
      image: "/gallery_agua_salud_manos.jpg",
      location: "Río Marañón • UGEL Requena",
      module: "Módulo 4: Familia & Salud Comunitaria",
      tag: "Salud & Nutrición",
      aspect: "wide"
    },
    {
      id: 4,
      title: "Encuentros Familiares y Lucha contra la Anemia",
      subtitle: "Alianzas horizontales con madres y padres de la comunidad",
      desc: "Talleres participativos donde se dialoga sobre la importancia del pescado fresco de río (paiche, boquichico) rico en hierro, pautas de crianza positiva y apego seguro, consolidando al PRONOEI como un núcleo protector comunitario.",
      image: "/gallery_encuentro_familiar.jpg",
      location: "San Joaquín de Omaguas • UGEL Loreto - Nauta",
      module: "Módulo 4: Articulación Comunitaria",
      tag: "Familia & Crianza",
      aspect: "landscape"
    },
    {
      id: 5,
      title: "Acompañamiento Sensible, Apego y Movimiento Libre",
      subtitle: "El valor del cuidado cotidiano en los primeros años de vida",
      desc: "La promotora observa con mirada atenta y afectuosa el despliegue motor autónomo de cada bebé. Siguiendo el enfoque de Emmi Pikler adoptado por el MINEDU, no se fuerza al niño a posturas que no ha conquistado por sí mismo.",
      image: "/hero_banner.jpg",
      location: "PRONOEI Ribereño • UGEL Ucayali (Contamana)",
      module: "Módulo 2: Desarrollo Integral Infantil",
      tag: "Apego Seguro",
      aspect: "wide"
    },
    {
      id: 6,
      title: "Círculos de Interaprendizaje y Certificación Universitaria UCV",
      subtitle: "Validación del Portafolio y Acreditación Oficial de 120 Horas",
      desc: "Espacios presenciales descentralizados donde las 1,200 promotoras se reúnen con sus 80 Profesoras Coordinadoras para sustentar las 4 evidencias de su portafolio, recibiendo la retroalimentación técnica y su certificación con valor oficial de ley.",
      image: "/workshop_banner.jpg",
      location: "Sede Descentralizada • UGEL Alto Amazonas (Yurimaguas)",
      module: "Módulo 6: Portafolio & Cierre",
      tag: "Acreditación UCV",
      aspect: "wide"
    }
  ];

  // Temporizador para auto-reproducción
  useEffect(() => {
    let interval = null;
    if (isPlaying && viewMode === 'cine') {
      interval = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % galleryItems.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, viewMode, galleryItems.length]);

  const currentItem = galleryItems[activeIndex];

  const nextSlide = () => {
    setActiveIndex((activeIndex + 1) % galleryItems.length);
  };

  const prevSlide = () => {
    setActiveIndex((activeIndex - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <section id="galeria" className="py-16 lg:py-24 bg-gradient-to-b from-white via-amber-50/25 to-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de la sección con selector de visualización y Scroll Reveal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12 reveal">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
              <i className="fa-solid fa-camera-retro text-amber-700"></i> Crónica Visual de la Educación Amazónica
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 font-['Poppins']">
              Galería Comunitaria de los PRONOEI
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Fotografías testimoniales de alta resolución que documentan el aula comunitaria, el juego libre con recursos del bosque y el protagonismo de las 1,200 promotoras en Loreto.
            </p>
          </div>

          {/* Selector de modo de presentación */}
          <div className="flex items-center gap-2 bg-stone-100/90 p-1.5 rounded-2xl border border-stone-200 shrink-0 self-start md:self-end">
            <button
              onClick={() => setViewMode('cine')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                viewMode === 'cine'
                  ? 'bg-red-700 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <i className="fa-solid fa-film text-xs"></i>
              <span>Modo Escenario</span>
            </button>
            <button
              onClick={() => setViewMode('mosaico')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                viewMode === 'mosaico'
                  ? 'bg-red-700 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <i className="fa-solid fa-border-all text-xs"></i>
              <span>Mosaico Editorial</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            MODO 1: ESCENARIO CINEMATOGRÁFICO DE GRAN IMPACTO (SHOWCASE HERO)
            ========================================================================= */}
        {viewMode === 'cine' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Escenario principal con imagen gigante */}
            <div className="relative rounded-3xl overflow-hidden bg-stone-950 shadow-2xl border border-stone-800 group aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] max-h-[620px] reveal-scale">
              
              {/* Imagen central */}
              <img
                src={currentItem.image}
                alt={currentItem.title}
                key={currentItem.id}
                className="w-full h-full object-cover object-center transition-all duration-700 ease-out animate-fade-in"
              />

              {/* Degradado cinematográfico para legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent pointer-events-none"></div>

              {/* Controles superiores flotantes */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between pointer-events-auto">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 border border-amber-400/30 text-xs font-bold flex items-center gap-1.5 shadow-md">
                    <i className="fa-solid fa-location-dot text-amber-400"></i>
                    <span>{currentItem.location}</span>
                  </span>
                  <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20 text-xs font-semibold">
                    {currentItem.module}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Botón Auto-Play */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md border transition-all flex items-center gap-1.5 shadow-md ${
                      isPlaying
                        ? 'bg-amber-400 text-stone-900 border-amber-300'
                        : 'bg-black/60 text-stone-200 border-white/20 hover:bg-black/80'
                    }`}
                    title={isPlaying ? "Pausar presentación automática" : "Iniciar presentación automática"}
                  >
                    <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} text-[10px]`}></i>
                    <span className="hidden sm:inline">{isPlaying ? 'Pausar' : 'Auto'}</span>
                  </button>

                  {/* Botón Zoom Pantalla Completa */}
                  <button
                    onClick={() => setLightboxOpen(true)}
                    className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all shadow-md hover:scale-105"
                    title="Ver en pantalla completa"
                  >
                    <i className="fa-solid fa-expand text-xs"></i>
                  </button>
                </div>
              </div>

              {/* Flechas de navegación laterales */}
              <button
                onClick={prevSlide}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/50 hover:bg-red-700 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-110 shadow-xl opacity-90 group-hover:opacity-100"
                aria-label="Fotografía anterior"
              >
                <i className="fa-solid fa-chevron-left text-sm sm:text-base"></i>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/50 hover:bg-red-700 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:scale-110 shadow-xl opacity-90 group-hover:opacity-100"
                aria-label="Fotografía siguiente"
              >
                <i className="fa-solid fa-chevron-right text-sm sm:text-base"></i>
              </button>

              {/* Información editorial inferior */}
              <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 text-white space-y-2 pointer-events-auto">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider">
                    {currentItem.tag}
                  </span>
                  <span className="text-xs text-stone-300 font-semibold">
                    Fotografía {activeIndex + 1} de {galleryItems.length}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-['Poppins'] leading-tight drop-shadow-md">
                  {currentItem.title}
                </h3>

                <p className="text-stone-200 text-xs sm:text-sm lg:text-base max-w-3xl leading-relaxed line-clamp-2 sm:line-clamp-3 drop-shadow">
                  {currentItem.desc}
                </p>
              </div>

              {/* Barra de progreso de autoplay */}
              {isPlaying && (
                <div className="absolute bottom-0 left-0 h-1 bg-amber-400 animate-[slideDown_5s_linear_infinite] w-full"></div>
              )}
            </div>

            {/* Carrete de Miniaturas Interactivas (Filmstrip) con Scroll Reveal */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-3.5 pt-2 reveal delay-100">
              {galleryItems.map((item, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveIndex(idx);
                      setIsPlaying(false);
                    }}
                    className={`relative rounded-2xl overflow-hidden aspect-[4/3] group transition-all duration-300 text-left ${
                      isActive
                        ? 'ring-4 ring-amber-400 scale-[1.03] shadow-lg border-2 border-red-700'
                        : 'opacity-65 hover:opacity-100 hover:scale-[1.02] border border-stone-200'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <span className="absolute bottom-1.5 left-2 right-2 text-[10px] font-bold text-white truncate drop-shadow">
                      {idx + 1}. {item.tag}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>
        )}

        {/* =========================================================================
            MODO 2: MOSAICO EDITORIAL (ESTILO REVISTA BENTO GRID)
            ========================================================================= */}
        {viewMode === 'mosaico' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-fade-in">
            {galleryItems.map((item, idx) => {
              // Distribución dinámica de columnas para crear un bento visual atractivo
              let colSpan = "md:col-span-6";
              if (idx === 0 || idx === 3) colSpan = "md:col-span-7";
              if (idx === 1 || idx === 2) colSpan = "md:col-span-5";

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveIndex(idx);
                    setLightboxOpen(true);
                  }}
                  className={`${colSpan} group relative rounded-3xl overflow-hidden bg-stone-900 border border-stone-200 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer min-h-[320px] flex flex-col justify-end p-6 text-white`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 group-hover:via-black/50 transition-colors"></div>

                  <div className="relative z-10 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-stone-900 text-[10px] font-black uppercase">
                        {item.tag}
                      </span>
                      <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                        <i className="fa-solid fa-location-dot text-[10px]"></i> {item.location}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold font-['Poppins'] leading-snug group-hover:text-amber-200 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-stone-300 text-xs sm:text-sm leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-xs text-amber-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Clic para ampliar en alta definición</span>
                      <i className="fa-solid fa-arrow-right text-xs"></i>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* =========================================================================
            MODAL LIGHTBOX INMERSIVO (PANTALLA COMPLETA HD)
            ========================================================================= */}
        {lightboxOpen && (
          <div
            className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-fade-in"
            onClick={() => setLightboxOpen(false)}
          >
            <div
              className="bg-stone-950 text-white rounded-3xl overflow-hidden max-w-5xl w-full border border-stone-800 shadow-2xl relative flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón cerrar */}
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-black/70 hover:bg-red-700 text-white flex items-center justify-center transition-all shadow-lg hover:scale-105"
                aria-label="Cerrar visor"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>

              {/* Botones de cambio de foto dentro del lightbox */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/70 hover:bg-red-700 text-white flex items-center justify-center transition-all shadow-lg hover:scale-105"
                aria-label="Anterior"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/70 hover:bg-red-700 text-white flex items-center justify-center transition-all shadow-lg hover:scale-105"
                aria-label="Siguiente"
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>

              {/* Imagen central ampliada */}
              <div className="bg-black max-h-[72vh] flex items-center justify-center overflow-hidden">
                <img
                  src={currentItem.image}
                  alt={currentItem.title}
                  className="max-h-[72vh] w-auto max-w-full object-contain"
                />
              </div>

              {/* Texto explicativo en el Lightbox */}
              <div className="p-6 sm:p-8 bg-stone-950 border-t border-stone-800 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full bg-red-700 text-white text-xs font-bold">
                      {currentItem.tag}
                    </span>
                    <span className="text-amber-400 text-xs font-semibold flex items-center gap-1.5">
                      <i className="fa-solid fa-location-dot"></i> {currentItem.location}
                    </span>
                  </div>
                  <span className="text-xs text-stone-400 font-medium">
                    {currentItem.module}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black font-['Poppins'] text-white leading-snug">
                  {currentItem.title}
                </h3>

                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  {currentItem.desc}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
