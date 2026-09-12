import React from 'react';
import PageBanner from '../components/PageBanner';
import ModulesSection from '../components/ModulesSection';

export default function ModulesPage({ completedModules, onCompleteModule, onNavigateHome }) {
  return (
    <div className="bg-stone-50/50">
      <PageBanner
        badge="Plan de Estudios Oficial (120 Horas)"
        title="Módulos Formativos para la PEC"
        subtitle="Estructura curricular de 6 módulos articulados en teoría (48h), práctica en aula comunitaria (64h) y sustentación de evidencias del portafolio (8h)."
        breadcrumb="Módulos Formativos"
        onNavigateHome={onNavigateHome}
      />
      <ModulesSection
        completedModules={completedModules}
        onCompleteModule={onCompleteModule}
      />
    </div>
  );
}
