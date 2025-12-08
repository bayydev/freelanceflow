import React, { useState } from 'react';
import {
    LayoutGrid, DollarSign, ArrowRight, CheckCircle2, Star, Users,
    TrendingUp, Twitter, Instagram, Linkedin, Mail, Clock, Target,
    Calculator, FileText, GraduationCap, X
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
            title: "Pipeline de Leads",
            description: "Gerencie leads em um kanban visual. Nunca perca um follow-up.",
            color: "from-emerald-500 to-green-500"
        },
        {
            icon: Calculator,
            title: "Calculadora de Preços",
            description: "Precifique projetos com confiança. Gere propostas profissionais.",
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
            title: "Mentoria & Carreira",
            description: "9 módulos exclusivos para sair do zero aos contratos high-ticket.",
            color: "from-indigo-500 to-purple-500"
        }
    ];

    const freeFeatures = [
        "3 Módulos da Mentoria",
        "Protocolo do Dia",
        "Pipeline de Leads (limitado)",
        "Timer Pomodoro"
    ];

    const proFeatures = [
        "Tudo do plano Free +",
        "+6 Módulos Extras da Mentoria",
        "Pipeline Ilimitado + Scripts",
        "Calculadora de Preços Completa",
        "Gerador de Contratos PDF",
        "Módulo Financeiro Completo",
        "Suporte Prioritário"
    ];

    return (
        <div className="min-h-screen bg-cyber-dark text-white overflow-x-hidden">

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-cyber-dark/80 backdrop-blur-xl border-b border-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-3">
                            <img src="/assets/freelanceflowlogo.png" alt="FreelanceFlow" className="w-12 h-12" />
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

                {/* App Window Preview */}
                <div className="relative max-w-4xl mx-auto mt-16">
                    <div className="app-window rounded-2xl p-1">
                        <div className="bg-cyber-panel rounded-xl p-6 sm:p-10">
                            {/* Window Header Dots */}
                            <div className="flex gap-2 mb-6">
                                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                            </div>

                            {/* Dashboard Stats */}
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4 text-center">
                                    <p className="text-3xl font-mono font-bold text-cyan-400">12</p>
                                    <p className="text-xs text-slate-500 mt-1">Leads Ativos</p>
                                </div>
                                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 text-center">
                                    <p className="text-3xl font-mono font-bold text-emerald-400">R$ 8.5k</p>
                                    <p className="text-xs text-slate-500 mt-1">Este Mês</p>
                                </div>
                                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
                                    <p className="text-3xl font-mono font-bold text-purple-400">85%</p>
                                    <p className="text-xs text-slate-500 mt-1">Conversão</p>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full w-3/4 bg-gradient-to-r from-cyber-primary to-cyber-secondary rounded-full" />
                            </div>
                            <p className="text-xs text-slate-500 mt-2 text-center">Meta mensal: 75% concluída</p>
                        </div>
                    </div>
                    {/* Gradient overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cyber-dark to-transparent" />
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

            {/* Floating UI Demo Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-black mb-4">
                            Interface <span className="text-cyber-secondary">Intuitiva</span>
                        </h2>
                        <p className="text-slate-400">Notificações e atualizações em tempo real</p>
                    </div>

                    {/* Floating Cards */}
                    <div className="relative h-80 flex items-center justify-center">
                        {/* Card 1: Pagamento Recebido */}
                        <div className="absolute left-4 md:left-1/4 top-4 glass rounded-xl p-4 animate-float shadow-lg max-w-[200px]">
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
                        <div className="absolute right-4 md:right-1/4 top-8 glass rounded-xl p-4 animate-float-delayed shadow-lg max-w-[200px]">
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
            </section>

            {/* Social Proof */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-950/50">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-wrap justify-center items-center gap-8 text-slate-400">
                        <div className="flex items-center gap-3">
                            <Users size={24} className="text-cyber-primary" />
                            <span className="text-lg font-semibold">+500 Freelancers</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Star size={24} className="text-yellow-400 fill-yellow-400" />
                            <span className="text-lg font-semibold">4.9/5 Avaliação</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <TrendingUp size={24} className="text-emerald-400" />
                            <span className="text-lg font-semibold">+R$ 150k Faturados</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
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
                                        <CheckCircle2 size={18} className="text-slate-500 shrink-0" />
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
                                Mais Popular
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
            </section>

            {/* Final CTA */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/50">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-black mb-6">
                        Pronto para
                        <span className="bg-gradient-to-r from-cyber-primary to-cyber-secondary bg-clip-text text-transparent"> Decolar</span>?
                    </h2>
                    <p className="text-slate-400 mb-10 max-w-xl mx-auto">
                        Junte-se a centenas de freelancers que já transformaram suas carreiras com o FreelanceFlow.
                    </p>
                    <button
                        onClick={onGetStarted}
                        className="group bg-gradient-to-r from-cyber-secondary to-purple-500 text-white font-black px-10 py-5 rounded-xl text-lg transition-all hover:shadow-neon-pink hover:scale-105 flex items-center justify-center gap-2 mx-auto"
                    >
                        CRIAR MINHA CONTA GRÁTIS
                        <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-800 py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <img src="/assets/freelanceflowlogo.png" alt="FreelanceFlow" className="w-10 h-10" />
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
            </footer>

            {/* Terms Modal */}
            {showTerms && (
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
            )}

            {/* Support Modal */}
            {showSupport && (
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
            )}

            {/* Privacy Modal */}
            {showPrivacy && (
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
            )}
        </div>
    );
};

export default LandingPage;
