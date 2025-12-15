import React, { useState } from 'react';
import { NicheType, RoleType } from '../types';
import { Briefcase, Utensils, ArrowRight, ArrowLeft, Clock, Calendar, PenTool, Video, Film, Check, Target, DollarSign, FileText, Rocket } from 'lucide-react';
import confetti from 'canvas-confetti';

interface OnboardingProps {
  onComplete: (niche: NicheType, name: string, workDays: string[], workStart: string, workEnd: string, roles: RoleType[], monthlyGoal: number) => void;
}

const DAYS_OF_WEEK = [
  { id: 'Seg', label: 'Seg' },
  { id: 'Ter', label: 'Ter' },
  { id: 'Qua', label: 'Qua' },
  { id: 'Qui', label: 'Qui' },
  { id: 'Sex', label: 'Sex' },
  { id: 'Sab', label: 'Sáb' },
  { id: 'Dom', label: 'Dom' },
];

// Mini Playbook por nicho
const PLAYBOOKS = {
  B2B: {
    title: 'Playbook B2B - Empresas',
    steps: [
      'Prospecte no LinkedIn e Google Maps entre 9h-11h',
      'Foque em escritórios, agências e startups',
      'Envie mensagem direta mencionando um problema que você pode resolver',
      'Faça follow-up 48h depois se não responderem',
      'Prepare proposta comercial estruturada'
    ]
  },
  B2C: {
    title: 'Playbook B2C - Público Final',
    steps: [
      'Prospecte no Instagram entre 18h-21h',
      'Foque em restaurantes, lojas e influenciadores',
      'Comente em posts recentes antes de enviar DM',
      'Mostre antes/depois de trabalhos similares',
      'Ofereça um teste ou amostra gratuita'
    ]
  }
};

// Modelo de contrato básico
const CONTRACT_TEMPLATE = {
  title: 'Contrato de Prestação de Serviços',
  sections: [
    'Identificação das partes',
    'Escopo do projeto',
    'Prazos de entrega',
    'Valores e forma de pagamento',
    'Número de revisões incluídas',
    'Assinaturas'
  ]
};

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [niche, setNiche] = useState<NicheType | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<RoleType[]>([]);
  const [workDays, setWorkDays] = useState<string[]>(['Seg', 'Ter', 'Qua', 'Qui', 'Sex']);
  const [workStart, setWorkStart] = useState('09:00');
  const [workEnd, setWorkEnd] = useState('18:00');

  // Novos estados para steps adicionais
  const [hourlyRate, setHourlyRate] = useState('');
  const [monthlyGoal, setMonthlyGoal] = useState('');
  const [contractorName, setContractorName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const totalSteps = 7;

  const handleNext = () => {
    if (step === 1 && name) {
      setContractorName(name); // Usa o nome para o contrato também
      setStep(2);
    }
    else if (step === 2 && niche) setStep(3);
    else if (step === 3 && selectedRoles.length > 0) setStep(4);
    else if (step === 4) setStep(5); // Playbook - sempre avança
    else if (step === 5) setStep(6); // Precificador - sempre avança
    else if (step === 6 && workDays.length > 0) setStep(7); // Contrato
    else if (step === 7) {
      // Mostra tela de sucesso antes de completar
      setShowSuccess(true);
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#d946ef', '#22c55e']
      });

      // Após 3 segundos, completa o onboarding
      setTimeout(() => {
        onComplete(niche!, name, workDays, workStart, workEnd, selectedRoles, parseFloat(monthlyGoal) || 0);
      }, 3000);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleDay = (dayId: string) => {
    if (workDays.includes(dayId)) {
      setWorkDays(workDays.filter(d => d !== dayId));
    } else {
      setWorkDays([...workDays, dayId]);
    }
  };

  const toggleRole = (role: RoleType) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter(r => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  // Cálculo do precificador simplificado
  const calculateHourlyRate = () => {
    const goal = parseFloat(monthlyGoal) || 0;
    const hoursPerMonth = workDays.length * 4 * 6; // dias * semanas * horas
    if (hoursPerMonth > 0) {
      return (goal / hoursPerMonth).toFixed(2);
    }
    return '0.00';
  };

  // Tela de Sucesso Final
  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cyber-dark p-4 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyber-primary/20 rounded-full blur-[100px]" />

        <div className="max-w-md w-full z-10 text-center animate-fade-in">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500">
            <Rocket size={40} className="text-emerald-400" />
          </div>

          <h1 className="text-3xl font-black text-white mb-4">
            Tudo Pronto, {name.split(' ')[0]}!
          </h1>

          <p className="text-slate-400 mb-6">
            Sua estrutura de vendas está configurada. Agora é hora de prospectar seu primeiro cliente.
          </p>

          <div className="bg-cyber-panel border border-cyber-border rounded-xl p-6 text-left space-y-3">
            <h3 className="text-sm font-bold text-cyber-primary uppercase tracking-wider mb-4">Seu Setup</h3>

            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Nicho:</span>
              <span className="text-slate-200 font-bold">{niche === 'B2B' ? 'Empresas' : 'Público Final'}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Atuação:</span>
              <span className="text-slate-200 font-bold">{selectedRoles.length} funções</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Horário:</span>
              <span className="text-slate-200 font-bold">{workStart} - {workEnd}</span>
            </div>

            {monthlyGoal && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Meta Mensal:</span>
                <span className="text-emerald-400 font-bold">R$ {parseFloat(monthlyGoal).toLocaleString('pt-BR')}</span>
              </div>
            )}
          </div>

          <p className="text-xs text-slate-600 mt-6">Entrando no painel em instantes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-dark p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyber-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyber-secondary/10 rounded-full blur-[100px]" />

      <div className="max-w-md w-full z-10">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary tracking-tighter mb-2">
            FLOW
          </h1>
          <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">
            Setup Inicial
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-slate-500">Etapa {step} de {totalSteps}</span>
            <span className="text-xs text-cyber-primary font-mono">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyber-primary to-cyber-secondary transition-all duration-500"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-cyber-panel border border-cyber-border rounded-2xl p-8 shadow-2xl backdrop-blur-sm">

          {/* STEP 1: NAME */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-sm font-bold text-cyber-primary mb-2 font-mono">
                  QUEM É VOCÊ?
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full bg-cyber-dark border border-cyber-border rounded-lg p-4 text-slate-100 focus:outline-none focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary transition-all font-mono"
                  onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                />
                <p className="text-xs text-slate-500 mt-2">Este nome aparecerá nos seus contratos.</p>
              </div>
              <button
                onClick={handleNext}
                disabled={!name}
                className="w-full bg-slate-100 text-cyber-dark font-bold py-4 rounded-lg hover:bg-white hover:shadow-neon-cyan transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                CONTINUAR <ArrowRight size={20} />
              </button>
            </div>
          )}

          {/* STEP 2: NICHE */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-slate-100 mb-2">Qual seu foco principal?</h2>
                <p className="text-slate-400 text-sm">Isso define sua estratégia de prospecção.</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={() => setNiche(NicheType.B2B)}
                  className={`p-4 border rounded-xl flex items-center gap-4 transition-all group ${niche === NicheType.B2B
                    ? 'bg-cyber-primary/10 border-cyber-primary shadow-neon-cyan'
                    : 'bg-cyber-dark border-cyber-border hover:border-slate-500'
                    }`}
                >
                  <div className={`p-3 rounded-lg ${niche === NicheType.B2B ? 'bg-cyber-primary text-cyber-dark' : 'bg-slate-800 text-slate-400'}`}>
                    <Briefcase size={24} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-slate-100">Atendo Empresas</h3>
                    <p className="text-xs text-slate-400 mt-1">Escritórios, Agências, Startups. <br />Horário Comercial.</p>
                  </div>
                </button>

                <button
                  onClick={() => setNiche(NicheType.B2C)}
                  className={`p-4 border rounded-xl flex items-center gap-4 transition-all group ${niche === NicheType.B2C
                    ? 'bg-cyber-secondary/10 border-cyber-secondary shadow-neon-pink'
                    : 'bg-cyber-dark border-cyber-border hover:border-slate-500'
                    }`}
                >
                  <div className={`p-3 rounded-lg ${niche === NicheType.B2C ? 'bg-cyber-secondary text-cyber-dark' : 'bg-slate-800 text-slate-400'}`}>
                    <Utensils size={24} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-slate-100">Atendo Público Final</h3>
                    <p className="text-xs text-slate-400 mt-1">Restaurantes, Varejo, Influencers. <br />Horários Flexíveis.</p>
                  </div>
                </button>
              </div>

              <div className="flex gap-3">
                <button onClick={handleBack} className="p-4 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:border-slate-500 transition-all">
                  <ArrowLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  disabled={!niche}
                  className="flex-1 bg-slate-100 text-cyber-dark font-bold py-4 rounded-lg hover:bg-white hover:shadow-neon-cyan transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  CONTINUAR <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: ROLES */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-slate-100 mb-2">O que você faz?</h2>
                <p className="text-slate-400 text-sm">Selecione todas as opções que se aplicam.</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={() => toggleRole('GRAPHIC_DESIGNER')}
                  className={`p-4 border rounded-xl flex items-center justify-between transition-all group ${selectedRoles.includes('GRAPHIC_DESIGNER')
                    ? 'bg-purple-500/10 border-purple-500 shadow-neon-pink'
                    : 'bg-cyber-dark border-cyber-border hover:border-slate-500'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${selectedRoles.includes('GRAPHIC_DESIGNER') ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                      <PenTool size={20} />
                    </div>
                    <h3 className="font-bold text-slate-100 text-sm">Designer Gráfico</h3>
                  </div>
                  {selectedRoles.includes('GRAPHIC_DESIGNER') && <Check size={20} className="text-purple-500" />}
                </button>

                <button
                  onClick={() => toggleRole('MOTION_DESIGNER')}
                  className={`p-4 border rounded-xl flex items-center justify-between transition-all group ${selectedRoles.includes('MOTION_DESIGNER')
                    ? 'bg-yellow-500/10 border-yellow-500 shadow-neon-cyan'
                    : 'bg-cyber-dark border-cyber-border hover:border-slate-500'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${selectedRoles.includes('MOTION_DESIGNER') ? 'bg-yellow-500 text-black' : 'bg-slate-800 text-slate-400'}`}>
                      <Film size={20} />
                    </div>
                    <h3 className="font-bold text-slate-100 text-sm">Motion Designer</h3>
                  </div>
                  {selectedRoles.includes('MOTION_DESIGNER') && <Check size={20} className="text-yellow-500" />}
                </button>

                <button
                  onClick={() => toggleRole('VIDEO_EDITOR')}
                  className={`p-4 border rounded-xl flex items-center justify-between transition-all group ${selectedRoles.includes('VIDEO_EDITOR')
                    ? 'bg-blue-500/10 border-blue-500 shadow-neon-cyan'
                    : 'bg-cyber-dark border-cyber-border hover:border-slate-500'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${selectedRoles.includes('VIDEO_EDITOR') ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                      <Video size={20} />
                    </div>
                    <h3 className="font-bold text-slate-100 text-sm">Editor de Vídeo</h3>
                  </div>
                  {selectedRoles.includes('VIDEO_EDITOR') && <Check size={20} className="text-blue-500" />}
                </button>
              </div>

              <div className="flex gap-3">
                <button onClick={handleBack} className="p-4 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:border-slate-500 transition-all">
                  <ArrowLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  disabled={selectedRoles.length === 0}
                  className="flex-1 bg-slate-100 text-cyber-dark font-bold py-4 rounded-lg hover:bg-white hover:shadow-neon-cyan transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  CONTINUAR <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: MINI PLAYBOOK */}
          {step === 4 && niche && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-cyber-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target size={24} className="text-cyber-primary" />
                </div>
                <h2 className="text-xl font-bold text-slate-100 mb-2">Seu Playbook de Vendas</h2>
                <p className="text-slate-400 text-sm">Estratégia personalizada para seu nicho.</p>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                <h3 className="text-sm font-bold text-cyber-primary mb-4">{PLAYBOOKS[niche].title}</h3>
                <ol className="space-y-3">
                  {PLAYBOOKS[niche].steps.map((stepText, idx) => (
                    <li key={idx} className="flex gap-3 text-sm">
                      <span className="w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center text-xs text-cyber-primary font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-slate-300">{stepText}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <p className="text-xs text-slate-500 text-center">Este playbook estará disponível no seu painel.</p>

              <div className="flex gap-3">
                <button onClick={handleBack} className="p-4 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:border-slate-500 transition-all">
                  <ArrowLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 bg-slate-100 text-cyber-dark font-bold py-4 rounded-lg hover:bg-white hover:shadow-neon-cyan transition-all flex items-center justify-center gap-2"
                >
                  ENTENDI <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: PRECIFICADOR INICIAL */}
          {step === 5 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign size={24} className="text-emerald-400" />
                </div>
                <h2 className="text-xl font-bold text-slate-100 mb-2">Sua Meta Financeira</h2>
                <p className="text-slate-400 text-sm">Quanto você quer faturar por mês?</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Meta Mensal (R$)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-4 text-slate-500">R$</span>
                    <input
                      type="number"
                      value={monthlyGoal}
                      onChange={(e) => setMonthlyGoal(e.target.value)}
                      placeholder="5000"
                      className="w-full bg-cyber-dark border border-cyber-border rounded-lg p-4 pl-12 text-slate-100 focus:outline-none focus:border-emerald-500 transition-all text-lg font-mono"
                    />
                  </div>
                </div>

                {monthlyGoal && parseFloat(monthlyGoal) > 0 && (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 animate-fade-in">
                    <p className="text-xs text-slate-400 mb-1">Para atingir essa meta, sua hora deve valer:</p>
                    <p className="text-2xl font-bold text-emerald-400 font-mono">
                      R$ {calculateHourlyRate()}/h
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      Baseado em {workDays.length} dias/semana, 6h produtivas/dia
                    </p>
                  </div>
                )}
              </div>

              <p className="text-xs text-slate-500 text-center">Isso é opcional. Você pode definir depois.</p>

              <div className="flex gap-3">
                <button onClick={handleBack} className="p-4 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:border-slate-500 transition-all">
                  <ArrowLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 bg-slate-100 text-cyber-dark font-bold py-4 rounded-lg hover:bg-white hover:shadow-neon-cyan transition-all flex items-center justify-center gap-2"
                >
                  CONTINUAR <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: SCHEDULE / PROTOCOLO DIÁRIO */}
          {step === 6 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-slate-100 mb-2">Seu Protocolo Diário</h2>
                <p className="text-slate-400 text-sm">Defina seus limites de horário.</p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-cyber-primary mb-3 font-mono uppercase">
                  <Calendar size={14} /> Dias de Trabalho
                </label>
                <div className="flex justify-between gap-1">
                  {DAYS_OF_WEEK.map(day => (
                    <button
                      key={day.id}
                      onClick={() => toggleDay(day.id)}
                      className={`flex-1 py-2 rounded text-xs font-bold transition-all border ${workDays.includes(day.id)
                        ? 'bg-cyber-primary/20 border-cyber-primary text-cyber-primary'
                        : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-600'
                        }`}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-2 font-mono uppercase">
                    <Clock size={14} /> Início
                  </label>
                  <input
                    type="time"
                    value={workStart}
                    onChange={(e) => setWorkStart(e.target.value)}
                    className="w-full bg-cyber-dark border border-cyber-border rounded-lg p-3 text-slate-100 focus:border-cyber-primary outline-none text-center"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-2 font-mono uppercase">
                    <Clock size={14} /> Fim
                  </label>
                  <input
                    type="time"
                    value={workEnd}
                    onChange={(e) => setWorkEnd(e.target.value)}
                    className="w-full bg-cyber-dark border border-cyber-border rounded-lg p-3 text-slate-100 focus:border-cyber-primary outline-none text-center"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={handleBack} className="p-4 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:border-slate-500 transition-all">
                  <ArrowLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  disabled={workDays.length === 0}
                  className="flex-1 bg-slate-100 text-cyber-dark font-bold py-4 rounded-lg hover:bg-white hover:shadow-neon-cyan transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  CONTINUAR <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 7: PRIMEIRO CONTRATO */}
          {step === 7 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-cyber-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText size={24} className="text-cyber-secondary" />
                </div>
                <h2 className="text-xl font-bold text-slate-100 mb-2">Seu Modelo de Contrato</h2>
                <p className="text-slate-400 text-sm">Um template profissional está pronto para você.</p>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                <h3 className="text-sm font-bold text-slate-200 mb-4">{CONTRACT_TEMPLATE.title}</h3>
                <ul className="space-y-2">
                  {CONTRACT_TEMPLATE.sections.map((section, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-slate-400">
                      <Check size={14} className="text-emerald-500" />
                      {section}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-cyber-primary/10 border border-cyber-primary/30 rounded-lg p-4">
                <p className="text-xs text-cyber-primary font-bold mb-1">Contrato configurado para:</p>
                <p className="text-sm text-slate-300">{contractorName}</p>
              </div>

              <p className="text-xs text-slate-500 text-center">Você poderá gerar contratos completos no painel.</p>

              <div className="flex gap-3">
                <button onClick={handleBack} className="p-4 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:border-slate-500 transition-all">
                  <ArrowLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 bg-gradient-to-r from-cyber-primary to-cyber-secondary text-white font-bold py-4 rounded-lg hover:shadow-neon-cyan transition-all flex items-center justify-center gap-2"
                >
                  FINALIZAR SETUP <Rocket size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;