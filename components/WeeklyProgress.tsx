import React from 'react';
import { TrendingUp, Target, Users, DollarSign, Flame, Star } from 'lucide-react';

interface WeeklyGoal {
    id: string;
    title: string;
    target: number;
    current: number;
    type: 'leads' | 'tasks' | 'sales';
}

interface WeeklyProgressProps {
    goals: WeeklyGoal[];
    streak: number;
    points: number;
    level: number;
}

const WeeklyProgress: React.FC<WeeklyProgressProps> = ({ goals, streak, points, level }) => {
    const getGoalIcon = (type: string) => {
        switch (type) {
            case 'leads': return <Users size={14} className="text-cyber-primary" />;
            case 'tasks': return <Target size={14} className="text-emerald-400" />;
            case 'sales': return <DollarSign size={14} className="text-yellow-400" />;
            default: return <Star size={14} />;
        }
    };

    const getGoalColor = (type: string) => {
        switch (type) {
            case 'leads': return 'from-cyber-primary to-cyan-400';
            case 'tasks': return 'from-emerald-500 to-emerald-400';
            case 'sales': return 'from-yellow-500 to-yellow-400';
            default: return 'from-slate-500 to-slate-400';
        }
    };

    const totalProgress = goals.reduce((acc, goal) => acc + (goal.current / goal.target), 0) / goals.length;
    const weekProgressPercent = Math.round(totalProgress * 100);

    return (
        <div className="bg-cyber-panel border border-cyber-border rounded-xl p-4 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <TrendingUp size={18} className="text-cyber-primary" />
                    <h3 className="font-bold text-slate-100 text-sm">Progresso Semanal</h3>
                </div>

                <div className="flex items-center gap-3">
                    {/* Streak */}
                    {streak > 0 && (
                        <div className="flex items-center gap-1 bg-orange-500/10 px-2 py-1 rounded border border-orange-500/20">
                            <Flame size={12} className="text-orange-400" />
                            <span className="text-xs font-bold text-orange-400">{streak} dias</span>
                        </div>
                    )}

                    {/* Level */}
                    <div className="flex items-center gap-1 bg-cyber-primary/10 px-2 py-1 rounded border border-cyber-primary/20">
                        <span className="text-xs font-bold text-cyber-primary">Nv. {level}</span>
                    </div>
                </div>
            </div>

            {/* Overall Progress Bar */}
            <div>
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Semana</span>
                    <span>{weekProgressPercent}%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-cyber-primary to-cyber-secondary transition-all duration-500"
                        style={{ width: `${weekProgressPercent}%` }}
                    />
                </div>
            </div>

            {/* Individual Goals */}
            <div className="space-y-3">
                {goals.map(goal => {
                    const percent = Math.round((goal.current / goal.target) * 100);
                    const isComplete = goal.current >= goal.target;

                    return (
                        <div key={goal.id} className="space-y-1">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {getGoalIcon(goal.type)}
                                    <span className={`text-xs ${isComplete ? 'text-emerald-400 line-through' : 'text-slate-300'}`}>
                                        {goal.title}
                                    </span>
                                </div>
                                <span className={`text-xs font-mono ${isComplete ? 'text-emerald-400' : 'text-slate-500'}`}>
                                    {goal.current}/{goal.target}
                                </span>
                            </div>
                            <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                    className={`h-full bg-gradient-to-r ${getGoalColor(goal.type)} transition-all duration-500`}
                                    style={{ width: `${Math.min(percent, 100)}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Points Display */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500">Pontos acumulados</span>
                <span className="text-sm font-bold text-cyber-primary font-mono">{points.toLocaleString()} pts</span>
            </div>
        </div>
    );
};

export default WeeklyProgress;
