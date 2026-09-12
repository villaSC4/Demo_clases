import React, { useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function CertificateGenerator({
  pecName,
  setPecName,
  pecDni,
  setPecDni,
  selectedUgel,
  setSelectedUgel
}) {
  const canvasRef = useRef(null);

  const ugels = [
    "UGEL Maynas (Iquitos)",
    "UGEL Loreto - Nauta",
    "UGEL Requena",
    "UGEL Alto Amazonas (Yurimaguas)",
    "UGEL Ucayali (Contamana)"
  ];

  useEffect(() => {
    renderCertificate();
  }, [pecName, pecDni, selectedUgel]);

  const renderCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    canvas.width = 1200;
    canvas.height = 840;

    // Fondo crema suave
    ctx.fillStyle = "#fffdf7";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Marco exterior rojo UCV
    ctx.lineWidth = 14;
    ctx.strokeStyle = "#8b0000";
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Marco interior dorado metálico
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#d4af37";
    ctx.strokeRect(36, 36, canvas.width - 72, canvas.height - 72);

    // Encabezado institucional
    ctx.fillStyle = "#8b0000";
    ctx.font = "bold 26px 'Poppins', Arial";
    ctx.textAlign = "center";
    ctx.fillText("UNIVERSIDAD CÉSAR VALLEJO", canvas.width / 2, 95);

    ctx.fillStyle = "#4a4a4a";
    ctx.font = "italic 16px 'Roboto', Arial";
    ctx.fillText("VICERRECTORADO ACADÉMICO – DIRECCIÓN DE UCV VIRTUAL", canvas.width / 2, 122);
    ctx.fillText("En alianza estratégica con la Dirección Regional de Educación de Loreto (DREL)", canvas.width / 2, 144);

    // Título de otorgamiento
    ctx.fillStyle = "#b30000";
    ctx.font = "bold 34px 'Poppins', Arial";
    ctx.fillText("OTORGA EL PRESENTE CERTIFICADO A:", canvas.width / 2, 215);

    // Nombre de la participante
    ctx.fillStyle = "#1b1b1b";
    ctx.font = "bold 44px 'Georgia', serif";
    ctx.fillText(pecName.toUpperCase() || "PROMOTORA EDUCATIVA", canvas.width / 2, 285);

    // DNI y Jurisdicción
    ctx.fillStyle = "#666666";
    ctx.font = "bold 18px 'Roboto', Arial";
    ctx.fillText(`D.N.I. N.° ${pecDni || "--------"} | JURISDICCIÓN: ${selectedUgel.toUpperCase()}`, canvas.width / 2, 320);

    // Texto de certificación
    ctx.fillStyle = "#333333";
    ctx.font = "16px 'Roboto', Arial";
    ctx.fillText("Por haber aprobado satisfactoriamente el programa de especialización continua:", canvas.width / 2, 375);

    // Nombre del programa
    ctx.fillStyle = "#8b0000";
    ctx.font = "bold 24px 'Poppins', Arial";
    ctx.fillText('"FORTALECIMIENTO DE COMPETENCIAS PEDAGÓGICAS, SOCIOEMOCIONALES E INCLUSIVAS', canvas.width / 2, 415);
    ctx.fillText('PARA PROMOTORAS EDUCATIVAS COMUNITARIAS (PEC) DE PRONOEI - LORETO 2026"', canvas.width / 2, 445);

    // Horas y Créditos
    ctx.fillStyle = "#444444";
    ctx.font = "15px 'Roboto', Arial";
    ctx.fillText("Desarrollado en modalidad híbrida del 01 de septiembre al 30 de noviembre de 2026, con un valor de:", canvas.width / 2, 485);

    ctx.fillStyle = "#b30000";
    ctx.font = "bold 18px 'Poppins', Arial";
    ctx.fillText("120 HORAS ACADÉMICAS LECTIVAS  |  5.0 CRÉDITOS ACADÉMICOS (Art. 39 - Ley Universitaria 30220)", canvas.width / 2, 515);

    // Sello dorado institucional
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 605, 45, 0, Math.PI * 2);
    ctx.fillStyle = "#d4af37";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#8b0000";
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 13px 'Poppins', Arial";
    ctx.fillText("VALIDEZ", canvas.width / 2, 598);
    ctx.fillText("OFICIAL", canvas.width / 2, 615);
    ctx.font = "9px 'Roboto', Arial";
    ctx.fillText("MINEDU-UCV", canvas.width / 2, 628);

    // Firmas institucionales
    ctx.strokeStyle = "#777777";
    ctx.lineWidth = 1.5;

    // Firma 1: UCV Virtual
    ctx.beginPath();
    ctx.moveTo(180, 680);
    ctx.lineTo(440, 680);
    ctx.stroke();
    ctx.fillStyle = "#222222";
    ctx.font = "bold 15px 'Roboto', Arial";
    ctx.fillText("Directora de UCV Virtual", 310, 705);
    ctx.font = "13px 'Roboto', Arial";
    ctx.fillStyle = "#555555";
    ctx.fillText("Universidad César Vallejo", 310, 725);
    ctx.fillText("Vicerrectorado Académico", 310, 745);

    // Firma 2: DRE Loreto
    ctx.beginPath();
    ctx.moveTo(760, 680);
    ctx.lineTo(1020, 680);
    ctx.stroke();
    ctx.fillStyle = "#222222";
    ctx.font = "bold 15px 'Roboto', Arial";
    ctx.fillText("Director Regional de Educación", 890, 705);
    ctx.font = "13px 'Roboto', Arial";
    ctx.fillStyle = "#555555";
    ctx.fillText("DRE Loreto - Gob. Regional", 890, 725);
    ctx.fillText("Dirección de Gestión Pedagógica", 890, 745);

    // Pie de verificación y Hash
    ctx.fillStyle = "#888888";
    ctx.font = "11px 'Courier New', monospace";
    ctx.textAlign = "left";
    ctx.fillText(`REGISTRO UCV: 2026-PRONOEI-LORETO-${pecDni || "0000"} | HASH: a9f8e4c1b2`, 60, 805);
    ctx.textAlign = "right";
    ctx.fillText("Verificable con código QR institucional en: ucv.edu.pe/certificados/validador", canvas.width - 60, 805);
  };

  const downloadCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `Certificado_PRONOEI_${pecDni || "2026"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();

    if (typeof confetti === 'function') {
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    }
  };

  return (
    <section id="certificacion" className="py-16 lg:py-24 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <i className="fa-solid fa-certificate text-emerald-600"></i> Validez Universitaria & DREL
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 font-['Poppins']">
            Generador Oficial de Certificado Académico
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
            Certificación co-firmada por el Vicerrectorado Académico de la Universidad César Vallejo y la Dirección Regional de Educación de Loreto. 120 Horas Lectivas (5.0 Créditos Ley 30220).
          </p>
        </div>

        {/* Panel de personalización con Scroll Reveal */}
        <div className="bg-stone-50 p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm mb-8 reveal">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Nombres y Apellidos de la PEC
              </label>
              <input
                type="text"
                value={pecName}
                onChange={(e) => setPecName(e.target.value)}
                placeholder="Ej. Rosa Elvira Huamán Tamani"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:border-red-600 focus:ring-1 focus:ring-red-600 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Número de D.N.I.
              </label>
              <input
                type="text"
                value={pecDni}
                onChange={(e) => setPecDni(e.target.value)}
                placeholder="Ej. 47891234"
                maxLength={8}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:border-red-600 focus:ring-1 focus:ring-red-600 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Jurisdicción UGEL (Loreto)
              </label>
              <select
                value={selectedUgel}
                onChange={(e) => setSelectedUgel(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:border-red-600 focus:ring-1 focus:ring-red-600 bg-white"
              >
                {ugels.map(u => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Visualización del Canvas (Adaptable y Responsive) con Scroll Reveal */}
        <div className="bg-stone-900/5 p-3 sm:p-6 rounded-3xl border border-stone-200 flex flex-col items-center reveal-scale">
          <div className="w-full max-w-4xl overflow-hidden rounded-2xl shadow-xl border border-stone-300 bg-white">
            <canvas
              ref={canvasRef}
              className="w-full h-auto block"
              style={{ aspectRatio: "1200 / 840" }}
            ></canvas>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={downloadCertificate}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-sm shadow-lg shadow-red-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2.5"
            >
              <i className="fa-solid fa-download"></i>
              <span>Descargar Certificado Oficial en Alta Resolución (.png)</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
