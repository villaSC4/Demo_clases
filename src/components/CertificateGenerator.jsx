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
  const ucvLogoImgRef = useRef(null);
  const warmiLogoImgRef = useRef(null);

  const ugels = [
    "UGEL Maynas (Iquitos)",
    "UGEL Loreto - Nauta",
    "UGEL Requena",
    "UGEL Alto Amazonas (Yurimaguas)",
    "UGEL Ucayali (Contamana)"
  ];

  // Pre-cargar imágenes institucionales para el canvas
  useEffect(() => {
    let active = true;

    const imgUcv = new Image();
    imgUcv.src = '/ucv-virtual-logo.png';
    imgUcv.onload = () => {
      if (active) {
        ucvLogoImgRef.current = imgUcv;
        renderCertificate();
      }
    };

    const imgWarmi = new Image();
    imgWarmi.src = '/logowarmi.png';
    imgWarmi.onload = () => {
      if (active) {
        warmiLogoImgRef.current = imgWarmi;
        renderCertificate();
      }
    };

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    renderCertificate();
  }, [pecName, pecDni, selectedUgel]);

  const drawRoundRectPath = (ctx, x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

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

    // =========================================================================
    // DIBUJAR LOGO OFICIAL UCV VIRTUAL (SUPERIOR IZQUIERDA)
    // =========================================================================
    if (ucvLogoImgRef.current && ucvLogoImgRef.current.complete) {
      ctx.save();
      const uW = 230;
      const uH = 62;
      const uX = 54;
      const uY = 52;

      // Contenedor blanco con borde elegante
      drawRoundRectPath(ctx, uX - 4, uY - 4, uW + 8, uH + 8, 8);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "#d4af37";
      ctx.stroke();

      ctx.drawImage(ucvLogoImgRef.current, uX, uY, uW, uH);
      ctx.restore();
    }

    // =========================================================================
    // DIBUJAR LOGO WARMICLASS PRONOEI (SUPERIOR DERECHA)
    // =========================================================================
    if (warmiLogoImgRef.current && warmiLogoImgRef.current.complete) {
      ctx.save();
      const wSize = 64;
      const wX = canvas.width - 54 - wSize;
      const wY = 51;

      // Medallón rojo institucional con aro dorado
      drawRoundRectPath(ctx, wX - 4, wY - 4, wSize + 8, wSize + 8, 14);
      ctx.fillStyle = "#8b0000";
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#d4af37";
      ctx.stroke();

      ctx.drawImage(warmiLogoImgRef.current, wX, wY, wSize, wSize);
      ctx.restore();
    }

    // Encabezado institucional central
    ctx.fillStyle = "#8b0000";
    ctx.font = "bold 26px 'Poppins', Arial";
    ctx.textAlign = "center";
    ctx.fillText("UNIVERSIDAD CÉSAR VALLEJO", canvas.width / 2, 85);

    ctx.fillStyle = "#4a4a4a";
    ctx.font = "bold 15px 'Roboto', Arial";
    ctx.fillText("VICERRECTORADO ACADÉMICO – DIRECCIÓN DE UCV VIRTUAL", canvas.width / 2, 112);

    ctx.fillStyle = "#666666";
    ctx.font = "italic 14px 'Roboto', Arial";
    ctx.fillText("En alianza estratégica con la Dirección Regional de Educación de Loreto (DREL)", canvas.width / 2, 134);

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

        {/* Banner Institucional de Respaldo Oficial UCV Virtual */}
        <div className="mb-8 p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-blue-900 via-blue-950 to-stone-950 text-white border border-blue-600/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 reveal">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
            <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shrink-0">
              <img
                src="/ucv-virtual-logo.png"
                alt="Logo Oficial UCV Virtual"
                className="h-12 sm:h-14 w-auto object-contain rounded-xl shadow-md"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/25 border border-blue-400/30 text-blue-200 text-xs font-black uppercase tracking-wider mb-2">
                <i className="fa-solid fa-graduation-cap text-amber-400"></i>
                <span>Acreditación Universitaria Oficial SUNEDU / Ley 30220</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-['Poppins'] tracking-tight">
                Certificación Académica por UCV Virtual
              </h3>
              <p className="text-xs sm:text-sm text-blue-100/80 mt-1 max-w-2xl leading-relaxed">
                Cada certificado expedido a las Promotoras Educativas Comunitarias (PEC) cuenta con código de registro único, firma digital del Vicerrectorado Académico y validez en el escalafón magisterial.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-center px-4 py-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm">
              <span className="text-[11px] font-bold text-blue-200 block uppercase tracking-wider">Carga Lectiva</span>
              <span className="text-xl font-black text-amber-400 font-['Poppins']">120 Horas</span>
            </div>
            <div className="text-center px-4 py-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm">
              <span className="text-[11px] font-bold text-blue-200 block uppercase tracking-wider">Créditos Oficiales</span>
              <span className="text-xl font-black text-emerald-400 font-['Poppins']">5.0</span>
            </div>
          </div>
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
            {/* Barra superior de previsualización con logo UCV Virtual */}
            <div className="bg-stone-900 text-white px-4 py-2.5 flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center gap-3">
                <img
                  src="/ucv-virtual-logo.png"
                  alt="UCV Virtual"
                  className="h-6 w-auto object-contain rounded"
                />
                <span className="text-[11px] font-bold text-stone-300 hidden sm:inline">
                  Previsualización Digital del Certificado Académico Oficial
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                120 Horas • 5.0 Créditos Oficiales
              </span>
            </div>

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
