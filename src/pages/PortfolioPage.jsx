import React from 'react';
import PageBanner from '../components/PageBanner';
import PortfolioRubric from '../components/PortfolioRubric';

export default function PortfolioPage({ onNavigateHome }) {
  return (
    <div className="bg-stone-50/70">
      <PageBanner
        badge="Evaluación Auténtica"
        title="Portafolio Pedagógico y Rúbrica de Evaluación"
        subtitle="Guía técnica de las 4 evidencias prácticas de aula y simulador de la rúbrica sobre 20 puntos concertada entre la UCV y la Dirección Regional de Educación de Loreto."
        breadcrumb="Portafolio y Rúbrica"
        onNavigateHome={onNavigateHome}
      />
      <PortfolioRubric />
    </div>
  );
}
