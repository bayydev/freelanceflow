import React from 'react';
import { createPortal } from 'react-dom';
import { Crown, Lock, FileText, MessageSquare, Users, DollarSign, X, ArrowRight } from 'lucide-react';

interface UpgradeTriggerProps {
    feature: 'contracts' | 'scripts' | 'leads' | 'finance' | 'calculator' | 'qualifier';
    currentUsage?: number;
    limit?: number;
    isOpen: boolean;
    onClose: () => void;
    onUpgrade: () => void;
}

const FEATURE_CONFIG = {
    contracts: {
        icon: FileText,
        title: 'Limite de Contratos Atingido',
        description: 'Você já utilizou seu contrato gratuito. Desbloqueie contratos ilimitados para nunca perder uma venda.',
        benefits: [
            'Contratos ilimitados',
            'Modelos profissionais',
            'Assinatura digital',
            'Exportação em PDF'
        ]
    },
    scripts: {
        icon: MessageSquare,
        title: 'Mais Scripts Disponíveis',
        description: 'Você já usou o script básico. Acesse scripts avançados de negociação, objeções e fechamento.',
        benefits: [
            'Scripts de objeção',
            'Templates de follow-up',
            'Mensagens de fechamento',
            'Scripts por nicho'
        ]
    },
    leads: {
        icon: Users,
        title: 'Limite de Leads Atingido',
        description: 'Você atingiu o limite diário de leads. Prospecte sem limites e feche mais negócios.',
        benefits: [
            'Leads ilimitados',
            'Prospecção avançada',
            'Qualificação completa',
            'Histórico completo'
        ]
    },
    finance: {
        icon: DollarSign,
        title: 'Gestão Financeira',
        description: 'Tenha controle total das suas finanças. Acompanhe entradas, saídas e lucro real.',
        benefits: [
            'Controle de receitas',
            'Gestão de despesas',
            'Relatórios mensais',
            'Projeções de lucro'
        ]
    },
    calculator: {
        icon: DollarSign,
        title: 'Precificador Ilimitado',
        description: 'Você usou todos os cálculos gratuitos de hoje. Desbloqueie para precificar sem limites.',
        benefits: [
            'Cálculos ilimitados',
            'Simulador de projetos',
            'Margem personalizada',
            'Histórico de preços'
        ]
    },
    qualifier: {
        icon: Users,
        title: 'Qualificador Avançado',
        description: 'Limite de qualificações atingido. Continue qualificando leads sem interrupções.',
        benefits: [
            'Qualificações ilimitadas',
            'Filtros avançados',
            'Score detalhado',
            'Integração CRM'
        ]
    }
};

const UpgradeTrigger: React.FC<UpgradeTriggerProps> = ({
    feature,
    currentUsage,
    limit,
    isOpen,
    onClose,
    onUpgrade
}) => {
    if (!isOpen) return null;

    const config = FEATURE_CONFIG[feature];
    const Icon = config.icon;

    return createPortal(
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-cyber-panel border border-cyber-secondary rounded-2xl p-8 max-w-md w-full animate-fade-in shadow-2xl">
                {/* Glow Effect */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyber-secondary blur-[100px] opacity-20 pointer-events-none" />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Icon */}
                <div className="w-16 h-16 bg-cyber-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-6 border border-cyber-secondary/30">
                    <Lock size={28} className="text-cyber-secondary" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-black text-white text-center mb-2">
                    {config.title}
                </h3>

                {/* Usage indicator */}
                {currentUsage !== undefined && limit !== undefined && (
                    <p className="text-sm text-center text-slate-500 mb-4 font-mono">
                        {currentUsage}/{limit} utilizados
                    </p>
                )}

                {/* Description */}
                <p className="text-slate-400 text-center text-sm mb-6 leading-relaxed">
                    {config.description}
                </p>

                {/* Benefits */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 mb-6">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-3">O que você ganha:</p>
                    <ul className="space-y-2">
                        {config.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                                <div className="w-1.5 h-1.5 bg-cyber-secondary rounded-full" />
                                {benefit}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={onUpgrade}
                        className="w-full bg-gradient-to-r from-cyber-secondary to-purple-600 text-white font-bold py-4 rounded-xl hover:shadow-neon-pink transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
                    >
                        <Crown size={18} />
                        DESBLOQUEAR AGORA
                        <ArrowRight size={18} />
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full text-slate-500 text-sm hover:text-slate-300 transition-colors py-2"
                    >
                        Continuar com limite
                    </button>
                </div>

                {/* Footer note */}
                <p className="text-[10px] text-slate-600 text-center mt-4">
                    Cancele quando quiser. Sem compromisso.
                </p>
            </div>
        </div>,
        document.body
    );
};

export default UpgradeTrigger;
