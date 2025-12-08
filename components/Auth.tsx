import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import { Mail, Lock, ArrowRight, Loader2, AlertCircle, Phone, Target, KeyRound, ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otpToken, setOtpToken] = useState(''); // Estado para o código
  
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  
  // Modos de visualização
  const [isRecovering, setIsRecovering] = useState(false); // Modo "Esqueci a senha"
  const [showOtpInput, setShowOtpInput] = useState(false); // Modo "Digitar Código"

  const [error, setError] = useState<string | null>(null);
  const [verificationSent, setVerificationSent] = useState(false); // Apenas para cadastro novo que requer confirmação

  // Regex para validação
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 2) value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    if (value.length > 10) value = `${value.slice(0, 10)}-${value.slice(10)}`;
    setPhone(value);
  };

  const validateInputs = () => {
    if (!emailRegex.test(email)) return "Por favor, insira um e-mail válido.";
    if (isRecovering) return null; // Na recuperação, só validamos email
    if (password.length < 6) return "A senha precisa ter no mínimo 6 caracteres.";
    return null;
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const validationError = validateInputs();
    if (validationError) { setError(validationError); return; }

    setLoading(true);

    try {
      if (isRecovering) {
        // --- FLUXO DE RECUPERAÇÃO VIA OTP (CÓDIGO) ---
        // Usamos signInWithOtp que envia o template "Magic Link" (que editamos para ter o código)
        const { error } = await supabase.auth.signInWithOtp({
            email: email,
            options: { shouldCreateUser: false } // Não cria conta se não existir
        });

        if (error) throw error;
        
        // Se deu certo, mostramos o input de código
        setShowOtpInput(true);
        setLoading(false);

      } else if (isLogin) {
        // --- LOGIN PADRÃO ---
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        // --- CADASTRO ---
        const cleanPhone = phone.replace(/\D/g, '');
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { phone: cleanPhone, isPremium: false }
          }
        });
        
        if (error) throw error;
        if (data.user && !data.session) {
            setVerificationSent(true);
            setLoading(false);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao processar. Verifique seus dados.');
      setLoading(false);
    }
  };

  // Função separada para verificar o código OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(null);

      try {
          const { data, error } = await supabase.auth.verifyOtp({
              email: email,
              token: otpToken,
              type: 'email' // Tipo email (Magic Link token)
          });

          if (error) throw error;
          
          // Se sucesso, o onAuthStateChange no App.tsx vai capturar a sessão e logar
          // Não precisamos fazer nada aqui além de esperar

      } catch (err: any) {
          setError("Código inválido ou expirado. Tente novamente.");
          setLoading(false);
      }
  };

  // TELA DE VERIFICAÇÃO DE EMAIL (APENAS CADASTRO NOVO)
  if (verificationSent) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-cyber-dark p-4 relative overflow-hidden">
             <div className="max-w-md w-full z-10 bg-cyber-panel border border-cyber-primary rounded-2xl p-8 shadow-2xl text-center animate-fade-in">
                 <div className="w-20 h-20 bg-cyber-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyber-primary shadow-neon-cyan">
                     <Mail size={40} className="text-cyber-primary" />
                 </div>
                 <h2 className="text-2xl font-black text-white mb-2 uppercase">Verifique seu E-mail</h2>
                 <p className="text-slate-400 mb-6">Enviamos um link de confirmação para <strong>{email}</strong>.</p>
                 <button onClick={() => window.location.reload()} className="text-cyber-primary font-bold hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto uppercase text-xs tracking-widest">
                     <ArrowLeft size={14} /> Voltar para Login
                 </button>
             </div>
        </div>
      );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-dark p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyber-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyber-secondary/10 rounded-full blur-[100px]" />

      <div className="max-w-sm w-full z-10">
        <div className="mb-8 text-center">
           <h1 className="text-3xl font-black text-slate-100 tracking-tighter mb-2">
            FREELANCE<span className="text-cyber-primary">FLOW</span>
          </h1>
          <p className="text-slate-400 text-sm flex items-center justify-center gap-2">
            <Target size={14} className="text-cyber-secondary" />
            Produtividade para o 1%
          </p>
        </div>

        <div className="bg-cyber-panel border border-cyber-border rounded-2xl p-8 shadow-2xl backdrop-blur-sm animate-fade-in relative overflow-hidden">
          
          {/* HEADER DO CARD */}
          {isRecovering ? (
             <div className="flex items-center gap-2 mb-6 text-cyber-primary">
                 <button onClick={() => { 
                     setIsRecovering(false); 
                     setShowOtpInput(false); 
                     setError(null); 
                 }} className="hover:text-white transition-colors">
                     <ArrowLeft size={20}/>
                 </button>
                 <span className="text-sm font-bold uppercase tracking-wider">
                     {showOtpInput ? 'Digitar Código' : 'Recuperar Acesso'}
                 </span>
             </div>
          ) : null}

          {/* FORMULÁRIO */}
          <form onSubmit={showOtpInput ? handleVerifyOtp : handleAuth} className="space-y-4">
            
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-2 text-red-200 text-xs text-left">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{error === 'Invalid login credentials' ? 'Credenciais inválidas.' : error}</span>
              </div>
            )}

            {showOtpInput ? (
                // --- INPUT DO CÓDIGO OTP ---
                <div className="animate-fade-in space-y-4">
                    <p className="text-xs text-slate-400 text-center mb-4">
                        Enviamos o código de verificação para <strong>{email}</strong>. Digite-o abaixo para entrar.
                    </p>
                    <div>
                        <label className="block text-xs font-bold text-cyber-primary mb-2 uppercase text-center">CÓDIGO DE ACESSO</label>
                        <div className="relative">
                            <ShieldCheck className="absolute left-3 top-3 text-cyber-primary" size={18} />
                            <input
                                type="text"
                                value={otpToken}
                                onChange={(e) => setOtpToken(e.target.value.replace(/\D/g,'').slice(0,8))}
                                className="w-full bg-cyber-dark border border-cyber-primary rounded-lg py-3 pl-10 pr-4 text-white text-center text-xl font-mono tracking-[0.5em] focus:outline-none focus:shadow-neon-cyan transition-all placeholder:tracking-normal"
                                placeholder="000000"
                                autoFocus
                                required
                            />
                        </div>
                    </div>
                </div>
            ) : (
                // --- INPUTS NORMAIS (Email/Senha) ---
                <>
                    <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">E-mail</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-slate-600" size={18} />
                        <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-cyber-dark border border-cyber-border rounded-lg py-3 pl-10 pr-4 text-slate-100 focus:outline-none focus:border-cyber-primary transition-all text-sm"
                        placeholder="seu@email.com"
                        required
                        />
                    </div>
                    </div>

                    {!isRecovering && (
                        <>
                            {!isLogin && (
                            <div className="animate-fade-in">
                                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">WhatsApp</label>
                                <div className="relative">
                                <Phone className="absolute left-3 top-3 text-slate-600" size={18} />
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    className="w-full bg-cyber-dark border border-cyber-border rounded-lg py-3 pl-10 pr-4 text-slate-100 focus:outline-none focus:border-cyber-primary transition-all text-sm"
                                    placeholder="(11) 99999-9999"
                                    required
                                />
                                </div>
                            </div>
                            )}

                            <div>
                            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase flex justify-between">
                                <span>Senha</span>
                                {isLogin && (
                                    <button 
                                        type="button" 
                                        onClick={() => { setIsRecovering(true); setError(null); }}
                                        className="text-[10px] text-cyber-primary hover:text-white transition-colors"
                                    >
                                        Esqueci minha senha
                                    </button>
                                )}
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 text-slate-600" size={18} />
                                <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-cyber-dark border border-cyber-border rounded-lg py-3 pl-10 pr-4 text-slate-100 focus:outline-none focus:border-cyber-primary transition-all text-sm"
                                placeholder="******"
                                required
                                />
                            </div>
                            </div>
                        </>
                    )}
                </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyber-primary text-cyber-dark font-bold py-3 rounded-lg hover:bg-cyan-400 hover:shadow-neon-cyan transition-all flex items-center justify-center gap-2 mt-6"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  {showOtpInput ? 'VALIDAR CÓDIGO' : (isRecovering ? 'ENVIAR CÓDIGO' : (isLogin ? 'ENTRAR' : 'CRIAR CONTA'))} 
                  {(!isRecovering || showOtpInput) && <ArrowRight size={20} />}
                  {(isRecovering && !showOtpInput) && <KeyRound size={18} />}
                </>
              )}
            </button>
          </form>

          {!isRecovering && (
            <div className="mt-6 text-center">
                <button
                onClick={() => {
                    setIsLogin(!isLogin);
                    setError(null);
                    setEmail('');
                    setPassword('');
                    setPhone('');
                }}
                className="text-xs text-slate-500 hover:text-slate-300 underline transition-colors"
                >
                {isLogin ? 'Criar conta gratuita' : 'Já tenho uma conta'}
                </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;