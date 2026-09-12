import React from 'react';

export default function Stats() {
  const stats = [
    {
      number: "148,000+",
      label: "Niñas y Niños atendidos por PRONOEI a nivel nacional",
      icon: "fa-children",
      color: "text-amber-400"
    },
    {
      number: "1,200",
      label: "Promotoras Educativas (PEC) beneficiarias en Loreto",
      icon: "fa-hands-holding-child",
      color: "text-emerald-400"
    },
    {
      number: "120h",
      label: "Horas Académicas Oficiales (5.0 Créditos Universitarios)",
      icon: "fa-award",
      color: "text-amber-300"
    },
    {
      number: "6",
      label: "Módulos Prácticos con Rúbrica de Portafolio Pedagógico",
      icon: "fa-book-bookmark",
      color: "text-red-300"
    },
  ];

  return (
    <section className="bg-gradient-to-r from-red-950 via-brand-darkRed to-red-900 py-12 border-y border-amber-400/20 relative overflow-hidden">
      
      {/* Luz ambiente animada de fondo */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-float-slow pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-float pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`p-5 sm:p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/40 backdrop-blur-md text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/40 group cursor-pointer reveal delay-${(idx + 1) * 100}`}
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 mx-auto flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-amber-400/20 transition-all duration-300">
                <i className={`fa-solid ${stat.icon} ${stat.color} text-lg group-hover:rotate-6 transition-transform`}></i>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-amber-400 font-['Poppins'] tracking-tight group-hover:scale-105 transition-transform">
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm text-stone-200 mt-2 font-medium leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
