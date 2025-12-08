import React, { useState, useEffect } from 'react';
import { X, Check, Lock, ExternalLink, MessageCircle, Coffee, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

// CONFIGURAÇÃO DE PAGAMENTO
const CHECKOUT_URL = "https://www.asaas.com/c/x1ix3uihag9xv6to"; 

// Número do dono para receber o comprovante (55 + DDD + Numero)
const OWNER_PHONE = "5527992241844"; 

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userName: string;
  userEmail: string;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose, onSuccess, userName, userEmail }) => {
  const [step, setStep] = useState<'OFFER' | 'CONFIRMATION'>('OFFER');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutos em segundos

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
        setStep('OFFER');
        setTimeLeft(600);
    }
  }, [isOpen]);

  // Timer logic for CONFIRMATION step
  useEffect(() => {
    let interval: number;
    if (isOpen && step === 'CONFIRMATION' && timeLeft > 0) {
        interval = window.setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
    } else if (timeLeft === 0 && step === 'CONFIRMATION') {
        // Time expired, close modal to reset flow
        onClose();
    }
    return () => clearInterval(interval);
  }, [isOpen, step, timeLeft, onClose]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  const handleCheckoutRedirect = () => {
    // Abre o link de pagamento em nova aba
    window.open(CHECKOUT_URL, '_blank');
    // Avança para a tela de confirmação
    setStep('CONFIRMATION');
  };

  const handleWhatsAppConfirm = () => {
    const message = `Olá! Sou o ${userName}, acabei de fazer a assinatura do FreelanceFlow PRO (R$ 29,90). Segue o comprovante! Meu email de cadastro é: ${userEmail}`;
    const waLink = `https://wa.me/${OWNER_PHONE}?text=${encodeURIComponent(message)}`;
    
    window.open(waLink, '_blank');
    
    // Efeito visual de sucesso
    confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#d946ef', '#fde047']
    });

    // Fecha o modal (o usuário deve esperar a liberação manual)
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-cyber-dark/90 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-cyber-panel border border-cyber-primary w-full max-w-md rounded-2xl shadow-2xl shadow-cyan-500/20 overflow-hidden animate-fade-in max-h-[90vh] flex flex-col">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white z-10 bg-slate-900/50 rounded-full p-1">
          <X size={24} />
        </button>

        <div className="overflow-y-auto custom-scrollbar flex-1">
            {step === 'OFFER' ? (
            <div className="p-6 sm:p-8">
                <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyber-primary/20 text-cyber-primary mb-4 border border-cyber-primary shadow-neon-cyan">
                    <Lock size={32} />
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white italic uppercase leading-tight">Pare de deixar <span className="text-cyber-primary">dinheiro na mesa</span></h2>
                <p className="text-slate-400 text-sm mt-2">Você está perdendo clientes hoje por desorganização.</p>
                </div>

                <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                    <Check className="text-cyber-success shrink-0" size={20} />
                    <span className="text-slate-200 text-xs sm:text-sm font-bold">Acesso ao Sales Playbook (Scripts Prontos)</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                    <Check className="text-cyber-success shrink-0" size={20} />
                    <span className="text-slate-200 text-xs sm:text-sm font-bold">Mentoria & Carreira (9 Módulos Completos)</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                    <Check className="text-cyber-success shrink-0" size={20} />
                    <span className="text-slate-200 text-xs sm:text-sm font-bold">Gerador de Contratos Blindados</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                    <Check className="text-cyber-success shrink-0" size={20} />
                    <span className="text-slate-200 text-xs sm:text-sm font-bold">Gestão Financeira & Precificação Ilimitada</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                    <Check className="text-cyber-success shrink-0" size={20} />
                    <span className="text-slate-200 text-xs sm:text-sm font-bold">CRM Sem Limites (Organize +100 leads)</span>
                </div>
                </div>

                <div className="bg-slate-800/50 p-3 rounded-lg mb-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                    <Coffee size={14} className="text-yellow-500" />
                    <span>Custa menos que um lanche <strong>(R$ 0,99/dia)</strong></span>
                </div>

                <button 
                    onClick={handleCheckoutRedirect}
                    className="w-full bg-gradient-to-r from-cyber-primary to-cyber-secondary text-white font-black py-4 rounded-xl hover:shadow-neon-pink transition-all flex items-center justify-center gap-2 text-lg uppercase tracking-wider"
                >
                    ASSINAR PRO (R$ 29,90) <ExternalLink size={20} />
                </button>
                <p className="text-center text-[10px] text-slate-600 mt-4">Assinatura Mensal. Se não gostar, cancele.</p>
            </div>
            ) : (
            <div className="p-8 text-center animate-fade-in relative">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-400 mb-4 border border-green-500 shadow-neon-cyan">
                    <Check size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Boa decisão!</h3>
                
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 mb-6">
                    <p className="text-slate-300 text-sm mb-4">
                        Estamos aguardando a confirmação do pagamento para liberar seu acesso VIP.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-yellow-400 font-mono text-sm bg-yellow-500/10 py-2 rounded border border-yellow-500/20">
                        <Clock size={16} />
                        <span>Sessão expira em: {formatTime(timeLeft)}</span>
                    </div>
                </div>

                <button 
                    onClick={handleWhatsAppConfirm}
                    className="w-full bg-[#25D366] text-white font-bold py-3 rounded-lg hover:bg-[#128C7E] transition-all flex items-center justify-center gap-2 shadow-lg mb-4"
                >
                    <MessageCircle size={20} /> ENVIAR COMPROVANTE AGORA
                </button>
                
                <button 
                    onClick={onClose}
                    className="text-xs text-slate-500 hover:text-white underline hover:text-red-400 transition-colors"
                >
                    Cancelar / Pagar depois
                </button>
            </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default PremiumModal;