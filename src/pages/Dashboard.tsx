import { Users, UserCheck, Calendar, Bed, Activity, Clock, AlertCircle } from 'lucide-react'
import { pacientesMock, profissionaisMock, agendamentosMock, leitosMock } from '../data/mockData'
import { useAuthStore } from '../store/authStore'

export default function Dashboard() {
  const usuario = useAuthStore((state) => state.usuario)
  const totalPacientes = pacientesMock.length
  const totalProfissionais = profissionaisMock.length
  
  const hoje = new Date()
  const agendamentosHoje = agendamentosMock.filter((a) => {
    const dataAgendamento = new Date(a.dataHora)
    return dataAgendamento.toDateString() === hoje.toDateString()
  }).length

  const leitosOcupados = leitosMock.filter((l) => l.status === 'OCUPADO').length
  const leitosDisponiveis = leitosMock.filter((l) => l.status === 'DISPONIVEL').length
  const taxaOcupacao = leitosMock.length > 0 
    ? Math.round((leitosOcupados / leitosMock.length) * 100) 
    : 0

  const agendamentosProximos = agendamentosMock
    .filter(a => new Date(a.dataHora) > hoje)
    .sort((a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime())
    .slice(0, 5)

  const formatarData = (data: string) => {
    const d = new Date(data)
    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatarDataCompleta = () => {
    const hoje = new Date(2025, 10, 15) // Novembro 2025
    const dias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
    const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
    return `${dias[hoje.getDay()]}, ${hoje.getDate()} de ${meses[hoje.getMonth()]} de ${hoje.getFullYear()}`
  }

  const cards = [
    {
      title: 'Total de Pacientes',
      value: totalPacientes,
      icon: Users,
      color: 'bg-primary-500',
      bgColor: 'bg-primary-50',
      textColor: 'text-primary-600',
      change: '+12%',
      changeType: 'positive',
    },
    {
      title: 'Profissionais Ativos',
      value: totalProfissionais,
      icon: UserCheck,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      change: '+5%',
      changeType: 'positive',
    },
    {
      title: 'Agendamentos Hoje',
      value: agendamentosHoje,
      icon: Calendar,
      color: 'bg-primary-400',
      bgColor: 'bg-primary-50',
      textColor: 'text-primary-600',
      change: agendamentosHoje > 0 ? `${agendamentosHoje} agendado(s)` : 'Nenhum hoje',
      changeType: 'neutral',
    },
    {
      title: 'Leitos Ocupados',
      value: `${leitosOcupados}/${leitosMock.length}`,
      icon: Bed,
      color: 'bg-secondary-500',
      bgColor: 'bg-secondary-50',
      textColor: 'text-secondary-600',
      change: `${taxaOcupacao}% ocupação`,
      changeType: 'neutral',
    },
  ]

  const agendamentosPorStatus = {
    AGENDADO: agendamentosMock.filter(a => a.status === 'AGENDADO').length,
    CONFIRMADO: agendamentosMock.filter(a => a.status === 'CONFIRMADO').length,
    REALIZADO: agendamentosMock.filter(a => a.status === 'REALIZADO').length,
    CANCELADO: agendamentosMock.filter(a => a.status === 'CANCELADO').length,
  }

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h2>
          <p className="text-sm text-gray-600">
            Bem-vindo, {usuario?.nome || 'Usuário'}! Aqui está o resumo do sistema.
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 mb-1">Hoje</p>
          <p className="text-base font-semibold text-gray-900">
            {formatarDataCompleta()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-shrink-0">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.title}
              className={`${card.bgColor} rounded-xl p-5 border-2 border-gray-100 shadow-md hover:shadow-lg transition-all`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`${card.color} p-3 rounded-lg shadow-md`}>
                  <Icon className="text-white" size={20} />
                </div>
                {card.changeType === 'positive' && (
                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    {card.change}
                  </span>
                )}
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1 font-medium">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                {card.changeType === 'neutral' && (
                  <p className="text-xs text-gray-500 mt-1">{card.change}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0">
        <div className="lg:col-span-2 space-y-4 flex flex-col min-h-0">
          <div className="bg-white rounded-xl p-5 border-2 border-gray-100 shadow-md flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Ocupação de Leitos</h3>
              <Activity className="text-gray-400" size={18} />
            </div>
            <div className="space-y-4 flex-1">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 font-medium">Taxa de Ocupação</span>
                  <span className="font-bold text-gray-900 text-base">{taxaOcupacao}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      taxaOcupacao > 80 ? 'bg-red-500' :
                      taxaOcupacao > 60 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${taxaOcupacao}%` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-100">
                  <p className="text-2xl font-bold text-green-600 mb-1">{leitosDisponiveis}</p>
                  <p className="text-xs text-gray-600 font-medium">Disponíveis</p>
                </div>
                <div className="text-center p-4 bg-primary-50 rounded-lg border-2 border-primary-100">
                  <p className="text-2xl font-bold text-primary-600 mb-1">{leitosOcupados}</p>
                  <p className="text-xs text-gray-600 font-medium">Ocupados</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg border-2 border-gray-100">
                  <p className="text-2xl font-bold text-gray-600 mb-1">{leitosMock.length}</p>
                  <p className="text-xs text-gray-600 font-medium">Total</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border-2 border-gray-100 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Agendamentos por Status</h3>
              <Calendar className="text-gray-400" size={18} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="text-center p-4 bg-yellow-50 rounded-lg border-2 border-yellow-100">
                <p className="text-xl font-bold text-yellow-600 mb-1">{agendamentosPorStatus.AGENDADO}</p>
                <p className="text-xs text-gray-600 font-medium">Agendados</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-100">
                <p className="text-xl font-bold text-green-600 mb-1">{agendamentosPorStatus.CONFIRMADO}</p>
                <p className="text-xs text-gray-600 font-medium">Confirmados</p>
              </div>
              <div className="text-center p-4 bg-primary-50 rounded-lg border-2 border-primary-100">
                <p className="text-xl font-bold text-primary-600 mb-1">{agendamentosPorStatus.REALIZADO}</p>
                <p className="text-xs text-gray-600 font-medium">Realizados</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg border-2 border-red-100">
                <p className="text-xl font-bold text-red-600 mb-1">{agendamentosPorStatus.CANCELADO}</p>
                <p className="text-xs text-gray-600 font-medium">Cancelados</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 flex flex-col min-h-0">
          <div className="bg-white rounded-xl p-5 border-2 border-gray-100 shadow-md flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-gray-900">Próximos Agendamentos</h3>
              <Clock className="text-gray-400" size={18} />
            </div>
            <div className="space-y-2 flex-1 overflow-y-auto">
              {agendamentosProximos.length > 0 ? (
                agendamentosProximos.slice(0, 3).map((agendamento) => (
                  <div
                    key={agendamento.id}
                    className="flex items-start justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-xs mb-1 truncate">{agendamento.pacienteNome}</p>
                      <p className="text-xs text-gray-600 mb-1">
                        {formatarData(agendamento.dataHora)}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{agendamento.profissionalNome}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ml-2 flex-shrink-0 ${
                        agendamento.status === 'AGENDADO'
                          ? 'bg-yellow-100 text-yellow-800'
                          : agendamento.status === 'CONFIRMADO'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {agendamento.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="mx-auto text-gray-400 mb-2" size={32} />
                  <p className="text-xs">Nenhum agendamento próximo</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border-2 border-gray-100 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-gray-900">Alertas</h3>
              <AlertCircle className="text-gray-400" size={18} />
            </div>
            <div className="space-y-2">
              {leitosDisponiveis < 3 && (
                <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
                  <p className="text-xs font-semibold text-yellow-800 mb-1">
                    Poucos leitos disponíveis
                  </p>
                  <p className="text-xs text-yellow-600">
                    Apenas {leitosDisponiveis} leito(s)
                  </p>
                </div>
              )}
              {agendamentosHoje === 0 && (
                <div className="p-3 bg-primary-50 border-l-4 border-primary-500 rounded-lg">
                  <p className="text-xs font-semibold text-primary-800">
                    Nenhum agendamento hoje
                  </p>
                </div>
              )}
              {taxaOcupacao > 80 && (
                <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-lg">
                  <p className="text-xs font-semibold text-red-800 mb-1">
                    Alta ocupação
                  </p>
                  <p className="text-xs text-red-600">
                    {taxaOcupacao}% ocupado
                  </p>
                </div>
              )}
              {agendamentosHoje > 0 && leitosDisponiveis >= 3 && taxaOcupacao <= 80 && (
                <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded-lg">
                  <p className="text-xs font-semibold text-green-800">
                    Sistema normal
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
