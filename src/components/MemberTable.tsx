import { MoreHorizontal, MessageCircle, AlertCircle, CheckCircle2, Clock, Edit2, Trash2, Plus } from 'lucide-react';
import { Member } from '../data';
import { useState } from 'react';

interface MemberTableProps {
  members: Member[];
  onSendReminder: (member: Member) => void;
  onEdit: (member: Member) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

export default function MemberTable({ members, onSendReminder, onEdit, onDelete, onAdd }: MemberTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const getStatusBadge = (status: Member['status']) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
            <CheckCircle2 size={12} />
            Al día
          </span>
        );
      case 'overdue':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-100">
            <AlertCircle size={12} />
            Vencido
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
            <Clock size={12} />
            Pendiente
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-visible">
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h3 className="font-semibold text-gray-900">Lista de Socios</h3>
        <div className="flex gap-3">
          <button 
            onClick={onAdd}
            className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Plus size={16} />
            Nuevo Socio
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 text-xs uppercase tracking-wider text-gray-500 font-medium border-b border-gray-100">
              <th className="px-6 py-3">Socio</th>
              <th className="px-6 py-3">Plan</th>
              <th className="px-6 py-3">Vencimiento</th>
              <th className="px-6 py-3">Estado</th>
              <th className="px-6 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {members.length > 0 ? (
              members.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50/80 transition-colors group relative">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={member.avatar} 
                        alt={member.name} 
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 font-medium bg-gray-100 px-2 py-1 rounded-md">
                      {member.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 font-mono">
                      {new Date(member.dueDate).toLocaleDateString('es-ES', { 
                        day: '2-digit', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(member.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => onSendReminder(member)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Enviar WhatsApp"
                      >
                        <MessageCircle size={18} />
                      </button>
                      
                      <div className="relative">
                        <button 
                          onClick={() => setOpenMenuId(openMenuId === member.id ? null : member.id)}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreHorizontal size={18} />
                        </button>
                        
                        {openMenuId === member.id && (
                          <>
                            <div 
                              className="fixed inset-0 z-10" 
                              onClick={() => setOpenMenuId(null)}
                            />
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-20 overflow-hidden py-1">
                              <button 
                                onClick={() => {
                                  onEdit(member);
                                  setOpenMenuId(null);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Edit2 size={16} />
                                Editar
                              </button>
                              <button 
                                onClick={() => {
                                  onDelete(member.id);
                                  setOpenMenuId(null);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                              >
                                <Trash2 size={16} />
                                Eliminar
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                  No se encontraron socios con ese nombre.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
