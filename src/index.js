import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import NotificationProvider from './Contexts/Notifications/NotificationProvider';
import ShoppingCartProvider from './Contexts/ShopipingCart/ShoppingCartProvider';
import UserInformationContextProvider from './Contexts/UserInformationContext/UserInformationContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter basename='/projects/react/ghalamoom' >
        <NotificationProvider>
            <ShoppingCartProvider>
                <UserInformationContextProvider>
                    <App />
                </UserInformationContextProvider>
            </ShoppingCartProvider>
        </NotificationProvider>
    </BrowserRouter>
);

