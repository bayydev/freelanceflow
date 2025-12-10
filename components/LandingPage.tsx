import React, { useState } from 'react';
import {
    LayoutGrid, DollarSign, ArrowRight, CheckCircle2, Star, Users,
    TrendingUp, Twitter, Instagram, Linkedin, Mail, Clock, Target,
    Calculator, FileText, GraduationCap, X, Rocket, Sparkles, Crown,
    Circle, Calendar
} from 'lucide-react';

interface LandingPageProps {
    onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
    const [showTerms, setShowTerms] = useState(false);
    const [showSupport, setShowSupport] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);


    const features = [
        {
            icon: Clock,
            title: "Protocolo do Dia",
            description: "Rotina diária otimizada para B2B ou B2C. Prospecte na hora certa.",
            color: "from-cyan-500 to-blue-500"
        },
        {
            icon: Target,
            title: "Qualificador de Leads",
            description: "Classifique leads como HOT, WARM ou COLD automaticamente. Priorize quem mais importa.",
            color: "from-orange-500 to-red-500"
        },
        {
            icon: Users,
            title: "CRM de Bolso",
            description: "Gerencie seus leads em um kanban visual. Ilimitado e gratuito para todos.",
            color: "from-emerald-500 to-green-500"
        },
        {
            icon: Calculator,
            title: "Calculadora de Preços",
            description: "Precifique projetos com confiança. Nunca mais cobre errado.",
            color: "from-purple-500 to-violet-500"
        },
        {
            icon: DollarSign,
            title: "Módulo Financeiro",
            description: "Controle entradas, saídas e metas. Saiba exatamente quanto está ganhando.",
            color: "from-yellow-500 to-orange-500"
        },
        {
            icon: FileText,
            title: "Gerador de Contratos",
            description: "Crie contratos em PDF personalizados em segundos.",
            color: "from-pink-500 to-rose-500"
        },
        {
            icon: GraduationCap,
            title: "Academia FreelanceFlow",
            description: "Photoshop (18 aulas grátis) + Mentoria de Vendas (9 aulas). Aprenda e venda.",
            color: "from-indigo-500 to-purple-500"
        }
    ];

    const freeFeatures = [
        "Curso Photoshop Essencial (18 aulas)",
        "3 Módulos da Mentoria de Vendas",
        "Protocolo do Dia completo",
        "Calculadora de Preços",
        "Qualificador de Leads ilimitado",
        "CRM de Bolso ilimitado",
        "Timer Pomodoro"
    ];

    const proFeatures = [
        "Tudo do plano Free +",
        "+6 Módulos Avançados da Mentoria",
        "Scripts de Vendas (Sales Playbook)",
        "Gerador de Contratos PDF",
        "Módulo Financeiro Completo",
        "Suporte Prioritário via WhatsApp"
    ];

    return (
        <div className="min-h-screen bg-cyber-dark text-white overflow-x-hidden">

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-cyber-dark/80 backdrop-blur-xl border-b border-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-3">
                            <img src="/freelanceflowlogo.png" alt="FreelanceFlow" className="w-12 h-12" />
                            <span className="font-black text-xl tracking-tight">FreelanceFlow</span>
                        </div>
                        <button
                            onClick={onGetStarted}
                            className="bg-cyber-primary hover:bg-cyan-400 text-black font-bold px-6 py-2.5 rounded-lg transition-all hover:shadow-neon-cyan"
                        >
                            Entrar
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-primary/20 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-secondary/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                <div className="relative max-w-5xl mx-auto text-center">
                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-6 animate-fade-in">
                        Gerencie seu Freelance no
                        <br />
                        <span className="bg-gradient-to-r from-cyber-primary via-cyan-300 to-cyber-secondary bg-clip-text text-transparent">
                            Flow, não no Caos
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in">
                        A plataforma tudo-em-um para organizar projetos, pagamentos e clientes.
                        <span className="text-white font-semibold"> Simplifique sua vida profissional.</span>
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-fade-in">
                        <button
                            onClick={onGetStarted}
                            className="group w-full sm:w-auto bg-gradient-to-r from-cyber-primary to-cyan-400 text-black font-black px-10 py-5 rounded-xl text-lg transition-all neon-glow hover:scale-105 flex items-center justify-center gap-3"
                        >
                            Começar Gratuitamente
                            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                    <button
                        onClick={onGetStarted}
                        className="text-slate-400 hover:text-cyber-primary font-medium text-sm transition-colors animate-fade-in"
                    >
                        Já tenho conta →
                    </button>
                </div>

                {/* MacBook Mockup */}
                <div className="relative max-w-5xl mx-auto mt-16 px-4">
                    {/* MacBook Frame */}
                    <div className="relative">
                        {/* Screen Bezel */}
                        <div className="bg-[#1a1a1a] rounded-t-2xl p-3 pb-0 shadow-2xl">
                            {/* Camera notch */}
                            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-800 border border-slate-700"></div>

                            {/* Screen Content - FIEL AO DASHBOARD REAL */}
                            <div className="bg-cyber-dark rounded-t-lg overflow-hidden border border-slate-800">
                                {/* App Header - Igual ao Dashboard real */}
                                <div className="bg-cyber-panel/50 border-b border-slate-800 px-3 py-2 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {/* Avatar com iniciais */}
                                        <div className="w-6 h-6 bg-cyber-primary/20 rounded-md flex items-center justify-center border border-cyber-primary text-cyber-primary font-bold text-[8px]">
                                            ZF
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-[10px] font-bold text-slate-100 uppercase">zé flow</span>
                                            <span className="text-[8px] bg-yellow-500/20 text-yellow-400 px-1 rounded border border-yellow-500/30 font-bold flex items-center gap-0.5">
                                                <Crown size={8} /> PRO
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-[8px] bg-gradient-to-r from-cyber-primary to-cyber-secondary text-white px-2 py-0.5 rounded font-bold hidden sm:block">SEJA PRO</div>
                                    </div>
                                </div>

                                {/* App Body - Protocolo do Dia */}
                                <div className="p-3 min-h-[260px]">
                                    {/* Header do Protocolo */}
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <Target size={12} className="text-cyber-primary" />
                                            <span className="text-[10px] font-bold text-slate-100">Protocolo do Dia</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-[8px] font-mono bg-slate-900 border border-slate-700 px-2 py-0.5 rounded">
                                            <span className="text-cyber-primary">B2B</span>
                                            <span className="text-slate-500">/</span>
                                            <span className="text-slate-500">B2C</span>
                                        </div>
                                    </div>

                                    {/* Info de horário */}
                                    <div className="bg-slate-900/50 border border-slate-800 rounded px-2 py-1 flex items-center justify-between text-[8px] text-slate-400 font-mono mb-3">
                                        <div className="flex items-center gap-1"><Calendar size={10} /><span>Seg-Sex</span></div>
                                        <div className="flex items-center gap-1"><Clock size={10} /><span>09:00 - 18:00</span></div>
                                    </div>

                                    {/* Blocos de Tarefas - Estilo real */}
                                    <div className="space-y-2">
                                        {/* Bloco 1 - Completo */}
                                        <div className="bg-slate-900/30 border border-emerald-900/50 rounded-lg p-2 opacity-80">
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                                    <CheckCircle2 size={12} />
                                                </div>
                                                <div className="w-6 h-6 rounded bg-emerald-500/20 flex items-center justify-center">
                                                    <Mail size={10} className="text-emerald-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-[9px] font-bold text-emerald-400 line-through">Prospecção Ativa</p>
                                                </div>
                                                <span className="text-[8px] font-mono text-slate-500 bg-slate-950 px-1 rounded">09:00 - 10:30</span>
                                            </div>
                                        </div>

                                        {/* Bloco 2 - Ativo */}
                                        <div className="bg-slate-900 border border-cyber-primary rounded-lg p-2 shadow-lg shadow-cyan-900/20 relative">
                                            <div className="absolute top-0 left-0 w-0.5 h-full bg-cyber-primary rounded-l"></div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-600 hover:text-white hover:bg-cyber-primary transition-all">
                                                    <Circle size={12} />
                                                </div>
                                                <div className="w-6 h-6 rounded bg-cyan-500/20 flex items-center justify-center">
                                                    <Users size={10} className="text-cyan-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-[9px] font-bold text-slate-100">Follow-up de Leads</p>
                                                </div>
                                                <span className="text-[8px] font-mono text-slate-500 bg-slate-950 px-1 rounded">10:30 - 12:00</span>
                                            </div>
                                        </div>

                                        {/* Bloco 3 - Pendente */}
                                        <div className="bg-cyber-panel border border-slate-700 rounded-lg p-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-600">
                                                    <Circle size={12} />
                                                </div>
                                                <div className="w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center">
                                                    <FileText size={10} className="text-purple-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-[9px] font-bold text-slate-300">Criação de Propostas</p>
                                                </div>
                                                <span className="text-[8px] font-mono text-slate-500 bg-slate-950 px-1 rounded">14:00 - 16:00</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* MacBook Bottom/Keyboard area */}
                        <div className="bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] h-4 rounded-b-lg"></div>
                        <div className="bg-[#1a1a1a] h-2 mx-auto w-1/4 rounded-b-xl"></div>
                    </div>

                    {/* Reflection/Shadow */}
                    <div className="absolute inset-x-0 -bottom-8 h-16 bg-gradient-to-t from-transparent via-cyber-primary/5 to-transparent blur-xl"></div>
                </div>
            </section>

            {/* Features Bento Grid */}
            <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-black mb-4">
                            Funcionalidades <span className="text-cyber-primary">Principais</span>
                        </h2>
                    </div>

                    {/* Bento Grid Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Card 1: Gestão de Projetos */}
                        <div className="glass rounded-2xl p-8 hover:border-cyber-primary/50 transition-all hover:-translate-y-1 group">
                            <div className="w-16 h-16 bg-gradient-to-br from-cyber-primary to-cyan-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <LayoutGrid size={32} className="text-black" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Gestão de Projetos</h3>
                            <p className="text-slate-400 text-base leading-relaxed">
                                Visualize o progresso de cada etapa em tempo real com nosso Pipeline Kanban.
                            </p>
                        </div>

                        {/* Card 2: Financeiro Descomplicado */}
                        <div className="glass rounded-2xl p-8 hover:border-cyber-secondary/50 transition-all hover:-translate-y-1 group">
                            <div className="w-16 h-16 bg-gradient-to-br from-cyber-secondary to-purple-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <DollarSign size={32} className="text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Financeiro Descomplicado</h3>
                            <p className="text-slate-400 text-base leading-relaxed">
                                Controle de entradas, saídas e metas financeiras em um clique.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* All Features Grid */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-black mb-4">
                            Tudo que você precisa em
                            <span className="text-cyber-primary"> um só lugar</span>
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Ferramentas profissionais pensadas especificamente para designers, motion designers e editores de vídeo.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all hover:-translate-y-1"
                            >
                                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <feature.icon size={28} className="text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MENTORIA & CARREIRA - Seção de Destaque */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-cyber-secondary/10 to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-secondary/20 rounded-full blur-[150px]" />

                <div className="relative max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-cyber-secondary/20 border border-cyber-secondary/30 text-cyber-secondary px-4 py-2 rounded-full text-sm font-bold mb-6">
                            <GraduationCap size={18} />
                            O DIFERENCIAL DO FREELANCEFLOW
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-black mb-6">
                            Mentoria & Carreira<br />
                            <span className="bg-gradient-to-r from-cyber-secondary via-purple-400 to-pink-500 bg-clip-text text-transparent">
                                Aprenda a Vender Como Profissional
                            </span>
                        </h2>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            9 aulas em 3 módulos estratégicos para você sair do zero e conquistar clientes que pagam o que seu trabalho realmente vale.
                        </p>
                    </div>

                    {/* Resultado Real */}
                    <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-2xl p-8 mb-12 text-center">
                        <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">DO ZERO AOS PRIMEIROS CLIENTES</p>
                        <div className="flex items-center justify-center gap-4 flex-wrap">
                            <span className="text-5xl sm:text-6xl font-black text-emerald-400">R$ 793,86</span>
                            <span className="text-2xl text-slate-300 font-bold">em 15 dias</span>
                        </div>
                        <p className="text-white font-semibold mt-3">Resultado real de um iniciante saindo do R$ 0</p>
                        <p className="text-slate-400 mt-1">Usando Facebook Library + Instagram para prospecção ativa</p>
                    </div>

                    {/* Os 9 Módulos organizados em 3 grupos */}
                    <div className="space-y-6 mb-12">
                        {/* Módulo 1: Prospecção */}
                        <div>
                            <p className="text-cyber-primary text-xs uppercase tracking-widest font-bold mb-3 px-2">Módulo 1: Prospecção (Grátis)</p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                    { num: "01", title: "Como Prospectar Clientes" },
                                    { num: "02", title: "Comunicação com Clientes" },
                                    { num: "03", title: "Seu Estilo Pessoal" }
                                ].map((mod, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                                        <span className="text-xl font-black text-emerald-400">{mod.num}</span>
                                        <p className="font-bold text-white text-sm">{mod.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Módulo 2: Qualificação */}
                        <div>
                            <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-3 px-2">Módulo 2: Qualificação (PRO)</p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                    { num: "04", title: "Descobrindo Seu Cliente Ideal" },
                                    { num: "05", title: "Qualificação BANT" },
                                    { num: "06", title: "Qualificação CHAMP" }
                                ].map((mod, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                                        <span className="text-xl font-black text-slate-600">{mod.num}</span>
                                        <p className="font-bold text-slate-300 text-sm">{mod.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Módulo 3: Conversão */}
                        <div>
                            <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-3 px-2">Módulo 3: Conversão (PRO)</p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                    { num: "07", title: "Portfólio e Apresentação" },
                                    { num: "08", title: "Nicho de Mercado" },
                                    { num: "09", title: "Métricas e Validação" }
                                ].map((mod, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                                        <span className="text-xl font-black text-slate-600">{mod.num}</span>
                                        <p className="font-bold text-slate-300 text-sm">{mod.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                            onClick={onGetStarted}
                            className="group bg-gradient-to-r from-cyber-secondary to-purple-500 text-white font-black px-10 py-5 rounded-xl text-lg transition-all hover:shadow-neon-pink hover:scale-105 inline-flex items-center gap-3"
                        >
                            <GraduationCap size={24} />
                            QUERO APRENDER A VENDER
                            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <p className="text-slate-500 text-sm mt-4">+ Curso Photoshop Essencial (18 aulas) 100% grátis</p>
                    </div>
                </div>
            </section>

            {/* Floating UI Demo Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-black mb-4">
                            Interface <span className="text-cyber-secondary">Intuitiva</span>
                        </h2>
                        <p className="text-slate-400">Notificações e atualizações em tempo real</p>
                    </div>

                    {/* Floating Cards - Responsive Layout */}
                    {/* Mobile: stacked grid, Desktop: absolute floating */}
                    <div className="relative md:h-80">
                        {/* Mobile Layout */}
                        <div className="flex flex-col gap-4 md:hidden">
                            {/* Card 1: Pagamento Recebido */}
                            <div className="glass rounded-xl p-4 shadow-lg">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                                        <CheckCircle2 size={20} className="text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">Pagamento Recebido</p>
                                        <p className="text-xs text-slate-400">Agora mesmo</p>
                                    </div>
                                </div>
                                <p className="text-2xl font-mono font-bold text-emerald-400">+R$ 2.500</p>
                            </div>

                            {/* Card 2: Novo Lead */}
                            <div className="glass rounded-xl p-4 shadow-lg">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-cyber-primary/20 rounded-full flex items-center justify-center">
                                        <Users size={20} className="text-cyber-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">Novo Lead</p>
                                        <p className="text-xs text-slate-400">Pipeline</p>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-300">Guilherme Dias</p>
                            </div>

                            {/* Card 3: Progress Bar */}
                            <div className="glass rounded-xl p-4 shadow-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm font-bold text-white">Bloco: Prospecção</p>
                                    <span className="text-xs text-emerald-400 font-bold">100%</span>
                                </div>
                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full w-full bg-gradient-to-r from-cyber-primary to-emerald-400 rounded-full" />
                                </div>
                                <p className="text-xs text-slate-400 mt-2">Concluído</p>
                            </div>
                        </div>

                        {/* Desktop Layout - Absolute positioning */}
                        <div className="hidden md:flex items-center justify-center h-80">
                            {/* Card 1: Pagamento Recebido */}
                            <div className="absolute left-1/4 top-4 glass rounded-xl p-4 animate-float shadow-lg max-w-[200px]">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                                        <CheckCircle2 size={20} className="text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">Pagamento Recebido</p>
                                        <p className="text-xs text-slate-400">Agora mesmo</p>
                                    </div>
                                </div>
                                <p className="text-2xl font-mono font-bold text-emerald-400">+R$ 2.500</p>
                            </div>

                            {/* Card 2: Novo Cliente */}
                            <div className="absolute right-1/4 top-8 glass rounded-xl p-4 animate-float-delayed shadow-lg max-w-[200px]">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-cyber-primary/20 rounded-full flex items-center justify-center">
                                        <Users size={20} className="text-cyber-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">Novo Lead</p>
                                        <p className="text-xs text-slate-400">Pipeline</p>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-300">Guilherme Dias</p>
                            </div>

                            {/* Card 3: Progress Bar */}
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-4 glass rounded-xl p-4 animate-float-delayed-2 shadow-lg w-64">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm font-bold text-white">Bloco: Prospecção</p>
                                    <span className="text-xs text-emerald-400 font-bold">100%</span>
                                </div>
                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full w-full bg-gradient-to-r from-cyber-primary to-emerald-400 rounded-full" />
                                </div>
                                <p className="text-xs text-slate-400 mt-2">Concluído</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* Call to Action - ANTES do Pricing para mostrar valor primeiro */}
            < section className="py-20 px-4 sm:px-6 lg:px-8" >
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-black mb-6">
                        Por que Freelancers Escolhem o
                        <span className="bg-gradient-to-r from-cyber-primary to-cyber-secondary bg-clip-text text-transparent"> FreelanceFlow</span>?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                            <div className="text-4xl font-black text-cyber-primary mb-2">27</div>
                            <p className="text-slate-400 text-sm">Aulas na Academia (18 Photoshop + 9 Vendas)</p>
                        </div>
                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                            <div className="text-4xl font-black text-cyber-secondary mb-2">100%</div>
                            <p className="text-slate-400 text-sm">CRM e Qualificador gratuitos e ilimitados</p>
                        </div>
                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                            <div className="text-4xl font-black text-emerald-400 mb-2">24h</div>
                            <p className="text-slate-400 text-sm">Suporte dedicado para usuários PRO</p>
                        </div>
                    </div>
                    <button
                        onClick={onGetStarted}
                        className="group bg-gradient-to-r from-cyber-secondary to-purple-500 text-white font-black px-10 py-5 rounded-xl text-lg transition-all hover:shadow-neon-pink hover:scale-105 flex items-center justify-center gap-2 mx-auto"
                    >
                        COMEÇAR AGORA - É GRÁTIS
                        <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-slate-500 text-sm mt-4">Não precisa de cartão de crédito</p>
                </div>
            </section >

            {/* Pricing Section - AGORA vem por último antes do footer */}
            < section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/50" >
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-black mb-4">
                            Escolha Seu <span className="text-cyber-primary">Plano</span>
                        </h2>
                        <p className="text-slate-400">Comece grátis e evolua quando estiver pronto</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Free Plan */}
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
                            <h3 className="text-xl font-bold text-white mb-2">FREE</h3>
                            <p className="text-slate-400 text-sm mb-6">Para começar sua jornada</p>
                            <div className="mb-8">
                                <span className="text-4xl font-black text-white">R$ 0</span>
                                <span className="text-slate-500">/mês</span>
                            </div>
                            <ul className="space-y-3 mb-8">
                                {freeFeatures.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-slate-300 text-sm">
                                        <CheckCircle2 size={18} className="text-cyber-primary shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={onGetStarted}
                                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-all"
                            >
                                Começar Grátis
                            </button>
                        </div>

                        {/* Pro Plan */}
                        <div className="relative bg-gradient-to-b from-cyber-primary/10 to-cyber-secondary/10 border-2 border-cyber-primary rounded-2xl p-8 shadow-[0_0_40px_rgba(6,182,212,0.15)]">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyber-primary to-cyan-400 text-black font-bold text-xs px-4 py-1 rounded-full uppercase tracking-wider">
                                Recomendado
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                PRO <Star size={18} className="text-yellow-400 fill-yellow-400" />
                            </h3>
                            <p className="text-slate-400 text-sm mb-6">Acesso completo a todas as ferramentas</p>
                            <div className="mb-8">
                                <span className="text-4xl font-black text-white">R$ 29</span>
                                <span className="text-slate-400">,90/mês</span>
                            </div>
                            <ul className="space-y-3 mb-8">
                                {proFeatures.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-white text-sm">
                                        <CheckCircle2 size={18} className="text-cyber-primary shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={onGetStarted}
                                className="w-full bg-gradient-to-r from-cyber-primary to-cyan-400 hover:from-cyan-400 hover:to-cyber-primary text-black font-black py-3 rounded-xl transition-all neon-glow"
                            >
                                Assinar Pro
                            </button>
                            <p className="text-center text-xs text-slate-500 mt-3">Cancele a qualquer momento</p>
                        </div>
                    </div>
                </div>
            </section >

            {/* Footer */}
            < footer className="border-t border-slate-800 py-12 px-4" >
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <img src="/freelanceflowlogo.png" alt="FreelanceFlow" className="w-10 h-10" />
                            <span className="font-bold text-lg">FreelanceFlow</span>
                        </div>

                        {/* Links */}
                        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
                            <button onClick={() => setShowTerms(true)} className="hover:text-cyber-primary transition-colors">Termos de Uso</button>
                            <button onClick={() => setShowSupport(true)} className="hover:text-cyber-primary transition-colors">Suporte</button>
                            <button onClick={() => setShowPrivacy(true)} className="hover:text-cyber-primary transition-colors">Privacidade</button>
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-4">
                            <a href="#" className="text-slate-500 hover:text-cyber-primary transition-colors">
                                <Twitter size={22} />
                            </a>
                            <a href="#" className="text-slate-500 hover:text-cyber-primary transition-colors">
                                <Instagram size={22} />
                            </a>
                            <a href="#" className="text-slate-500 hover:text-cyber-primary transition-colors">
                                <Linkedin size={22} />
                            </a>
                            <a href="#" className="text-slate-500 hover:text-cyber-primary transition-colors">
                                <Mail size={22} />
                            </a>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-800/50 text-center">
                        <p className="text-slate-500 text-sm">
                            © 2025 FreelanceFlow. Todos os direitos reservados.
                        </p>
                    </div>
                </div>
            </footer >

            {/* Terms Modal */}
            {
                showTerms && (
                    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-cyber-dark/95 backdrop-blur-md" onClick={() => setShowTerms(false)} />
                        <div className="relative bg-cyber-panel border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                            <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                                <h2 className="text-xl font-black text-white">Termos de Uso</h2>
                                <button onClick={() => setShowTerms(false)} className="text-slate-500 hover:text-white"><X size={24} /></button>
                            </div>
                            <div className="p-6 overflow-y-auto text-slate-300 text-sm space-y-4">
                                <p className="text-slate-400 text-xs">Última atualização: Dezembro de 2025</p>

                                <h3 className="text-cyber-primary font-bold">1. Aceitação dos Termos</h3>
                                <p>Ao acessar e usar o FreelanceFlow, você concorda com estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não poderá acessar o serviço.</p>

                                <h3 className="text-cyber-primary font-bold">2. Descrição do Serviço</h3>
                                <p>O FreelanceFlow é uma plataforma de produtividade para freelancers criativos que oferece ferramentas de gestão de projetos, clientes, finanças e desenvolvimento de carreira.</p>

                                <h3 className="text-cyber-primary font-bold">3. Contas de Usuário</h3>
                                <p>Você é responsável por manter a confidencialidade de sua conta e senha. Você concorda em notificar imediatamente sobre qualquer uso não autorizado de sua conta.</p>

                                <h3 className="text-cyber-primary font-bold">4. Planos e Pagamentos</h3>
                                <p>O FreelanceFlow oferece planos gratuitos e pagos. Os pagamentos são processados de forma segura através de nossos parceiros de pagamento. Você pode cancelar sua assinatura a qualquer momento.</p>

                                <h3 className="text-cyber-primary font-bold">5. Uso Aceitável</h3>
                                <p>Você concorda em usar o serviço apenas para fins legais e de acordo com estes termos. É proibido usar o serviço para qualquer atividade ilegal ou não autorizada.</p>

                                <h3 className="text-cyber-primary font-bold">6. Propriedade Intelectual</h3>
                                <p>Todo o conteúdo, funcionalidades e design do FreelanceFlow são protegidos por direitos autorais e outras leis de propriedade intelectual.</p>

                                <h3 className="text-cyber-primary font-bold">7. Limitação de Responsabilidade</h3>
                                <p>O FreelanceFlow é fornecido "como está". Não garantimos que o serviço será ininterrupto, seguro ou livre de erros.</p>

                                <h3 className="text-cyber-primary font-bold">8. Contato</h3>
                                <p>Para dúvidas sobre estes termos, entre em contato conosco através do suporte.</p>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Support Modal */}
            {
                showSupport && (
                    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-cyber-dark/95 backdrop-blur-md" onClick={() => setShowSupport(false)} />
                        <div className="relative bg-cyber-panel border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
                            <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                                <h2 className="text-xl font-black text-white">Suporte</h2>
                                <button onClick={() => setShowSupport(false)} className="text-slate-500 hover:text-white"><X size={24} /></button>
                            </div>
                            <div className="p-6 text-slate-300 text-sm space-y-6">
                                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                                    <h3 className="text-cyber-primary font-bold mb-2">Email</h3>
                                    <p className="text-slate-400">Para dúvidas, sugestões ou problemas técnicos:</p>
                                    <a href="mailto:contato.visualcaua@gmail.com" className="text-cyber-primary hover:underline">contato.visualcaua@gmail.com</a>
                                </div>

                                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                                    <h3 className="text-cyber-primary font-bold mb-2">WhatsApp</h3>
                                    <p className="text-slate-400">Atendimento rápido de segunda a sexta, das 9h às 18h:</p>
                                    <a href="https://wa.me/5527992241844" target="_blank" rel="noopener noreferrer" className="text-cyber-primary hover:underline">(27) 99224-1844</a>
                                </div>

                                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                                    <h3 className="text-cyber-primary font-bold mb-2">Tempo de Resposta</h3>
                                    <p className="text-slate-400">Respondemos todas as mensagens em até 24 horas úteis. Usuários PRO têm prioridade no atendimento.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Privacy Modal */}
            {
                showPrivacy && (
                    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-cyber-dark/95 backdrop-blur-md" onClick={() => setShowPrivacy(false)} />
                        <div className="relative bg-cyber-panel border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                            <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                                <h2 className="text-xl font-black text-white">Política de Privacidade</h2>
                                <button onClick={() => setShowPrivacy(false)} className="text-slate-500 hover:text-white"><X size={24} /></button>
                            </div>
                            <div className="p-6 overflow-y-auto text-slate-300 text-sm space-y-4">
                                <p className="text-slate-400 text-xs">Última atualização: Dezembro de 2025</p>

                                <h3 className="text-cyber-primary font-bold">1. Informações que Coletamos</h3>
                                <p>Coletamos informações que você nos fornece diretamente, como nome, email e dados de pagamento. Também coletamos dados de uso para melhorar nossos serviços.</p>

                                <h3 className="text-cyber-primary font-bold">2. Como Usamos suas Informações</h3>
                                <p>Usamos suas informações para: fornecer e manter nosso serviço, processar pagamentos, enviar comunicações importantes e melhorar a experiência do usuário.</p>

                                <h3 className="text-cyber-primary font-bold">3. Armazenamento de Dados</h3>
                                <p>Seus dados são armazenados de forma segura em servidores protegidos. Utilizamos criptografia e outras medidas de segurança para proteger suas informações.</p>

                                <h3 className="text-cyber-primary font-bold">4. Compartilhamento de Dados</h3>
                                <p>Não vendemos ou compartilhamos suas informações pessoais com terceiros, exceto quando necessário para processar pagamentos ou cumprir obrigações legais.</p>

                                <h3 className="text-cyber-primary font-bold">5. Seus Direitos</h3>
                                <p>Você tem o direito de acessar, corrigir ou excluir seus dados pessoais. Para exercer esses direitos, entre em contato com nosso suporte.</p>

                                <h3 className="text-cyber-primary font-bold">6. Cookies</h3>
                                <p>Usamos cookies para melhorar sua experiência e analisar o uso do serviço. Você pode configurar seu navegador para recusar cookies.</p>

                                <h3 className="text-cyber-primary font-bold">7. Alterações nesta Política</h3>
                                <p>Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças significativas por email ou através do serviço.</p>

                                <h3 className="text-cyber-primary font-bold">8. Contato</h3>
                                <p>Para questões sobre privacidade, entre em contato através do suporte ou pelo email: contato.visualcaua@gmail.com</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default LandingPage;
