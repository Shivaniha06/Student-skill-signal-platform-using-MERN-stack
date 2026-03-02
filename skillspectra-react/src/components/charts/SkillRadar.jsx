// src/components/charts/SkillRadar.jsx
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

const SkillRadar = ({ skills }) => (
  <div className="h-[250px] w-full bg-white rounded-2xl p-2">
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skills}>
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
        <Radar name="Developer" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.2} />
      </RadarChart>
    </ResponsiveContainer>
  </div>
);

export default SkillRadar;