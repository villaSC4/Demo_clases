import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export default function ModuleModal({ module, onClose, onComplete }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  if (!module) return null;

  const handleSelectAnswer = (qIdx, optIdx) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmitQuiz = (e) => {
    e.preventDefault();
    let score = 0;
    module.quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) {
        score++;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);

    if (score >= 2) {
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      onComplete(module.id);
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 max-w-3xl w-full overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Cabecera del modal */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-red-800 to-brand-darkRed text-white flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-400 text-stone-900 text-[10px] font-extrabold uppercase">
              {module.number}
            </div>
            <h3 className="text-lg sm:text-xl font-bold mt-2 font-['Poppins']">
              {module.title}
            </h3>
            <p className="text-xs text-stone-200 mt-1">
              <i className="fa-regular fa-clock text-amber-300 mr-1"></i> {module.hours}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0"
            aria-label="Cerrar modal"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Cuerpo del modal con scroll interno */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-stone-700 text-sm">

          {/* Video oficial */}
          <div>
            <h4 className="font-bold text-stone-900 text-sm sm:text-base flex items-center gap-2 mb-2">
              <i className="fa-brands fa-youtube text-red-600"></i>
              <span>Video Formativo: {module.videoTitle}</span>
            </h4>
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-md bg-black">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${module.videoId}?rel=0`}
                title={module.videoTitle}
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Resumen pedagógico */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4">
            <h5 className="font-bold text-amber-900 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <i className="fa-solid fa-lightbulb text-amber-600"></i> Enfoque Pedagógico
            </h5>
            <p className="text-stone-700 leading-relaxed text-xs sm:text-sm">
              {module.summary}
            </p>
          </div>

          {/* Competencias */}
          <div>
            <h5 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <i className="fa-solid fa-bullseye text-red-600"></i> Competencia que Desarrollarás
            </h5>
            <p className="text-stone-600 text-xs sm:text-sm bg-stone-50 p-3.5 rounded-xl border border-stone-200">
              {module.competencies}
            </p>
          </div>

          {/* Materiales de lectura */}
          <div>
            <h5 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <i className="fa-solid fa-book-open text-blue-600"></i> Lecturas y Guías Oficiales Descargables
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {module.readings.map((r, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl border border-stone-200 hover:border-red-300 hover:bg-red-50/40 transition-colors"
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <i className="fa-regular fa-file-pdf text-red-600 text-lg shrink-0"></i>
                    <span className="text-xs font-semibold text-stone-800 truncate">{r.name}</span>
                  </div>
                  <span className="text-[10px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full shrink-0 ml-2">
                    {r.size}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Boleto de Salida / Evaluación interactiva */}
          <div className="border-t border-stone-200 pt-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-wider">
                  Evaluación Formativa
                </span>
                <h4 className="text-base font-bold text-stone-900 mt-1">
                  Boleto de Salida: Valida lo Aprendido
                </h4>
              </div>
              {quizSubmitted && (
                <div className={`px-3 py-1 rounded-xl text-xs font-bold ${
                  quizScore >= 2 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {quizScore} de {module.quiz.length} Correctas ({Math.round((quizScore / module.quiz.length) * 100)}%)
                </div>
              )}
            </div>

            <form onSubmit={handleSubmitQuiz} className="space-y-4">
              {module.quiz.map((q, qIdx) => (
                <div key={qIdx} className="bg-stone-50 p-3.5 sm:p-4 rounded-2xl border border-stone-200">
                  <p className="font-semibold text-stone-900 text-xs sm:text-sm mb-2.5">
                    {qIdx + 1}. {q.question}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[qIdx] === optIdx;
                      let optionClass = "border-stone-200 hover:border-stone-300 hover:bg-stone-100/50";
                      
                      if (quizSubmitted) {
                        if (optIdx === q.correct) {
                          optionClass = "border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold";
                        } else if (isSelected && optIdx !== q.correct) {
                          optionClass = "border-red-400 bg-red-50 text-red-800";
                        }
                      } else if (isSelected) {
                        optionClass = "border-red-600 bg-red-50/60 text-red-900 font-semibold";
                      }

                      return (
                        <label
                          key={optIdx}
                          onClick={() => handleSelectAnswer(qIdx, optIdx)}
                          className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${optionClass}`}
                        >
                          <input
                            type="radio"
                            name={`quiz-q-${qIdx}`}
                            checked={isSelected}
                            onChange={() => handleSelectAnswer(qIdx, optIdx)}
                            disabled={quizSubmitted}
                            className="mt-0.5 text-red-600 focus:ring-red-500"
                          />
                          <span className="leading-relaxed">{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-end gap-3 pt-2">
                {quizSubmitted ? (
                  <button
                    type="button"
                    onClick={handleResetQuiz}
                    className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-100 transition-colors"
                  >
                    <i className="fa-solid fa-rotate-right mr-1.5"></i> Intentar de nuevo
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={Object.keys(selectedAnswers).length < module.quiz.length}
                    className="px-5 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
                  >
                    <i className="fa-solid fa-paper-plane"></i>
                    <span>Enviar Boleto de Salida</span>
                  </button>
                )}
              </div>
            </form>
          </div>

        </div>

        {/* Pie del modal */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-between items-center text-xs text-stone-500">
          <span>WarmiClass PRONOEI • Universidad César Vallejo</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold transition-colors"
          >
            Cerrar Ventana
          </button>
        </div>

      </div>
    </div>
  );
}
