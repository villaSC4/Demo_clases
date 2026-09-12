import React from 'react';
import PageBanner from '../components/PageBanner';
import DocumentExplorer from '../components/DocumentExplorer';

export default function DocumentPage({ onNavigateHome }) {
  return (
    <div className="bg-stone-50">
      <PageBanner
        badge="Expediente Técnico Institucional"
        title="Propuesta Formativa Oficial y Presupuesto 2026"
        subtitle="Documento curricular completo conforme a la RVM N.° 081-2025, cronograma detallado de 12 semanas, presupuesto de S/ 114,800 y descarga directa del archivo Word oficial (.docx)."
        breadcrumb="Expediente Técnico y Presupuesto"
        onNavigateHome={onNavigateHome}
      />
      <DocumentExplorer />
    </div>
  );
}
