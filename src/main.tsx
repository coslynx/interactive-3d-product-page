import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    console.log("Rendering app...");
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("App has been rendered successfully.");
  } catch (error) {
    console.error('Failed to render the app:', error);
    rootElement.innerHTML = '<p>Failed to load application. Please refresh the page.</p>';
  }
} else {
  console.error('Root element with id "root" not found.');
}