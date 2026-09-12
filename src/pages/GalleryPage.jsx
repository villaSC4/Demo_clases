import React from 'react';
import PageBanner from '../components/PageBanner';
import GallerySection from '../components/GallerySection';

export default function GalleryPage({ onNavigateHome }) {
  return (
    <div className="bg-white">
      <PageBanner
        badge="Fotografía Documental"
        title="Galería Comunitaria de los PRONOEI"
        subtitle="Crónica visual de la educación inicial no escolarizada en los ríos y caseríos de Loreto: promotoras, infancias amazónicas y espacios de aprendizaje con pertinencia bio-cultural."
        breadcrumb="Galería Comunitaria"
        onNavigateHome={onNavigateHome}
      />
      <GallerySection />
    </div>
  );
}
