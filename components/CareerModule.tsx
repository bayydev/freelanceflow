import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { X, CheckCircle2, Circle, ChevronDown, ChevronUp, Lock, Map, GraduationCap, ArrowRight, ArrowLeft, Star, BarChart, Save, TrendingUp, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CareerModuleProps {
    isOpen: boolean;
    onClose: () => void;
    isPremium: boolean;
    onRequestUpgrade?: () => void;
    embedded?: boolean;
}

// Interface para o formulário de métricas
interface MetricsData {
    month: string;
    modulesCompleted: number;
    icpDefined: boolean;
    prospectsCount: string;
    closedDeals: string;
    revenue: string;
    notes: string;
}

const CAREER_CONTENT = [
    {
        id: "mod_01",
        title: "MÓDULO 1: COMO PROSPECTAR CLIENTES",
        isFree: true,
        content: `
### O que é Prospecção de Clientes?

A prospecção é o processo estratégico de **identificar, atrair e iniciar contato com potenciais clientes** que demonstram interesse ou possível demanda pelos seus serviços de design. Não é um processo aleatório, mas sim uma atividade estruturada que aumenta suas chances de fechar projetos rentáveis.

### Técnicas Validadas de Prospecção para Designers

#### 1. Prospecção via Redes Sociais (Instagram)

O Instagram é a plataforma mais poderosa para designers prospectarem clientes, devido ao forte apelo visual.

**Passo a Passo:**
- Identifique o nicho de cliente ideal (ex: restaurantes, consultórios, agências de marketing)
- Use hashtags e palavras-chave específicas para encontrar potenciais clientes
- Analise perfis que se encaixam no seu ICP (Ideal Customer Profile)
- Envie mensagens diretas personalizadas referenciando trabalhos recentes ou conteúdos deles
- Mencione um projeto específico seu que possa resolver um problema que identifica no perfil

**Dica Importante:** A abordagem deve ser genuína e contextualizada. Referenciar um trabalho recente do prospect ou mencionar algo específico sobre o negócio dele aumenta significativamente as chances de resposta.

#### 2. Prospecção via Grupos de Interesse (Facebook e WhatsApp)

Grupos específicos reúnem seu cliente ideal em um único lugar.

**Como Funciona:**
- Participe ativamente de grupos onde seu cliente ideal está presente
- Não apenas divulgue seus serviços; **produza conteúdo de valor** para a comunidade
- Compartilhe seu portfólio naturalmente quando relevante
- Responda perguntas e dúvidas dos membros com generosidade

#### 3. Networking Presencial e Online

Construir relacionamentos reais gera as melhores conversões.

**Atividades Recomendadas:**
- Participar de eventos, palestras, workshops e meetups da área
- Apresentar seus trabalhos e ouvir necessidades do público-alvo direto
- Oferecer workshops ou talks sobre design

### Erros Comuns na Prospecção

❌ Abordagem genérica ("Olá, faço design gráfico")
❌ Não pesquisar sobre o cliente antes de abordar
❌ Focar apenas em vender, sem oferecer valor
❌ Não ter exemplos de portfólio para mostrar
❌ Desistir após poucas tentativas

✅ O correto é ser específico, pesquisar, oferecer valor, ter portfolio pronto e persistir.
    `
    },
    {
        id: "mod_02",
        title: "MÓDULO 2: COMO SE COMUNICAR COM CLIENTES",
        isFree: true,
        content: `
### A Importância da Comunicação Eficaz

A capacidade de **comunicar ideias de forma objetiva** é tão importante quanto suas habilidades técnicas de design. Designers que se comunicam bem:
- Ganham confiança dos clientes
- Reduzem conflitos e mal-entendidos
- Conseguem mais indicações
- Cobram mais pelos seus serviços

### Princípios Fundamentais da Comunicação com Clientes

#### 1. Escuta Ativa

Antes de falar, você precisa ouvir profundamente.

**Como Implementar:**
- Faça perguntas abertas para entender o negócio do cliente
- Não interrompa — deixe o cliente falar completamente
- Tome notas sobre dores, objetivos e expectativas
- Demonstre interesse genuíno no que ele está contando

#### 2. Clareza e Simplicidade

Nunca use jargão de design sem explicar.

**Boas Práticas:**
- Explique conceitos técnicos em linguagem simples
- Evite termos como "kerning", "paleta de cores", sem contexto
- Prepare apresentações visuais de suas ideias, não apenas verbais

#### 3. Justificativa de Decisões de Design

Nunca diga "é bonito" — diga "é estratégico".

**Exemplo:**
❌ "Usei essa cor porque combina bem"
✅ "Usei essa cor porque ela transmite confiabilidade — pesquisas mostram que 78% de consumidores associam azul com profissionalismo. Isso é importante porque seu público-alvo é executivos B2B"
    `
    },
    {
        id: "mod_03",
        title: "MÓDULO 3: COMPREENSÃO E EXPRESSÃO DO SEU ESTILO",
        isFree: true,
        content: `
### O que é Estilo de Arte em Design?

Seu estilo é a **forma singular como você se expressa visualmente**. É o que faz seus trabalhos serem reconhecidos e diferenciados no mercado.

### Os 20+ Estilos Principais em Design Gráfico (2025)

#### Estilos Minimalistas
- **Minimalismo Puro**: Menos é mais. Poucos elementos, muito espaço em branco.
- **Flat Design**: Sem profundidade, cores sólidas, formas geométricas simples.

#### Estilos Nostálgicos e Retrô
- **Vintage/Retrô**: Evoca décadas passadas (70s, 80s, 90s).
- **Vaporwave**: Estética Y2K, cores pastel, referências futuristas.

### Como Descobrir Seu Estilo Pessoal?

#### Passo 1: Análise de Preferências
- Observe os trabalhos que você mais gosta.
- Identifique padrões: cores que você usa frequentemente.

#### Passo 2: Experimente Conscientemente
- Escolha um estilo e faça 5-10 projetos (mesmo fictícios) naquele estilo.
- Crie um "projeto de assinatura" que seja totalmente você.

**Diferencial Competitivo:**
Um designer com estilo claro é **imediatamente reconhecível**. Clientes procuram por essa singularidade.
    `
    },
    {
        id: "mod_04",
        title: "MÓDULO 4: DESCOBRINDO SEU CLIENTE IDEAL",
        isFree: false,
        content: `
### Por Que Conhecer o Cliente Ideal é Crucial?

Tentar vender para "todo mundo" é a forma mais cara e ineficiente de conseguir clientes. Designers bem-sucedidos **focam em clientes específicos**.

### O Que É ICP (Ideal Customer Profile)?

O **ICP é uma descrição detalhada do cliente perfeito** para seus serviços. Ele inclui:
- Características da empresa/negócio (tamanho, setor)
- Desafios e dores específicas
- Orçamento disponível

### Os 5 Passos para Definir Seu Cliente Ideal

#### Passo 1: Analise Seus Melhores Clientes Atuais
Se você tem clientes satisfeitos, eles são seu mapa do tesouro. Liste os 5 melhores e procure padrões.

#### Passo 2: Mapeie as Dores e Necessidades
Clientes não compram design — **compram solução para um problema**.
- Identifique dores comuns: Falta de identidade visual, presença fraca em redes sociais.

#### Passo 3: Crie Sua Persona
Dê um nome ao seu cliente ideal e "humanize-o".
Exemplo: **Marina Andrade**, dona de Clínica Odontológica, busca modernidade, tem budget de 8k.
    `
    },
    {
        id: "mod_05",
        title: "MÓDULO 5: QUALIFICAÇÃO DE LEADS (BANT)",
        isFree: false,
        content: `
### O que É Qualificação de Leads?

É o processo de **avaliar cada contato para determinar se ele é realmente um bom prospecto**.

### Metodologia BANT

#### 1. BUDGET (Orçamento)
"Qual é seu orçamento disponível para este projeto?"
O cliente tem recursos financeiros? O orçamento é realista?

#### 2. AUTHORITY (Autoridade)
"Quem toma a decisão final para contratação?"
Você está falando com a pessoa certa?

#### 3. NEED (Necessidade)
"Qual é o principal problema que você quer resolver com design?"
O cliente realmente precisa do seu serviço? A dor é urgente?

#### 4. TIMELINE (Cronograma)
"Qual é o prazo para executar este projeto?"
É urgente ou indefinido?

**Matriz de Qualificação:**
Um lead é **bem qualificado** quando atende a pelo menos 3 dos 4 critérios fortemente.
    `
    },
    {
        id: "mod_06",
        title: "MÓDULO 6: QUALIFICAÇÃO DE LEADS (CHAMP)",
        isFree: false,
        content: `
### O que É CHAMP?

Metodologia **focada nos desafios do cliente**. Muito usada em design.

#### C - CHALLENGES (Desafios)
Qual é o desafio/problema que o cliente enfrenta?
"Meu site não converte visitantes em clientes".

#### H - AUTHORITY (Autoridade)
Quem aprova a decisão?

#### A - ABILITY/APPROVAL (Capacidade)
Tem recursos para resolver? Podem investir agora?

#### M - MOTIVATION/METRICS (Motivação)
Qual é a urgência? Como medem sucesso?
"Se não resolver esse desafio, qual o impacto?"

**BANT vs CHAMP:**
Para designers, **CHAMP geralmente é mais efetivo** porque demonstra profundidade no entendimento do problema.
    `
    },
    {
        id: "mod_07",
        title: "MÓDULO 7: PORTFÓLIO E APRESENTAÇÃO",
        isFree: false,
        content: `
### Por Que Portfólio É Sua Ferramenta de Venda Mais Poderosa

Seu portfólio é sua **credibilidade visual** e seu **argumento de venda mais forte**.

### Estrutura de Portfólio Eficaz

#### Elemento 1: Introdução Pessoal
Quem você é, seu nicho e o que faz diferente.

#### Elemento 2: Seleção de 10-15 Projetos Principais
Qualidade > Quantidade.

#### Elemento 3: Case Study Detalhado
Estrutura para cada projeto:
1. **Título Descritivo**
2. **Desafio** (O que precisava mudar)
3. **Solução** (Sua abordagem de design)
4. **Resultado** (Impacto no cliente)
5. **Imagens** (Mockups profissionais)

**Otimização Visual:**
✅ Use cores que refletem seu estilo
✅ Tipografia profissional
✅ Muito espaço em branco (breath)
    `
    },
    {
        id: "mod_08",
        title: "MÓDULO 8: NICHO DE MERCADO",
        isFree: false,
        content: `
### Por Que Ter um Nicho É Crítico?

Designers generalistas competem por preço. Designers nichos competem por valor.

**Benefícios:**
- 💰 Cobra 30-50% mais.
- 🎯 Mais fácil de prospectar.
- 📚 Constrói expertise real.

### Os 3 Tipos de Nicho

#### Tipo 1: Nicho por Cliente
"Trabalho apenas com clínicas odontológicas". Conhece profundamente os problemas dessa indústria.

#### Tipo 2: Nicho por Tipo de Serviço
"Especialista em Rebranding". Expertise profunda em um tipo de projeto.

#### Tipo 3: Nicho por Estilo Visual
"Designer minimalista moderno". Identidade clara e reconhecível.

### Como Escolher Seu Nicho?
1. Analise seus projetos passados (quais gostou mais?).
2. Pesquise demanda no mercado.
3. Teste sem se comprometer (faça 5 projetos fictícios).
    `
    },
    {
        id: "mod_09",
        title: "MÓDULO 9: MÉTRICAS E VALIDAÇÃO",
        isFree: false,
        content: "FORM_PLACEHOLDER" // Content replaced by custom component
    }
];

const CareerModule: React.FC<CareerModuleProps> = ({ isOpen, onClose, isPremium, onRequestUpgrade, embedded = false }) => {
    const [completedModules, setCompletedModules] = useState<string[]>([]);
    // No mobile, se activeModuleId for null, mostra a lista. Se tiver ID, mostra o conteúdo.
    const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

    // Ref para o container de conteúdo para scroll
    const contentRef = useRef<HTMLDivElement>(null);

    // State do Módulo 9 (Formulário)
    const [metrics, setMetrics] = useState<MetricsData>({
        month: new Date().toLocaleString('pt-BR', { month: 'long' }),
        modulesCompleted: 0,
        icpDefined: false,
        prospectsCount: '',
        closedDeals: '',
        revenue: '',
        notes: ''
    });

    // Effect para Scroll ao mudar o módulo
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [activeModuleId]);

    // Calculo de Taxa de Conversão e Ticket Médio
    const leads = parseInt(metrics.prospectsCount) || 0;
    const deals = parseInt(metrics.closedDeals) || 0;
    const revenueVal = parseFloat(metrics.revenue.replace(/[^\d.,]/g, '').replace(',', '.')) || 0;

    const conversionRate = leads > 0 ? ((deals / leads) * 100).toFixed(1) : '0.0';
    const averageTicket = deals > 0 ? (revenueVal / deals).toFixed(2) : '0.00';

    // Validação do Formulário
    const isFormValid = () => {
        return (
            metrics.prospectsCount !== '' &&
            metrics.closedDeals !== '' &&
            metrics.revenue !== '' &&
            metrics.notes.length > 5 // Pelo menos uma nota curta
        );
    };

    // Load progress from localStorage
    useEffect(() => {
        // Carregar progresso
        const saved = localStorage.getItem('career_progress');
        if (saved) {
            const parsed = JSON.parse(saved);
            setCompletedModules(parsed);
            setMetrics(prev => ({ ...prev, modulesCompleted: parsed.length }));
        } else {
            // Se não tiver nada salvo, podemos setar o primeiro modulo como ativo no desktop por padrão
            // Mas no mobile queremos a lista.
            if (window.innerWidth >= 768) {
                setActiveModuleId(CAREER_CONTENT[0].id);
            }
        }

        // Carregar métricas
        const savedMetrics = localStorage.getItem('career_metrics');
        if (savedMetrics) {
            setMetrics(JSON.parse(savedMetrics));
        }
    }, []);

    const toggleComplete = (id: string) => {
        let newCompleted;
        if (completedModules.includes(id)) {
            newCompleted = completedModules.filter(m => m !== id);
        } else {
            newCompleted = [...completedModules, id];
        }
        setCompletedModules(newCompleted);
        localStorage.setItem('career_progress', JSON.stringify(newCompleted));
        setMetrics(prev => ({ ...prev, modulesCompleted: newCompleted.length }));
    };

    const handleFinishAndNext = (currentId: string) => {
        // 1. Marca como lido se ainda não estiver
        if (!completedModules.includes(currentId)) {
            toggleComplete(currentId);
        }

        // 2. Navega para o próximo
        const currentIndex = CAREER_CONTENT.findIndex(m => m.id === currentId);
        const nextMod = CAREER_CONTENT[currentIndex + 1];

        if (nextMod) {
            // Se o próximo for pago e o user for free, set activeModuleId vai disparar a tela de CTA automaticamente
            setActiveModuleId(nextMod.id);
            // Em mobile, scroll to top (Handled by useEffect, but good to force on mobile)
            window.scrollTo(0, 0);
        } else {
            // É o último módulo e completou
            confetti({
                particleCount: 200,
                spread: 120,
                origin: { y: 0.6 },
                colors: ['#06b6d4', '#d946ef', '#fde047']
            });
            // Pequeno delay para efeito visual antes de fechar ou mostrar parabéns
            setTimeout(() => onClose(), 2000);
        }
    };

    const handleMetricsChange = (field: keyof MetricsData, value: any) => {
        const newMetrics = { ...metrics, [field]: value };
        setMetrics(newMetrics);
        localStorage.setItem('career_metrics', JSON.stringify(newMetrics));
    };

    const totalModules = CAREER_CONTENT.length;
    const progressPercentage = Math.round((completedModules.length / totalModules) * 100);

    // Melhoria no Parser de Texto (Negrito e Listas)
    const parseContent = (text: string) => {
        const lines = text.split('\n');
        return lines.map((line, i) => {
            // Remove hyphens from list items for cleaner look with our own bullets
            const cleanLine = line.trim().startsWith('-') ? line.replace('-', '').trim() : line;

            const parts = cleanLine.split(/(\*\*.*?\*\*)/g);

            const renderedParts = parts.map((part, j) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={j} className="text-white font-bold">{part.slice(2, -2)}</strong>;
                }
                return <span key={j}>{part}</span>;
            });

            // Formatting logic
            if (line.trim().startsWith('### ')) return <h3 key={i} className="text-xl font-bold text-cyber-secondary mt-6 mb-3">{line.replace('### ', '')}</h3>;
            if (line.trim().startsWith('#### ')) return <h4 key={i} className="text-lg font-bold text-cyber-primary mt-4 mb-2">{line.replace('#### ', '')}</h4>;

            if (line.trim().startsWith('-')) {
                return (
                    <div key={i} className="flex gap-2 items-start my-2 pl-2">
                        <div className="w-1.5 h-1.5 bg-cyber-primary rounded-full mt-2 shrink-0"></div>
                        <span className="text-slate-300 text-sm leading-relaxed">{renderedParts}</span>
                    </div>
                );
            }

            if (line.trim().startsWith('❌')) return <p key={i} className="text-red-400 my-2 bg-red-500/10 p-2 rounded border border-red-500/20 text-sm">{renderedParts}</p>;
            if (line.trim().startsWith('✅')) return <p key={i} className="text-emerald-400 font-bold my-2 bg-emerald-500/10 p-2 rounded border border-emerald-500/20 text-sm">{renderedParts}</p>;

            if (!line.trim()) return <br key={i} />;

            return <p key={i} className="text-slate-300 leading-relaxed mb-2">{renderedParts}</p>;
        });
    };

    if (!isOpen) return null;

    const content = (
        <div className={embedded ? "bg-cyber-panel border border-cyber-border rounded-xl overflow-hidden" : "fixed inset-0 z-[70] flex items-center justify-center sm:p-4"}>
            {!embedded && <div className="absolute inset-0 bg-cyber-dark/95 backdrop-blur-md" onClick={onClose} />}

            <div className={`relative bg-cyber-panel ${embedded ? '' : 'border-0 sm:border border-cyber-primary w-full max-w-6xl sm:rounded-2xl shadow-2xl'} overflow-hidden flex flex-col ${embedded ? 'h-[600px]' : 'h-full sm:h-[90vh]'} animate-fade-in`}>

                {/* Header */}
                <div className="p-4 sm:p-6 border-b border-slate-700 bg-slate-900/80 flex justify-between items-start shrink-0 z-10">
                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Mobile Back Button - Só aparece se estiver vendo um modulo em tela pequena */}
                        <button
                            className={`md:hidden p-2 rounded-full hover:bg-slate-800 transition-colors ${activeModuleId ? 'text-white' : 'hidden'}`}
                            onClick={() => setActiveModuleId(null)}
                        >
                            <ArrowLeft size={24} />
                        </button>

                        <div>
                            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 sm:gap-3">
                                <GraduationCap className="text-cyber-primary hidden sm:block" size={32} />
                                <span className="truncate max-w-[200px] sm:max-w-none">Mentoria & Carreira</span>
                            </h2>
                            <p className="text-slate-400 text-xs sm:text-sm mt-1 hidden sm:block">Sua trilha para sair do zero aos contratos high-ticket.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-6">
                        <div className="hidden sm:block text-right">
                            <p className="text-xs text-cyber-primary font-bold uppercase tracking-widest mb-1">Progresso</p>
                            <div className="w-32 sm:w-48 h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-cyber-primary to-cyber-secondary transition-all duration-1000"
                                    style={{ width: `${progressPercentage}%` }}
                                />
                            </div>
                        </div>
                        <button onClick={onClose} className="text-slate-500 hover:text-white p-2 hover:bg-slate-800 rounded-full transition-all">
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex flex-1 overflow-hidden relative">

                    {/* Sidebar (Navigation) - Hidden on mobile if activeModuleId is present */}
                    <div className={`
                w-full md:w-1/3 border-r border-slate-800 overflow-y-auto bg-slate-950 p-4 space-y-2
                ${activeModuleId ? 'hidden md:block' : 'block'}
            `}>
                        <div className="sm:hidden mb-4 p-4 bg-slate-900 rounded-lg">
                            <p className="text-xs text-cyber-primary font-bold uppercase mb-2">Seu Progresso</p>
                            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-1">
                                <div
                                    className="h-full bg-gradient-to-r from-cyber-primary to-cyber-secondary transition-all duration-1000"
                                    style={{ width: `${progressPercentage}%` }}
                                />
                            </div>
                            <p className="text-[10px] text-slate-500 text-right">{progressPercentage}% Concluído</p>
                        </div>

                        {CAREER_CONTENT.map((module, idx) => {
                            const isCompleted = completedModules.includes(module.id);
                            const isActive = activeModuleId === module.id;
                            const isLockedByFree = !isPremium && !module.isFree;

                            // Logic for Sequential Unlocking (ALL Users)
                            const previousModuleId = idx > 0 ? CAREER_CONTENT[idx - 1].id : null;
                            const isPreviousCompleted = previousModuleId ? completedModules.includes(previousModuleId) : true;

                            // Módulo é bloqueado por sequência se o anterior não foi completado
                            const isLockedBySequence = idx > 0 && !isPreviousCompleted;

                            // Desabilita se bloqueado por sequência OU se for conteúdo PRO para usuário free
                            const isDisabled = isLockedBySequence || isLockedByFree;

                            return (
                                <button
                                    key={module.id}
                                    disabled={isDisabled}
                                    onClick={() => setActiveModuleId(module.id)}
                                    className={`w-full p-4 flex items-center justify-between text-left transition-all rounded-xl border ${isActive
                                        ? 'bg-cyber-primary/10 border-cyber-primary text-white'
                                        : isDisabled
                                            ? 'bg-slate-900/50 border-transparent text-slate-600 cursor-not-allowed'
                                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600 hover:text-white'
                                        }`}
                                >
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-70">
                                            {isLockedByFree ? <span className="text-cyber-secondary flex items-center gap-1"><Star size={8} fill="currentColor" /> PRO</span> : `Módulo ${idx + 1}`}
                                        </span>
                                        <span className="text-xs font-bold truncate pr-2 max-w-[220px] sm:max-w-[180px]">{module.title.split(':')[1] || module.title}</span>
                                    </div>

                                    {isLockedByFree ? (
                                        <Lock size={16} className="text-cyber-secondary shrink-0" />
                                    ) : isLockedBySequence ? (
                                        <Lock size={16} className="text-slate-600 shrink-0" />
                                    ) : isCompleted ? (
                                        <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                                    ) : (
                                        <Circle size={18} className="text-slate-700 shrink-0" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Main Content Viewer - Hidden on mobile if NO activeModuleId */}
                    <div
                        ref={contentRef}
                        className={`
                flex-1 bg-cyber-dark p-4 sm:p-8 flex-col overflow-y-auto scroll-smooth
                ${activeModuleId ? 'flex w-full absolute inset-0 z-10 md:static md:z-auto' : 'hidden md:flex'}
            `}>
                        {activeModuleId ? (
                            (() => {
                                const mod = CAREER_CONTENT.find(m => m.id === activeModuleId);
                                if (!mod) return null;

                                // Check if Locked specifically by Free Plan
                                if (!isPremium && !mod.isFree) {
                                    return (
                                        <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in p-8">
                                            <div className="w-20 h-20 bg-cyber-secondary/10 rounded-full flex items-center justify-center mb-6 border border-cyber-secondary shadow-[0_0_30px_rgba(217,70,239,0.3)]">
                                                <Lock size={40} className="text-cyber-secondary" />
                                            </div>
                                            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 uppercase italic">
                                                Conteúdo <span className="text-cyber-secondary">Exclusivo PRO</span>
                                            </h2>
                                            <p className="text-slate-400 max-w-md mb-8 leading-relaxed text-sm sm:text-base">
                                                Você completou os Módulos Gratuitos e deu o primeiro passo. Mas a estratégia completa de vendas, negociação e escala está bloqueada.
                                                <br /><br />
                                                <span className="text-white font-bold">Desbloqueie agora os 6 módulos avançados</span> e pare de perder clientes.
                                            </p>

                                            <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg mb-8 text-left w-full max-w-md">
                                                <p className="text-xs text-slate-500 uppercase font-bold mb-2">O que você vai aprender:</p>
                                                <ul className="space-y-2">
                                                    <li className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 size={14} className="text-emerald-500" /> Scripts de Venda & Negociação</li>
                                                    <li className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 size={14} className="text-emerald-500" /> Definição de Nicho Lucrativo</li>
                                                    <li className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 size={14} className="text-emerald-500" /> Técnicas de Comunicação Profissional</li>
                                                    <li className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 size={14} className="text-emerald-500" /> Métricas e Validação de Resultados</li>
                                                </ul>
                                            </div>

                                            <button
                                                onClick={onRequestUpgrade}
                                                className="w-full sm:w-auto bg-gradient-to-r from-cyber-secondary to-purple-600 text-white font-black py-4 px-10 rounded-xl hover:shadow-neon-pink transition-all flex items-center justify-center gap-2 text-sm sm:text-lg uppercase tracking-wider"
                                            >
                                                LIBERAR MENTORIA COMPLETA <ArrowRight size={20} />
                                            </button>
                                        </div>
                                    );
                                }

                                const isCompleted = completedModules.includes(mod.id);
                                const isLastModule = mod.id === CAREER_CONTENT[CAREER_CONTENT.length - 1].id;

                                return (
                                    <div className="max-w-3xl mx-auto w-full animate-fade-in pb-10">
                                        <div className="mb-6 pb-6 border-b border-slate-800 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
                                            <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">{mod.title}</h1>
                                        </div>

                                        {mod.id === 'mod_09' ? (
                                            // FORMULÁRIO INTERATIVO DO MÓDULO 9 COM CÁLCULO
                                            <div className="space-y-8 animate-fade-in">
                                                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6">
                                                    <div className="flex items-center gap-3 mb-6">
                                                        <div className="p-3 bg-cyber-primary/20 rounded-lg text-cyber-primary">
                                                            <BarChart size={24} />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-lg font-bold text-white">Dashboard de Resultados: {metrics.month}</h3>
                                                            <p className="text-xs text-slate-400">Preencha seus números para ver sua performance.</p>
                                                        </div>
                                                    </div>

                                                    {/* Results Cards (Calculated) */}
                                                    {leads > 0 && (
                                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                                            <div className={`p-4 rounded-lg border ${parseFloat(conversionRate) >= 10 ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-800 border-slate-700'}`}>
                                                                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1 flex items-center gap-1">
                                                                    <TrendingUp size={12} /> Taxa de Conversão
                                                                </p>
                                                                <p className={`text-2xl font-mono font-bold ${parseFloat(conversionRate) >= 10 ? 'text-emerald-400' : 'text-slate-200'}`}>
                                                                    {conversionRate}%
                                                                </p>
                                                                <p className="text-[10px] text-slate-500 mt-1">
                                                                    {parseFloat(conversionRate) < 5 ? 'Atenção: Qualifique melhor (Módulo 5)' : parseFloat(conversionRate) > 15 ? 'Excelente! Estale essa oferta.' : 'Dentro da média de mercado.'}
                                                                </p>
                                                            </div>
                                                            <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
                                                                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Ticket Médio</p>
                                                                <p className="text-2xl font-mono font-bold text-white">R$ {averageTicket}</p>
                                                                <p className="text-[10px] text-slate-500 mt-1">Por cliente fechado</p>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        {/* Checkbox ICP */}
                                                        <div className="col-span-1 md:col-span-2 bg-black/40 border border-slate-700 p-4 rounded-lg flex items-center justify-between">
                                                            <div>
                                                                <span className="text-sm font-bold text-slate-200 block">Definição de Cliente Ideal (ICP)</span>
                                                                <span className="text-xs text-slate-500">Você já tem o perfil do seu cliente escrito?</span>
                                                            </div>
                                                            <button
                                                                onClick={() => handleMetricsChange('icpDefined', !metrics.icpDefined)}
                                                                className={`w-12 h-6 rounded-full transition-colors relative ${metrics.icpDefined ? 'bg-emerald-500' : 'bg-slate-700'}`}
                                                            >
                                                                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${metrics.icpDefined ? 'left-7' : 'left-1'}`} />
                                                            </button>
                                                        </div>

                                                        {/* Inputs de Métricas */}
                                                        <div className="space-y-2">
                                                            <label className="text-xs font-bold text-cyber-primary uppercase">Leads Prospectados</label>
                                                            <input
                                                                type="number"
                                                                placeholder="Ex: 20"
                                                                value={metrics.prospectsCount}
                                                                onChange={e => handleMetricsChange('prospectsCount', e.target.value)}
                                                                className="w-full bg-black border border-slate-700 rounded p-3 text-white focus:border-cyber-primary outline-none"
                                                            />
                                                            <p className="text-[10px] text-slate-500">Quantas pessoas você abordou este mês?</p>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="text-xs font-bold text-emerald-400 uppercase">Clientes Fechados</label>
                                                            <input
                                                                type="number"
                                                                placeholder="Ex: 3"
                                                                value={metrics.closedDeals}
                                                                onChange={e => handleMetricsChange('closedDeals', e.target.value)}
                                                                className="w-full bg-black border border-slate-700 rounded p-3 text-white focus:border-emerald-500 outline-none"
                                                            />
                                                            <p className="text-[10px] text-slate-500">Quantos contratos foram assinados?</p>
                                                        </div>

                                                        <div className="space-y-2 md:col-span-2">
                                                            <label className="text-xs font-bold text-yellow-400 uppercase">Faturamento Estimado (R$)</label>
                                                            <input
                                                                type="text"
                                                                placeholder="Ex: 4500,00"
                                                                value={metrics.revenue}
                                                                onChange={e => handleMetricsChange('revenue', e.target.value)}
                                                                className="w-full bg-black border border-slate-700 rounded p-3 text-white focus:border-yellow-500 outline-none text-lg font-mono"
                                                            />
                                                        </div>

                                                        <div className="space-y-2 md:col-span-2">
                                                            <label className="text-xs font-bold text-slate-400 uppercase">Notas e Aprendizados</label>
                                                            <textarea
                                                                rows={4}
                                                                placeholder="O que funcionou na sua abordagem? O que precisa melhorar?"
                                                                value={metrics.notes}
                                                                onChange={e => handleMetricsChange('notes', e.target.value)}
                                                                className="w-full bg-black border border-slate-700 rounded p-3 text-white focus:border-cyber-primary outline-none text-sm"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end items-center gap-2">
                                                        <span className="text-xs text-slate-500 flex items-center gap-1"><Save size={12} /> Salvo automaticamente</span>
                                                    </div>
                                                </div>

                                                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                                                    <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2"><Star size={16} className="text-yellow-500" /> Dica do Mês</h4>
                                                    <p className="text-xs text-slate-400 leading-relaxed">
                                                        {parseFloat(conversionRate) < 5 && leads > 5
                                                            ? "Sua conversão está baixa. Isso geralmente indica falha na Qualificação (Módulo 5) ou na Proposta. Tente filtrar melhor os clientes antes de enviar preço."
                                                            : "Continue monitorando seus números. Se o Ticket Médio estiver estagnado, revise o Módulo 8 (Nicho) para cobrar mais caro."}
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="prose prose-invert prose-slate max-w-none prose-p:text-sm sm:prose-p:text-base">
                                                {parseContent(mod.content)}
                                            </div>
                                        )}

                                        {/* Action Button at Bottom */}
                                        <div className="mt-12 pt-8 border-t border-slate-800">
                                            <button
                                                onClick={() => handleFinishAndNext(mod.id)}
                                                disabled={isLastModule && !isFormValid()}
                                                className={`w-full py-4 rounded-xl font-black text-lg uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg ${(isLastModule && !isFormValid())
                                                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700 opacity-50'
                                                    : isCompleted
                                                        ? 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                                                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/50'
                                                    }`}
                                            >
                                                {isLastModule ? (
                                                    <>
                                                        {!isFormValid() && <Lock size={20} />}
                                                        🏆 FINALIZAR MENTORIA
                                                    </>
                                                ) : isCompleted ? (
                                                    <>PRÓXIMO MÓDULO <ArrowRight size={24} /></>
                                                ) : (
                                                    <><CheckCircle2 size={24} /> MARCAR COMO LIDO E AVANÇAR</>
                                                )}
                                            </button>
                                            {isLastModule && !isFormValid() && (
                                                <p className="text-center text-xs text-red-400 mt-2">
                                                    Preencha todo o formulário acima (Leads, Clientes, Faturamento e Notas) para finalizar.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })()
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 opacity-50 hidden md:flex">
                                <Map size={64} className="mb-4 text-slate-700" />
                                <h3 className="text-xl font-bold mb-2">Selecione um módulo para começar</h3>
                                <p className="text-sm max-w-xs">Sua jornada de carreira começa no menu ao lado.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );

    return embedded ? content : ReactDOM.createPortal(content, document.body);
};

export default CareerModule;