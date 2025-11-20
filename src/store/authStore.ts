import { create } from 'zustand'
import type { Usuario, PerfilUsuario } from '../types'

interface AuthState {
  usuario: Usuario | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, senha: string) => Promise<boolean>
  logout: () => void
  getUsuario: () => Usuario | null
  isAdmin: () => boolean
  hasPermissao: (perfil: PerfilUsuario) => boolean
}

const usuariosMock: Array<Usuario & { senha: string }> = [
  {
    id: '1',
    nome: 'Administrador Sistema',
    email: 'admin@vidaplus.com.br',
    senha: 'admin123',
    perfil: 'ADMINISTRADOR',
    ativo: true,
  },
  {
    id: '2',
    nome: 'Dr. João Silva',
    email: 'medico@vidaplus.com.br',
    senha: 'medico123',
    perfil: 'MEDICO',
    ativo: true,
  },
  {
    id: '3',
    nome: 'Maria Santos',
    email: 'enfermeira@vidaplus.com.br',
    senha: 'enfermeira123',
    perfil: 'ENFERMEIRO',
    ativo: true,
  },
  {
    id: '4',
    nome: 'Carlos Oliveira',
    email: 'recepcionista@vidaplus.com.br',
    senha: 'recepcionista123',
    perfil: 'RECEPCIONISTA',
    ativo: true,
  },
  {
    id: '5',
    nome: 'Dra. Fernanda Rodrigues',
    email: 'fernanda.rodrigues@vidaplus.com.br',
    senha: 'medico123',
    perfil: 'MEDICO',
    ativo: true,
  },
  {
    id: '6',
    nome: 'Dr. Ricardo Pereira',
    email: 'ricardo.pereira@vidaplus.com.br',
    senha: 'medico123',
    perfil: 'MEDICO',
    ativo: true,
  },
  {
    id: '7',
    nome: 'Dra. Maria Santos',
    email: 'maria.medica@vidaplus.com.br',
    senha: 'medico123',
    perfil: 'MEDICO',
    ativo: true,
  },
  {
    id: '8',
    nome: 'Enf. Patrícia Souza',
    email: 'patricia.souza@vidaplus.com.br',
    senha: 'enfermeira123',
    perfil: 'ENFERMEIRO',
    ativo: true,
  },
  {
    id: '9',
    nome: 'Enf. Thiago Nunes',
    email: 'thiago.nunes@vidaplus.com.br',
    senha: 'enfermeira123',
    perfil: 'ENFERMEIRO',
    ativo: true,
  },
  {
    id: '10',
    nome: 'Téc. Gabriela Lopes',
    email: 'gabriela.lopes@vidaplus.com.br',
    senha: 'tecnico123',
    perfil: 'TECNICO',
    ativo: true,
  },
  {
    id: '11',
    nome: 'Ana Paula Costa',
    email: 'ana.recepcionista@vidaplus.com.br',
    senha: 'recepcionista123',
    perfil: 'RECEPCIONISTA',
    ativo: true,
  },
]

export const useAuthStore = create<AuthState>((set, get) => ({
  usuario: null,
  token: null,
  isAuthenticated: false,

  login: async (email: string, senha: string) => {
    const usuario = usuariosMock.find(
      (u) => u.email === email && u.senha === senha
    )

    if (usuario) {
      const { senha: _, ...usuarioSemSenha } = usuario
      const token = `token_${usuario.id}_${Date.now()}`

      const newState = {
        usuario: usuarioSemSenha,
        token,
        isAuthenticated: true,
      }

      set(newState)

      try {
        localStorage.setItem('auth-storage', JSON.stringify(newState))
      } catch (e) {
        console.error('Erro ao salvar no localStorage:', e)
      }

      return true
    }

    return false
  },

  logout: () => {
    set({
      usuario: null,
      token: null,
      isAuthenticated: false,
    })
    try {
      localStorage.removeItem('auth-storage')
    } catch (e) {
      console.error('Erro ao remover do localStorage:', e)
    }
  },

  getUsuario: () => get().usuario,

  isAdmin: () => {
    const usuario = get().usuario
    return usuario?.perfil === 'ADMINISTRADOR'
  },

  hasPermissao: (perfil: PerfilUsuario) => {
    const usuario = get().usuario
    if (!usuario) return false

    const hierarquia: Record<PerfilUsuario, number> = {
      ADMINISTRADOR: 5,
      MEDICO: 4,
      ENFERMEIRO: 3,
      TECNICO: 2,
      RECEPCIONISTA: 1,
      PACIENTE: 0,
    }

    return hierarquia[usuario.perfil] >= hierarquia[perfil]
  },
}))
