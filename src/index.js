import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // basename='/projects/react/ghalamoom'
    <BrowserRouter basename='/projects/react/ghalamoom' >
        <App />
    </BrowserRouter>
);

