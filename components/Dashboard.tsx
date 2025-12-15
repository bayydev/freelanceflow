
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, TimeBlock, Task, NicheType, BlockStatus, Lead } from '../types';
import { generateSchedule, BLOCK_ICONS, BLOCK_COLORS } from '../constants';
import { LogOut, Plus, Trash2, CheckCircle2, Circle, Star, Target, LayoutDashboard, ListTodo, RefreshCw, Crown, Wallet, Calendar, Clock, X, XCircle, AlertCircle, Moon, ArrowRight, Sunrise, Zap, Users, GraduationCap, Calculator, MessageSquare, Briefcase, TrendingUp, ChevronDown, FileText, DollarSign, Timer } from 'lucide-react';
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
  initialTab?: 'BUSINESS' | 'CRM' | 'FINANCE' | 'FOCUS';
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
  const getTabFromPath = (): 'BUSINESS' | 'CRM' | 'FINANCE' | 'FOCUS' => {
    const path = location.pathname;
    if (path.includes('/crm') || path.includes('/scripts')) return 'CRM';
    if (path.includes('/finance')) return 'FINANCE';
    if (path.includes('/focus')) return 'FOCUS';
    return 'BUSINESS';
  };

  // Estado para abrir scripts automaticamente via URL
  const shouldOpenScripts = location.pathname.includes('/scripts');

  const [schedule, setSchedule] = useState<TimeBlock[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [activeBlock, setActiveBlock] = useState<TimeBlock | null>(null);
  const [rightPanelTab, setRightPanelTab] = useState<'BUSINESS' | 'CRM' | 'FINANCE' | 'FOCUS'>(getTabFromPath());
  const [customBlockTask, setCustomBlockTask] = useState('');

  const [isStandbyMode, setIsStandbyMode] = useState(false);
  const [isOvertime, setIsOvertime] = useState(false);

  // Estado para faturamento mensal (RevenueHeroCard)
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);

  // Busca receita do mês atual
  useEffect(() => {
    const fetchMonthlyRevenue = async () => {
      if (!user.isPremium) return; // Só busca se for premium (FinanceModule é PRO)

      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];

      try {
        const { data } = await supabase
          .from('transactions')
          .select('amount, type')
          .eq('user_id', user.id)
          .eq('type', 'INCOME')
          .gte('date', firstDay)
          .lte('date', lastDay);

        if (data) {
          const total = data.reduce((acc, t) => acc + (t.amount || 0), 0);
          setMonthlyRevenue(total);
        }
      } catch (error) {
        console.error('Erro ao buscar receita mensal:', error);
      }
    };

    fetchMonthlyRevenue();
  }, [user.id, user.isPremium]);

  // Sincroniza a tab com a URL quando ela muda
  useEffect(() => {
    setRightPanelTab(getTabFromPath());
  }, [location.pathname]);

  // Limpa /scripts da URL após processar para evitar reaberturas indesejadas
  useEffect(() => {
    if (shouldOpenScripts) {
      // Pequeno delay para garantir que o Pipeline recebeu a prop
      const timer = setTimeout(() => {
        navigate('/app/crm', { replace: true });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [shouldOpenScripts]);

  // Função para navegar e atualizar URL
  const navigateToTab = (tab: 'BUSINESS' | 'CRM' | 'FINANCE' | 'FOCUS') => {
    setRightPanelTab(tab);
    switch (tab) {
      case 'CRM':
        navigate('/app/crm');
        break;
      case 'FINANCE':
        navigate('/app/finance');
        break;
      case 'FOCUS':
        navigate('/app/focus');
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
            <button onClick={() => navigateToTab('BUSINESS')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all ${rightPanelTab === 'BUSINESS' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
              <Briefcase size={14} />
              <span className="hidden lg:inline">Negócio</span>
            </button>
            <button onClick={() => navigateToTab('CRM')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all ${rightPanelTab === 'CRM' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
              <Users size={14} />
              <span className="hidden lg:inline">CRM</span>
            </button>
            <button onClick={() => navigateToTab('FINANCE')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all ${rightPanelTab === 'FINANCE' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
              <Wallet size={14} />
              <span className="hidden lg:inline">Finanças</span>
            </button>
            <button onClick={() => navigateToTab('FOCUS')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all ${rightPanelTab === 'FOCUS' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
              <Timer size={14} />
              <span className="hidden lg:inline">Foco</span>
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
          <button onClick={() => navigateToTab('BUSINESS')} className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-bold transition-all whitespace-nowrap ${rightPanelTab === 'BUSINESS' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}>
            <Briefcase size={12} /> Negócio
          </button>
          <button onClick={() => navigateToTab('CRM')} className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-bold transition-all whitespace-nowrap ${rightPanelTab === 'CRM' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}>
            <Users size={12} /> CRM
          </button>
          <button onClick={() => navigateToTab('FINANCE')} className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-bold transition-all whitespace-nowrap ${rightPanelTab === 'FINANCE' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}>
            <Wallet size={12} /> Finanças
          </button>
          <button onClick={() => navigateToTab('FOCUS')} className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-bold transition-all whitespace-nowrap ${rightPanelTab === 'FOCUS' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}>
            <Timer size={12} /> Foco
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 lg:p-8">

        {/* BUSINESS VIEW - Visão Geral do Negócio */}
        {rightPanelTab === 'BUSINESS' && (
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

            {/* Revenue Hero Card + Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Revenue Hero Card */}
              <div className="bg-cyber-panel border border-cyber-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <TrendingUp className="text-emerald-400" size={20} />
                    Faturamento do Mês
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">
                    {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-2xl font-black text-white">
                      R$ {monthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-sm text-slate-400">
                      de R$ {(user.monthlyGoal || 5000).toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-cyber-primary transition-all duration-500"
                      style={{ width: `${Math.min(100, (monthlyRevenue / (user.monthlyGoal || 5000)) * 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2 text-right">
                    {Math.round((monthlyRevenue / (user.monthlyGoal || 5000)) * 100)}% da meta
                  </p>
                </div>

                {/* CTA se R$ 0 */}
                {monthlyRevenue === 0 && (
                  <button
                    onClick={() => navigateToTab('FINANCE')}
                    className="w-full py-3 border border-dashed border-emerald-500/50 rounded-lg text-emerald-400 text-sm font-medium hover:bg-emerald-500/10 transition-all flex items-center justify-center gap-2"
                  >
                    <Plus size={16} />
                    Registrar primeira entrada
                  </button>
                )}
              </div>

              {/* Quick Actions Card */}
              <div className="bg-cyber-panel border border-cyber-border rounded-xl p-6">
                <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                  <Zap className="text-yellow-400" size={20} />
                  Ações Rápidas
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => navigateToTab('CRM')}
                    className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-cyber-primary hover:bg-slate-800 transition-all text-left group"
                  >
                    <Users size={20} className="text-slate-400 group-hover:text-cyber-primary mb-2" />
                    <span className="text-sm font-bold text-slate-200 block">Novo Cliente</span>
                    <span className="text-xs text-slate-500">Adicionar ao CRM</span>
                  </button>
                  <button
                    onClick={() => navigate('/app/crm/scripts')}
                    className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-purple-500 hover:bg-slate-800 transition-all text-left group"
                  >
                    <FileText size={20} className="text-slate-400 group-hover:text-purple-400 mb-2" />
                    <span className="text-sm font-bold text-slate-200 block">Gerar Contrato</span>
                    <span className="text-xs text-slate-500">PDF personalizado</span>
                  </button>
                  <button
                    onClick={() => navigate('/app/crm/scripts')}
                    className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-pink-500 hover:bg-slate-800 transition-all text-left group"
                  >
                    <MessageSquare size={20} className="text-slate-400 group-hover:text-pink-400 mb-2" />
                    <span className="text-sm font-bold text-slate-200 block">Scripts de Venda</span>
                    <span className="text-xs text-slate-500">Mensagens prontas</span>
                  </button>
                  <button
                    onClick={() => navigateToTab('FINANCE')}
                    className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-yellow-500 hover:bg-slate-800 transition-all text-left group"
                  >
                    <Calculator size={20} className="text-slate-400 group-hover:text-yellow-400 mb-2" />
                    <span className="text-sm font-bold text-slate-200 block">Calcular Preço</span>
                    <span className="text-xs text-slate-500">Valor hora ideal</span>
                  </button>
                </div>
              </div>
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

        {/* FOCUS VIEW - Timer, Rotina e Tarefas */}
        {rightPanelTab === 'FOCUS' && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
                <Timer className="text-cyber-primary" size={24} />
                Modo Foco
              </h2>
              <p className="text-slate-400 text-sm mt-1">Timer Pomodoro, rotina de vendas e tarefas do dia</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Protocolo do Dia */}
              <section className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <Target className="text-cyber-primary" size={20} />
                    Sua Rotina de Vendas
                  </h3>
                  <button onClick={toggleNiche} className="group flex items-center gap-2 text-xs font-mono bg-slate-900 border border-slate-700 px-3 py-1.5 rounded hover:border-cyber-primary hover:text-cyber-primary transition-all">
                    <span className={user.niche === NicheType.B2B ? 'text-cyber-primary' : 'text-slate-500'}>B2B</span>
                    <RefreshCw size={12} className="group-hover:rotate-180 transition-transform duration-500" />
                    <span className={user.niche === NicheType.B2C ? 'text-cyber-secondary' : 'text-slate-500'}>B2C</span>
                  </button>
                </div>

                {isStandbyMode ? (
                  <div className="bg-cyber-panel border border-cyber-border rounded-xl p-8 text-center">
                    <Moon size={48} className="text-slate-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-400 mb-2">Fora do Horário</h3>
                    <p className="text-slate-500 text-sm mb-4">
                      Seu expediente começa às {user.workStart || '09:00'}.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {schedule.map((block) => {
                      const isActive = activeBlock?.id === block.id;
                      const statusStyles = {
                        PENDING: 'border-slate-700 bg-cyber-panel',
                        COMPLETED: 'border-emerald-500/30 bg-emerald-500/5',
                        FAILED: 'border-red-500/30 bg-red-500/5 opacity-60'
                      };
                      const IconComponent = BLOCK_ICONS[block.type] || Circle;

                      return (
                        <div key={block.id} className={`relative rounded-xl border transition-all duration-300 hover-glow click-feedback overflow-hidden ${statusStyles[block.status]} ${isActive ? 'ring-1 ring-cyber-primary' : ''}`}>
                          <div className="p-4">
                            <div className="flex items-center justify-between gap-4 cursor-pointer" onClick={() => setActiveBlock(isActive ? null : block)}>
                              <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${BLOCK_COLORS[block.type]}`}>
                                  <IconComponent size={20} />
                                </div>
                                <div>
                                  <h4 className={`font-bold text-slate-100 ${block.status === 'FAILED' ? 'line-through text-slate-500' : ''}`}>{block.title}</h4>
                                  <p className="text-xs text-slate-500 font-mono">{block.startTime} - {block.endTime}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {block.status === 'PENDING' && (
                                  <>
                                    <button onClick={(e) => handleMarkBlockComplete(block.id, e)} className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors" title="Marcar como feito">
                                      <CheckCircle2 size={16} />
                                    </button>
                                    <button onClick={(e) => {
                                      e.stopPropagation();
                                      const updatedSchedule = schedule.map(b => b.id === block.id ? { ...b, status: 'FAILED' as const } : b);
                                      setSchedule(updatedSchedule);
                                    }} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors" title="Não consegui">
                                      <XCircle size={16} />
                                    </button>
                                  </>
                                )}
                                {block.status === 'COMPLETED' && <CheckCircle2 size={20} className="text-emerald-500" />}
                                {block.status === 'FAILED' && <XCircle size={20} className="text-red-500" />}
                              </div>
                            </div>

                            {isActive && (
                              <div className="mt-4 pt-4 border-t border-slate-800 animate-fade-in">
                                <p className="text-sm text-slate-400 mb-3">{block.description}</p>
                                {block.actionableTip && (
                                  <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 mb-3 flex items-start gap-2">
                                    <AlertCircle size={14} className="text-cyber-primary shrink-0 mt-0.5" />
                                    <p className="text-xs text-slate-300">{block.actionableTip}</p>
                                  </div>
                                )}
                                <div className="space-y-1">
                                  {block.suggestedTasks?.map((task, i) => (
                                    <div key={i} className="flex items-center gap-2 text-xs text-slate-500">
                                      <ArrowRight size={12} className="text-cyber-primary" />
                                      <span>{task}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
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
                    <button type="submit" className="bg-slate-800 text-slate-200 p-2 rounded-lg hover:bg-slate-700"><Plus size={18} /></button>
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
