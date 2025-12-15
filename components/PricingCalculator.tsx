import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, HelpCircle, Lock, AlertCircle, Clock, Zap, CheckCircle2, Users, Image, RefreshCw, Calendar } from 'lucide-react';
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
    // === SEÇÃO 1: PRECIFICAÇÃO BASE ===
    const [monthlyGoal, setMonthlyGoal] = useState<string>('');
    const [fixedCosts, setFixedCosts] = useState<string>('');
    const [daysPerWeek, setDaysPerWeek] = useState<string>('5');
    const [hoursPerDay, setHoursPerDay] = useState<string>('6');
    const [margin, setMargin] = useState<string>('20');

    // === SEÇÃO 2: SIMULADOR DE PROJETO ===
    const [projectHours, setProjectHours] = useState<string>('');
    const [projectDays, setProjectDays] = useState<string>('');
    const [projectRevisions, setProjectRevisions] = useState<string>('2');
    const [projectArts, setProjectArts] = useState<string>('1');
    const [projectPeople, setProjectPeople] = useState<string>('1');

    // State de Resultado e Controle
    const [result, setResult] = useState<{ hourlyCost: number, hourlyPrice: number, totalMonthly: number } | null>(null);
    const [usageCount, setUsageCount] = useState(0);

    // Helpers
    const parseCurrency = (val: string) => parseFloat(val.replace(',', '.').replace('R$', '').trim()) || 0;
    const formatBRL = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    // Aviso para horas excessivas
    const showHoursWarning = parseFloat(hoursPerDay) > 12;

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
                    setUsageCount(0);
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

        // Custo Hora: Quanto custa 1h só para "empatar"
        const hourlyCost = totalHoursMonth > 0 ? (totalMonthlyNeed / totalHoursMonth) : 0;

        // Preço Hora: Custo + Margem de Lucro
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

    // === CÁLCULO DO PROJETO ===
    const calculateProjectPrice = () => {
        if (!result) return { total: 0, breakdown: null };

        const hours = parseFloat(projectHours) || 0;
        const days = parseFloat(projectDays) || 1;
        const revisions = parseFloat(projectRevisions) || 0;
        const arts = parseFloat(projectArts) || 1;
        const people = parseFloat(projectPeople) || 1;

        // Base: horas * preço hora
        const basePrice = hours * result.hourlyPrice;

        // Adicional por revisão (cada revisão adiciona 15% do preço base após a 2ª)
        const extraRevisions = Math.max(0, revisions - 2);
        const revisionCost = basePrice * (extraRevisions * 0.15);

        // Multiplicador por quantidade de artes (cada arte adicional = 70% do preço unitário)
        const artMultiplier = 1 + (Math.max(0, arts - 1) * 0.7);

        // Adicional se trabalha com outras pessoas (divide entre, mas adiciona taxa de coordenação 10%)
        const teamMultiplier = people > 1 ? (people * 0.9) : 1;

        // Urgência (menos dias = mais caro) - se for menos de 3 dias, adiciona urgência
        const urgencyMultiplier = days < 3 ? 1.3 : days < 5 ? 1.15 : 1;

        const total = (basePrice + revisionCost) * artMultiplier * teamMultiplier * urgencyMultiplier;

        return {
            total,
            breakdown: {
                base: basePrice,
                revisions: revisionCost,
                arts: arts,
                urgency: urgencyMultiplier > 1,
                team: people
            }
        };
    };

    const projectResult = calculateProjectPrice();
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

            {/* AVISO DE HORAS EXCESSIVAS */}
            {showHoursWarning && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 flex items-start gap-3 animate-fade-in">
                    <AlertCircle className="text-yellow-400 shrink-0 mt-0.5" size={18} />
                    <div>
                        <p className="text-yellow-400 text-sm font-bold">Atenção: Carga horária elevada</p>
                        <p className="text-yellow-400/70 text-xs">
                            Trabalhar mais de 12 horas por dia reduz produtividade e qualidade.
                            Considere redistribuir suas horas para manter a saúde e eficiência.
                        </p>
                    </div>
                </div>
            )}

            {/* INPUTS SECTION - Precificação Base */}
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
                        className={`w-full bg-black border rounded p-2 text-sm text-white outline-none ${showHoursWarning ? 'border-yellow-500 focus:border-yellow-500' : 'border-slate-700 focus:border-cyber-primary'}`}
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
                    className={`w-full py-3 rounded-lg font-black tracking-widest transition-all flex items-center justify-center gap-2 ${isLimitReached
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

            {/* RESULTS SECTION */}
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
                                    <span title="Valor mínimo para pagar seus custos fixos e salário desejado, SEM LUCRO." className="cursor-help">
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
                                "Para cada hora que você trabalha, você precisa cobrar <span className="text-emerald-400 font-bold">{formatBRL(result.hourlyPrice)}</span> para cobrir seus {formatBRL(result.totalMonthly)} mensais e ainda sobrar {margin}% para o futuro."
                            </p>
                        </div>
                    </div>

                    {/* SIMULADOR DE PROJETO - REDESENHADO */}
                    <div className="border-t border-slate-800 pt-4 mt-2">
                        <div className="flex items-center gap-2 mb-4">
                            <Clock size={16} className="text-cyber-primary" />
                            <h4 className="text-sm font-bold text-slate-200">Simulador de Projeto</h4>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {/* Horas do Projeto */}
                            <div className="space-y-1">
                                <label className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
                                    <Clock size={10} /> Horas do Projeto
                                </label>
                                <input
                                    type="number"
                                    value={projectHours}
                                    onChange={e => setProjectHours(e.target.value)}
                                    placeholder="Ex: 10"
                                    className="w-full bg-black border border-slate-700 rounded p-2 text-sm text-white focus:border-cyber-primary outline-none"
                                />
                            </div>

                            {/* Dias para Entrega */}
                            <div className="space-y-1">
                                <label className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
                                    <Calendar size={10} /> Dias p/ Entrega
                                </label>
                                <input
                                    type="number"
                                    value={projectDays}
                                    onChange={e => setProjectDays(e.target.value)}
                                    placeholder="Ex: 5"
                                    className="w-full bg-black border border-slate-700 rounded p-2 text-sm text-white focus:border-cyber-primary outline-none"
                                />
                            </div>

                            {/* Quantidade de Artes */}
                            <div className="space-y-1">
                                <label className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
                                    <Image size={10} /> Qtd. de Artes
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    value={projectArts}
                                    onChange={e => setProjectArts(e.target.value)}
                                    placeholder="1"
                                    className="w-full bg-black border border-slate-700 rounded p-2 text-sm text-white focus:border-cyber-primary outline-none"
                                />
                            </div>

                            {/* Quantidade de Alterações */}
                            <div className="space-y-1">
                                <label className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
                                    <RefreshCw size={10} /> Alterações
                                    <span title="2 alterações já estão incluídas. Cada adicional custa 15% a mais.">
                                        <HelpCircle size={10} />
                                    </span>
                                </label>
                                <input
                                    type="number"
                                    min={0}
                                    value={projectRevisions}
                                    onChange={e => setProjectRevisions(e.target.value)}
                                    placeholder="2"
                                    className="w-full bg-black border border-slate-700 rounded p-2 text-sm text-white focus:border-cyber-primary outline-none"
                                />
                            </div>

                            {/* Pessoas no Projeto */}
                            <div className="space-y-1 md:col-span-2">
                                <label className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
                                    <Users size={10} /> Pessoas no Projeto
                                    <span title="Só você ou com outros? Se for em equipe, o custo aumenta pela coordenação.">
                                        <HelpCircle size={10} />
                                    </span>
                                </label>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setProjectPeople('1')}
                                        className={`flex-1 py-2 px-3 rounded text-xs font-bold transition-all ${projectPeople === '1' ? 'bg-cyber-primary text-black' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                                    >
                                        Só eu
                                    </button>
                                    <button
                                        onClick={() => setProjectPeople('2')}
                                        className={`flex-1 py-2 px-3 rounded text-xs font-bold transition-all ${projectPeople === '2' ? 'bg-cyber-primary text-black' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                                    >
                                        2 pessoas
                                    </button>
                                    <button
                                        onClick={() => setProjectPeople('3')}
                                        className={`flex-1 py-2 px-3 rounded text-xs font-bold transition-all ${projectPeople === '3' ? 'bg-cyber-primary text-black' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                                    >
                                        3+
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Resultado do Projeto */}
                        {projectHours && parseFloat(projectHours) > 0 && (
                            <div className="mt-4 bg-gradient-to-r from-cyber-primary/10 to-emerald-500/10 border border-cyber-primary/30 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs text-slate-400 uppercase font-bold">Valor Sugerido do Projeto</span>
                                    {projectResult.breakdown?.urgency && (
                                        <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded font-bold">
                                            +30% URGÊNCIA
                                        </span>
                                    )}
                                </div>
                                <div className="text-3xl font-black text-cyber-primary font-mono">
                                    {formatBRL(projectResult.total)}
                                </div>
                                <p className="text-xs text-slate-500 mt-2">
                                    Base: {formatBRL(projectResult.breakdown?.base || 0)}
                                    {projectResult.breakdown?.revisions && projectResult.breakdown.revisions > 0 && (
                                        <> + Revisões extras: {formatBRL(projectResult.breakdown.revisions)}</>
                                    )}
                                    {(parseFloat(projectArts) > 1) && (
                                        <> • {projectArts} artes</>
                                    )}
                                    {parseFloat(projectPeople) > 1 && (
                                        <> • Equipe de {projectPeople}</>
                                    )}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {!result && !isLimitReached && (
                <div className="text-center p-4 border border-dashed border-slate-800 rounded-lg">
                    <p className="text-xs text-slate-500">Preencha os dados e clique em calcular para descobrir quanto cobrar.</p>
                </div>
            )}

            {/* Overlay Bloqueador */}
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