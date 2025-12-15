import React, { useState, useEffect } from 'react';
import { X, Check, Lock, ExternalLink, MessageCircle, Coffee, Clock, Crown, Sparkles, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { supabase } from '../services/supabase';

// CONFIGURAÇÃO DE PAGAMENTO
const CHECKOUT_URL = "https://www.asaas.com/c/x1ix3uihag9xv6to";
const AGENCY_CHECKOUT_URL = "https://www.asaas.com/c/fkp7sx872226tr07";
const FOUNDING_MEMBERS_URL = "https://www.asaas.com/c/rnuenctc37b68vyd";
const DOWNSELL_URL = "https://www.asaas.com/c/118xvz9beukbbmcn";

// Número do dono para receber o comprovante (55 + DDD + Numero)
const OWNER_PHONE = "5527992241844";

// Admin email que não conta para a promoção
const ADMIN_EMAIL = "cauacoutinho121@gmail.com";

// Limite de membros fundadores
const FOUNDING_MEMBERS_LIMIT = 5;

interface PremiumModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    userName: string;
    userEmail: string;
    initialMode?: 'PRO' | 'AGENCY';
}

const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose, onSuccess, userName, userEmail, initialMode = 'PRO' }) => {
    const [step, setStep] = useState<'OFFER' | 'DOWNSELL' | 'AGENCY_DOWNSELL' | 'CONFIRMATION'>('OFFER');
    const [timeLeft, setTimeLeft] = useState(600);
    const [foundingMembersCount, setFoundingMembersCount] = useState<number | null>(null);
    const [isFoundingMember, setIsFoundingMember] = useState(false);
    const [loadingCount, setLoadingCount] = useState(true);
    const [hasSeenOffer, setHasSeenOffer] = useState(false);

    useEffect(() => {
        const fetchUserCount = async () => {
            if (!isOpen) return;
            setLoadingCount(true);
            try {
                const { count, error } = await supabase
                    .from('profiles')
                    .select('*', { count: 'exact', head: true })
                    .neq('email', ADMIN_EMAIL);
                if (error) throw error;
                const userCount = count || 0;
                setFoundingMembersCount(userCount);
                setIsFoundingMember(userCount <= FOUNDING_MEMBERS_LIMIT && userEmail !== ADMIN_EMAIL);
            } catch (error) {
                console.error('Error fetching user count:', error);
                setIsFoundingMember(false);
            } finally {
                setLoadingCount(false);
            }
        };
        fetchUserCount();
    }, [isOpen, userEmail]);

    useEffect(() => {
        if (isOpen) {
            setStep('OFFER');
            setTimeLeft(600);
            setHasSeenOffer(true);
        }
    }, [isOpen]);

    useEffect(() => {
        let interval: number;
        if (isOpen && step === 'CONFIRMATION' && timeLeft > 0) {
            interval = window.setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && step === 'CONFIRMATION') {
            onClose();
        }
        return () => clearInterval(interval);
    }, [isOpen, step, timeLeft, onClose]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const handleClose = () => {
        if (step === 'OFFER' && hasSeenOffer) {
            if (initialMode === 'AGENCY') {
                setStep('AGENCY_DOWNSELL');
            } else if (!isFoundingMember) {
                setStep('DOWNSELL');
            } else {
                onClose();
            }
        } else {
            onClose();
        }
    };

    const handleDownsellCheckout = () => {
        window.open(DOWNSELL_URL, '_blank');
        setStep('CONFIRMATION');
    };

    if (!isOpen) return null;

    const handleCheckoutRedirect = () => {
        const url = initialMode === 'AGENCY' ? AGENCY_CHECKOUT_URL : CHECKOUT_URL;
        window.open(url, '_blank');
        setStep('CONFIRMATION');
    };

    const handleFoundingMemberCheckout = () => {
        window.open(FOUNDING_MEMBERS_URL, '_blank');
        setStep('CONFIRMATION');
    };

    const handleWhatsAppConfirm = () => {
        let planLabel = isFoundingMember ? 'MEMBRO FUNDADOR (R$ 19,90 Vitalício)' : 'PRO (R$ 29,90)';
        if (initialMode === 'AGENCY') {
            planLabel = 'AGENCY (R$ 69,90)';
        }
        const message = `Olá! Sou o ${userName}, acabei de fazer a assinatura do Flow ${planLabel}. Segue o comprovante! Meu email de cadastro é: ${userEmail}`;
        const waLink = `https://wa.me/${OWNER_PHONE}?text=${encodeURIComponent(message)}`;
        window.open(waLink, '_blank');
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#06b6d4', '#d946ef', '#fde047']
        });
        onClose();
    };

    // --- RENDER OFFER CONTENT ---
    const renderOfferContent = () => {
        if (isFoundingMember) {
            return (
                <>
                    <button
                        onClick={handleFoundingMemberCheckout}
                        className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-black py-4 rounded-xl hover:shadow-lg hover:shadow-yellow-500/30 transition-all flex items-center justify-center gap-2 text-lg uppercase tracking-wider"
                    >
                        GARANTIR VITALÍCIO (R$ 19,90) <ExternalLink size={20} />
                    </button>
                    <p className="text-center text-[10px] text-yellow-500/60 mt-4">Pagamento único. Sem mensalidades.</p>
                </>
            );
        }

        if (initialMode === 'AGENCY') {
            return (
                <>
                    <div className="text-center mb-6">
                        <h2 className="text-xl sm:text-2xl font-black text-white italic uppercase leading-tight">
                            PLANO <span className="text-cyber-primary">AGENCY</span>
                        </h2>
                        <p className="text-slate-400 text-sm mt-2">
                            Produtividade Máxima e Escala.
                        </p>
                    </div>
                    <div className="space-y-3 mb-8">
                        <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                            <Check className="text-cyber-success shrink-0" size={20} />
                            <span className="text-slate-200 text-xs sm:text-sm font-bold">Tudo do Plano PRO</span>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                            <Check className="text-cyber-success shrink-0" size={20} />
                            <span className="text-slate-200 text-xs sm:text-sm font-bold">Banco de Templates PSD (Packs)</span>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                            <Check className="text-cyber-success shrink-0" size={20} />
                            <span className="text-slate-200 text-xs sm:text-sm font-bold">Agente IA de Conteúdo</span>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                            <Check className="text-cyber-success shrink-0" size={20} />
                            <span className="text-slate-200 text-xs sm:text-sm font-bold">Agente IA de Imagens</span>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                            <Check className="text-cyber-success shrink-0" size={20} />
                            <span className="text-slate-200 text-xs sm:text-sm font-bold">Prioridade no Suporte</span>
                        </div>
                    </div>
                    <button
                        onClick={handleCheckoutRedirect}
                        className="w-full bg-gradient-to-r from-cyber-primary to-cyan-400 text-black font-black py-4 rounded-xl hover:shadow-neon-cyan transition-all flex items-center justify-center gap-2 text-lg uppercase tracking-wider"
                    >
                        ASSINAR AGENCY (R$ 69,90) <ExternalLink size={20} />
                    </button>
                    <p className="text-center text-[10px] text-slate-600 mt-4">Cancele a qualquer momento.</p>
                </>
            );
        }

        // PRO Plan (default)
        return (
            <>
                <div className="bg-slate-800/50 p-3 rounded-lg mb-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                    <Coffee size={14} className="text-yellow-500" />
                    <span>Custa menos que um lanche <strong>(R$ 0,99/dia)</strong></span>
                </div>
                <button
                    onClick={handleCheckoutRedirect}
                    className="w-full bg-gradient-to-r from-cyber-primary to-cyan-400 text-black font-black py-4 rounded-xl hover:shadow-neon-cyan transition-all flex items-center justify-center gap-2 text-lg uppercase tracking-wider"
                >
                    ASSINAR PRO (R$ 29,90) <ExternalLink size={20} />
                </button>
                <p className="text-center text-[10px] text-slate-600 mt-4">Cancele a qualquer momento.</p>
            </>
        );
    };

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-cyber-dark/90 backdrop-blur-sm" onClick={handleClose} />

            <div className="relative bg-cyber-panel border border-cyber-primary w-full max-w-md rounded-2xl shadow-2xl shadow-cyan-500/20 overflow-hidden animate-fade-in max-h-[90vh] flex flex-col">
                <button onClick={handleClose} className="absolute top-4 right-4 text-slate-500 hover:text-white z-10 bg-slate-900/50 rounded-full p-1">
                    <X size={24} />
                </button>

                <div className="overflow-y-auto custom-scrollbar flex-1">
                    {step === 'OFFER' ? (
                        <div className="p-6 sm:p-8">
                            {/* AGENCY MODE - Dedicated View */}
                            {initialMode === 'AGENCY' ? (
                                <>
                                    <div className="text-center mb-6">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 border shadow-neon-cyan bg-cyber-primary/20 text-cyber-primary border-cyber-primary">
                                            <Lock size={32} />
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-black text-white italic uppercase leading-tight">
                                            PLANO <span className="text-cyber-primary">AGENCY</span>
                                        </h2>
                                        <p className="text-slate-400 text-sm mt-2">
                                            Produtividade Máxima e Escala.
                                        </p>
                                    </div>
                                    <div className="space-y-3 mb-8">
                                        <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                                            <Check className="text-cyber-success shrink-0" size={20} />
                                            <span className="text-slate-200 text-xs sm:text-sm font-bold">Tudo do Plano PRO Incluso</span>
                                        </div>
                                        <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                                            <Check className="text-cyber-success shrink-0" size={20} />
                                            <span className="text-slate-200 text-xs sm:text-sm font-bold">Banco de Templates PSD (Packs)</span>
                                        </div>
                                        <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                                            <Check className="text-cyber-success shrink-0" size={20} />
                                            <span className="text-slate-200 text-xs sm:text-sm font-bold">Agente IA de Conteúdo</span>
                                        </div>
                                        <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                                            <Check className="text-cyber-success shrink-0" size={20} />
                                            <span className="text-slate-200 text-xs sm:text-sm font-bold">Agente IA de Imagens</span>
                                        </div>
                                        <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                                            <Check className="text-cyber-success shrink-0" size={20} />
                                            <span className="text-slate-200 text-xs sm:text-sm font-bold">Prioridade no Suporte</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleCheckoutRedirect}
                                        className="w-full bg-gradient-to-r from-cyber-primary to-cyan-400 text-black font-black py-4 rounded-xl hover:shadow-neon-cyan transition-all flex items-center justify-center gap-2 text-lg uppercase tracking-wider"
                                    >
                                        ASSINAR AGENCY (R$ 69,90) <ExternalLink size={20} />
                                    </button>
                                    <p className="text-center text-[10px] text-slate-600 mt-4">Cancele a qualquer momento.</p>
                                </>
                            ) : (
                                /* PRO / FOUNDING MEMBER MODE */
                                <>
                                    {/* Founding Member Banner */}
                                    {!loadingCount && isFoundingMember && (
                                        <div className="mb-6 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/50 rounded-xl p-4 text-center animate-pulse">
                                            <div className="flex items-center justify-center gap-2 mb-2">
                                                <Crown className="text-yellow-400" size={24} />
                                                <span className="text-yellow-400 font-black uppercase text-sm">Membro Fundador</span>
                                                <Crown className="text-yellow-400" size={24} />
                                            </div>
                                            <p className="text-yellow-200 text-xs">
                                                Você é um dos <strong>primeiros {FOUNDING_MEMBERS_LIMIT} usuários!</strong>
                                            </p>
                                            <p className="text-yellow-400 font-bold text-lg mt-1">
                                                R$19,90 VITALÍCIO
                                            </p>
                                            <p className="text-yellow-200/60 text-[10px] mt-1">
                                                Vagas restantes: {Math.max(0, FOUNDING_MEMBERS_LIMIT - (foundingMembersCount || 0))}
                                            </p>
                                        </div>
                                    )}

                                    <div className="text-center mb-6">
                                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 border shadow-neon-cyan ${isFoundingMember ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500' : 'bg-cyber-primary/20 text-cyber-primary border-cyber-primary'}`}>
                                            {isFoundingMember ? <Crown size={32} /> : <Lock size={32} />}
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-black text-white italic uppercase leading-tight">
                                            {isFoundingMember ? (
                                                <>Oferta <span className="text-yellow-400">Exclusiva</span></>
                                            ) : (
                                                <>Pare de deixar <span className="text-cyber-primary">dinheiro na mesa</span></>
                                            )}
                                        </h2>
                                        <p className="text-slate-400 text-sm mt-2">
                                            {isFoundingMember
                                                ? 'Acesso vitalício por um preço que nunca mais vai existir.'
                                                : 'Você está perdendo clientes hoje por desorganização.'
                                            }
                                        </p>
                                    </div>

                                    <div className="space-y-3 mb-8">
                                        <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                                            <Check className="text-cyber-success shrink-0" size={20} />
                                            <span className="text-slate-200 text-xs sm:text-sm font-bold">Acesso ao Sales Playbook (Scripts Prontos)</span>
                                        </div>
                                        <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                                            <Check className="text-cyber-success shrink-0" size={20} />
                                            <span className="text-slate-200 text-xs sm:text-sm font-bold">Mentoria de Vendas Completa (9 aulas, 3 módulos)</span>
                                        </div>
                                        <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                                            <Check className="text-cyber-success shrink-0" size={20} />
                                            <span className="text-slate-200 text-xs sm:text-sm font-bold">Gerador de Contratos Blindados</span>
                                        </div>
                                        <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                                            <Check className="text-cyber-success shrink-0" size={20} />
                                            <span className="text-slate-200 text-xs sm:text-sm font-bold">Gerador de Briefing Ilimitado</span>
                                        </div>
                                        <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                                            <Check className="text-cyber-success shrink-0" size={20} />
                                            <span className="text-slate-200 text-xs sm:text-sm font-bold">Gestão Financeira &amp; Precificação Ilimitada</span>
                                        </div>
                                        <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                                            <Check className="text-cyber-success shrink-0" size={20} />
                                            <span className="text-slate-200 text-xs sm:text-sm font-bold">CRM Sem Limites (Organize +100 leads)</span>
                                        </div>
                                        {isFoundingMember && (
                                            <div className="flex items-center gap-3 bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/30">
                                                <Sparkles className="text-yellow-400 shrink-0" size={20} />
                                                <span className="text-yellow-200 text-xs sm:text-sm font-bold">Acesso Vitalício (Pague uma vez, use para sempre)</span>
                                            </div>
                                        )}
                                    </div>

                                    {renderOfferContent()}
                                </>
                            )}
                        </div>
                    ) : step === 'DOWNSELL' ? (
                        <div className="p-6 sm:p-8 text-center animate-fade-in">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/20 text-orange-400 mb-4 border border-orange-500 animate-pulse">
                                <Gift size={32} />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-black text-white italic uppercase leading-tight mb-2">
                                NÃO DEIXE O <span className="text-orange-400">PREÇO TE PARAR.</span>
                            </h2>
                            <p className="text-slate-400 text-sm mb-6">
                                Eu não quero que 10 reais sejam a diferença entre você continuar amador ou virar profissional.<br />
                                <strong className="text-white">Vou tirar minha margem de lucro pra você entrar agora.</strong>
                            </p>
                            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4 mb-6">
                                <div className="flex items-center justify-center gap-4 mb-3">
                                    <div className="text-center">
                                        <p className="text-slate-500 text-xs">Preço normal</p>
                                        <p className="text-slate-400 line-through text-lg">R$ 29,90</p>
                                    </div>
                                    <div className="text-2xl">→</div>
                                    <div className="text-center">
                                        <p className="text-orange-400 text-xs font-bold">SÓ HOJE</p>
                                        <p className="text-orange-400 font-black text-2xl">R$ 19,90</p>
                                    </div>
                                </div>
                                <p className="text-emerald-400 text-xs font-bold">Economia de R$ 10,00!</p>
                            </div>
                            <div className="text-left space-y-2 mb-6">
                                <div className="flex items-center gap-2 text-sm text-slate-300">
                                    <Check size={16} className="text-emerald-400" />
                                    <span>Acesso completo à plataforma</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-300">
                                    <Check size={16} className="text-emerald-400" />
                                    <span>Scripts de vendas prontos</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-300">
                                    <Check size={16} className="text-emerald-400" />
                                    <span>Mentoria completa (9 aulas)</span>
                                </div>
                            </div>
                            <button
                                onClick={handleDownsellCheckout}
                                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black py-4 rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2 text-lg uppercase tracking-wider mb-4"
                            >
                                QUERO POR R$ 19,90 <ExternalLink size={20} />
                            </button>
                            <button
                                onClick={onClose}
                                className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
                            >
                                Não, obrigado. Prefiro continuar no plano gratuito.
                            </button>
                        </div>
                    ) : step === 'AGENCY_DOWNSELL' ? (
                        /* AGENCY DOWNSELL - Highlight Agency Benefits */
                        <div className="p-6 sm:p-8 text-center animate-fade-in">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyber-primary/20 text-cyber-primary mb-4 border border-cyber-primary animate-pulse">
                                <Sparkles size={32} />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-black text-white italic uppercase leading-tight mb-2">
                                ESPERA! VOCÊ VAI <span className="text-cyber-primary">PERDER ISSO?</span>
                            </h2>
                            <p className="text-slate-400 text-sm mb-6">
                                Enquanto você pensa, seus concorrentes estão usando <strong className="text-white">IA para produzir 10x mais conteúdo</strong> e fechando os clientes que poderiam ser seus.
                            </p>
                            <div className="bg-slate-900/50 border border-cyber-primary/30 rounded-xl p-4 mb-6 text-left">
                                <p className="text-cyber-primary text-xs font-bold mb-3 uppercase">O que você está deixando na mesa:</p>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-slate-300">
                                        <Check size={16} className="text-cyber-primary" />
                                        <span><strong>Agente IA de Conteúdo</strong> - Crie posts, legendas e copies em segundos</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-300">
                                        <Check size={16} className="text-cyber-primary" />
                                        <span><strong>Agente IA de Imagens</strong> - Gere artes profissionais sem designer</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-300">
                                        <Check size={16} className="text-cyber-primary" />
                                        <span><strong>Banco de Templates PSD</strong> - Packs prontos para usar</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-300">
                                        <Check size={16} className="text-cyber-primary" />
                                        <span><strong>Suporte Prioritário</strong> - Resolva problemas mais rápido</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-yellow-400 text-xs font-bold mb-4">Por apenas R$ 2,33/dia você domina o mercado.</p>
                            <button
                                onClick={handleCheckoutRedirect}
                                className="w-full bg-gradient-to-r from-cyber-primary to-cyan-400 text-black font-black py-4 rounded-xl hover:shadow-neon-cyan transition-all flex items-center justify-center gap-2 text-lg uppercase tracking-wider mb-4"
                            >
                                SIM, QUERO O AGENCY! <ExternalLink size={20} />
                            </button>
                            <button
                                onClick={onClose}
                                className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
                            >
                                Não, prefiro continuar limitado.
                            </button>
                        </div>
                    ) : (
                        <div className="p-8 text-center animate-fade-in relative">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-400 mb-4 border border-green-500 shadow-neon-cyan">
                                <Check size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Boa decisão!</h3>
                            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 mb-6">
                                <p className="text-slate-300 text-sm mb-4">
                                    Estamos aguardando a confirmação do pagamento para liberar seu acesso PRO.
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