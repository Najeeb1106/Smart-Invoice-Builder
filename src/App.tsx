import React from 'react';
import { InvoiceProvider } from './state/InvoiceContext';
import { AppRouter } from './routes';
import './styles/global.css';
import './styles/builder.css';
import './styles/templates.css';

export const App: React.FC = () => {
  return (
    <InvoiceProvider>
      <AppRouter />
    </InvoiceProvider>
  );
};

export default App;
