// src/components/audit/RepoHealthBadge.jsx
import React from 'react';

const RepoHealthBadge = ({ repo }) => {
  const hasDesc = !!repo.description;
  const isPopular = repo.stars > 5;
  const healthScore = (hasDesc ? 50 : 0) + (isPopular ? 50 : 20);

  return (
    <div className="mt-2">
      <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1 uppercase">
        <span>Project Health</span>
        <span>{healthScore}%</span>
      </div>
      <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 ${healthScore > 70 ? 'bg-emerald-500' : 'bg-amber-500'}`}
          style={{ width: `${healthScore}%` }}
        />
      </div>
    </div>
  );
};

export default RepoHealthBadge;