import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import { Shield, CheckCircle, AlertTriangle, Loader2, RefreshCw } from 'lucide-react';

const AdminConsole: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [targetEmail, setTargetEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleActivatePro = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // 1. Busca o ID do usuário pelo email na tabela profiles
      const { data: users, error: searchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', targetEmail)
        .single();

      if (searchError || !users) {
        throw new Error("Usuário não encontrado. Peça para ele fazer login pelo menos uma vez.");
      }

      // 2. Atualiza o status na tabela profiles
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ is_premium: true })
        .eq('email', targetEmail);

      if (updateError) throw updateError;

      // 3. Tenta atualizar o metadata do Auth (Opcional, mas bom para garantir consistência)
      // Nota: Isso só funciona se o Admin tiver permissão, senão vai falhar silenciosamente,
      // mas o passo 2 já garante que o app vai ler como PRO.

      setMessage({ type: 'success', text: `SUCESSO! ${targetEmail} agora é PRO.` });
      setTargetEmail('');
      
    } catch (err: any) {
      console.error(err);
      setMessage({ type: 'error', text: err.message || "Falha na ativação." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-red-500/30 rounded-xl p-6 w-full max-w-md shadow-2xl relative animate-fade-in">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white">✕</button>
        
        <div className="flex items-center gap-3 mb-6 text-red-500">
            <Shield size={24} />
            <h2 className="text-xl font-bold uppercase tracking-widest">Painel do Dono</h2>
        </div>

        <p className="text-sm text-slate-400 mb-4 bg-slate-800 p-3 rounded">
            Use este painel para ativar contas após receber o Pix no WhatsApp.
        </p>

        <form onSubmit={handleActivatePro} className="space-y-4">
            <div>
                <label className="text-xs text-slate-500 uppercase font-bold">E-mail do Cliente</label>
                <input 
                    type="email"
                    placeholder="cliente@exemplo.com"
                    value={targetEmail}
                    onChange={(e) => setTargetEmail(e.target.value)}
                    className="w-full bg-black border border-slate-700 rounded p-3 text-white focus:border-red-500 outline-none font-mono mt-1"
                />
            </div>
            
            {message && (
                <div className={`p-3 rounded border text-sm flex items-center gap-2 ${message.type === 'success' ? 'bg-green-500/10 border-green-500 text-green-400' : 'bg-red-500/10 border-red-500 text-red-400'}`}>
                    {message.type === 'success' ? <CheckCircle size={16}/> : <AlertTriangle size={16}/>}
                    {message.text}
                </div>
            )}

            <button 
                type="submit" 
                disabled={loading || !targetEmail}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded transition-all flex justify-center items-center gap-2 shadow-lg shadow-red-900/20"
            >
                {loading ? <Loader2 className="animate-spin" /> : "ATIVAR CONTA PRO"}
            </button>
        </form>
        
        <div className="mt-4 pt-4 border-t border-slate-800 text-center">
             <p className="text-[10px] text-slate-600">
                Certifique-se de ter rodado o script SQL no Supabase.
             </p>
        </div>
      </div>
    </div>
  );
};

export default AdminConsole;