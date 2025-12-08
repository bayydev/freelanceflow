import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, HelpCircle, Lock, AlertCircle, Clock, Zap, CheckCircle2 } from 'lucide-react';
import { supabase } from '../services/supabase';

interface PricingCalculatorProps {
  isPremium: boolean;
  onRequestUpgrade: () => void;
  userId: string;
}

const MAX_FREE_USES = 3;

// Helper para data local YYYY-MM-DD
const getTodayDateKey = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const PricingCalculator: React.FC<PricingCalculatorProps> = ({ isPremium, onRequestUpgrade, userId }) => {
  // Inputs
  const [monthlyGoal, setMonthlyGoal] = useState<string>(''); 
  const [fixedCosts, setFixedCosts] = useState<string>('');   
  const [daysPerWeek, setDaysPerWeek] = useState<string>('5');
  const [hoursPerDay, setHoursPerDay] = useState<string>('6'); 
  const [margin, setMargin] = useState<string>('20'); 

  // Simulator Input
  const [projectHours, setProjectHours] = useState<string>('');

  // State de Resultado e Controle
  const [result, setResult] = useState<{ hourlyCost: number, hourlyPrice: number, totalMonthly: number } | null>(null);
  const [usageCount, setUsageCount] = useState(0);

  // Helpers
  const parseCurrency = (val: string) => parseFloat(val.replace(',', '.').replace('R$', '').trim()) || 0;
  const formatBRL = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  
  // Carregar usos do dia (Supabase)
  useEffect(() => {
    const fetchUsage = async () => {
        const todayKey = getTodayDateKey();
        try {
            const { data, error } = await supabase
                .from('daily_progress')
                .select('calculator_uses')
                .eq('user_id', userId)
                .eq('date', todayKey)
                .maybeSingle();
            
            if (data) {
                setUsageCount(data.calculator_uses || 0);
            } else {
                setUsageCount(0); // Novo dia, ou registro não criado
            }
        } catch (e) {
            console.error("Erro ao carregar usos da calculadora", e);
        }
    };
    fetchUsage();
  }, [userId]);

  const handleCalculate = async () => {
    // Verifica limite para FREE
    if (!isPremium && usageCount >= MAX_FREE_USES) {
        onRequestUpgrade();
        return;
    }

    // 1. Cálculos
    const goal = parseCurrency(monthlyGoal);
    const costs = parseCurrency(fixedCosts);
    const totalMonthlyNeed = goal + costs;
    
    const days = parseFloat(daysPerWeek) || 0;
    const hours = parseFloat(hoursPerDay) || 0;
    const marginPercent = parseFloat(margin) / 100;

    // 4.3 weeks in a month average
    const totalHoursMonth = days * hours * 4.3; 
    
    // Custo Hora: Quanto custa 1h só para "empatar" (Pagar contas + salário base)
    const hourlyCost = totalHoursMonth > 0 ? (totalMonthlyNeed / totalHoursMonth) : 0;
    
    // Preço Hora: Custo + Margem de Lucro (Segurança/Investimento)
    const hourlyPrice = hourlyCost * (1 + marginPercent);

    // 2. Setar Resultado
    setResult({
        hourlyCost: hourlyCost,
        hourlyPrice: hourlyPrice,
        totalMonthly: totalMonthlyNeed
    });

    // 3. Consumir crédito no Supabase se for FREE
    if (!isPremium) {
        const newCount = usageCount + 1;
        setUsageCount(newCount);
        
        const todayKey = getTodayDateKey();
        
        // Upsert na tabela de progresso
        await supabase.from('daily_progress').upsert({
            user_id: userId,
            date: todayKey,
            calculator_uses: newCount
        }, { onConflict: 'user_id, date' });
    }
  };

  // Limpa o resultado se o usuário mudar inputs críticos
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
      setter(value);
      setResult(null); 
  };

  // Project Simulation
  const simulatedPrice = result ? (parseFloat(projectHours) || 0) * result.hourlyPrice : 0;
  const simulatedCost = result ? (parseFloat(projectHours) || 0) * result.hourlyCost : 0;

  const isLimitReached = !isPremium && usageCount >= MAX_FREE_USES;

  return (
    <div className="bg-cyber-panel border border-cyber-border rounded-xl p-6 animate-fade-in space-y-6 relative overflow-hidden">
      
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                <Calculator size={20} />
            </div>
            <div>
                <h3 className="font-bold text-slate-100">Precificação Inteligente</h3>
                <p className="text-xs text-slate-400">Descubra seu valor justo.</p>
            </div>
          </div>
          
          {/* Contador de Créditos FREE */}
          {!isPremium && (
             <div className="flex flex-col items-end">
                 <span className="text-[10px] uppercase font-bold text-slate-500">Usos Hoje</span>
                 <div className="flex items-center gap-1">
                     {[1, 2, 3].map(i => (
                         <div key={i} className={`w-2 h-2 rounded-full ${i <= (MAX_FREE_USES - usageCount) ? 'bg-cyber-primary shadow-neon-cyan' : 'bg-slate-800'}`} />
                     ))}
                     <span className={`text-xs font-mono ml-1 ${usageCount >= MAX_FREE_USES ? 'text-red-500' : 'text-slate-300'}`}>
                         {Math.max(0, MAX_FREE_USES - usageCount)}/3
                     </span>
                 </div>
             </div>
          )}
      </div>

      {/* INPUTS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Faturamento Desejado */}
          <div className="space-y-1">
              <label className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                  Salário Desejado 
                  <span title="Quanto você quer colocar no bolso livre de impostos?">
                    <HelpCircle size={10} />
                  </span>
              </label>
              <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500 text-sm">R$</span>
                  <input 
                    type="number" 
                    value={monthlyGoal}
                    onChange={e => handleInputChange(setMonthlyGoal, e.target.value)}
                    className="w-full bg-black border border-slate-700 rounded p-2 pl-8 text-sm text-white focus:border-emerald-500 outline-none"
                    placeholder="5000"
                  />
              </div>
          </div>

          {/* Custos Fixos */}
          <div className="space-y-1">
              <label className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                  Custos Fixos Mensais 
                  <span title="Internet, Luz, MEI, Softwares, etc.">
                    <HelpCircle size={10} />
                  </span>
              </label>
              <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500 text-sm">R$</span>
                  <input 
                    type="number" 
                    value={fixedCosts}
                    onChange={e => handleInputChange(setFixedCosts, e.target.value)}
                    className="w-full bg-black border border-slate-700 rounded p-2 pl-8 text-sm text-white focus:border-red-500 outline-none"
                    placeholder="1000"
                  />
              </div>
          </div>

          {/* Tempo de Trabalho */}
          <div className="space-y-1">
              <label className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                  Dias / Semana
              </label>
              <input 
                type="number" 
                max={7}
                value={daysPerWeek}
                onChange={e => handleInputChange(setDaysPerWeek, e.target.value)}
                className="w-full bg-black border border-slate-700 rounded p-2 text-sm text-white focus:border-cyber-primary outline-none"
              />
          </div>

          <div className="space-y-1">
              <label className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                  Horas Produtivas / Dia 
                  <span title="Horas reais de trabalho focado (não conte almoço).">
                    <HelpCircle size={10} />
                  </span>
              </label>
              <input 
                type="number" 
                max={24}
                value={hoursPerDay}
                onChange={e => handleInputChange(setHoursPerDay, e.target.value)}
                className="w-full bg-black border border-slate-700 rounded p-2 text-sm text-white focus:border-cyber-primary outline-none"
              />
          </div>
          
           {/* Margem */}
           <div className="space-y-1 md:col-span-2">
              <label className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                  Margem de Segurança (%) 
                  <span title="Extra para férias, décimo terceiro e imprevistos.">
                    <HelpCircle size={10} />
                  </span>
              </label>
              <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={margin}
                    onChange={e => handleInputChange(setMargin, e.target.value)}
                    className="flex-1 accent-cyber-secondary cursor-pointer h-2 bg-slate-800 rounded-lg appearance-none"
                  />
                  <span className="text-sm font-mono text-cyber-secondary font-bold w-12 text-right">{margin}%</span>
              </div>
          </div>
      </div>

      {/* ACTION BUTTON */}
      <div className="pt-2">
          <button
            onClick={handleCalculate}
            disabled={!monthlyGoal || !fixedCosts}
            className={`w-full py-3 rounded-lg font-black tracking-widest transition-all flex items-center justify-center gap-2 ${
                isLimitReached 
                ? 'bg-gradient-to-r from-red-600 to-red-500 text-white hover:shadow-neon-pink' 
                : 'bg-slate-800 hover:bg-cyber-primary hover:text-black text-white border border-slate-700'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
              {isLimitReached ? (
                  <>
                    <Lock size={18} /> DESBLOQUEAR ILIMITADO
                  </>
              ) : (
                  <>
                    <Zap size={18} /> {result ? 'RECALCULAR' : 'CALCULAR PREÇO'}
                  </>
              )}
          </button>
      </div>

      {/* RESULTS SECTION (Condicional & Didática) */}
      {result && (
        <div className="animate-fade-in space-y-4">
            {/* Bloco de Resultado Didático */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-4 shadow-inner relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                
                <div className="grid grid-cols-2 gap-4">
                    {/* Custo de Sobrevivência */}
                    <div className="space-y-1 opacity-70 hover:opacity-100 transition-opacity">
                        <p className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-1">
                             Hora Custo (Sobrevivência)
                             <span title="Valor mínimo para pagar seus custos fixos e salário desejado, SEM LUCRO. Se cobrar menos que isso, você tem prejuízo." className="cursor-help">
                                <HelpCircle size={10} />
                             </span>
                        </p>
                        <div className="text-xl font-bold text-slate-300 font-mono tracking-tighter">
                            {formatBRL(result.hourlyCost)}
                        </div>
                    </div>

                    {/* Preço de Venda */}
                    <div className="space-y-1">
                         <p className="text-[10px] text-emerald-400 uppercase font-bold flex items-center gap-1">
                             Seu Preço Ideal (Com Lucro)
                             <Zap size={10} />
                        </p>
                        <div className="text-3xl font-black text-emerald-400 font-mono tracking-tighter drop-shadow-lg">
                            {formatBRL(result.hourlyPrice)}
                        </div>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800/50 text-xs text-slate-500 italic">
                    <p>
                        "Para cada hora que você trabalha, você precisa cobrar <span className="text-emerald-400 font-bold">{formatBRL(result.hourlyPrice)}</span> para cobrir seus R$ {formatBRL(result.totalMonthly)} mensais e ainda sobrar {margin}% para o futuro."
                    </p>
                </div>
            </div>

            {/* SIMULATOR */}
            <div className="border-t border-slate-800 pt-4 mt-2">
                <div className="flex items-center gap-2 mb-3">
                    <Clock size={16} className="text-cyber-primary"/>
                    <h4 className="text-sm font-bold text-slate-200">Simulador de Projeto</h4>
                </div>
                
                <div className="flex gap-3 items-end">
                    <div className="flex-1 space-y-1">
                        <label className="text-[10px] text-slate-400 uppercase font-bold">Horas do Job</label>
                        <input 
                            type="number"
                            value={projectHours}
                            onChange={e => setProjectHours(e.target.value)}
                            placeholder="Ex: 10h"
                            className="w-full bg-black border border-slate-700 rounded p-2 text-sm text-white focus:border-cyber-primary outline-none"
                        />
                    </div>
                    <div className="flex-1 bg-cyber-primary/10 border border-cyber-primary/30 rounded p-2 flex flex-col justify-center h-[50px]">
                        <span className="text-[10px] text-cyber-primary uppercase font-bold leading-none">Cobre no mínimo:</span>
                        <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-lg font-bold text-white font-mono leading-none">
                                {formatBRL(simulatedPrice)}
                            </span>
                             {simulatedCost > 0 && (
                                <span className="text-[10px] text-slate-500 line-through">
                                    (Custo: {formatBRL(simulatedCost)})
                                </span>
                             )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
      
      {!result && !isLimitReached && (
          <div className="text-center p-4 border border-dashed border-slate-800 rounded-lg">
              <p className="text-xs text-slate-500">Preencha os dados e clique em calcular para descobrir quanto cobrar.</p>
          </div>
      )}

      {/* Overlay Bloqueador Cyberpunk Style */}
      {isLimitReached && !result && (
         <div className="absolute inset-0 bg-cyber-dark/95 backdrop-blur-md z-10 flex flex-col items-center justify-center p-6 text-center animate-fade-in border border-red-500/20 m-1 rounded-lg">
             <div className="relative mb-4">
                 <div className="absolute inset-0 bg-red-500 blur-xl opacity-20 rounded-full"></div>
                 <Lock size={40} className="text-red-500 relative z-10" />
             </div>
             <h3 className="font-black text-xl text-white uppercase tracking-wider mb-1">Acesso Bloqueado</h3>
             <p className="text-xs text-slate-400 mb-6 font-mono border-b border-red-500/30 pb-4 w-full">
                 Protocolo Free: 3/3 cálculos utilizados hoje.
             </p>
             <button 
                onClick={onRequestUpgrade}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all uppercase tracking-widest text-sm"
            >
                DESBLOQUEAR SISTEMA PRO
            </button>
             <p className="text-[10px] text-slate-600 mt-4">Reset automático em 24h</p>
         </div>
      )}

    </div>
  );
};

export default PricingCalculator;