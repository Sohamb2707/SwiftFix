import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './i18n'; // Make sure this import is present

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
