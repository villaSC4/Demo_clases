import React from 'react';
import PageBanner from '../components/PageBanner';
import FaqSection from '../components/FaqSection';

export default function FaqPage({ onNavigateHome }) {
  return (
    <div className="bg-white">
      <PageBanner
        badge="Orientación y Soporte"
        title="Preguntas Frecuentes y Canales de Ayuda"
        subtitle="Respuestas oficiales sobre la gratuidad del programa, conectividad en selva, rol de la Profesora Coordinadora, entrega de evidencias y líneas de emergencia infantil."
        breadcrumb="Preguntas Frecuentes"
        onNavigateHome={onNavigateHome}
      />
      <FaqSection />
    </div>
  );
}
