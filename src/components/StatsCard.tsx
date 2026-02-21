import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import React from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: React.ReactNode;
}

export default function StatsCard({ title, value, trend, trendUp, icon }: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-gray-50 rounded-lg text-gray-500">
          {icon}
        </div>
        <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
          trendUp ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'
        }`}>
          {trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {trend}
        </span>
      </div>
      
      <div>
        <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
        <p className="text-2xl font-semibold text-gray-900 tracking-tight">{value}</p>
      </div>
      
      {/* Micro-chart simulation */}
      <div className="mt-4 flex items-end gap-1 h-8 opacity-50">
        {[40, 70, 45, 90, 60, 75, 50].map((h, i) => (
          <div 
            key={i} 
            className={`flex-1 rounded-t-sm ${trendUp ? 'bg-indigo-500' : 'bg-rose-400'}`}
            style={{ height: `${h}%`, opacity: 0.3 + (i * 0.1) }}
          ></div>
        ))}
      </div>
    </div>
  );
}
