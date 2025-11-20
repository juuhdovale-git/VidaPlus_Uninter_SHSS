import { FileText, Search, Plus } from 'lucide-react'

export default function Prontuarios() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Prontuários Eletrônicos</h2>
          <p className="text-lg text-gray-600">Gestão de prontuários e histórico clínico</p>
        </div>
        <button className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 text-white rounded-xl hover:from-primary-700 hover:via-primary-600 hover:to-secondary-600 transition-all shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 font-bold text-base">
          <Plus size={22} />
          Novo Prontuário
        </button>
      </div>

      <div className="bg-white rounded-2xl border-2 border-gray-200 p-12 shadow-md">
        <div className="text-center py-16">
          <FileText className="mx-auto text-gray-400 mb-6" size={64} />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Módulo em Desenvolvimento</h3>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            A funcionalidade de prontuários eletrônicos está sendo implementada.
          </p>
        </div>
      </div>
    </div>
  )
}
