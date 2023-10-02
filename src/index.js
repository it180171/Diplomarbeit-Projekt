import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "react-oidc-context"

const oidcConfig = {
    authority: "https://login.test.doka.com/",
    client_id: "9d71a618-5337-4bff-b8b0-3e236e73e5ea",
    token_type: "Bearer",
    redirect_uri: window.location.origin,
    scope: "dfdsin.doka.com/download openid profile email roles",
    post_logout_redirect_uri: `${window.location.origin}/login`
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider{...oidcConfig}>
    <App />
    </AuthProvider>
);


reportWebVitals();
