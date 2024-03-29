import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";

import App from './App'

import { AuthProvider } from './contexts/AuthContext';

import './index.css'

// Map Style
import "leaflet/dist/leaflet.css";

// Date picker Style
import "react-datepicker/dist/react-datepicker.css";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
