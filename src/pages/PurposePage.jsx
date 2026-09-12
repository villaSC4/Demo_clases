import React from 'react';
import PageBanner from '../components/PageBanner';
import ObjectiveSection from '../components/ObjectiveSection';

export default function PurposePage({ onNavigateHome }) {
  return (
    <div className="bg-[#fffdfa]">
      <PageBanner
        badge="Misión Institucional"
        title="Propósito, Realidad y Marco Normativo PRONOEI"
        subtitle="Revaloración pedagógica, ética y legal de las 1,200 Promotoras Educativas Comunitarias y 80 Profesoras Coordinadoras de la Región Loreto bajo las RVM N.° 081-2025 y 127-2026-MINEDU."
        breadcrumb="Propósito y Marco Legal"
        onNavigateHome={onNavigateHome}
      />
      <ObjectiveSection />
    </div>
  );
}
