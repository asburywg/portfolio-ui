import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // renders components twice to detect errors
  <React.StrictMode>
    <App /> 
  </React.StrictMode>
);