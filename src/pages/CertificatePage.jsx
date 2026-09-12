import React from 'react';
import PageBanner from '../components/PageBanner';
import CertificateGenerator from '../components/CertificateGenerator';

export default function CertificatePage({
  pecName,
  setPecName,
  pecDni,
  setPecDni,
  selectedUgel,
  setSelectedUgel,
  onNavigateHome
}) {
  return (
    <div className="bg-white">
      <PageBanner
        badge="Acreditación Oficial (Ley 30220)"
        title="Certificación Oficial Universitaria"
        subtitle="Diploma co-firmado por el Vicerrectorado Académico de la Universidad César Vallejo y la Dirección Regional de Educación de Loreto. 120 Horas Lectivas (5.0 Créditos Universitarios)."
        breadcrumb="Certificación Oficial"
        onNavigateHome={onNavigateHome}
      />
      <CertificateGenerator
        pecName={pecName}
        setPecName={setPecName}
        pecDni={pecDni}
        setPecDni={setPecDni}
        selectedUgel={selectedUgel}
        setSelectedUgel={setSelectedUgel}
      />
    </div>
  );
}
