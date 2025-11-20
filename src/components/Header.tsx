import { useAuthStore } from '../store/authStore'
import { LogOut, Bell } from 'lucide-react'
import Logo from './Logo'

export default function Header() {
  const usuario = useAuthStore((state) => state.usuario)
  const logout = useAuthStore((state) => state.logout)

  const getPerfilLabel = (perfil: string) => {
    const labels: Record<string, string> = {
      ADMINISTRADOR: 'Administrador',
      MEDICO: 'Médico',
      ENFERMEIRO: 'Enfermeiro',
      TECNICO: 'Técnico',
      RECEPCIONISTA: 'Recepcionista',
      PACIENTE: 'Paciente',
    }
    return labels[perfil] || perfil
  }

  return (
    <header className="bg-white shadow-md border-b-2 border-gray-100">
      <div className="flex items-center justify-between px-8 py-5">
        <Logo size="md" />
        <div className="flex items-center gap-6">
          <button className="p-3 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors relative">
            <Bell size={22} />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-base font-semibold text-gray-900">{usuario?.nome}</p>
              <p className="text-sm text-gray-500">{getPerfilLabel(usuario?.perfil || '')}</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-5 py-2.5 text-base text-gray-700 hover:bg-gray-100 rounded-xl transition-colors font-medium"
            >
              <LogOut size={18} />
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
