import { Settings } from 'lucide-react'

export default function Configuracoes() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Configurações</h2>
        <p className="text-lg text-gray-600">Configurações do sistema</p>
      </div>

      <div className="bg-white rounded-2xl border-2 border-gray-200 p-12 shadow-md">
        <div className="text-center py-16">
          <Settings className="mx-auto text-gray-400 mb-6" size={64} />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Módulo em Desenvolvimento</h3>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            As configurações do sistema estão sendo implementadas.
          </p>
        </div>
      </div>
    </div>
  )
}
