/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatsCard from './components/StatsCard';
import MemberTable from './components/MemberTable';
import SendReminderModal from './components/Modal';
import MemberFormModal from './components/MemberFormModal';
import PaymentsView from './components/PaymentsView';
import SettingsView from './components/SettingsView';
import { initialMembers, Member } from './data';
import { Users, DollarSign, Activity } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = useState<Member[]>(initialMembers);
  
  // Modal States
  const [reminderModalOpen, setReminderModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handlers
  const handleSendReminder = (member: Member) => {
    setSelectedMember(member);
    setReminderModalOpen(true);
  };

  const handleEditMember = (member: Member) => {
    setSelectedMember(member);
    setFormModalOpen(true);
  };

  const handleDeleteMember = (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este socio?')) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const handleAddMember = () => {
    setSelectedMember(null);
    setFormModalOpen(true);
  };

  const handleSaveMember = (memberData: Omit<Member, 'id'>) => {
    if (selectedMember) {
      // Edit existing
      setMembers(members.map(m => 
        m.id === selectedMember.id ? { ...m, ...memberData } : m
      ));
    } else {
      // Add new
      const newMember: Member = {
        id: Math.random().toString(36).substr(2, 9),
        ...memberData
      };
      setMembers([newMember, ...members]);
    }
  };

  const handleCloseReminderModal = () => {
    setReminderModalOpen(false);
    setTimeout(() => setSelectedMember(null), 300);
  };

  const handleCloseFormModal = () => {
    setFormModalOpen(false);
    setTimeout(() => setSelectedMember(null), 300);
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] font-sans text-gray-900">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 ml-20 transition-all duration-300">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <div className="p-8 max-w-7xl mx-auto space-y-8">
          
          {activeTab === 'dashboard' && (
            <>
              {/* Dashboard Header */}
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Dashboard General</h1>
                  <p className="text-gray-500 mt-1 text-sm">Resumen de actividad y cobranzas del mes.</p>
                </div>
                <div className="text-sm text-gray-500 font-mono bg-white px-3 py-1 rounded-lg border border-gray-200 shadow-sm">
                  {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard 
                  title="Ingresos Totales" 
                  value="$12,450.00" 
                  trend="+12.5%" 
                  trendUp={true} 
                  icon={<DollarSign size={20} />} 
                />
                <StatsCard 
                  title="Socios Activos" 
                  value={members.length.toString()} 
                  trend="+5.2%" 
                  trendUp={true} 
                  icon={<Users size={20} />} 
                />
                <StatsCard 
                  title="Tasa de Retención" 
                  value="94.2%" 
                  trend="-1.1%" 
                  trendUp={false} 
                  icon={<Activity size={20} />} 
                />
              </div>

              {/* Main Content */}
              <MemberTable 
                members={filteredMembers} 
                onSendReminder={handleSendReminder}
                onEdit={handleEditMember}
                onDelete={handleDeleteMember}
                onAdd={handleAddMember}
              />
            </>
          )}

          {activeTab === 'members' && (
            <MemberTable 
              members={filteredMembers} 
              onSendReminder={handleSendReminder}
              onEdit={handleEditMember}
              onDelete={handleDeleteMember}
              onAdd={handleAddMember}
            />
          )}

          {activeTab === 'payments' && <PaymentsView />}
          
          {activeTab === 'settings' && <SettingsView />}

        </div>
      </main>

      <SendReminderModal 
        isOpen={reminderModalOpen} 
        onClose={handleCloseReminderModal} 
        memberName={selectedMember?.name || ''} 
      />

      <MemberFormModal
        isOpen={formModalOpen}
        onClose={handleCloseFormModal}
        onSave={handleSaveMember}
        initialData={selectedMember}
      />
    </div>
  );
}

