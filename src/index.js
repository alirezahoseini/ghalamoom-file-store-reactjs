import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import NotificationProvider from './Contexts/Notifications/NotificationProvider';
import ShoppingCartProvider from './Contexts/ShopipingCart/ShoppingCartProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    // <BrowserRouter basename='/projects/react/ghalamoom' >
    <BrowserRouter basename='/' >
        <NotificationProvider>
            <ShoppingCartProvider>
                <App />
            </ShoppingCartProvider>
        </NotificationProvider>
    </BrowserRouter>
);

