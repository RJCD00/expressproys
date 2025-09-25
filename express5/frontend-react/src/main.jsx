// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap local via npm

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);