import React, { useState } from 'react';
import { NicheType, RoleType } from '../types';
import { Briefcase, Utensils, ArrowRight, Clock, Calendar, PenTool, Video, Film, Check } from 'lucide-react';

interface OnboardingProps {
  onComplete: (niche: NicheType, name: string, workDays: string[], workStart: string, workEnd: string, roles: RoleType[]) => void;
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

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [niche, setNiche] = useState<NicheType | null>(null);
  
  // Step 2.5: Roles
  const [selectedRoles, setSelectedRoles] = useState<RoleType[]>([]);

  // Step 3 States
  const [workDays, setWorkDays] = useState<string[]>(['Seg', 'Ter', 'Qua', 'Qui', 'Sex']);
  const [workStart, setWorkStart] = useState('09:00');
  const [workEnd, setWorkEnd] = useState('18:00');

  const handleNext = () => {
    if (step === 1 && name) setStep(2);
    else if (step === 2 && niche) setStep(2.5);
    else if (step === 2.5 && selectedRoles.length > 0) setStep(3);
    else if (step === 3 && workDays.length > 0) {
        onComplete(niche!, name, workDays, workStart, workEnd, selectedRoles);
    }
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-dark p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyber-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyber-secondary/10 rounded-full blur-[100px]" />

      <div className="max-w-md w-full z-10">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary tracking-tighter mb-2">
            FREELANCE FLOW
          </h1>
          <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">
            Organize sua rotina
          </p>
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
                  placeholder="Seu nome"
                  className="w-full bg-cyber-dark border border-cyber-border rounded-lg p-4 text-slate-100 focus:outline-none focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary transition-all font-mono"
                  onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                />
              </div>
              <button
                onClick={handleNext}
                disabled={!name}
                className="w-full bg-slate-100 text-cyber-dark font-bold py-4 rounded-lg hover:bg-white hover:shadow-neon-cyan transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                PRÓXIMO <ArrowRight size={20} />
              </button>
            </div>
          )}

          {/* STEP 2: NICHE */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-slate-100 mb-2">Qual seu foco principal?</h2>
                <p className="text-slate-400 text-sm">Vamos ajustar os horários de acordo com seus clientes.</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={() => setNiche(NicheType.B2B)}
                  className={`p-4 border rounded-xl flex items-center gap-4 transition-all group ${
                    niche === NicheType.B2B
                      ? 'bg-cyber-primary/10 border-cyber-primary shadow-neon-cyan'
                      : 'bg-cyber-dark border-cyber-border hover:border-slate-500'
                  }`}
                >
                  <div className={`p-3 rounded-lg ${niche === NicheType.B2B ? 'bg-cyber-primary text-cyber-dark' : 'bg-slate-800 text-slate-400'}`}>
                    <Briefcase size={24} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-slate-100">Atendo Empresas</h3>
                    <p className="text-xs text-slate-400 mt-1">Escritórios, Agências, Startups. <br/>Horário Comercial.</p>
                  </div>
                </button>

                <button
                  onClick={() => setNiche(NicheType.B2C)}
                  className={`p-4 border rounded-xl flex items-center gap-4 transition-all group ${
                    niche === NicheType.B2C
                      ? 'bg-cyber-secondary/10 border-cyber-secondary shadow-neon-pink'
                      : 'bg-cyber-dark border-cyber-border hover:border-slate-500'
                  }`}
                >
                  <div className={`p-3 rounded-lg ${niche === NicheType.B2C ? 'bg-cyber-secondary text-cyber-dark' : 'bg-slate-800 text-slate-400'}`}>
                    <Utensils size={24} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-slate-100">Atendo Público Final</h3>
                    <p className="text-xs text-slate-400 mt-1">Restaurantes, Varejo, Influencers. <br/>Horários Flexíveis.</p>
                  </div>
                </button>
              </div>

              <button
                onClick={handleNext}
                disabled={!niche}
                className="w-full bg-slate-100 text-cyber-dark font-bold py-4 rounded-lg hover:bg-white hover:shadow-neon-cyan transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
              >
                PRÓXIMO <ArrowRight size={20} />
              </button>
            </div>
          )}

          {/* STEP 2.5: ROLES */}
          {step === 2.5 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-slate-100 mb-2">O que você faz?</h2>
                <p className="text-slate-400 text-sm">Selecione todas as opções que se aplicam. Vamos personalizar suas tarefas.</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                  {/* Graphic Designer */}
                  <button
                    onClick={() => toggleRole('GRAPHIC_DESIGNER')}
                    className={`p-4 border rounded-xl flex items-center justify-between transition-all group ${
                        selectedRoles.includes('GRAPHIC_DESIGNER')
                        ? 'bg-purple-500/10 border-purple-500 shadow-neon-pink'
                        : 'bg-cyber-dark border-cyber-border hover:border-slate-500'
                    }`}
                  >
                     <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${selectedRoles.includes('GRAPHIC_DESIGNER') ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                            <PenTool size={20} />
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-slate-100 text-sm">Designer Gráfico</h3>
                        </div>
                     </div>
                     {selectedRoles.includes('GRAPHIC_DESIGNER') && <Check size={20} className="text-purple-500" />}
                  </button>

                   {/* Motion */}
                   <button
                    onClick={() => toggleRole('MOTION_DESIGNER')}
                    className={`p-4 border rounded-xl flex items-center justify-between transition-all group ${
                        selectedRoles.includes('MOTION_DESIGNER')
                        ? 'bg-yellow-500/10 border-yellow-500 shadow-neon-cyan'
                        : 'bg-cyber-dark border-cyber-border hover:border-slate-500'
                    }`}
                  >
                     <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${selectedRoles.includes('MOTION_DESIGNER') ? 'bg-yellow-500 text-black' : 'bg-slate-800 text-slate-400'}`}>
                            <Film size={20} />
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-slate-100 text-sm">Motion Designer</h3>
                        </div>
                     </div>
                     {selectedRoles.includes('MOTION_DESIGNER') && <Check size={20} className="text-yellow-500" />}
                  </button>

                  {/* Video Editor */}
                  <button
                    onClick={() => toggleRole('VIDEO_EDITOR')}
                    className={`p-4 border rounded-xl flex items-center justify-between transition-all group ${
                        selectedRoles.includes('VIDEO_EDITOR')
                        ? 'bg-blue-500/10 border-blue-500 shadow-neon-cyan'
                        : 'bg-cyber-dark border-cyber-border hover:border-slate-500'
                    }`}
                  >
                     <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${selectedRoles.includes('VIDEO_EDITOR') ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                            <Video size={20} />
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-slate-100 text-sm">Editor de Vídeo</h3>
                        </div>
                     </div>
                     {selectedRoles.includes('VIDEO_EDITOR') && <Check size={20} className="text-blue-500" />}
                  </button>
              </div>

              <button
                onClick={handleNext}
                disabled={selectedRoles.length === 0}
                className="w-full bg-slate-100 text-cyber-dark font-bold py-4 rounded-lg hover:bg-white hover:shadow-neon-cyan transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
              >
                PRÓXIMO <ArrowRight size={20} />
              </button>
            </div>
          )}

          {/* STEP 3: SCHEDULE */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
               <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-slate-100 mb-2">Configure sua Janela</h2>
                <p className="text-slate-400 text-sm">Defina seus limites para não surtar.</p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-cyber-primary mb-3 font-mono uppercase">
                   <Calendar size={14}/> Dias de Trabalho
                </label>
                <div className="flex justify-between gap-1">
                    {DAYS_OF_WEEK.map(day => (
                        <button
                            key={day.id}
                            onClick={() => toggleDay(day.id)}
                            className={`flex-1 py-2 rounded text-xs font-bold transition-all border ${
                                workDays.includes(day.id) 
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
                        <Clock size={14}/> Início
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
                        <Clock size={14}/> Fim
                      </label>
                      <input 
                        type="time" 
                        value={workEnd}
                        onChange={(e) => setWorkEnd(e.target.value)}
                        className="w-full bg-cyber-dark border border-cyber-border rounded-lg p-3 text-slate-100 focus:border-cyber-primary outline-none text-center"
                      />
                  </div>
              </div>

              <button
                onClick={handleNext}
                disabled={workDays.length === 0}
                className="w-full bg-slate-100 text-cyber-dark font-bold py-4 rounded-lg hover:bg-white hover:shadow-neon-cyan transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
              >
                GERAR MINHA ROTINA <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;