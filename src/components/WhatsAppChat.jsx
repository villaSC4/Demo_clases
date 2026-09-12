import React, { useState } from 'react';

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'agent',
      text: '¡Hola, estimada Promotora! 👋 Soy tu asistente de WarmiClass PRONOEI. ¿En qué te puedo orientar hoy sobre los módulos, horarios de Zoom o tu portafolio?'
    }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');

    setTimeout(() => {
      const lower = userText.toLowerCase();
      let reply = "Estimada Promotora, tu consulta ha sido registrada. Tu Profesora Coordinadora y el equipo docente de UCV Virtual te acompañarán continuamente.";
      
      if (lower.includes("certificado") || lower.includes("credito") || lower.includes("crédito")) {
        reply = "¡Excelente pregunta! La certificación oficial comprende 120 horas académicas lectivas (5.0 créditos Ley 30220). Se entrega de manera gratuita al culminar los 6 módulos y aprobar el portafolio.";
      } else if (lower.includes("zoom") || lower.includes("horario")) {
        reply = "Las conferencias magistrales en vivo vía Zoom se desarrollan los sábados por la mañana. Si no puedes conectarte en vivo, quedan grabadas en la plataforma para que las veas a tu ritmo.";
      } else if (lower.includes("portafolio")) {
        reply = "El Portafolio Pedagógico consta de 4 evidencias prácticas de tu aula comunitaria. Puedes elaborarlo con insumos locales y bajo la orientación de tu Profesora Coordinadora.";
      }
      
      setMessages(prev => [...prev, { sender: 'agent', text: reply }]);
    }, 700);
  };

  return (
    <>
      {/* Botón flotante de WhatsApp animado */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-xl shadow-emerald-900/40 hover:scale-110 active:scale-95 transition-all animate-bounce-subtle glow-pulse-emerald cursor-pointer group"
        aria-label="Abrir asistente de soporte"
      >
        <i className="fa-brands fa-whatsapp text-2xl group-hover:scale-110 transition-transform"></i>
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
          1
        </span>
      </button>

      {/* Ventana de chat desplegable */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-96 bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col animate-slide-down max-h-[500px]">
          
          {/* Cabecera del chat */}
          <div className="p-4 bg-emerald-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white text-lg">
                <i className="fa-brands fa-whatsapp"></i>
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Asistente WarmiClass PEC</h4>
                <span className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span> En línea para Loreto
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {/* Historial de mensajes */}
          <div className="p-4 overflow-y-auto flex-1 space-y-3 bg-stone-50/70 text-xs sm:text-sm">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[82%] p-3 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none'
                      : 'bg-white text-stone-800 border border-stone-200 shadow-sm rounded-bl-none'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input de envío */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu consulta pedagógica..."
              className="flex-1 px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-emerald-600 text-stone-800"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white flex items-center justify-center shrink-0 transition-colors"
            >
              <i className="fa-solid fa-paper-plane text-xs"></i>
            </button>
          </form>

        </div>
      )}
    </>
  );
}
