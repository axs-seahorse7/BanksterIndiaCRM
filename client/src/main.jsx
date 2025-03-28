import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MessageProvider } from '../Global/messageContext.jsx'
import "./Styles/style.scss";
import 'bootstrap/dist/css/bootstrap.min.css';


createRoot(document.getElementById('root')).render(

  <StrictMode>
    <MessageProvider>
      <App />
    </MessageProvider>
  </StrictMode>,
)
