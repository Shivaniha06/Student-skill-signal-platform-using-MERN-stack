import React, { useState } from 'react';
import axios from 'axios';
import { Github, Zap, Loader2, Sparkles, CheckCircle } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ResumeBuilder from './pages/ResumeBuilder'; // Import your new page

function App() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [view, setView] = useState('dashboard'); // State to toggle views

  const handleAnalyze = async () => {
    if (!username) return alert("Please enter a GitHub username");
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/analyze/${username}`);
      setUserData(response.data);
      setView('dashboard'); // Ensure we start on dashboard for new users
    } catch (err) {
      alert("Error: Backend is offline or User not found.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToSearch = () => {
    setUserData(null);
    setView('dashboard');
  };

  // --- UPDATED CONDITIONAL RENDERING ---
  if (userData) {
    return (
      <>
        {view === 'dashboard' ? (
          <Dashboard 
            data={userData} 
            onBack={handleBackToSearch} 
            onViewResume={() => setView('resume')} // Passes the trigger to Dashboard
          />
        ) : (
          <ResumeBuilder 
            data={userData} 
            onBack={() => setView('dashboard')} // Goes back to Dashboard
          />
        )}
      </>
    );
  }

  return (
    
    <div className="min-h-screen bg-[#fcfcfd] flex flex-col items-center justify-center p-6 relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-indigo-50/50 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-sm mb-8">
          <Zap size={12} className="text-indigo-500" fill="currentColor" />
          <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
            V4 Engine • Manual Trigger Mode
          </span>
        </div>

        {/* Hero */}
        <h1 className="text-5xl md:text-7xl font-[900] tracking-tight text-slate-900 mb-6">
          Skill<span className="text-indigo-600">Spectra</span>
        </h1>
        <p className="text-slate-500 text-lg font-medium max-w-md mx-auto mb-10 leading-relaxed">
          The professional standard for quantifying developer impact. Enter a name below to begin.
        </p>

        {/* The Search Bar - Clean & Slim */}
        <div className="max-w-md mx-auto">
          <div className="relative bg-white border border-slate-200 rounded-2xl p-1.5 shadow-xl shadow-slate-200/40 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50 transition-all">
            <div className="flex items-center">
              <div className="pl-4 text-slate-400">
                <Github size={20} />
              </div>
              <input 
                type="text" 
                placeholder="Type username here..." 
                className="flex-1 bg-transparent border-none py-3 px-4 outline-none text-slate-900 font-semibold placeholder:text-slate-300"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              />
              <button 
                onClick={handleAnalyze} // Triggered ONLY on click
                disabled={loading}
                className="bg-slate-900 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                <span>{loading ? "Analyzing..." : "Analyze"}</span>
              </button>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center gap-6 opacity-50">
             <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
               <CheckCircle size={12} className="text-indigo-500" /> Export Ready
             </div>
             <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
               <CheckCircle size={12} className="text-indigo-500" /> Professional Report
             </div>
          </div>
        </div>
      </div>

      <footer className="absolute bottom-8 text-slate-300 font-bold text-[9px] uppercase tracking-[0.4em]">
        Verified GitHub Partner API
      </footer>
    </div>
    
  );
}

export default App;