import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/common/Toast';
import { LandingPage } from './pages/LandingPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { BuilderPage } from './pages/BuilderPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { useInvoice } from './state/InvoiceContext';
import { TemplateId } from './types/invoice';

export const AppRouter: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    return hash.split('?')[0] || '/';
  });

  const { toastMessage, setToastMessage, changeTemplate } = useInvoice();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const path = hash.split('?')[0] || '/';
      setCurrentPath(path);

      if (hash.includes('?template=')) {
        const tplParam = hash.split('?template=')[1];
        if (tplParam) {
          changeTemplate(tplParam as TemplateId);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [changeTemplate]);

  const navigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path.split('?')[0]);
    window.scrollTo(0, 0);
  };

  const isBuilderRoute = currentPath === '/create';

  const renderPageComponent = () => {
    switch (currentPath) {
      case '/':
        return <LandingPage onNavigate={navigate} />;
      case '/templates':
        return (
          <MarketplacePage
            onSelectTemplate={(tplId) => {
              changeTemplate(tplId as TemplateId);
              navigate('/create');
            }}
          />
        );
      case '/create':
        return <BuilderPage onNavigate={navigate} />;
      case '/features':
        return <FeaturesPage onNavigate={navigate} />;
      case '/about':
        return <AboutPage />;
      case '/contact':
        return <ContactPage />;
      default:
        return <LandingPage onNavigate={navigate} />;
    }
  };

  return (
    <>
      {isBuilderRoute ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }} className="screen-app-shell">
          {renderPageComponent()}
          {toastMessage && (
            <Toast
              type={toastMessage.type}
              message={toastMessage.text}
              onClose={() => setToastMessage(null)}
            />
          )}
        </div>
      ) : (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }} className="screen-app-shell">
          <Navbar activePath={currentPath} onNavigate={navigate} />
          <main style={{ flex: 1 }}>{renderPageComponent()}</main>
          <Footer onNavigate={navigate} />
          {toastMessage && (
            <Toast
              type={toastMessage.type}
              message={toastMessage.text}
              onClose={() => setToastMessage(null)}
            />
          )}
        </div>
      )}
    </>
  );
};
