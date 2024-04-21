import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.css";
import "./CSSFiles/Facilities.css"
import "./CSSFiles/Homepage.css"
import "./CSSFiles/Login.css"
import "./CSSFiles/Navbar.css"
import "./CSSFiles/Attractions.css"
import "./CSSFiles/Signup.css"
import "./CSSFiles/Dashboard.css"
import "./CSSFiles/Ticket.css";
import "./CSSFiles/Checkout.css";
import "./CSSFiles/TicketsSummary.css"
import "./CSSFiles/Availability.css";



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
)
