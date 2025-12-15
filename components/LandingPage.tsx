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
            icon: LayoutGrid,
            title: "Gerador de Briefing",
            description: "Monte questionários profissionais por nicho e exporte PDFs para enviar ao cliente.",
            color: "from-violet-500 to-fuchsia-500"
        },
        {
            icon: Sparkles,
            title: "Scripts de Vendas",
            description: "Playbook completo com scripts prontos para B2B e B2C. Copie e venda.",
            color: "from-amber-500 to-yellow-500"
        },
        {
            icon: GraduationCap,
            title: "Academia Flow",
            description: "Photoshop (18 aulas grátis) + Mentoria de Vendas (9 aulas). Aprenda e venda.",
            color: "from-indigo-500 to-purple-500"
        }
    ];

    const freeFeatures = [
        "Curso Photoshop Essencial (18 aulas)",
        "3 Aulas da Mentoria de Vendas (Módulo 1)",
        "Protocolo do Dia completo",
        "Qualificador de Leads ilimitado",
        "CRM de Bolso (até 3 leads)",
        "Calculadora de Preços (3 cálculos/dia)",
        "1 Contrato + 1 Script + 1 Briefing"
    ];

    const proFeatures = [
        "Tudo do plano Free +",
        "+6 Aulas da Mentoria (Módulos 2 e 3)",
        "CRM Ilimitado + Calculadora Ilimitada",
        "Scripts de Vendas Ilimitados",
        "Gerador de Contratos Ilimitado",
        "Gerador de Briefing Ilimitado",
        "Módulo Financeiro Completo",
        "Suporte Prioritário via WhatsApp"
    ];

    const agencyFeatures = [
        "Tudo do PRO",
        "Banco de Templates PSD (Packs)",
        "Agente IA de Conteúdo",
        "Agente IA de Imagens",
        "Prioridade no Suporte"
    ];

    return (
        <div className="min-h-screen bg-cyber-dark text-white overflow-x-hidden">

            {/* Navigation - Retainer Style */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-retainer-dark/85 backdrop-blur-xl border-b border-retainer-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <img src="/flowlogo.png" alt="Flow" className="w-10 h-10" />
                            <span className="font-display font-bold text-lg text-white">Flow</span>
                        </div>
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#funcionalidades" className="text-retainer-text hover:text-cyber-primary transition-colors text-sm">Funcionalidades</a>
                            <a href="#como-funciona" className="text-retainer-text hover:text-cyber-primary transition-colors text-sm">Como Funciona</a>
                            <a href="#precos" className="text-retainer-text hover:text-cyber-primary transition-colors text-sm">Preços</a>
                            <a href="#faq" className="text-retainer-text hover:text-cyber-primary transition-colors text-sm">FAQ</a>
                        </div>
                        <button
                            onClick={() => {
                                localStorage.removeItem('intended_plan');
                                onGetStarted();
                            }}
                            className="bg-cyber-primary hover:bg-cyber-secondary text-white font-semibold px-5 py-2 rounded-lg transition-all shadow-neon-violet hover:shadow-neon-violet-lg"
                        >
                            Começar Agora
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
                        Gerencie projetos.
                        <br />
                        Feche contratos.
                        <br />
                        <span className="bg-gradient-to-r from-cyber-primary via-cyan-300 to-cyber-secondary bg-clip-text text-transparent">
                            Aprenda a vender.
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in">
                        O único CRM para designers com scripts de venda, calculadora de preços
                        <span className="text-white font-semibold"> e contratos com assinatura digital.</span>
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-fade-in">
                        <button
                            onClick={() => {
                                localStorage.removeItem('intended_plan');
                                onGetStarted();
                            }}
                            className="group w-full sm:w-auto bg-gradient-to-r from-cyber-primary to-cyan-400 text-black font-black px-10 py-5 rounded-xl text-lg transition-all neon-glow hover:scale-105 flex items-center justify-center gap-3 pulse-glow ripple"
                        >
                            Acessar Ferramentas Gratuitas
                            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                    <button
                        onClick={() => {
                            localStorage.removeItem('intended_plan');
                            onGetStarted();
                        }}
                        className="text-slate-400 hover:text-cyber-primary font-medium text-sm transition-colors animate-fade-in"
                    >
                        Já tenho conta →
                    </button>
                </div>

                {/* 3D Dashboard Mockup - Retainer Style */}
                <div className="relative max-w-5xl mx-auto mt-16 px-4" style={{ perspective: '1000px' }}>
                    <div
                        className="bg-retainer-surface border border-retainer-border rounded-2xl overflow-hidden transition-transform duration-500 hover:rotate-x-0"
                        style={{
                            transform: 'rotateX(5deg)',
                            boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'rotateX(0deg)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'rotateX(5deg)'}
                    >
                        {/* App Header - Real Dashboard Style */}
                        <div className="flex items-center px-4 py-2 border-b border-retainer-border bg-retainer-card">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                                <div className="w-6 h-6 bg-cyber-primary/20 rounded-md flex items-center justify-center border border-cyber-primary text-cyber-primary font-bold text-[8px]">
                                    ZF
                                </div>
                                <span className="text-xs font-bold text-white uppercase">ZÉ FLOW</span>
                                <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-1.5 rounded border border-yellow-500/30 font-bold flex items-center gap-0.5">
                                    <Crown size={10} /> PRO
                                </span>
                            </div>
                            <div className="hidden md:flex items-center gap-1 ml-6 bg-retainer-surface border border-retainer-border rounded-lg p-1">
                                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-700 text-white text-[10px] font-bold">
                                    Negócio
                                </div>
                                <div className="flex items-center gap-1.5 px-2 py-1 rounded text-slate-500 text-[10px] font-bold">
                                    CRM
                                </div>
                                <div className="flex items-center gap-1.5 px-2 py-1 rounded text-slate-500 text-[10px] font-bold">
                                    Finanças
                                </div>
                                <div className="flex items-center gap-1.5 px-2 py-1 rounded text-slate-500 text-[10px] font-bold">
                                    Foco
                                </div>
                            </div>
                            <div className="ml-auto text-[10px] bg-gradient-to-r from-cyber-primary to-violet-500 text-white px-2 py-1 rounded font-bold">SEJA PRO</div>
                        </div>

                        {/* App Body - Real Dashboard Content */}
                        <div className="p-6 bg-[#050505] min-h-[340px]">
                            {/* Greeting */}
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <p className="text-retainer-text text-sm">Boa tarde, <span className="text-cyber-primary font-bold">Zé Flow</span></p>
                                    <p className="text-xs text-slate-500 mt-1">3/5 blocos concluídos hoje. Continue focado.</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-slate-500 uppercase">Modo</p>
                                    <p className="text-sm font-bold text-cyber-primary">Empresas</p>
                                </div>
                            </div>

                            {/* Revenue + Quick Actions */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Revenue Card */}
                                <div className="bg-retainer-surface border border-retainer-border rounded-xl p-5">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                            <TrendingUp className="text-retainer-accent" size={16} />
                                            Faturamento do Mês
                                        </h3>
                                        <span className="text-[10px] text-slate-500 font-mono">dezembro/2024</span>
                                    </div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-xl font-black text-white">R$ 4.500,00</span>
                                        <span className="text-xs text-slate-400">de R$ 6.000</span>
                                    </div>
                                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-1">
                                        <div className="h-full w-3/4 bg-gradient-to-r from-retainer-accent to-cyber-primary rounded-full" />
                                    </div>
                                    <p className="text-[10px] text-slate-500 text-right">75% da meta</p>
                                </div>

                                {/* Quick Actions */}
                                <div className="bg-retainer-surface border border-retainer-border rounded-xl p-5">
                                    <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                        <Sparkles className="text-yellow-400" size={16} />
                                        Ações Rápidas
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
                                            <Users size={14} className="text-cyber-primary mb-1" />
                                            <span className="text-[10px] font-bold text-white block">Novo Cliente</span>
                                        </div>
                                        <div className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
                                            <FileText size={14} className="text-purple-400 mb-1" />
                                            <span className="text-[10px] font-bold text-white block">Gerar Contrato</span>
                                        </div>
                                        <div className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
                                            <Target size={14} className="text-pink-400 mb-1" />
                                            <span className="text-[10px] font-bold text-white block">Scripts de Venda</span>
                                        </div>
                                        <div className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
                                            <Calculator size={14} className="text-yellow-400 mb-1" />
                                            <span className="text-[10px] font-bold text-white block">Calcular Preço</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof - Retainer Style */}
            <section className="py-10 border-b border-retainer-border">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                        <Users className="text-cyber-primary" size={24} />
                        <p className="text-xl sm:text-2xl font-bold text-white">
                            Mais de <span className="text-cyber-primary">50 freelancers validados</span> já utilizam o Flow
                        </p>
                    </div>
                    <p className="text-slate-400 text-sm mt-2">Designers, Motion Designers e Editores de Vídeo</p>
                </div>
            </section>

            {/* Feedbacks Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-950/30">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl font-black mb-3">
                            O que estão dizendo sobre o <span className="text-cyber-primary">Flow</span>
                        </h2>
                        <p className="text-slate-400 text-sm">Feedbacks reais de quem já está usando a plataforma</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Feedback 1 */}
                        <div className="bg-cyber-panel border border-cyber-border rounded-2xl p-4 hover:border-cyber-primary/30 transition-all">
                            <img
                                src="/assets/Screenshot_4.png"
                                alt="Feedback de usuário"
                                className="w-full rounded-xl"
                            />
                        </div>

                        {/* Feedback 2 */}
                        <div className="bg-cyber-panel border border-cyber-border rounded-2xl p-4 hover:border-cyber-primary/30 transition-all">
                            <img
                                src="/assets/Screenshot_5.png"
                                alt="Feedback de usuário"
                                className="w-full rounded-xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Bento Grid */}
            <section id="funcionalidades" className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-black mb-4">
                            Funcionalidades <span className="text-cyber-primary">Principais</span>
                        </h2>
                    </div>

                    {/* Bento Grid Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Card 1: Gestão de Projetos */}
                        <div className="glass rounded-2xl p-8 hover:border-cyber-primary/50 transition-all group card-3d">
                            <div className="w-16 h-16 bg-gradient-to-br from-cyber-primary to-cyan-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform hover-bounce">
                                <LayoutGrid size={32} className="text-black" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Gestão de Projetos</h3>
                            <p className="text-slate-400 text-base leading-relaxed">
                                Visualize o progresso de cada etapa em tempo real com nosso Pipeline Kanban.
                            </p>
                        </div>

                        {/* Card 2: Financeiro Descomplicado */}
                        <div className="glass rounded-2xl p-8 hover:border-cyber-secondary/50 transition-all group card-3d">
                            <div className="w-16 h-16 bg-gradient-to-br from-cyber-secondary to-purple-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform hover-bounce">
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
                                className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all card-3d stagger-item"
                            >
                                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform hover-bounce`}>
                                    <feature.icon size={28} className="text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* COMO FUNCIONA - Step by Step */}
            <section id="como-funciona" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 to-cyber-dark">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-black mb-4">
                            Como o <span className="text-cyber-primary">Flow</span> Funciona?
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Em 4 passos simples, você transforma sua rotina freelancer e começa a fechar mais projetos.
                        </p>
                    </div>

                    {/* Steps Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {/* Step 1 */}
                        <div className="relative bg-cyber-panel border border-cyber-border rounded-2xl p-8 hover:border-cyber-primary/50 transition-all group">
                            <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-cyber-primary to-cyan-400 rounded-xl flex items-center justify-center text-black font-black text-xl shadow-neon-cyan">
                                1
                            </div>
                            <div className="mt-4">
                                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                    <Target className="text-cyber-primary" size={20} />
                                    Qualifique Seus Leads
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Use o <span className="text-white font-medium">Qualificador de Leads</span> para classificar seus contatos como HOT, WARM ou COLD.
                                    Saiba exatamente quem tem maior potencial de fechar e priorize seu tempo.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative bg-cyber-panel border border-cyber-border rounded-2xl p-8 hover:border-cyber-primary/50 transition-all group">
                            <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-cyber-secondary to-purple-400 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-neon-pink">
                                2
                            </div>
                            <div className="mt-4">
                                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                    <Users className="text-cyber-secondary" size={20} />
                                    Gerencie no CRM
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Adicione seus leads ao <span className="text-white font-medium">CRM de Bolso</span> com pipeline visual estilo Kanban.
                                    Acompanhe cada cliente do primeiro contato até o pagamento final.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative bg-cyber-panel border border-cyber-border rounded-2xl p-8 hover:border-cyber-primary/50 transition-all group">
                            <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-400 rounded-xl flex items-center justify-center text-white font-black text-xl">
                                3
                            </div>
                            <div className="mt-4">
                                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                    <Calculator className="text-emerald-400" size={20} />
                                    Calcule e Feche
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Use a <span className="text-white font-medium">Calculadora de Preços</span> para precificar corretamente, gere <span className="text-white font-medium">Contratos em PDF</span> personalizados
                                    e crie <span className="text-white font-medium">Briefings Automáticos</span> para coletar informações do cliente. Scripts de venda prontos para abordar e negociar.
                                </p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="relative bg-cyber-panel border border-cyber-border rounded-2xl p-8 hover:border-cyber-primary/50 transition-all group">
                            <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-400 rounded-xl flex items-center justify-center text-white font-black text-xl">
                                4
                            </div>
                            <div className="mt-4">
                                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                    <DollarSign className="text-yellow-400" size={20} />
                                    Controle as Finanças
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Registre entradas e saídas no <span className="text-white font-medium">Módulo Financeiro</span>.
                                    Defina metas mensais, acompanhe seu faturamento e saiba exatamente quanto está ganhando.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bonus: Academia */}
                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl p-8 text-center">
                        <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-bold mb-4">
                            <GraduationCap size={14} />
                            BÔNUS INCLUÍDO
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                            Academia Flow: Aprenda a Vender
                        </h3>
                        <p className="text-slate-400 max-w-xl mx-auto mb-6">
                            Curso de <span className="text-white font-medium">Photoshop Essencial (18 aulas)</span> +
                            <span className="text-white font-medium"> Mentoria de Vendas (9 aulas)</span> para você sair do zero e conquistar clientes.
                        </p>
                        <button
                            onClick={() => {
                                localStorage.removeItem('intended_plan');
                                onGetStarted();
                            }}
                            className="group bg-gradient-to-r from-cyber-primary to-cyan-400 text-black font-black px-8 py-4 rounded-xl text-lg transition-all hover:shadow-neon-cyan hover:scale-105 inline-flex items-center gap-2"
                        >
                            QUERO COMEÇAR AGORA
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
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
                            O DIFERENCIAL DO FLOW
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
                        {/* Módulo 1: Fundamentos */}
                        <div>
                            <p className="text-cyber-primary text-xs uppercase tracking-widest font-bold mb-3 px-2">Módulo 1: Fundamentos (Grátis)</p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                    { num: "01", title: "O Método e Seleção de Nicho" },
                                    { num: "02", title: "Meta Ads Library" },
                                    { num: "03", title: "Portfólio Before/After" }
                                ].map((mod, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                                        <span className="text-xl font-black text-emerald-400">{mod.num}</span>
                                        <p className="font-bold text-white text-sm">{mod.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Módulo 2: Execução */}
                        <div>
                            <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-3 px-2">Módulo 2: Execução (PRO)</p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                    { num: "04", title: "Lista de Prospects" },
                                    { num: "05", title: "Abordagem Inicial" },
                                    { num: "06", title: "Fechamento de Vendas" }
                                ].map((mod, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                                        <span className="text-xl font-black text-slate-600">{mod.num}</span>
                                        <p className="font-bold text-slate-300 text-sm">{mod.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Módulo 3: Escalabilidade */}
                        <div>
                            <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-3 px-2">Módulo 3: Escalabilidade (PRO)</p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                    { num: "07", title: "Oferta e Precificação" },
                                    { num: "08", title: "Prospecção em Escala" },
                                    { num: "09", title: "Crescendo Seu Negócio" }
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
                            onClick={() => {
                                localStorage.removeItem('intended_plan');
                                onGetStarted();
                            }}
                            className="group bg-gradient-to-r from-cyber-primary to-cyan-400 text-black font-black px-10 py-5 rounded-xl text-lg transition-all hover:shadow-neon-cyan hover:scale-105 inline-flex items-center gap-3"
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
            </section>

            {/* Call to Action - ANTES do Pricing para mostrar valor primeiro */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-black mb-6">
                        Por que Freelancers Escolhem o
                        <span className="bg-gradient-to-r from-cyber-primary to-cyber-secondary bg-clip-text text-transparent"> Flow</span>?
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
                        onClick={() => {
                            localStorage.removeItem('intended_plan');
                            onGetStarted();
                        }}
                        className="group bg-gradient-to-r from-cyber-primary to-cyan-400 text-black font-black px-10 py-5 rounded-xl text-lg transition-all hover:shadow-neon-cyan hover:scale-105 flex items-center justify-center gap-2 mx-auto"
                    >
                        COMEÇAR AGORA - É GRÁTIS
                        <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-slate-500 text-sm mt-4">Não precisa de cartão de crédito</p>
                </div>
            </section>

            {/* Pricing Section - AGORA vem por último antes do footer */}
            <section id="precos" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/50">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-black mb-4">
                            Escolha Seu <span className="text-cyber-primary">Plano</span>
                        </h2>
                        <p className="text-slate-400">Comece grátis e evolua quando estiver pronto</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {/* Free Plan */}
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 flex flex-col">
                            <h3 className="text-xl font-bold text-white mb-2">FREE</h3>
                            <p className="text-slate-400 text-sm mb-6">Para começar sua jornada</p>
                            <div className="mb-8">
                                <span className="text-4xl font-black text-white">R$ 0</span>
                                <span className="text-slate-500">/mês</span>
                            </div>
                            <ul className="space-y-3 mb-8 flex-1">
                                {freeFeatures.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-slate-300 text-sm">
                                        <CheckCircle2 size={18} className="text-cyber-primary shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => {
                                    localStorage.removeItem('intended_plan');
                                    onGetStarted();
                                }}
                                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-all"
                            >
                                Começar Grátis
                            </button>
                        </div>

                        {/* Pro Plan */}
                        <div className="relative bg-gradient-to-b from-cyber-primary/10 to-cyber-secondary/10 border-2 border-cyber-primary rounded-2xl p-8 shadow-[0_0_40px_rgba(6,182,212,0.15)] shimmer-effect flex flex-col">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyber-primary to-cyan-400 text-black font-bold text-xs px-4 py-1 rounded-full uppercase tracking-wider">
                                MAIS POPULAR
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                PRO
                            </h3>
                            <p className="text-slate-400 text-sm mb-6">Acesso completo a todas as ferramentas</p>
                            <div className="mb-8">
                                <span className="text-4xl font-black text-white">R$ 29</span>
                                <span className="text-slate-400">,90/mês</span>
                            </div>
                            <ul className="space-y-3 mb-8 flex-1">
                                {proFeatures.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-white text-sm">
                                        <CheckCircle2 size={18} className="text-cyber-primary shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => {
                                    localStorage.removeItem('intended_plan');
                                    onGetStarted();
                                }}
                                className="w-full bg-gradient-to-r from-cyber-primary to-cyan-400 hover:from-cyan-400 hover:to-cyber-primary text-black font-black py-3 rounded-xl transition-all neon-glow"
                            >
                                Assinar Pro
                            </button>
                            <p className="text-center text-xs text-slate-500 mt-3">Cancele a qualquer momento</p>
                        </div>

                        {/* Agency Plan */}
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 flex flex-col">
                            <h3 className="text-xl font-bold text-white mb-2">AGENCY</h3>
                            <p className="text-slate-400 text-sm mb-6">Produtividade Máxima</p>
                            <div className="mb-8">
                                <span className="text-4xl font-black text-white">R$ 69</span>
                                <span className="text-slate-400">,90/mês</span>
                            </div>
                            <ul className="space-y-3 mb-8 flex-1">
                                {agencyFeatures.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-slate-300 text-sm">
                                        <CheckCircle2 size={18} className="text-cyber-primary shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => {
                                    localStorage.setItem('intended_plan', 'agency');
                                    onGetStarted();
                                }}
                                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-all"
                            >
                                Assinar Agency
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section - Retainer Style */}
            <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-center text-white mb-12">
                    Dúvidas Frequentes
                </h2>
                <div className="space-y-4">
                    {/* FAQ Item 1 */}
                    <details className="group border-b border-retainer-border pb-4">
                        <summary className="flex justify-between items-center cursor-pointer list-none text-white font-medium text-lg py-2 hover:text-cyber-primary transition-colors">
                            O Flow é realmente gratuito?
                            <span className="text-retainer-text group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="text-retainer-text mt-3 text-sm leading-relaxed">
                            Sim! O plano Free dá acesso a diversas ferramentas como CRM (até 3 leads), Qualificador ilimitado,
                            Protocolo do Dia e 21 aulas gratuitas. Você só paga se quiser desbloquear recursos avançados com o plano PRO ou AGENCY.
                        </p>
                    </details>

                    {/* FAQ Item 2 */}
                    <details className="group border-b border-retainer-border pb-4">
                        <summary className="flex justify-between items-center cursor-pointer list-none text-white font-medium text-lg py-2 hover:text-cyber-primary transition-colors">
                            Posso cancelar a qualquer momento?
                            <span className="text-retainer-text group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="text-retainer-text mt-3 text-sm leading-relaxed">
                            Sim. Não há fidelidade ou multa. Você pode cancelar sua assinatura PRO ou AGENCY quando quiser
                            e continuará tendo acesso até o final do período pago.
                        </p>
                    </details>

                    {/* FAQ Item 3 */}
                    <details className="group border-b border-retainer-border pb-4">
                        <summary className="flex justify-between items-center cursor-pointer list-none text-white font-medium text-lg py-2 hover:text-cyber-primary transition-colors">
                            Como funciona o suporte?
                            <span className="text-retainer-text group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="text-retainer-text mt-3 text-sm leading-relaxed">
                            Usuários PRO e AGENCY têm suporte prioritário via WhatsApp com resposta em até 24h.
                            Usuários Free podem acessar a documentação e FAQ's dentro da plataforma.
                        </p>
                    </details>

                    {/* FAQ Item 4 */}
                    <details className="group border-b border-retainer-border pb-4">
                        <summary className="flex justify-between items-center cursor-pointer list-none text-white font-medium text-lg py-2 hover:text-cyber-primary transition-colors">
                            O Flow funciona para qual tipo de profissional?
                            <span className="text-retainer-text group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="text-retainer-text mt-3 text-sm leading-relaxed">
                            O Flow foi feito para Designers, Motion Designers, Editores de Vídeo e outros profissionais
                            criativos que trabalham como freelancer e precisam organizar projetos, clientes e finanças.
                        </p>
                    </details>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-800 py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <img src="/flowlogo.png" alt="Flow" className="w-10 h-10" />
                            <span className="font-bold text-lg">Flow</span>
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
                            © 2025 Flow. Todos os direitos reservados.
                        </p>
                    </div>
                </div>
            </footer>

            {/* Terms Modal */}
            {
                showTerms && (
                    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-cyber-dark/95 backdrop-blur-md" onClick={() => setShowTerms(false)} />
                        <div className="relative bg-cyber-panel border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-slide-up">
                            <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                                <h2 className="text-xl font-black text-white">Termos de Uso</h2>
                                <button onClick={() => setShowTerms(false)} className="text-slate-500 hover:text-white"><X size={24} /></button>
                            </div>
                            <div className="p-6 overflow-y-auto text-slate-300 text-sm space-y-4">
                                <p className="text-slate-400 text-xs">Última atualização: Dezembro de 2025</p>

                                <h3 className="text-cyber-primary font-bold">1. Aceitação dos Termos</h3>
                                <p>Ao acessar e usar o Flow, você concorda com estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não poderá acessar o serviço.</p>

                                <h3 className="text-cyber-primary font-bold">2. Descrição do Serviço</h3>
                                <p>O Flow é uma plataforma de produtividade para freelancers criativos que oferece ferramentas de gestão de projetos, clientes, finanças e desenvolvimento de carreira.</p>

                                <h3 className="text-cyber-primary font-bold">3. Contas de Usuário</h3>
                                <p>Você é responsável por manter a confidencialidade de sua conta e senha. Você concorda em notificar imediatamente sobre qualquer uso não autorizado de sua conta.</p>

                                <h3 className="text-cyber-primary font-bold">4. Planos e Pagamentos</h3>
                                <p>O Flow oferece planos gratuitos e pagos. Os pagamentos são processados de forma segura através de nossos parceiros de pagamento. Você pode cancelar sua assinatura a qualquer momento.</p>

                                <h3 className="text-cyber-primary font-bold">5. Uso Aceitável</h3>
                                <p>Você concorda em usar o serviço apenas para fins legais e de acordo com estes termos. É proibido usar o serviço para qualquer atividade ilegal ou não autorizada.</p>

                                <h3 className="text-cyber-primary font-bold">6. Propriedade Intelectual</h3>
                                <p>Todo o conteúdo, funcionalidades e design do Flow são protegidos por direitos autorais e outras leis de propriedade intelectual.</p>

                                <h3 className="text-cyber-primary font-bold">7. Limitação de Responsabilidade</h3>
                                <p>O Flow é fornecido "como está". Não garantimos que o serviço será ininterrupto, seguro ou livre de erros.</p>

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
                        <div className="relative bg-cyber-panel border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
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
                        <div className="relative bg-cyber-panel border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-slide-up">
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
        </div>
    );
};

export default LandingPage;
