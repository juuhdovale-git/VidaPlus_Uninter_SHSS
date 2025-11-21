import { useState } from 'react'
import { Calendar, UserCheck, Filter, Plus, X } from 'lucide-react'
import { agendamentosMock, pacientesMock, profissionaisMock } from '../data/mockData'
import type { Agendamento } from '../types'
import Modal from '../components/Modal'

const formatarData = (data: string) => {
  const d = new Date(data)
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export default function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>(agendamentosMock)
  const [filtroStatus, setFiltroStatus] = useState<string>('TODOS')
  const [modalAberto, setModalAberto] = useState(false)
  const [formData, setFormData] = useState<Partial<Agendamento>>({
    pacienteId: '',
    profissionalId: '',
    dataHora: '',
    tipoConsulta: 'PRESENCIAL',
    status: 'AGENDADO',
    observacoes: '',
  })

  const agendamentosFiltrados = filtroStatus === 'TODOS'
    ? agendamentos
    : agendamentos.filter((a) => a.status === filtroStatus)

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      AGENDADO: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      CONFIRMADO: 'bg-green-100 text-green-800 border-green-200',
      CANCELADO: 'bg-red-100 text-red-800 border-red-200',
      REALIZADO: 'bg-primary-100 text-primary-800 border-primary-200',
      FALTOU: 'bg-gray-100 text-gray-800 border-gray-200',
    }
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const getTipoLabel = (tipo: string) => {
    const labels: Record<string, string> = {
      PRESENCIAL: 'Presencial',
      TELEMEDICINA: 'Telemedicina',
      URGENCIA: 'Urgência',
    }
    return labels[tipo] || tipo
  }

  const abrirModalNovo = () => {
    setFormData({
      pacienteId: '',
      profissionalId: '',
      dataHora: '',
      tipoConsulta: 'PRESENCIAL',
      status: 'AGENDADO',
      observacoes: '',
    })
    setModalAberto(true)
  }

  const salvarAgendamento = () => {
    const paciente = pacientesMock.find(p => p.id === formData.pacienteId)
    const profissional = profissionaisMock.find(p => p.id === formData.profissionalId)
    
    if (!paciente || !profissional || !formData.dataHora) {
      alert('Preencha todos os campos obrigatórios')
      return
    }

    const novoAgendamento: Agendamento = {
      id: Date.now().toString(),
      pacienteId: formData.pacienteId!,
      pacienteNome: paciente.nome,
      profissionalId: formData.profissionalId!,
      profissionalNome: profissional.nome,
      dataHora: formData.dataHora!,
      tipoConsulta: formData.tipoConsulta!,
      status: formData.status!,
      observacoes: formData.observacoes,
    }

    setAgendamentos([...agendamentos, novoAgendamento])
    setModalAberto(false)
  }

  const cancelarAgendamento = (id: string) => {
    if (window.confirm('Tem certeza que deseja cancelar este agendamento?')) {
      setAgendamentos(agendamentos.map(a =>
        a.id === id ? { ...a, status: 'CANCELADO' as const } : a
      ))
    }
  }

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Agendamentos</h2>
          <p className="text-sm text-gray-600">Gestão de consultas e agendamentos</p>
        </div>
        <button
          onClick={abrirModalNovo}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-700 hover:via-primary-600 hover:to-secondary-600 transition-all shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 font-bold text-sm"
        >
          <Plus size={18} />
          Novo Agendamento
        </button>
      </div>

      <div className="bg-white rounded-xl border-2 border-gray-200 p-4 shadow-sm flex-shrink-0">
        <div className="flex items-center gap-6">
          <Filter className="text-gray-400" size={22} />
          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            className="px-5 py-3 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="TODOS">Todos os Status</option>
            <option value="AGENDADO">Agendado</option>
            <option value="CONFIRMADO">Confirmado</option>
            <option value="CANCELADO">Cancelado</option>
            <option value="REALIZADO">Realizado</option>
            <option value="FALTOU">Faltou</option>
          </select>
          <div className="ml-auto text-base text-gray-600 font-medium">
            Total: <span className="font-bold text-primary-600">{agendamentosFiltrados.length}</span> agendamento(s)
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-y-auto">
        {agendamentosFiltrados.map((agendamento) => (
          <div
            key={agendamento.id}
            className="bg-white rounded-xl border-2 p-5 hover:shadow-xl transition-all"
            style={{
              borderColor: agendamento.status === 'AGENDADO' ? '#fef3c7' :
                          agendamento.status === 'CONFIRMADO' ? '#d1fae5' :
                          agendamento.status === 'REALIZADO' ? '#dbeafe' :
                          agendamento.status === 'CANCELADO' ? '#fee2e2' : '#f3f4f6'
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-gray-900 mb-2 truncate">
                  {agendamento.pacienteNome}
                </h3>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <UserCheck size={14} className="text-gray-400 flex-shrink-0" />
                    <span className="truncate">{agendamento.profissionalNome}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-gray-400 flex-shrink-0" />
                    <span>
                      {formatarData(agendamento.dataHora)}
                    </span>
                  </div>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full border-2 ml-2 flex-shrink-0 ${getStatusColor(agendamento.status)}`}>
                {agendamento.status}
              </span>
            </div>
            <div className="pt-4 border-t-2 border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-600">
                  Tipo: <span className="font-semibold text-gray-900">{getTipoLabel(agendamento.tipoConsulta)}</span>
                </span>
                <div className="flex items-center gap-2">
                  {agendamento.status === 'AGENDADO' && (
                    <>
                      <button className="px-3 py-1.5 text-xs text-primary-700 hover:bg-primary-50 rounded-lg transition-all font-bold border-2 border-primary-200 hover:border-primary-300">
                        Confirmar
                      </button>
                      <button
                        onClick={() => cancelarAgendamento(agendamento.id)}
                        className="px-3 py-1.5 text-xs text-red-700 hover:bg-red-50 rounded-lg transition-all flex items-center gap-1 font-bold border-2 border-red-200 hover:border-red-300"
                      >
                        <X size={14} />
                        Cancelar
                      </button>
                    </>
                  )}
                  {agendamento.status === 'CONFIRMADO' && (
                    <button className="px-3 py-1.5 text-xs text-green-700 hover:bg-green-50 rounded-lg transition-all font-bold border-2 border-green-200 hover:border-green-300">
                      Realizado
                    </button>
                  )}
                </div>
              </div>
              {agendamento.observacoes && (
                <p className="mt-2 text-xs text-gray-500 italic bg-gray-50 p-2 rounded-lg">
                  {agendamento.observacoes}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      {agendamentosFiltrados.length === 0 && (
        <div className="text-center py-16 text-gray-500 bg-white rounded-xl border-2 border-gray-200">
          <Calendar className="mx-auto text-gray-400 mb-4" size={56} />
          <p className="text-lg">Nenhum agendamento encontrado</p>
        </div>
      )}

      <Modal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        title="Novo Agendamento"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">Paciente *</label>
              <select
                value={formData.pacienteId || ''}
                onChange={(e) => setFormData({ ...formData, pacienteId: e.target.value })}
                className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">Selecione um paciente</option>
                {pacientesMock.map(p => (
                  <option key={p.id} value={p.id}>{p.nome}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">Profissional *</label>
              <select
                value={formData.profissionalId || ''}
                onChange={(e) => setFormData({ ...formData, profissionalId: e.target.value })}
                className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">Selecione um profissional</option>
                {profissionaisMock.map(p => (
                  <option key={p.id} value={p.id}>{p.nome}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">Data e Hora *</label>
              <input
                type="datetime-local"
                value={formData.dataHora || ''}
                onChange={(e) => setFormData({ ...formData, dataHora: e.target.value })}
                className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">Tipo de Consulta *</label>
              <select
                value={formData.tipoConsulta || 'PRESENCIAL'}
                onChange={(e) => setFormData({ ...formData, tipoConsulta: e.target.value as any })}
                className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="PRESENCIAL">Presencial</option>
                <option value="TELEMEDICINA">Telemedicina</option>
                <option value="URGENCIA">Urgência</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-base font-semibold text-gray-700 mb-2">Observações</label>
              <textarea
                value={formData.observacoes || ''}
                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500"
                rows={4}
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-8 border-t-2 border-gray-200">
            <button
              onClick={() => setModalAberto(false)}
              className="px-8 py-3.5 text-base text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all font-bold border-2 border-gray-200"
            >
              Cancelar
            </button>
            <button
              onClick={salvarAgendamento}
              className="px-8 py-3.5 bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 text-white rounded-xl hover:from-primary-700 hover:via-primary-600 hover:to-secondary-600 transition-all font-bold text-base shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40"
            >
              Agendar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
