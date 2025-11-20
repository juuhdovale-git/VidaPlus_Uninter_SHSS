import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  FileText,
  Bed,
  Package,
  Settings,
} from 'lucide-react'
import { useAuthStore } from '../store/authStore'

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, perfil: null },
  { path: '/pacientes', label: 'Pacientes', icon: Users, perfil: null },
  { path: '/profissionais', label: 'Profissionais', icon: UserCheck, perfil: null },
  { path: '/agendamentos', label: 'Agendamentos', icon: Calendar, perfil: null },
  { path: '/prontuarios', label: 'Prontuários', icon: FileText, perfil: ['MEDICO', 'ENFERMEIRO'] },
  { path: '/leitos', label: 'Leitos', icon: Bed, perfil: ['ADMINISTRADOR', 'ENFERMEIRO'] },
  { path: '/suprimentos', label: 'Suprimentos', icon: Package, perfil: ['ADMINISTRADOR'] },
  { path: '/configuracoes', label: 'Configurações', icon: Settings, perfil: ['ADMINISTRADOR'] },
]

export default function Sidebar() {
  const usuario = useAuthStore((state) => state.usuario)

  const canAccess = (perfil: string[] | null) => {
    if (!perfil) return true
    if (!usuario) return false
    return perfil.includes(usuario.perfil)
  }

  const filteredMenu = menuItems.filter((item) => canAccess(item.perfil))

  return (
    <aside className="w-72 bg-white shadow-lg border-r-2 border-gray-100">
      <nav className="p-6">
        <ul className="space-y-3">
          {filteredMenu.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-5 py-4 rounded-xl transition-all text-base font-medium ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-700 border-2 border-primary-200 shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                    }`
                  }
                >
                  <Icon size={22} />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
