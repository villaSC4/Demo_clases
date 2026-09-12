import React, { useState, useEffect } from 'react';
import { getStoredSession, saveStoredSession } from './data/mockUsers';

// Componentes Comunes
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppChat from './components/WhatsAppChat';

// Páginas Independientes
import HomePage from './pages/HomePage';
import PurposePage from './pages/PurposePage';
import ModulesPage from './pages/ModulesPage';
import GalleryPage from './pages/GalleryPage';
import ZoomPage from './pages/ZoomPage';
import PortfolioPage from './pages/PortfolioPage';
import CertificatePage from './pages/CertificatePage';
import DocumentPage from './pages/DocumentPage';
import FaqPage from './pages/FaqPage';

// Páginas de Autenticación y Dashboards
import AuthPage from './components/AuthPage';
import DashboardPec from './components/DashboardPec';
import DashboardPc from './components/DashboardPc';
import DashboardAdmin from './components/DashboardAdmin';

// Componente de Animación Cinematográfica de Entrada y Apertura de Puertas
import OpeningIntro from './components/OpeningIntro';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentUser, setCurrentUser] = useState(() => getStoredSession());
  
  // Router multipágina con soporte de URL hash
  const getInitialPage = () => {
    const hash = window.location.hash.replace('#', '').trim().toLowerCase();
    const validPages = [
      'home', 'proposito', 'modulos', 'galeria', 'zoom',
      'portafolio', 'certificacion', 'expediente', 'faq',
      'auth', 'dashboard-pec', 'dashboard-pc', 'dashboard-admin'
    ];
    return validPages.includes(hash) ? hash : 'home';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [completedModules, setCompletedModules] = useState([1, 2]);

  // Sincronización con el historial del navegador (Back / Forward)
  useEffect(() => {
    const handleHashChange = () => {
      const page = getInitialPage();
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Observador de Scroll Reveal nativo y ultra liviano (Cero sobrecarga - 60 FPS)
  useEffect(() => {
    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    const timeoutId = setTimeout(() => {
      const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
      targets.forEach(el => observer.observe(el));
    }, 60);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [currentPage]);

  // Función para cambiar de página
  const handleNavigate = (pageId) => {
    window.location.hash = pageId;
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Login y Registro
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    saveStoredSession(user);

    if (user.role === 'pec') {
      handleNavigate('dashboard-pec');
    } else if (user.role === 'pc') {
      handleNavigate('dashboard-pc');
    } else if (user.role === 'admin') {
      handleNavigate('dashboard-admin');
    } else {
      handleNavigate('home');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    saveStoredSession(null);
    handleNavigate('home');
  };

  const handleNavigateDashboard = (role) => {
    if (role === 'pec') handleNavigate('dashboard-pec');
    else if (role === 'pc') handleNavigate('dashboard-pc');
    else if (role === 'admin') handleNavigate('dashboard-admin');
    else handleNavigate('home');
  };

  const handleCompleteModule = (moduleId) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules(prev => [...prev, moduleId]);
    }
  };

  // =========================================================================
  // 1. PÁGINAS A PANTALLA COMPLETA (LOGIN & DASHBOARDS DEDICADOS)
  // =========================================================================

  if (currentPage === 'auth') {
    return (
      <AuthPage
        onLoginSuccess={handleLoginSuccess}
        onBackToLanding={() => handleNavigate('home')}
      />
    );
  }

  if (currentPage === 'dashboard-pec' && currentUser) {
    return (
      <DashboardPec
        user={currentUser}
        onLogout={handleLogout}
        onNavigateLanding={() => handleNavigate('home')}
      />
    );
  }

  if (currentPage === 'dashboard-pc' && currentUser) {
    return (
      <DashboardPc
        user={currentUser}
        onLogout={handleLogout}
        onNavigateLanding={() => handleNavigate('home')}
      />
    );
  }

  if (currentPage === 'dashboard-admin' && currentUser) {
    return (
      <DashboardAdmin
        user={currentUser}
        onLogout={handleLogout}
        onNavigateLanding={() => handleNavigate('home')}
      />
    );
  }

  // =========================================================================
  // 2. PÁGINAS DEL CAMPUS VIRTUAL CON HEADER Y FOOTER MULTIPÁGINA
  // =========================================================================

  return (
    <div className="min-h-screen flex flex-col bg-[#fffdfa] text-[#26292e]">
      
      {/* Animación Cinematográfica de Entrada ("Se abre el Campus Virtual") */}
      {showIntro && (
        <OpeningIntro onComplete={() => setShowIntro(false)} />
      )}

      {/* Header Multipágina Desacoplado */}
      <Header
        activePage={currentPage}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onNavigateAuth={() => handleNavigate('auth')}
        onNavigateDashboard={handleNavigateDashboard}
        onLogout={handleLogout}
      />

      {/* Vista Condicional de la Página Activa con Transición Fluida */}
      <main key={currentPage} className="flex-1 animate-page-enter">
        
        {/* PÁGINA 1: INICIO (HOME PORTAL) */}
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onNavigateAuth={() => handleNavigate('auth')}
          />
        )}

        {/* PÁGINA 2: PROPÓSITO Y BASE LEGAL */}
        {currentPage === 'proposito' && (
          <PurposePage
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {/* PÁGINA 3: PLAN DE ESTUDIOS Y MÓDULOS */}
        {currentPage === 'modulos' && (
          <ModulesPage
            completedModules={completedModules}
            onCompleteModule={handleCompleteModule}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {/* PÁGINA 4: GALERÍA COMUNITARIA */}
        {currentPage === 'galeria' && (
          <GalleryPage
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {/* PÁGINA 5: CONFERENCIAS ZOOM EN VIVO */}
        {currentPage === 'zoom' && (
          <ZoomPage
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {/* PÁGINA 6: PORTAFOLIO Y RÚBRICA /20 */}
        {currentPage === 'portafolio' && (
          <PortfolioPage
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {/* PÁGINA 7: CERTIFICACIÓN OFICIAL */}
        {currentPage === 'certificacion' && (
          <CertificatePage
            pecName={currentUser?.name || "Rosa Elvira Huamán Tamani"}
            setPecName={() => {}}
            pecDni={currentUser?.dni || "47891234"}
            setPecDni={() => {}}
            selectedUgel={currentUser?.ugel || "UGEL Maynas (Iquitos)"}
            setSelectedUgel={() => {}}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {/* PÁGINA 8: EXPEDIENTE TÉCNICO Y PRESUPUESTO */}
        {currentPage === 'expediente' && (
          <DocumentPage
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {/* PÁGINA 9: PREGUNTAS FRECUENTES */}
        {currentPage === 'faq' && (
          <FaqPage
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

      </main>

      {/* Asistente Flotante */}
      <WhatsAppChat />

      {/* Footer Multipágina */}
      <Footer
        onNavigate={handleNavigate}
        onReplayIntro={() => setShowIntro(true)}
      />

    </div>
  );
}
