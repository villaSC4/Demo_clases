import React from 'react';
import PageBanner from '../components/PageBanner';
import ZoomSessions from '../components/ZoomSessions';

export default function ZoomPage({ onNavigateHome }) {
  return (
    <div className="bg-white">
      <PageBanner
        badge="Aprendizaje Sincrónico"
        title="Conferencias Magistrales en Vivo vía Zoom"
        subtitle="Sesiones quincenales los sábados por la mañana dirigidas por docentes formadores y especialistas nacionales en primera infancia y protección infantil."
        breadcrumb="Conferencias Zoom"
        onNavigateHome={onNavigateHome}
      />
      <ZoomSessions />
    </div>
  );
}
