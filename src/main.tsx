import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

try {
  const rootElement = document.getElementById('root')
  
  if (!rootElement) {
    throw new Error('Elemento root não encontrado!')
  }

  const root = ReactDOM.createRoot(rootElement)
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  
  console.log('✅ Aplicação React iniciada com sucesso!')
} catch (error) {
  console.error('❌ Erro ao iniciar aplicação:', error)
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: Arial; color: red;">
      <h1>Erro ao carregar aplicação</h1>
      <p>${error instanceof Error ? error.message : 'Erro desconhecido'}</p>
      <p>Verifique o console para mais detalhes.</p>
    </div>
  `
}
