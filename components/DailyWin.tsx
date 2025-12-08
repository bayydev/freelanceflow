
import React, { useState, useEffect } from 'react';
import { Trophy, CheckCircle2, Lock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { supabase } from '../services/supabase';

interface DailyWinProps {
  disabled: boolean;
  userId: string;
}

const getTodayDateKey = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const DailyWin: React.FC<DailyWinProps> = ({ disabled, userId }) => {
  const [won, setWon] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verificar se já venceu hoje no banco de dados
  useEffect(() => {
    const checkWin = async () => {
        const todayKey = getTodayDateKey();
        const { data } = await supabase
            .from('daily_progress')
            .select('daily_win')
            .eq('user_id', userId)
            .eq('date', todayKey)
            .maybeSingle();
        
        if (data?.daily_win) {
            setWon(true);
        }
        setLoading(false);
    };
    checkWin();
  }, [userId]);

  const handleWin = async () => {
    if (disabled || won) return;

    setWon(true);
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#d946ef', '#ffffff']
    });

    // Salvar no Banco
    const todayKey = getTodayDateKey();
    await supabase.from('daily_progress').upsert({
        user_id: userId,
        date: todayKey,
        daily_win: true
    }, { onConflict: 'user_id, date' });
  };

  return (
    <div className={`border rounded-xl p-6 transition-all duration-500 relative overflow-hidden group ${won ? 'bg-cyber-success/10 border-cyber-success' : 'bg-cyber-dark border-cyber-border'}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`font-bold transition-colors ${won ? 'text-cyber-success' : 'text-slate-100'}`}>
            MISSÃO DIÁRIA
          </h3>
          <p className="text-xs text-slate-400 mt-1">
             {won ? "Você dominou o dia!" : disabled ? "Complete a rotina para desbloquear" : "Pronto para finalizar?"}
          </p>
        </div>
        <div className={`p-2 rounded-full ${won ? 'bg-cyber-success text-cyber-dark' : 'bg-slate-800 text-slate-600'}`}>
          <Trophy size={24} />
        </div>
      </div>

      <button
        onClick={handleWin}
        disabled={disabled && !won}
        className={`w-full mt-4 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
          won 
            ? 'bg-cyber-success text-cyber-dark cursor-default' 
            : disabled 
                ? 'bg-slate-900 text-slate-600 cursor-not-allowed border border-slate-800'
                : 'bg-slate-800 text-slate-200 hover:bg-emerald-500 hover:text-white border border-slate-700 hover:border-emerald-500 hover:shadow-neon-cyan'
        }`}
      >
        {won ? (
          <>
            <CheckCircle2 size={20} /> MISSÃO CUMPRIDA
          </>
        ) : disabled ? (
            <>
                <Lock size={16} /> BLOQUEADO
            </>
        ) : (
          <>
             <Sparkles size={16} className="text-yellow-400" /> FINALIZAR O DIA
          </>
        )}
      </button>
      
      {/* Visual Glitch Effect on Hover if active */}
      {!won && !disabled && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite] pointer-events-none" />
      )}
    </div>
  );
};

export default DailyWin;
