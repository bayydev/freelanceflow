import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const WORK_TIME = 25 * 60; // 25 minutes
const REST_TIME = 5 * 60;

const Pomodoro: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'WORK' | 'REST'>('WORK');

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer finished
      setIsActive(false);
      // Simple notification sound or alert could go here
      if (mode === 'WORK') {
        setMode('REST');
        setTimeLeft(REST_TIME);
      } else {
        setMode('WORK');
        setTimeLeft(WORK_TIME);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'WORK' ? WORK_TIME : REST_TIME);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = ((mode === 'WORK' ? WORK_TIME : REST_TIME) - timeLeft) / (mode === 'WORK' ? WORK_TIME : REST_TIME) * 100;

  return (
    <div className="bg-cyber-dark border border-cyber-border rounded-xl p-6 relative overflow-hidden">
        {/* Progress Bar Background */}
        <div className="absolute bottom-0 left-0 h-1 bg-slate-800 w-full">
            <div 
                className={`h-full transition-all duration-1000 ${mode === 'WORK' ? 'bg-cyber-secondary' : 'bg-cyber-success'}`} 
                style={{ width: `${progress}%` }}
            />
        </div>

      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-slate-100 font-bold flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-red-500 animate-pulse' : 'bg-slate-600'}`}></span>
            TIMER DE FOCO
          </h3>
          <p className="text-xs text-slate-500 font-mono mt-1">{mode === 'WORK' ? 'HORA DE FOCAR' : 'HORA DE DESCANSAR'}</p>
        </div>
      </div>

      <div className="text-center py-6">
        <div className={`text-6xl font-black font-mono tracking-tighter ${mode === 'WORK' ? 'text-slate-100' : 'text-cyber-success'}`}>
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={toggleTimer}
          className={`p-3 rounded-lg flex items-center gap-2 transition-all ${
            isActive 
              ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' 
              : 'bg-cyber-secondary text-white hover:shadow-neon-pink'
          }`}
        >
          {isActive ? <Pause size={20} /> : <Play size={20} />}
          <span className="font-bold font-mono uppercase">{isActive ? 'Pausar' : 'Começar'}</span>
        </button>
        <button
          onClick={resetTimer}
          className="p-3 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
        >
          <RotateCcw size={20} />
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;