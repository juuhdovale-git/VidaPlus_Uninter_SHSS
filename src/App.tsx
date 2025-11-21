import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Pacientes from './pages/Pacientes'
import Profissionais from './pages/Profissionais'
import Agendamentos from './pages/Agendamentos'
import Prontuarios from './pages/Prontuarios'
import Leitos from './pages/Leitos'
import Suprimentos from './pages/Suprimentos'
import Configuracoes from './pages/Configuracoes'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return <>{children}</>
}

function App() {
  useEffect(() => {
    try {
      const stored = localStorage.getItem('auth-storage')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.isAuthenticated && parsed.usuario) {
          useAuthStore.setState({
            usuario: parsed.usuario,
            token: parsed.token,
            isAuthenticated: parsed.isAuthenticated,
          })
        }
      }
    } catch (e) {
      console.error('Erro ao carregar autenticação:', e)
    }
  }, [])

  return (
    <BrowserRouter basename="/VidaPlus_Uninter_SHSS">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="pacientes" element={<Pacientes />} />
          <Route path="profissionais" element={<Profissionais />} />
          <Route path="agendamentos" element={<Agendamentos />} />
          <Route path="prontuarios" element={<Prontuarios />} />
          <Route path="leitos" element={<Leitos />} />
          <Route path="suprimentos" element={<Suprimentos />} />
          <Route path="configuracoes" element={<Configuracoes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
