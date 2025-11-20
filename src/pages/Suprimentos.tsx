import { Package, AlertTriangle, CheckCircle } from 'lucide-react'
import { suprimentosMock } from '../data/mockData'
import type { Suprimento } from '../types'

export default function Suprimentos() {
  const suprimentos = suprimentosMock

  const getStatusEstoque = (suprimento: Suprimento) => {
    if (suprimento.quantidadeAtual <= suprimento.estoqueMinimo) {
      return { label: 'Estoque Baixo', color: 'bg-red-100 text-red-800', icon: AlertTriangle }
    }
    if (suprimento.quantidadeAtual <= suprimento.estoqueMinimo * 1.5) {
      return { label: 'Atenção', color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle }
    }
    return { label: 'Normal', color: 'bg-green-100 text-green-800', icon: CheckCircle }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Gestão de Suprimentos</h2>
        <p className="text-lg text-gray-600">Controle de estoque e suprimentos hospitalares</p>
      </div>

      <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-primary-50 to-secondary-50">
              <tr>
                <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Quantidade
                </th>
                <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Estoque Mínimo
                </th>
                <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Fornecedor
                </th>
                <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Valor Unitário
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y-2 divide-gray-200">
              {suprimentos.map((suprimento) => {
                const status = getStatusEstoque(suprimento)
                const StatusIcon = status.icon
                return (
                  <tr key={suprimento.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="text-base font-semibold text-gray-900">{suprimento.nome}</div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-base text-gray-900">
                      {suprimento.categoria}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="text-base text-gray-900 font-semibold">
                        {suprimento.quantidadeAtual} {suprimento.unidadeMedida}
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-base text-gray-900">
                      {suprimento.estoqueMinimo} {suprimento.unidadeMedida}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-full ${status.color}`}>
                        <StatusIcon size={16} />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-base text-gray-900">
                      {suprimento.fornecedor}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-base text-gray-900 font-semibold">
                      R$ {suprimento.valorUnitario.toFixed(2)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
