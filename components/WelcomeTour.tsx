import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Target, Users, Calculator, DollarSign, GraduationCap, FileText, Rocket } from 'lucide-react';

interface WelcomeTourProps {
    userName: string;
    onComplete: () => void;
}

const WelcomeTour: React.FC<WelcomeTourProps> = ({ userName, onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            icon: Rocket,
            title: `Bem-vindo ao Flow, ${userName.split(' ')[0]}!`,
            description: 'Essa plataforma foi criada para você, freelancer criativo, organizar sua vida profissional em um só lugar.',
            highlight: 'Vamos fazer um tour rápido?',
            color: 'from-cyber-primary to-cyan-400'
        },
        {
            icon: Target,
            title: 'Protocolo do Dia',
            description: 'Na tela inicial você encontra sua rotina diária otimizada. Siga os blocos de tarefas para prospectar, fazer follow-up e criar propostas nos horários certos.',
            highlight: 'Dica: Marque cada bloco como concluído para acompanhar seu progresso!',
            color: 'from-cyan-500 to-blue-500'
        },
        {
            icon: Users,
            title: 'CRM de Leads',
            description: 'Cadastre seus potenciais clientes e organize em um kanban visual. O sistema classifica automaticamente como HOT (quente), WARM (morno) ou COLD (frio).',
            highlight: 'Você nunca mais vai perder um lead por desorganização!',
            color: 'from-emerald-500 to-green-500'
        },
        {
            icon: Calculator,
            title: 'Calculadora de Preços',
            description: 'Pare de cobrar no escuro! Insira o tipo de projeto, horas estimadas e custos. A calculadora te dá o preço justo baseado no mercado.',
            highlight: 'Seus clientes pagam o que seu trabalho realmente vale.',
            color: 'from-purple-500 to-violet-500'
        },
        {
            icon: DollarSign,
            title: 'Módulo Financeiro',
            description: 'Controle tudo que entra e sai. Defina metas mensais e acompanhe seu faturamento em tempo real.',
            highlight: 'Saiba exatamente quanto você está ganhando por mês.',
            color: 'from-yellow-500 to-orange-500'
        },
        {
            icon: GraduationCap,
            title: 'Academia Flow',
            description: 'Acesse o curso de Photoshop (18 aulas gratuitas) e a Mentoria de Vendas (9 aulas) para aprender a criar e vender como profissional.',
            highlight: 'Conhecimento prático para você sair do zero!',
            color: 'from-indigo-500 to-purple-500'
        },
        {
            icon: FileText,
            title: 'Gerador de Contratos',
            description: 'Crie contratos profissionais em PDF com seus dados e do cliente. Proteja-se juridicamente em todos os projetos.',
            highlight: 'Nunca mais trabalhe sem contrato!',
            color: 'from-pink-500 to-rose-500'
        }
    ];

    const currentStepData = steps[currentStep];
    const isLastStep = currentStep === steps.length - 1;
    const isFirstStep = currentStep === 0;

    const handleNext = () => {
        if (isLastStep) {
            onComplete();
        } else {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (!isFirstStep) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSkip = () => {
        onComplete();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-cyber-dark/95 backdrop-blur-md" />

            {/* Modal */}
            <div className="relative bg-cyber-panel border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
                {/* Skip button */}
                <button
                    onClick={handleSkip}
                    className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors text-xs"
                >
                    Pular tour
                </button>

                {/* Progress bar */}
                <div className="h-1 bg-slate-800">
                    <div
                        className="h-full bg-gradient-to-r from-cyber-primary to-cyber-secondary transition-all duration-300"
                        style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    />
                </div>

                {/* Content */}
                <div className="p-8 text-center">
                    {/* Icon */}
                    <div className={`w-20 h-20 bg-gradient-to-br ${currentStepData.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                        <currentStepData.icon size={40} className="text-white" />
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-black text-white mb-4">
                        {currentStepData.title}
                    </h2>

                    {/* Description */}
                    <p className="text-slate-400 mb-4 leading-relaxed">
                        {currentStepData.description}
                    </p>

                    {/* Highlight */}
                    <div className="bg-cyber-primary/10 border border-cyber-primary/30 rounded-lg p-3 mb-8">
                        <p className="text-cyber-primary text-sm font-bold">
                            {currentStepData.highlight}
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between">
                        <button
                            onClick={handlePrev}
                            disabled={isFirstStep}
                            className={`flex items-center gap-1 text-sm font-bold transition-colors ${isFirstStep ? 'text-slate-700 cursor-not-allowed' : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            <ChevronLeft size={18} />
                            Anterior
                        </button>

                        {/* Step indicators */}
                        <div className="flex gap-2">
                            {steps.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-2 h-2 rounded-full transition-all ${idx === currentStep ? 'bg-cyber-primary w-6' : 'bg-slate-700'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            className="flex items-center gap-1 text-sm font-bold text-cyber-primary hover:text-white transition-colors"
                        >
                            {isLastStep ? 'Começar!' : 'Próximo'}
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeTour;
