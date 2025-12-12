import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../services/supabase';
import confetti from 'canvas-confetti';

// Tipos
interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    unlockedAt?: string;
}

interface WeeklyGoal {
    id: string;
    title: string;
    target: number;
    current: number;
    type: 'leads' | 'tasks' | 'sales';
}

interface GamificationState {
    points: number;
    level: number;
    streak: number;
    badges: Badge[];
    weeklyGoals: WeeklyGoal[];
    lastActivityDate: string;
}

interface GamificationContextType {
    state: GamificationState;
    addPoints: (amount: number, reason: string) => void;
    incrementStreak: () => void;
    unlockBadge: (badgeId: string) => void;
    updateGoalProgress: (goalId: string, increment: number) => void;
}

// Badges disponíveis
const AVAILABLE_BADGES: Badge[] = [
    { id: 'first_lead', name: 'Primeiro Lead', description: 'Cadastrou seu primeiro lead', icon: 'Target' },
    { id: 'five_days', name: 'Consistente', description: '5 dias seguidos de uso', icon: 'Calendar' },
    { id: 'first_sale', name: 'Primeira Venda', description: 'Fechou seu primeiro negócio', icon: 'DollarSign' },
    { id: 'ten_leads', name: 'Prospector', description: 'Cadastrou 10 leads', icon: 'Users' },
    { id: 'week_complete', name: 'Semana Perfeita', description: 'Completou todas as tarefas da semana', icon: 'Star' },
    { id: 'playbook_master', name: 'Mestre do Playbook', description: 'Usou todos os scripts', icon: 'MessageSquare' },
];

// Metas semanais padrão
const DEFAULT_WEEKLY_GOALS: WeeklyGoal[] = [
    { id: 'leads_week', title: 'Prospectar 10 leads', target: 10, current: 0, type: 'leads' },
    { id: 'tasks_week', title: 'Completar 20 tarefas', target: 20, current: 0, type: 'tasks' },
    { id: 'sales_week', title: 'Fechar 2 vendas', target: 2, current: 0, type: 'sales' },
];

// Calcular nível baseado em pontos
const calculateLevel = (points: number): number => {
    if (points < 100) return 1;
    if (points < 300) return 2;
    if (points < 600) return 3;
    if (points < 1000) return 4;
    if (points < 1500) return 5;
    return Math.floor(points / 500) + 2;
};

// Context
const GamificationContext = createContext<GamificationContextType | null>(null);

// Provider
interface GamificationProviderProps {
    children: ReactNode;
    userId: string;
}

export const GamificationProvider: React.FC<GamificationProviderProps> = ({ children, userId }) => {
    const [state, setState] = useState<GamificationState>({
        points: 0,
        level: 1,
        streak: 0,
        badges: [],
        weeklyGoals: DEFAULT_WEEKLY_GOALS,
        lastActivityDate: ''
    });

    // Carregar estado do localStorage
    useEffect(() => {
        const loadState = () => {
            const saved = localStorage.getItem(`ff_gamification_${userId}`);
            if (saved) {
                const parsed = JSON.parse(saved);
                setState(prev => ({
                    ...prev,
                    ...parsed,
                    level: calculateLevel(parsed.points || 0)
                }));
            }
        };

        loadState();

        // Verificar streak
        const today = new Date().toISOString().split('T')[0];
        const savedDate = localStorage.getItem(`ff_last_activity_${userId}`);

        if (savedDate) {
            const lastDate = new Date(savedDate);
            const todayDate = new Date(today);
            const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

            if (diffDays > 1) {
                // Streak quebrado
                setState(prev => ({ ...prev, streak: 0 }));
            }
        }
    }, [userId]);

    // Salvar estado quando mudar
    useEffect(() => {
        localStorage.setItem(`ff_gamification_${userId}`, JSON.stringify(state));
    }, [state, userId]);

    const addPoints = (amount: number, reason: string) => {
        setState(prev => {
            const newPoints = prev.points + amount;
            const newLevel = calculateLevel(newPoints);

            // Subiu de nível
            if (newLevel > prev.level) {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#06b6d4', '#d946ef', '#22c55e']
                });
            }

            return {
                ...prev,
                points: newPoints,
                level: newLevel
            };
        });

        // Atualizar data de atividade
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem(`ff_last_activity_${userId}`, today);
    };

    const incrementStreak = () => {
        const today = new Date().toISOString().split('T')[0];
        const savedDate = localStorage.getItem(`ff_last_activity_${userId}`);

        if (savedDate !== today) {
            setState(prev => {
                const newStreak = prev.streak + 1;

                // Verificar badge de 5 dias
                if (newStreak >= 5 && !prev.badges.find(b => b.id === 'five_days')) {
                    const badge = AVAILABLE_BADGES.find(b => b.id === 'five_days');
                    if (badge) {
                        return {
                            ...prev,
                            streak: newStreak,
                            badges: [...prev.badges, { ...badge, unlockedAt: today }]
                        };
                    }
                }

                return { ...prev, streak: newStreak };
            });

            localStorage.setItem(`ff_last_activity_${userId}`, today);
        }
    };

    const unlockBadge = (badgeId: string) => {
        if (state.badges.find(b => b.id === badgeId)) return;

        const badge = AVAILABLE_BADGES.find(b => b.id === badgeId);
        if (badge) {
            setState(prev => ({
                ...prev,
                badges: [...prev.badges, { ...badge, unlockedAt: new Date().toISOString() }]
            }));

            // Celebração
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.7 }
            });
        }
    };

    const updateGoalProgress = (goalId: string, increment: number) => {
        setState(prev => ({
            ...prev,
            weeklyGoals: prev.weeklyGoals.map(goal =>
                goal.id === goalId
                    ? { ...goal, current: Math.min(goal.current + increment, goal.target) }
                    : goal
            )
        }));
    };

    return (
        <GamificationContext.Provider value={{ state, addPoints, incrementStreak, unlockBadge, updateGoalProgress }}>
            {children}
        </GamificationContext.Provider>
    );
};

// Hook
export const useGamification = () => {
    const context = useContext(GamificationContext);
    if (!context) {
        throw new Error('useGamification must be used within GamificationProvider');
    }
    return context;
};

export default GamificationContext;
