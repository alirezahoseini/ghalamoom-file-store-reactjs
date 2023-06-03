import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import NotificationProvider from './components/ui/Notifications/NotificationProvider'; 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter basename='/projects/react/ghalamoom' >
        <NotificationProvider>
            <App />
        </NotificationProvider>
    </BrowserRouter>
);

