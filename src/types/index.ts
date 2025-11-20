export type PerfilUsuario = 
  | 'ADMINISTRADOR'
  | 'MEDICO'
  | 'ENFERMEIRO'
  | 'TECNICO'
  | 'RECEPCIONISTA'
  | 'PACIENTE'

export interface Usuario {
  id: string
  nome: string
  email: string
  perfil: PerfilUsuario
  ativo: boolean
}

export interface Paciente {
  id: string
  nome: string
  cpf: string
  dataNascimento: string
  telefone: string
  email: string
  endereco: string
  cidade: string
  estado: string
  convenio: string
  alergias: string[]
  medicamentosUso: string[]
  dataCadastro: string
}

export interface Profissional {
  id: string
  nome: string
  crmCoren: string
  especialidade: string
  tipoProfissional: 'MEDICO' | 'ENFERMEIRO' | 'TECNICO'
  email: string
  telefone: string
  ativo: boolean
}

export interface Agendamento {
  id: string
  pacienteId: string
  pacienteNome: string
  profissionalId: string
  profissionalNome: string
  dataHora: string
  tipoConsulta: 'PRESENCIAL' | 'TELEMEDICINA' | 'URGENCIA'
  status: 'AGENDADO' | 'CONFIRMADO' | 'CANCELADO' | 'REALIZADO' | 'FALTOU'
  observacoes?: string
}

export interface Leito {
  id: string
  numero: string
  setor: string
  tipoLeito: 'ENFERMARIA' | 'UTI' | 'ISOLAMENTO'
  status: 'DISPONIVEL' | 'OCUPADO' | 'MANUTENCAO' | 'RESERVADO'
  pacienteId?: string
  pacienteNome?: string
  dataOcupacao?: string
}

export interface Suprimento {
  id: string
  nome: string
  categoria: string
  quantidadeAtual: number
  estoqueMinimo: number
  unidadeMedida: string
  fornecedor: string
  valorUnitario: number
}

