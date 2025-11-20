import { Bed, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { leitosMock } from '../data/mockData'
import type { Leito } from '../types'

export default function Leitos() {
  const leitos = leitosMock

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'DISPONIVEL':
        return <CheckCircle className="text-green-500" size={24} />
      case 'OCUPADO':
        return <XCircle className="text-primary-600" size={24} />
      case 'MANUTENCAO':
        return <AlertCircle className="text-yellow-500" size={24} />
      default:
        return <Bed className="text-gray-500" size={24} />
    }
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      DISPONIVEL: 'Disponível',
      OCUPADO: 'Ocupado',
      MANUTENCAO: 'Manutenção',
      RESERVADO: 'Reservado',
    }
    return labels[status] || status
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      DISPONIVEL: 'bg-green-50 text-green-800 border-green-200',
      OCUPADO: 'bg-primary-50 text-primary-800 border-primary-200',
      MANUTENCAO: 'bg-yellow-50 text-yellow-800 border-yellow-200',
      RESERVADO: 'bg-secondary-50 text-secondary-800 border-secondary-200',
    }
    return colors[status] || 'bg-gray-50 text-gray-800 border-gray-200'
  }

  const getTipoLabel = (tipo: string) => {
    const labels: Record<string, string> = {
      ENFERMARIA: 'Enfermaria',
      UTI: 'UTI',
      ISOLAMENTO: 'Isolamento',
    }
    return labels[tipo] || tipo
  }

  const leitosPorSetor = leitos.reduce((acc, leito) => {
    if (!acc[leito.setor]) {
      acc[leito.setor] = []
    }
    acc[leito.setor].push(leito)
    return acc
  }, {} as Record<string, Leito[]>)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Gestão de Leitos</h2>
        <p className="text-lg text-gray-600">Controle de ocupação e disponibilidade de leitos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <span className="text-base text-gray-600 font-medium">Total de Leitos</span>
            <Bed className="text-gray-400" size={24} />
          </div>
          <p className="text-4xl font-bold text-gray-900">{leitos.length}</p>
        </div>
        <div className="bg-white rounded-2xl border-2 border-green-200 p-8 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <span className="text-base text-gray-600 font-medium">Disponíveis</span>
            <CheckCircle className="text-green-500" size={24} />
          </div>
          <p className="text-4xl font-bold text-green-600">
            {leitos.filter((l) => l.status === 'DISPONIVEL').length}
          </p>
        </div>
        <div className="bg-white rounded-2xl border-2 border-primary-200 p-8 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <span className="text-base text-gray-600 font-medium">Ocupados</span>
            <XCircle className="text-primary-600" size={24} />
          </div>
          <p className="text-4xl font-bold text-primary-600">
            {leitos.filter((l) => l.status === 'OCUPADO').length}
          </p>
        </div>
        <div className="bg-white rounded-2xl border-2 border-secondary-200 p-8 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <span className="text-base text-gray-600 font-medium">Taxa de Ocupação</span>
            <AlertCircle className="text-secondary-500" size={24} />
          </div>
          <p className="text-4xl font-bold text-secondary-600">
            {Math.round((leitos.filter((l) => l.status === 'OCUPADO').length / leitos.length) * 100)}%
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {Object.entries(leitosPorSetor).map(([setor, leitosSetor]) => (
          <div key={setor} className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{setor}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {leitosSetor.map((leito) => (
                <div
                  key={leito.id}
                  className={`border-2 rounded-2xl p-6 ${getStatusColor(leito.status)}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(leito.status)}
                      <span className="font-bold text-lg">Leito {leito.numero}</span>
                    </div>
                    <span className="text-sm font-semibold">{getStatusLabel(leito.status)}</span>
                  </div>
                  <div className="text-base space-y-2 mb-4">
                    <p>
                      <span className="font-semibold">Tipo:</span> {getTipoLabel(leito.tipoLeito)}
                    </p>
                    {leito.pacienteNome && (
                      <p>
                        <span className="font-semibold">Paciente:</span> {leito.pacienteNome}
                      </p>
                    )}
                    {leito.dataOcupacao && (
                      <p>
                        <span className="font-semibold">Ocupado desde:</span>{' '}
                        {new Date(leito.dataOcupacao).toLocaleDateString('pt-BR')}
                      </p>
                    )}
                  </div>
                  {leito.status === 'DISPONIVEL' && (
                    <button className="w-full px-5 py-3.5 text-base bg-white text-green-700 rounded-xl hover:bg-green-50 transition-all font-bold border-2 border-green-200 hover:border-green-300">
                      Alocar Paciente
                    </button>
                  )}
                  {leito.status === 'OCUPADO' && (
                    <button className="w-full px-5 py-3.5 text-base bg-white text-primary-700 rounded-xl hover:bg-primary-50 transition-all font-bold border-2 border-primary-200 hover:border-primary-300">
                      Liberar Leito
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
