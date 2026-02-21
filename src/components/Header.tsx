import { Search, Bell, ChevronDown } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Buscar socio por nombre..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none placeholder:text-gray-400 text-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-gray-100 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">Manager</p>
          </div>
          <img 
            src="https://picsum.photos/seed/admin/100/100" 
            alt="Admin" 
            className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100"
            referrerPolicy="no-referrer"
          />
          <ChevronDown size={16} className="text-gray-400" />
        </div>
      </div>
    </header>
  );
}
