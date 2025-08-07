import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {  MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';
import { BrowserRouter } from 'react-router-dom'
import { ModalsProvider } from '@mantine/modals'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <MantineProvider>
      <ModalsProvider>
    <App />
    </ModalsProvider>
    </MantineProvider>
    </BrowserRouter>
  </StrictMode>,
)
