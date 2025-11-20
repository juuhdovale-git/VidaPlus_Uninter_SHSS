import { useState } from 'react'
import { Search, Plus, Edit, Trash2 } from 'lucide-react'
import { profissionaisMock } from '../data/mockData'
import type { Profissional } from '../types'

export default function Profissionais() {
  const [profissionais] = useState<Profissional[]>(profissionaisMock)
  const [busca, setBusca] = useState('')

  const profissionaisFiltrados = profissionais.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase()) ||
    p.crmCoren.toLowerCase().includes(busca.toLowerCase()) ||
    p.especialidade.toLowerCase().includes(busca.toLowerCase())
  )

  const getTipoLabel = (tipo: string) => {
    const labels: Record<string, string> = {
      MEDICO: 'Médico',
      ENFERMEIRO: 'Enfermeiro',
      TECNICO: 'Técnico',
    }
    return labels[tipo] || tipo
  }

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Profissionais</h2>
          <p className="text-sm text-gray-600">Gestão de profissionais de saúde</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-700 hover:via-primary-600 hover:to-secondary-600 transition-all shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 font-bold text-sm">
          <Plus size={18} />
          Novo Profissional
        </button>
      </div>

      <div className="bg-white rounded-xl border-2 border-gray-200 p-4 shadow-sm flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome, CRM/COREN ou especialidade..."
            className="w-full pl-12 pr-4 py-3.5 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 overflow-y-auto">
        {profissionaisFiltrados.map((profissional) => (
          <div
            key={profissional.id}
            className="bg-white rounded-xl border-2 border-gray-200 p-5 hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1">{profissional.nome}</h3>
                <p className="text-xs text-gray-500">{profissional.crmCoren}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                profissional.ativo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {profissional.ativo ? 'Ativo' : 'Inativo'}
              </span>
            </div>
            <div className="space-y-2 mb-4">
              <p className="text-xs text-gray-600">
                <span className="font-semibold">Especialidade:</span> {profissional.especialidade}
              </p>
              <p className="text-xs text-gray-600">
                <span className="font-semibold">Tipo:</span> {getTipoLabel(profissional.tipoProfissional)}
              </p>
              <p className="text-xs text-gray-600">
                <span className="font-semibold">Email:</span> {profissional.email}
              </p>
              <p className="text-xs text-gray-600">
                <span className="font-semibold">Telefone:</span> {profissional.telefone}
              </p>
            </div>
            <div className="flex items-center gap-2 pt-4 border-t-2 border-gray-200">
              <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs text-primary-700 hover:bg-primary-50 rounded-lg transition-all font-bold border-2 border-primary-200 hover:border-primary-300">
                <Edit size={14} />
                Editar
              </button>
              <button className="flex items-center justify-center gap-1 px-3 py-2 text-xs text-red-700 hover:bg-red-50 rounded-lg transition-all font-bold border-2 border-red-200 hover:border-red-300">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {profissionaisFiltrados.length === 0 && (
        <div className="text-center py-16 text-gray-500 bg-white rounded-xl border-2 border-gray-200">
          <p className="text-lg">Nenhum profissional encontrado</p>
        </div>
      )}
    </div>
  )
}
