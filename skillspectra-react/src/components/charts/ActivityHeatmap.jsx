import React from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const ActivityPulse = () => {
  // Mocking 12 months of activity data
  const data = [
    { month: 'Jan', activity: 40 }, { month: 'Feb', activity: 30 },
    { month: 'Mar', activity: 65 }, { month: 'Apr', activity: 45 },
    { month: 'May', activity: 90 }, { month: 'Jun', activity: 70 },
    { month: 'Jul', activity: 85 }, { month: 'Aug', activity: 100 },
    { month: 'Sep', activity: 75 }, { month: 'Oct', activity: 60 },
    { month: 'Nov', activity: 80 }, { month: 'Dec', activity: 95 },
  ];

  return (
    <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Development Pulse</h3>
          <p className="text-2xl font-black text-slate-900">Activity Momentum</p>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-tight">
            +12% vs last month
          </span>
        </div>
      </div>

      <div className="h-[150px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPulse" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
            />
            <Area 
              type="monotone" 
              dataKey="activity" 
              stroke="#4f46e5" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorPulse)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-between mt-4 px-2">
        {['Q1', 'Q2', 'Q3', 'Q4'].map(q => (
          <span key={q} className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">{q}</span>
        ))}
      </div>
    </div>
  );
};

export default ActivityPulse;