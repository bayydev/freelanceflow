import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import { Lock, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

interface UpdatePasswordProps {
  onSuccess: () => void;
}

const UpdatePassword: React.FC<UpdatePasswordProps> = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
        setError("A senha deve ter no mínimo 6 caracteres.");
        return;
    }

    if (password !== confirmPassword) {
        setError("As senhas não coincidem.");
        return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;
      
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Erro ao atualizar senha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-dark p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyber-secondary/10 rounded-full blur-[100px]" />
      
      <div className="max-w-sm w-full z-10 bg-cyber-panel border border-cyber-secondary rounded-2xl p-8 shadow-[0_0_30px_rgba(217,70,239,0.2)] animate-fade-in text-center">
        
        <div className="w-16 h-16 bg-cyber-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyber-secondary shadow-neon-pink">
             <Lock size={32} className="text-cyber-secondary" />
        </div>

        <h2 className="text-2xl font-black text-white mb-2 uppercase">Nova Chave Mestra</h2>
        <p className="text-slate-400 text-sm mb-6">
            Você recuperou seu acesso. Agora defina uma nova senha segura para continuar.
        </p>

        <form onSubmit={handleUpdate} className="space-y-4 text-left">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-2 text-red-200 text-xs">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Nova Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-cyber-dark border border-cyber-border rounded-lg p-3 text-slate-100 focus:outline-none focus:border-cyber-secondary transition-all text-sm"
                placeholder="******"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Confirmar Senha</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-cyber-dark border border-cyber-border rounded-lg p-3 text-slate-100 focus:outline-none focus:border-cyber-secondary transition-all text-sm"
                placeholder="******"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyber-secondary text-white font-bold py-3 rounded-lg hover:bg-fuchsia-400 hover:shadow-neon-pink transition-all flex items-center justify-center gap-2 mt-6"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                   SALVAR E ENTRAR <ArrowRight size={20} />
                </>
              )}
            </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;