import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import AuthProvider from './contexts/AuthProvider/index.tsx';
import { CreditsContextProvider } from './contexts/CreditsContext/index.tsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AuthProvider>
      <CreditsContextProvider>
        <App />
      </CreditsContextProvider>
    </AuthProvider>
  </React.StrictMode>,
);
