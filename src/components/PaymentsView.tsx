import { DollarSign, Download, ArrowUpRight, ArrowDownRight, Filter } from 'lucide-react';

export default function PaymentsView() {
  const transactions = [
    { id: 1, user: 'Ana García', amount: '$45.00', date: 'Hoy, 10:23 AM', status: 'completed', plan: 'Premium Anual' },
    { id: 2, user: 'Miguel Ángel Torres', amount: '$30.00', date: 'Ayer, 4:15 PM', status: 'completed', plan: 'Premium Mensual' },
    { id: 3, user: 'Carlos Rodríguez', amount: '$25.00', date: '20 Feb, 2:30 PM', status: 'failed', plan: 'Básico Mensual' },
    { id: 4, user: 'Lucía Méndez', amount: '$150.00', date: '19 Feb, 11:00 AM', status: 'completed', plan: 'Estudiante Trimestral' },
    { id: 5, user: 'Sofía Valdés', amount: '$25.00', date: '18 Feb, 9:45 AM', status: 'refunded', plan: 'Básico Semestral' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Historial de Pagos</h2>
          <p className="text-gray-500 text-sm mt-1">Gestiona las transacciones y facturas.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Filter size={16} />
            Filtrar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm">
            <Download size={16} />
            Exportar CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <DollarSign size={20} />
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              <ArrowUpRight size={12} /> +8.2%
            </span>
          </div>
          <p className="text-sm text-gray-500 font-medium">Ingresos Hoy</p>
          <p className="text-2xl font-semibold text-gray-900">$1,250.00</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <DollarSign size={20} />
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              <ArrowUpRight size={12} /> +12.5%
            </span>
          </div>
          <p className="text-sm text-gray-500 font-medium">Ingresos Mes</p>
          <p className="text-2xl font-semibold text-gray-900">$45,231.00</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
              <ArrowDownRight size={20} />
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-rose-600 bg-rose-50 px-2 py-1 rounded-full">
              <ArrowUpRight size={12} /> +2.1%
            </span>
          </div>
          <p className="text-sm text-gray-500 font-medium">Pagos Fallidos</p>
          <p className="text-2xl font-semibold text-gray-900">12</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 text-xs uppercase tracking-wider text-gray-500 font-medium border-b border-gray-100">
              <th className="px-6 py-3">Usuario</th>
              <th className="px-6 py-3">Plan</th>
              <th className="px-6 py-3">Fecha</th>
              <th className="px-6 py-3">Monto</th>
              <th className="px-6 py-3">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{tx.user}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{tx.plan}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{tx.date}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{tx.amount}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${tx.status === 'completed' ? 'bg-emerald-50 text-emerald-700' : 
                      tx.status === 'failed' ? 'bg-rose-50 text-rose-700' : 
                      'bg-gray-100 text-gray-700'}`}>
                    {tx.status === 'completed' ? 'Completado' : tx.status === 'failed' ? 'Fallido' : 'Reembolsado'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
