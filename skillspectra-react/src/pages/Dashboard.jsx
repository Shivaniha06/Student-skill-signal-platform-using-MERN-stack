// import React, { useState, useMemo } from 'react';
// import { Star, GitFork, ExternalLink, Download, Share2, Rocket, Trophy, CheckCircle, Loader2 } from 'lucide-react';
// import html2pdf from 'html2pdf.js';

// // --- NEW IMPORTS ---
// import { getDeveloperInsights } from '../utils/personaLogic';
// import SkillRadar from '../components/charts/SkillRadar';
// import RepoHealthBadge from '../components/audit/RepoHealthBadge';

// const Dashboard = ({ data, onBack, onViewResume }) => {
//   const [isExporting, setIsExporting] = useState(false);

//   // Calculate insights using useMemo for performance
//   const { persona, skills } = useMemo(() => getDeveloperInsights(data), [data]);

//   const exportToPDF = async () => {
//     setIsExporting(true);
//     const element = document.getElementById('pdf-report');
//     const opt = {
//       margin: [0.3, 0.3],
//       filename: `${data.user}_SkillSpectra_Report.pdf`,
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { scale: 3, useCORS: true, letterRendering: true },
//       jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
//     };
//     try {
//       await html2pdf().set(opt).from(element).save();
//     } catch (err) {
//       console.error("PDF Export Error:", err);
//     } finally {
//       setIsExporting(false);
//     }
//   };

//   // handleShare remains same...

//   return (
//     <div className="max-w-5xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">
      
//       {/* Top Navigation */}
//       <div className="flex justify-between items-center mb-6">
//         <button onClick={onBack} className="text-sm font-bold text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition-colors">
//           ← NEW ANALYSIS
//         </button>
//         <div className="flex gap-2">
//           <button 
//             onClick={onViewResume}
//             className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all shadow-md active:scale-95"
//           >
//             <Trophy size={14} className="text-amber-400" /> GENERATE RESUME
//           </button>

//           <button 
//             onClick={handleShare}
//             className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all text-slate-700 shadow-sm"
//           >
//             <Share2 size={14} /> SHARE
//           </button>
//         </div>
//       </div>

//       <div id="pdf-report" className="space-y-6">
        
//         {/* Profile & Radar Section - NEW GRID LAYOUT */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
//           {/* Your Original Profile Card (Modified to 2/3 width) */}
//           <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm">
//             <div className="relative group">
//               <img src={data.avatar} className="w-20 h-20 rounded-full border-2 border-slate-100" alt="Avatar" />
//               <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white p-1 rounded-full border-2 border-white">
//                 <Trophy size={12} />
//               </div>
//             </div>

//             <div className="flex-1 text-center md:text-left">
//               <div className="flex items-center justify-center md:justify-start gap-2">
//                 <h2 className="text-2xl font-black text-slate-900">{data.user}</h2>
//                 <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${persona.bg} ${persona.color}`}>
//                   {persona.title}
//                 </span>
//               </div>
//               <p className="text-sm text-slate-500 font-medium mt-1">
//                 Top Language: <span className="text-indigo-600 font-bold">{data.top_lang}</span>
//               </p>
//             </div>

//             <div className="flex items-center gap-4 md:border-l border-slate-100 md:pl-8">
//               <div className="text-center md:text-right">
//                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Impact Score</p>
//                 <p className="text-3xl font-black text-slate-900 leading-none">{data.points}</p>
//               </div>
//               <div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-600 hidden sm:block">
//                 <Rocket size={20} />
//               </div>
//             </div>
//           </div>

//           {/* New Skill Radar Component */}
//           <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col items-center">
//              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Competency Map</p>
//              <SkillRadar skills={skills} />
//           </div>
//         </div>

//         {/* Stats Grid (Original) */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//           {[{ label: 'Followers', value: data.followers }, { label: 'Repos', value: data.repo_count }, { label: 'Publicity', value: '100%' }, { label: 'Status', value: 'Verified' }].map((stat, i) => (
//             <div key={i} className="bg-white border border-slate-100 p-4 rounded-xl text-center">
//               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
//               <p className="text-lg font-black text-slate-800">{stat.value}</p>
//             </div>
//           ))}
//         </div>

//         {/* Repositories Grid (With NEW Health Badge) */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {data.repos.map((repo, idx) => (
//             <div key={idx} className="bg-white border border-slate-200 p-5 rounded-xl hover:border-indigo-400 transition-all group">
//               <div className="flex justify-between items-start mb-2">
//                 <span className="text-[10px] font-bold bg-slate-50 text-slate-500 px-2 py-1 rounded-md border border-slate-100">
//                   {repo.language}
//                 </span>
//                 <a href={repo.url} target="_blank" rel="noreferrer" className="text-indigo-600 font-bold flex items-center gap-1 text-sm group-hover:underline">
//                   {repo.name} <ExternalLink size={12} />
//                 </a>
//               </div>
//               <p className="text-xs text-slate-500 line-clamp-2 mb-2 leading-relaxed">
//                 {repo.description}
//               </p>
              
//               {/* INJECTED AUDIT FEATURE */}
//               <RepoHealthBadge repo={repo} />

//               <div className="flex gap-4 text-[11px] font-black text-slate-400 mt-4">
//                 <span className="flex items-center gap-1"><Star size={12} className="text-amber-400" /> {repo.stars}</span>
//                 <span className="flex items-center gap-1"><GitFork size={12} className="text-blue-400" /> {repo.forks}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;