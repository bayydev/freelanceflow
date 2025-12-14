
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, TimeBlock, Task, NicheType, BlockStatus } from '../types';
import { generateSchedule, BLOCK_ICONS, BLOCK_COLORS } from '../constants';
import { LogOut, Plus, Trash2, CheckCircle2, Circle, Star, Target, LayoutDashboard, ListTodo, RefreshCw, Crown, Wallet, Calendar, Clock, X, XCircle, AlertCircle, Moon, ArrowRight, Sunrise, Zap, Users, GraduationCap, Calculator, MessageSquare } from 'lucide-react';
import Pomodoro from './Pomodoro';
import DailyWin from './DailyWin';
import Pipeline from './Pipeline';
import FinanceModule from './FinanceModule';
import PricingCalculator from './PricingCalculator';
import confetti from 'canvas-confetti';
import { supabase } from '../services/supabase';

interface DashboardProps {
  user: User;
  onLogout: () => void;
  onUpdateNiche: (niche: NicheType) => void;
  onRequestUpgrade: () => void;
  onOpenLearningHub: () => void;
  initialTab?: 'TOOLS' | 'CRM' | 'FINANCE';
}

const getTodayDateKey = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getInitials = (name: string) => {
  const names = name.trim().split(' ');
  if (names.length >= 2) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, onUpdateNiche, onRequestUpgrade, onOpenLearningHub, initialTab }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determina a aba ativa baseado na URL
  const getTabFromPath = (): 'TOOLS' | 'CRM' | 'FINANCE' => {
    const path = location.pathname;
    if (path.includes('/crm') || path.includes('/scripts')) return 'CRM';
    if (path.includes('/finance')) return 'FINANCE';
    return 'TOOLS';
  };

  // Estado para abrir scripts automaticamente via URL
  const shouldOpenScripts = location.pathname.includes('/scripts');

  const [schedule, setSchedule] = useState<TimeBlock[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [activeBlock, setActiveBlock] = useState<TimeBlock | null>(null);
  const [rightPanelTab, setRightPanelTab] = useState<'TOOLS' | 'CRM' | 'FINANCE'>(getTabFromPath());
  const [customBlockTask, setCustomBlockTask] = useState('');

  const [isStandbyMode, setIsStandbyMode] = useState(false);
  const [isOvertime, setIsOvertime] = useState(false);

  // Sincroniza a tab com a URL quando ela muda
  useEffect(() => {
    setRightPanelTab(getTabFromPath());
  }, [location.pathname]);

  // Função para navegar e atualizar URL
  const navigateToTab = (tab: 'TOOLS' | 'CRM' | 'FINANCE') => {
    setRightPanelTab(tab);
    switch (tab) {
      case 'CRM':
        navigate('/app/crm');
        break;
      case 'FINANCE':
        navigate('/app/finance');
        break;
      default:
        navigate('/app');
    }
  };

  const fetchDailyProgress = async (baseSchedule: TimeBlock[]): Promise<TimeBlock[]> => {
    const todayKey = getTodayDateKey();

    try {
      const { data, error } = await supabase
        .from('daily_progress')
        .select('completed_blocks, failed_blocks, block_custom_tasks')
        .eq('user_id', user.id)
        .eq('date', todayKey)
        .maybeSingle();

      if (data) {
        const customTasks = data.block_custom_tasks || {};
        return baseSchedule.map(block => {
          let updatedBlock = { ...block };

          // Apply custom tasks if any exist for this block
          if (customTasks[block.id]) {
            updatedBlock.suggestedTasks = customTasks[block.id];
          }

          if (data.completed_blocks?.includes(block.id)) {
            updatedBlock.status = 'COMPLETED';
          }
          if (data.failed_blocks?.includes(block.id)) {
            updatedBlock.status = 'FAILED';
          }
          return updatedBlock;
        });
      }
      return baseSchedule;
    } catch (e) {
      console.error("Erro ao carregar progresso diário", e);
      return baseSchedule;
    }
  };

  const saveCompletedBlock = async (blockId: string) => {
    const todayKey = getTodayDateKey();

    const { data } = await supabase
      .from('daily_progress')
      .select('completed_blocks')
      .eq('user_id', user.id)
      .eq('date', todayKey)
      .maybeSingle();

    const currentCompleted = data?.completed_blocks || [];
    if (!currentCompleted.includes(blockId)) {
      const newCompleted = [...currentCompleted, blockId];
      await supabase.from('daily_progress').upsert({
        user_id: user.id,
        date: todayKey,
        completed_blocks: newCompleted
      }, { onConflict: 'user_id, date' });
    }
  };

  const saveFailedBlocks = async (blockIds: string[]) => {
    if (blockIds.length === 0) return;
    const todayKey = getTodayDateKey();

    const { data } = await supabase
      .from('daily_progress')
      .select('failed_blocks')
      .eq('user_id', user.id)
      .eq('date', todayKey)
      .maybeSingle();

    const currentFailed = data?.failed_blocks || [];
    const newFailed = Array.from(new Set([...currentFailed, ...blockIds]));

    await supabase.from('daily_progress').upsert({
      user_id: user.id,
      date: todayKey,
      failed_blocks: newFailed
    }, { onConflict: 'user_id, date' });
  };

  const checkStandbyMode = useCallback(() => {
    if (!user.workStart || !user.workEnd) return false;

    const now = new Date();
    const currentMins = now.getHours() * 60 + now.getMinutes();

    const [startH, startM] = user.workStart.split(':').map(Number);
    const startMins = startH * 60 + startM;

    const [endH, endM] = user.workEnd.split(':').map(Number);
    const endMins = endH * 60 + endM;

    return currentMins < startMins || currentMins > endMins;
  }, [user.workStart, user.workEnd]);

  useEffect(() => {
    const isStandby = checkStandbyMode();
    setIsStandbyMode(isStandby);

    if (user.niche) {
      const generated = generateSchedule(user.niche, user.roles, user.workStart, user.workEnd);

      fetchDailyProgress(generated).then(hydratedSchedule => {
        setSchedule(hydratedSchedule);
        if (hydratedSchedule.length > 0) {
          if (activeBlock) {
            const found = hydratedSchedule.find(b => b.id === activeBlock.id);
            setActiveBlock(found || hydratedSchedule[0]);
          } else {
            setActiveBlock(hydratedSchedule[0]);
          }
        }
      });
    }
    fetchTasks();
  }, [user.niche, user.workStart, user.workEnd, user.roles, user.id, checkStandbyMode]);

  useEffect(() => {
    const checkTimeFailures = async () => {
      const isStandby = checkStandbyMode();
      if (isStandby !== isStandbyMode) setIsStandbyMode(isStandby);

      if (isOvertime) return;

      if (schedule.length === 0) return;

      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentTimeInMinutes = currentHours * 60 + currentMinutes;

      let hasChanges = false;
      const updatedSchedule = [...schedule];
      const failedIds: string[] = [];

      updatedSchedule.forEach(block => {
        if (block.status === 'PENDING') {
          const [endH, endM] = block.endTime.split(':').map(Number);
          const endTimeInMinutes = endH * 60 + endM;

          if (currentTimeInMinutes > endTimeInMinutes + 1) {
            block.status = 'FAILED';
            hasChanges = true;
            failedIds.push(block.id);
          }
        }
      });

      if (hasChanges) {
        setSchedule(updatedSchedule);
        await saveFailedBlocks(failedIds);
      }
    };

    const intervalId = setInterval(checkTimeFailures, 60000);
    const timeoutId = setTimeout(checkTimeFailures, 2000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [schedule, checkStandbyMode, isStandbyMode, isOvertime]);


  const handleMarkBlockComplete = async (blockId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    const blockIndex = schedule.findIndex(b => b.id === blockId);
    if (blockIndex === -1) return;
    const block = schedule[blockIndex];

    if (block.status !== 'PENDING') return;

    const updatedSchedule = [...schedule];
    updatedSchedule[blockIndex].status = 'COMPLETED';
    setSchedule(updatedSchedule);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#06b6d4', '#d946ef']
    });

    await saveCompletedBlock(blockId);
  };

  const fetchTasks = async () => {
    const { data } = await supabase.from('tasks').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
    if (data) setTasks(data as Task[]);
  };

  const handleAddQuickTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const { data } = await supabase.from('tasks').insert([{ user_id: user.id, title: newTaskTitle, completed: false }]).select().single();
    if (data) { setTasks([data as Task, ...tasks]); setNewTaskTitle(''); }
  };

  const toggleTask = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    const newStatus = !task.completed;

    setTasks(prevTasks => prevTasks.map(t => t.id === id ? { ...t, completed: newStatus } : t));

    try {
      const { error } = await supabase.from('tasks').update({ completed: newStatus }).eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      setTasks(prevTasks => prevTasks.map(t => t.id === id ? { ...t, completed: !newStatus } : t));
    }
  };

  const deleteTask = async (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
    await supabase.from('tasks').delete().eq('id', id);
  };

  const saveCustomTasks = async (updatedSchedule: TimeBlock[]) => {
    const todayKey = getTodayDateKey();
    const customTasksMap: Record<string, string[]> = {};

    updatedSchedule.forEach(block => {
      if (block.suggestedTasks && block.suggestedTasks.length > 0) {
        customTasksMap[block.id] = block.suggestedTasks;
      }
    });

    try {
      await supabase.from('daily_progress').upsert({
        user_id: user.id,
        date: todayKey,
        block_custom_tasks: customTasksMap
      }, { onConflict: 'user_id, date' });
    } catch (e) {
      console.error("Erro ao salvar tarefas customizadas", e);
    }
  };

  const addCustomTaskToBlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBlock || !customBlockTask.trim()) return;
    const updatedSchedule = schedule.map(block => {
      if (block.id === activeBlock.id) {
        return { ...block, suggestedTasks: [...block.suggestedTasks, customBlockTask] };
      }
      return block;
    });
    setSchedule(updatedSchedule);
    setCustomBlockTask('');
    await saveCustomTasks(updatedSchedule);
  };

  const removeTaskFromBlock = async (taskIndex: number) => {
    if (!activeBlock) return;
    const updatedSchedule = schedule.map(block => {
      if (block.id === activeBlock.id) {
        const newTasks = [...block.suggestedTasks];
        newTasks.splice(taskIndex, 1);
        return { ...block, suggestedTasks: newTasks };
      }
      return block;
    });
    setSchedule(updatedSchedule);
    await saveCustomTasks(updatedSchedule);
  };

  const toggleNiche = () => {
    const newNiche = user.niche === NicheType.B2B ? NicheType.B2C : NicheType.B2B;
    onUpdateNiche(newNiche);
  };

  const allBlocksCompleted = schedule.length > 0 && schedule.every(b => b.status === 'COMPLETED');
  const shouldShowStandby = isStandbyMode && !isOvertime;

  return (
    <div className="min-h-screen bg-cyber-dark text-slate-200 pb-10">
      <header className="border-b border-cyber-border bg-cyber-panel/50 backdrop-blur-md sticky top-0 z-20 shadow-lg shadow-cyber-dark/50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* AVATAR COM INICIAIS */}
            <div className="w-8 h-8 bg-cyber-primary/20 rounded-lg flex items-center justify-center border border-cyber-primary text-cyber-primary font-bold text-xs shadow-neon-cyan shrink-0">
              {getInitials(user.name)}
            </div>
            <div className="overflow-hidden">
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-sm text-slate-100 uppercase tracking-wider truncate max-w-[80px] sm:max-w-none">{user.name}</h1>
                {user.isPremium ? (
                  <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-1 rounded border border-yellow-500/30 font-bold flex items-center gap-1 shrink-0 shimmer-effect">
                    <Crown size={10} /> PRO
                  </span>
                ) : (
                  <span className="text-[10px] bg-slate-800 px-1 rounded text-slate-400 shrink-0">FREE</span>
                )}
              </div>
            </div>
          </div>

          {/* NAVIGATION TABS - Moved from sidebar */}
          <div className="hidden md:flex items-center gap-1 bg-cyber-panel border border-cyber-border rounded-lg p-1">
            <button onClick={() => navigateToTab('TOOLS')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all ${rightPanelTab === 'TOOLS' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
              <LayoutDashboard size={14} />
              <span className="hidden lg:inline">Ferramentas</span>
            </button>
            <button onClick={() => navigateToTab('CRM')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all ${rightPanelTab === 'CRM' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
              <Users size={14} />
              <span className="hidden lg:inline">Clientes</span>
            </button>
            <button onClick={() => navigateToTab('FINANCE')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all ${rightPanelTab === 'FINANCE' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
              <Wallet size={14} />
              <span className="hidden lg:inline">Finanças</span>
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenLearningHub}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] sm:text-xs font-bold rounded hover:shadow-neon-pink transition-all"
            >
              <GraduationCap size={14} />
              <span className="hidden sm:inline">ACADEMIA</span>
            </button>

            {!user.isPremium && (
              <button onClick={onRequestUpgrade} className="text-[10px] sm:text-xs bg-gradient-to-r from-cyber-primary to-cyber-secondary text-white px-3 py-1.5 rounded font-bold hover:shadow-neon-pink transition-all whitespace-nowrap pulse-glow ripple">SEJA PRO</button>
            )}
            <button onClick={onLogout} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-red-400 transition-colors" title="Sair"><LogOut size={18} /></button>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="md:hidden flex p-2 border-t border-cyber-border overflow-x-auto">
          <button onClick={() => navigateToTab('TOOLS')} className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-bold transition-all whitespace-nowrap ${rightPanelTab === 'TOOLS' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}>
            <LayoutDashboard size={12} /> Ferramentas
          </button>
          <button onClick={() => navigateToTab('CRM')} className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-bold transition-all whitespace-nowrap ${rightPanelTab === 'CRM' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}>
            <Users size={12} /> Clientes
          </button>
          <button onClick={() => navigateToTab('FINANCE')} className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-bold transition-all whitespace-nowrap ${rightPanelTab === 'FINANCE' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}>
            <Wallet size={12} /> Finanças
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 lg:p-8">

        {/* TOOLS VIEW - Protocolo do Dia + Mini Ferramentas */}
        {rightPanelTab === 'TOOLS' && (
          <div className="animate-fade-in">
            {/* Banner Motivacional do Dia */}
            <div className="bg-gradient-to-r from-cyber-panel to-slate-900 border border-cyber-border rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-slate-400 text-sm">
                  {new Date().getHours() < 12 ? 'Bom dia' : new Date().getHours() < 18 ? 'Boa tarde' : 'Boa noite'}, <span className="text-cyber-primary font-bold">{user.name.split(' ')[0]}</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {schedule.filter(b => b.status === 'COMPLETED').length}/{schedule.length} blocos concluídos hoje. Continue focado.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-[10px] text-slate-500 uppercase">Modo</p>
                  <p className="text-sm font-bold text-cyber-primary">{user.niche === 'B2B' ? 'Empresas' : 'Consumidor'}</p>
                </div>
              </div>
            </div>

            {/* Action Cards - Lead Magnets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => navigate('/app/crm/scripts')}
                className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-5 text-left hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/10 transition-all group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <MessageSquare className="text-purple-400 group-hover:scale-110 transition-transform" size={24} />
                  <span className="text-lg font-bold text-white">Acessar Scripts de Venda</span>
                </div>
                <p className="text-sm text-slate-400">Playbook de Vendas (Texto Prático)</p>
              </button>

              <button
                onClick={() => navigateToTab('FINANCE')}
                className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-xl p-5 text-left hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-500/10 transition-all group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Calculator className="text-yellow-400 group-hover:scale-110 transition-transform" size={24} />
                  <span className="text-lg font-bold text-white">Calculadora de Preços</span>
                </div>
                <p className="text-sm text-slate-400">Descubra seu valor hora</p>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Protocolo do Dia */}
              <section className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <Target className="text-cyber-primary" size={20} />
                    Sua Rotina de Vendas
                  </h2>
                  <button onClick={toggleNiche} className="group flex items-center gap-2 text-xs font-mono bg-slate-900 border border-slate-700 px-3 py-1.5 rounded hover:border-cyber-primary hover:text-cyber-primary transition-all">
                    <span className={user.niche === NicheType.B2B ? 'text-cyber-primary' : 'text-slate-500'}>B2B</span>
                    <RefreshCw size={12} className="group-hover:rotate-180 transition-transform duration-500" />
                    <span className={user.niche === NicheType.B2C ? 'text-cyber-secondary' : 'text-slate-500'}>B2C</span>
                  </button>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-2 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <div className="flex items-center gap-2"><Calendar size={14} /><span>{user.workDays?.join(', ') || 'Seg-Sex'}</span></div>
                  <div className="flex items-center gap-2"><Clock size={14} /><span>{user.workStart || '09:00'} - {user.workEnd || '18:00'}</span></div>
                </div>

                {shouldShowStandby ? (
                  <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[400px] animate-fade-in relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cyber-primary/5 pointer-events-none" />
                    <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6 border border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                      {(new Date().getHours()) < 12 ? (
                        <Sunrise size={40} className="text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                      ) : (
                        <Moon size={40} className="text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                      )}
                    </div>
                    <h3 className="text-2xl font-black text-slate-100 mb-2 tracking-tight uppercase">Fora do Expediente</h3>
                    <p className="text-slate-400 max-w-md mb-8 leading-relaxed">
                      Você configurou sua janela de trabalho entre <span className="text-indigo-400 font-mono font-bold">{user.workStart}</span> e <span className="text-indigo-400 font-mono font-bold">{user.workEnd}</span>.
                    </p>
                    <button onClick={() => setIsOvertime(true)} className="w-full max-w-sm py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg shadow-lg shadow-indigo-900/50 flex items-center justify-center gap-2 transition-all">
                      <Zap size={18} /> INICIAR SESSÃO EXTRA
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {isOvertime && (
                      <div className="bg-indigo-500/10 border border-indigo-500/40 p-3 rounded-lg flex items-center gap-2 mb-4 animate-pulse">
                        <Zap size={16} className="text-indigo-400" />
                        <p className="text-sm text-indigo-300 font-bold">MODO OVERTIME ATIVO</p>
                      </div>
                    )}
                    {schedule.map((block) => {
                      const Icon = BLOCK_ICONS[block.type];
                      const isActive = activeBlock?.id === block.id;
                      const isCompleted = block.status === 'COMPLETED';
                      const isFailed = block.status === 'FAILED';
                      return (
                        <div key={block.id} onClick={() => setActiveBlock(block)}
                          className={`relative p-5 rounded-xl border transition-all cursor-pointer group overflow-hidden card-3d ${isActive ? 'bg-slate-900 border-cyber-primary shadow-lg shadow-cyan-900/20' : isCompleted ? 'bg-slate-900/30 border-emerald-900/50 opacity-70' : isFailed ? 'bg-red-900/10 border-red-900/50 opacity-60' : 'bg-cyber-panel border-cyber-border hover:border-slate-600'}`}>
                          {isActive && <div className="absolute top-0 left-0 w-1 h-full bg-cyber-primary" />}
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4 w-full">
                              <button onClick={(e) => handleMarkBlockComplete(block.id, e)} disabled={isCompleted || isFailed}
                                className={`p-2 rounded-full transition-all flex-shrink-0 ${isCompleted ? 'text-cyber-success bg-cyber-success/10 cursor-default' : isFailed ? 'text-red-500 bg-red-500/10 cursor-default' : 'text-slate-600 hover:text-white bg-slate-800/50 hover:bg-cyber-primary hover:shadow-neon-cyan'}`}>
                                {isCompleted && <CheckCircle2 size={24} />}
                                {isFailed && <XCircle size={24} />}
                                {!isCompleted && !isFailed && <Circle size={24} />}
                              </button>
                              <div className={`p-3 rounded-lg flex-shrink-0 hover-bounce ${isFailed ? 'text-red-500 bg-red-900/20' : BLOCK_COLORS[block.type]}`}>
                                <Icon size={20} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between flex-wrap gap-2">
                                  <h3 className={`font-bold truncate ${isActive ? 'text-slate-100' : 'text-slate-300'} ${isCompleted ? 'line-through decoration-emerald-500/50 text-emerald-500' : ''} ${isFailed ? 'line-through decoration-red-500/50 text-red-500' : ''}`}>{block.title}</h3>
                                  <span className="text-xs font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{block.startTime} - {block.endTime}</span>
                                </div>
                                <p className={`text-sm mt-1 max-w-md line-clamp-2 ${isCompleted || isFailed ? 'text-slate-600' : 'text-slate-400'}`}>{isFailed ? "Você perdeu o prazo deste bloco." : block.description}</p>
                              </div>
                            </div>
                          </div>
                          {isActive && !isCompleted && !isFailed && (
                            <div className="mt-4 pl-0 sm:pl-[80px] animate-fade-in space-y-4 cursor-default" onClick={e => e.stopPropagation()}>
                              {block.actionableTip && (
                                <div className="bg-indigo-500/10 border border-indigo-500/30 p-3 rounded-lg">
                                  <p className="text-xs text-indigo-300 font-semibold mb-1 flex items-center gap-1"><Star size={12} /> DICA TÁTICA:</p>
                                  <p className="text-sm text-slate-300 italic">"{block.actionableTip}"</p>
                                </div>
                              )}
                              <div>
                                <p className="text-xs text-slate-500 mb-2 uppercase font-bold tracking-wider">Passo a Passo:</p>
                                <div className="flex flex-col gap-2">
                                  {block.suggestedTasks.map((task, i) => (
                                    <div key={i} className="flex items-center gap-2 group/task">
                                      <span className="text-xs px-3 py-2 rounded bg-slate-800 text-slate-300 border border-slate-700 flex-1">{task}</span>
                                      <button onClick={() => removeTaskFromBlock(i)} className="text-slate-600 hover:text-red-500 opacity-0 group-hover/task:opacity-100 transition-opacity p-1"><X size={14} /></button>
                                    </div>
                                  ))}
                                  <form onSubmit={addCustomTaskToBlock} className="flex gap-2 mt-1">
                                    <input type="text" placeholder="+ Adicionar etapa..." className="flex-1 bg-transparent border-b border-slate-700 text-xs text-slate-300 focus:border-cyber-primary outline-none py-1" value={customBlockTask} onChange={(e) => setCustomBlockTask(e.target.value)} />
                                    <button type="submit" disabled={!customBlockTask} className="text-cyber-primary disabled:opacity-30 hover:text-cyber-secondary"><Plus size={16} /></button>
                                  </form>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>

              {/* Mini Tools Sidebar */}
              <aside className="space-y-6">
                <Pomodoro />
                <DailyWin disabled={!allBlocksCompleted} userId={user.id} />
                <div className="bg-cyber-panel border border-cyber-border rounded-xl p-6 hover-glow">
                  <h3 className="font-bold text-slate-100 mb-4">Tarefas Avulsas</h3>
                  <form onSubmit={handleAddQuickTask} className="flex gap-2 mb-4">
                    <input type="text" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} placeholder="Ex: Pagar internet..." className="flex-1 bg-cyber-dark border border-cyber-border rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyber-primary input-glow" />
                    <button type="submit" className="bg-slate-800 text-slate-200 p-2 rounded-lg hover:bg-slate-700 ripple click-feedback"><Plus size={18} /></button>
                  </form>
                  <ul className="space-y-2">
                    {tasks.length === 0 && (
                      <li className="empty-state py-6">
                        <div className="empty-state-icon"><ListTodo size={24} className="text-slate-500" /></div>
                        <p className="text-xs text-slate-500">Nenhuma tarefa pendente</p>
                      </li>
                    )}
                    {tasks.map(task => (
                      <li key={task.id} className="flex items-center justify-between group click-feedback">
                        <div className="flex items-center gap-3">
                          <button onClick={() => toggleTask(task.id)} className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${task.completed ? 'bg-cyber-primary border-cyber-primary text-cyber-dark' : 'border-slate-600 hover:border-cyber-primary'}`}>{task.completed && <CheckCircle2 size={12} />}</button>
                          <span className={`text-sm ${task.completed ? 'text-slate-600 line-through' : 'text-slate-300'}`}>{task.title}</span>
                        </div>
                        <button onClick={() => deleteTask(task.id)} className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14} /></button>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        )}



        {/* CRM VIEW - Full Width */}
        {rightPanelTab === 'CRM' && (
          <div className="animate-fade-in">
            <Pipeline userId={user.id} niche={user.niche} isPremium={user.isPremium} onRequestUpgrade={onRequestUpgrade} userName={user.name} openScriptsOnMount={shouldOpenScripts} />
          </div>
        )}

        {/* FINANCE VIEW - Full Width */}
        {rightPanelTab === 'FINANCE' && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
                <Wallet className="text-yellow-400" size={24} />
                Centro Financeiro
              </h2>
              <p className="text-slate-400 text-sm mt-1">Precificação inteligente e controle financeiro completo</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <PricingCalculator userId={user.id} isPremium={user.isPremium} onRequestUpgrade={onRequestUpgrade} />
              <FinanceModule userId={user.id} isPremium={user.isPremium} onRequestUpgrade={onRequestUpgrade} />
            </div>
          </div>
        )}

      </main>

      <footer className="max-w-7xl mx-auto px-4 py-6 text-center border-t border-slate-900 mt-8">
        <p className="text-[10px] text-slate-600 font-mono uppercase tracking-widest">
          Todos os direitos reservados à Flow, 2025.
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
