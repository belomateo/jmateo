import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Settings, 
  LogOut, 
  Dumbbell 
} from 'lucide-react';
import React from 'react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-full w-20 bg-white border-r border-gray-100 flex flex-col items-center py-6 z-50 shadow-sm">
      <div className="mb-8 p-2 bg-indigo-600 rounded-xl text-white">
        <Dumbbell size={24} />
      </div>
      
      <nav className="flex-1 flex flex-col gap-6 w-full items-center">
        <NavItem 
          icon={<LayoutDashboard size={20} />} 
          active={activeTab === 'dashboard'} 
          onClick={() => onTabChange('dashboard')}
          label="Dashboard"
        />
        <NavItem 
          icon={<Users size={20} />} 
          active={activeTab === 'members'} 
          onClick={() => onTabChange('members')}
          label="Socios"
        />
        <NavItem 
          icon={<CreditCard size={20} />} 
          active={activeTab === 'payments'} 
          onClick={() => onTabChange('payments')}
          label="Pagos"
        />
        <NavItem 
          icon={<Settings size={20} />} 
          active={activeTab === 'settings'} 
          onClick={() => onTabChange('settings')}
          label="Ajustes"
        />
      </nav>

      <div className="mt-auto">
        <button className="p-3 text-gray-400 hover:text-rose-500 transition-colors rounded-xl hover:bg-rose-50">
          <LogOut size={20} />
        </button>
      </div>
    </aside>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  active?: boolean;
  onClick: () => void;
  label: string;
}

function NavItem({ icon, active = false, onClick, label }: NavItemProps) {
  return (
    <button 
      onClick={onClick}
      title={label}
      className={`
        p-3 rounded-xl transition-all duration-200 group relative
        ${active 
          ? 'text-indigo-600 bg-indigo-50 shadow-sm' 
          : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
        }
      `}
    >
      {icon}
      {active && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-l-full translate-x-full" />
      )}
    </button>
  );
}
