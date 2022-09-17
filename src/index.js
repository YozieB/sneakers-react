import React from 'react'
import ReactDOM from 'react-dom/client'
import 'modern-normalize'
import './index.scss'
import { HashRouter } from 'react-router-dom'
import App from './components/App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
)
