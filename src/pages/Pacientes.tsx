import { useState } from 'react'
import { Search, Eye, Edit, Trash2, UserPlus } from 'lucide-react'
import { pacientesMock } from '../data/mockData'
import type { Paciente } from '../types'
import Modal from '../components/Modal'

export default function Pacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>(pacientesMock)
  const [busca, setBusca] = useState('')
  const [modalAberto, setModalAberto] = useState(false)
  const [modalDetalhes, setModalDetalhes] = useState(false)
  const [pacienteSelecionado, setPacienteSelecionado] = useState<Paciente | null>(null)
  const [modoEdicao, setModoEdicao] = useState(false)
  const [formData, setFormData] = useState<Partial<Paciente>>({
    nome: '',
    cpf: '',
    dataNascimento: '',
    telefone: '',
    email: '',
    endereco: '',
    cidade: '',
    estado: '',
    convenio: '',
    alergias: [],
    medicamentosUso: [],
  })

  const pacientesFiltrados = pacientes.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase()) ||
    p.cpf.includes(busca) ||
    p.email.toLowerCase().includes(busca.toLowerCase())
  )

  const abrirModalNovo = () => {
    setModoEdicao(false)
    setFormData({
      nome: '',
      cpf: '',
      dataNascimento: '',
      telefone: '',
      email: '',
      endereco: '',
      cidade: '',
      estado: '',
      convenio: '',
      alergias: [],
      medicamentosUso: [],
    })
    setModalAberto(true)
  }

  const abrirModalEdicao = (paciente: Paciente) => {
    setModoEdicao(true)
    setFormData(paciente)
    setPacienteSelecionado(paciente)
    setModalAberto(true)
  }

  const abrirDetalhes = (paciente: Paciente) => {
    setPacienteSelecionado(paciente)
    setModalDetalhes(true)
  }

  const salvarPaciente = () => {
    if (modoEdicao && pacienteSelecionado) {
      setPacientes(pacientes.map(p => 
        p.id === pacienteSelecionado.id 
          ? { ...pacienteSelecionado, ...formData } as Paciente
          : p
      ))
    } else {
      const novoPaciente: Paciente = {
        id: Date.now().toString(),
        ...formData,
        dataCadastro: new Date().toISOString().split('T')[0],
      } as Paciente
      setPacientes([...pacientes, novoPaciente])
    }
    setModalAberto(false)
    setFormData({})
  }

  const excluirPaciente = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este paciente?')) {
      setPacientes(pacientes.filter(p => p.id !== id))
    }
  }

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Pacientes</h2>
          <p className="text-sm text-gray-600">Gestão de pacientes cadastrados</p>
        </div>
        <button
          onClick={abrirModalNovo}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-700 hover:via-primary-600 hover:to-secondary-600 transition-all shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 font-bold text-sm"
        >
          <UserPlus size={18} />
          Novo Paciente
        </button>
      </div>

      <div className="bg-white rounded-xl border-2 border-gray-200 p-4 shadow-sm flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome, CPF ou email..."
            className="w-full pl-12 pr-4 py-3.5 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-md flex-1 min-h-0 flex flex-col">
        <div className="overflow-auto flex-1">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-primary-50 to-secondary-50 sticky top-0">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  CPF
                </th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Telefone
                </th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Convênio
                </th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Data Cadastro
                </th>
                <th className="px-4 py-2 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pacientesFiltrados.map((paciente) => (
                <tr key={paciente.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{paciente.nome}</div>
                    <div className="text-xs text-gray-500">{paciente.email}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {paciente.cpf}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {paciente.telefone}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {paciente.convenio}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {new Date(paciente.dataCadastro).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => abrirDetalhes(paciente)}
                        className="text-primary-700 hover:text-primary-800 p-2 hover:bg-primary-50 rounded-lg transition-all border-2 border-transparent hover:border-primary-200"
                        title="Ver detalhes"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => abrirModalEdicao(paciente)}
                        className="text-green-700 hover:text-green-800 p-2 hover:bg-green-50 rounded-lg transition-all border-2 border-transparent hover:border-green-200"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => excluirPaciente(paciente.id)}
                        className="text-red-700 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-all border-2 border-transparent hover:border-red-200"
                        title="Excluir"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {pacientesFiltrados.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <UserPlus className="mx-auto text-gray-400 mb-2" size={40} />
            <p className="text-sm">Nenhum paciente encontrado</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        title={modoEdicao ? 'Editar Paciente' : 'Novo Paciente'}
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">Nome Completo *</label>
              <input
                type="text"
                value={formData.nome || ''}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">CPF *</label>
              <input
                type="text"
                value={formData.cpf || ''}
                onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">Data de Nascimento *</label>
              <input
                type="date"
                value={formData.dataNascimento || ''}
                onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}
                className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">Telefone *</label>
              <input
                type="tel"
                value={formData.telefone || ''}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">Convênio</label>
              <input
                type="text"
                value={formData.convenio || ''}
                onChange={(e) => setFormData({ ...formData, convenio: e.target.value })}
                className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">Endereço</label>
              <input
                type="text"
                value={formData.endereco || ''}
                onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-base font-semibold text-gray-700 mb-2">Cidade</label>
                <input
                  type="text"
                  value={formData.cidade || ''}
                  onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                  className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-700 mb-2">Estado</label>
                <input
                  type="text"
                  value={formData.estado || ''}
                  onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                  className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500"
                />
              </div>
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
              onClick={salvarPaciente}
              className="px-8 py-3.5 bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 text-white rounded-xl hover:from-primary-700 hover:via-primary-600 hover:to-secondary-600 transition-all font-bold text-base shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40"
            >
              {modoEdicao ? 'Salvar Alterações' : 'Cadastrar Paciente'}
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalDetalhes}
        onClose={() => setModalDetalhes(false)}
        title={`Detalhes - ${pacienteSelecionado?.nome}`}
        size="lg"
      >
        {pacienteSelecionado && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Nome Completo</p>
                <p className="text-base font-semibold">{pacienteSelecionado.nome}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">CPF</p>
                <p className="text-base font-semibold">{pacienteSelecionado.cpf}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Data de Nascimento</p>
                <p className="text-base font-semibold">
                  {new Date(pacienteSelecionado.dataNascimento).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Telefone</p>
                <p className="text-base font-semibold">{pacienteSelecionado.telefone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="text-base font-semibold">{pacienteSelecionado.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Convênio</p>
                <p className="text-base font-semibold">{pacienteSelecionado.convenio}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500 mb-1">Endereço</p>
                <p className="text-base font-semibold">
                  {pacienteSelecionado.endereco}, {pacienteSelecionado.cidade} - {pacienteSelecionado.estado}
                </p>
              </div>
              {pacienteSelecionado.alergias && pacienteSelecionado.alergias.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Alergias</p>
                  <p className="text-base font-semibold">{pacienteSelecionado.alergias.join(', ')}</p>
                </div>
              )}
              {pacienteSelecionado.medicamentosUso && pacienteSelecionado.medicamentosUso.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Medicamentos em Uso</p>
                  <p className="text-base font-semibold">{pacienteSelecionado.medicamentosUso.join(', ')}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
