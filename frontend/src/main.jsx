import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeProvider.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <App />
        </Router>,
      </AuthProvider>
    </ThemeProvider>

)
