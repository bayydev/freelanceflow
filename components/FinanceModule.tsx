import React, { useState, useEffect } from 'react';
import { Plus, TrendingUp, TrendingDown, DollarSign, Lock, Wallet, ArrowUpCircle, ArrowDownCircle, Trash2, Loader2 } from 'lucide-react';
import { supabase } from '../services/supabase';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  date: string;
}

interface FinanceModuleProps {
  userId: string;
  isPremium: boolean;
  onRequestUpgrade: () => void;
}

const FinanceModule: React.FC<FinanceModuleProps> = ({ userId, isPremium, onRequestUpgrade }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'INCOME' | 'EXPENSE'>('INCOME');

  // Fetch Transactions on mount
  useEffect(() => {
    if (isPremium) {
      fetchTransactions();
    }
  }, [userId, isPremium]);

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false });

      if (error) throw error;
      if (data) setTransactions(data as Transaction[]);
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
    } finally {
      setLoading(false);
    }
  };

  // Cálculos
  const totalIncome = transactions
    .filter(t => t.type === 'INCOME')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'EXPENSE')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  const formatBRL = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc || !amount) return;

    const val = parseFloat(amount.replace(',', '.'));
    if (isNaN(val) || val <= 0) return;

    try {
      const { error } = await supabase.from('transactions').insert([
        {
          user_id: userId,
          description: desc,
          amount: val,
          type: type,
          date: new Date().toISOString()
        }
      ]);

      if (error) throw error;

      setDesc('');
      setAmount('');
      fetchTransactions(); // Refresh
    } catch (error) {
      console.error("Erro ao adicionar transação:", error);
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      const { error } = await supabase.from('transactions').delete().eq('id', id);
      if (error) throw error;
      setTransactions(transactions.filter(t => t.id !== id));
    } catch (error) {
      console.error("Erro ao deletar transação:", error);
    }
  };

  if (!isPremium) {
    return (
      <div className="bg-cyber-panel border border-cyber-border rounded-xl p-6 relative overflow-hidden group min-h-[400px] flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 bg-cyber-dark/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500 group-hover:text-cyber-primary group-hover:scale-110 transition-all duration-500">
            <Lock size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-100 mb-2">Gestão Financeira PRO</h3>
          <p className="text-slate-400 text-sm mb-6 max-w-xs">
            Controle seu fluxo de caixa, entradas e saídas em um único lugar. Exclusivo para assinantes.
          </p>
          <button
            onClick={onRequestUpgrade}
            className="bg-gradient-to-r from-cyber-primary to-cyber-secondary text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-neon-cyan transition-all"
          >
            DESBLOQUEAR AGORA
          </button>
        </div>

        {/* Fake UI Background */}
        <div className="w-full opacity-20 blur-sm pointer-events-none select-none">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 bg-slate-800 h-24 rounded-lg"></div>
            <div className="flex-1 bg-slate-800 h-24 rounded-lg"></div>
          </div>
          <div className="space-y-3">
            <div className="h-12 bg-slate-800 rounded w-full"></div>
            <div className="h-12 bg-slate-800 rounded w-full"></div>
            <div className="h-12 bg-slate-800 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-900/50 border border-emerald-500/20 rounded-xl p-3 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] text-emerald-400 font-bold uppercase flex items-center gap-1 mb-1">
            <ArrowUpCircle size={10} /> Entradas
          </span>
          <span className="text-sm md:text-base font-mono font-bold text-slate-200">{formatBRL(totalIncome)}</span>
        </div>

        <div className="bg-slate-900/50 border border-red-500/20 rounded-xl p-3 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] text-red-400 font-bold uppercase flex items-center gap-1 mb-1">
            <ArrowDownCircle size={10} /> Saídas
          </span>
          <span className="text-sm md:text-base font-mono font-bold text-slate-200">{formatBRL(totalExpense)}</span>
        </div>

        <div className={`bg-slate-900/50 border rounded-xl p-3 flex flex-col items-center justify-center text-center ${balance >= 0 ? 'border-cyber-primary/30' : 'border-red-500/30'}`}>
          <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1 mb-1">
            <Wallet size={10} /> Saldo
          </span>
          <span className={`text-sm md:text-base font-mono font-bold ${balance >= 0 ? 'text-cyber-primary' : 'text-red-400'}`}>
            {formatBRL(balance)}
          </span>
        </div>
      </div>

      {/* Add Transaction Form */}
      <form onSubmit={handleAddTransaction} className="bg-cyber-panel border border-cyber-border rounded-xl p-4">
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Descrição (ex: Hospedagem Site)"
            value={desc}
            onChange={e => setDesc(e.target.value)}
            className="bg-black border border-slate-700 rounded p-2 text-sm text-white focus:border-cyber-primary outline-none"
          />

          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-2 text-slate-500 text-sm">R$</span>
              <input
                type="text"
                inputMode="decimal"
                placeholder="0,00"
                value={amount}
                onChange={e => {
                  // Allow only numbers, comma and dot
                  const value = e.target.value.replace(/[^0-9,.]/g, '');
                  setAmount(value);
                }}
                className="w-full bg-black border border-slate-700 rounded p-2 pl-8 text-sm text-white focus:border-cyber-primary outline-none"
              />
            </div>

            <div className="flex bg-black rounded border border-slate-700 p-1">
              <button
                type="button"
                onClick={() => setType('INCOME')}
                className={`p-1.5 rounded transition-colors ${type === 'INCOME' ? 'bg-emerald-500 text-black' : 'text-slate-500 hover:text-emerald-500'}`}
              >
                <TrendingUp size={18} />
              </button>
              <button
                type="button"
                onClick={() => setType('EXPENSE')}
                className={`p-1.5 rounded transition-colors ${type === 'EXPENSE' ? 'bg-red-500 text-white' : 'text-slate-500 hover:text-red-500'}`}
              >
                <TrendingDown size={18} />
              </button>
            </div>

            <button
              type="submit"
              className="bg-slate-800 hover:bg-slate-700 text-white p-2 rounded border border-slate-700 transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </form>

      {/* History List */}
      <div className="bg-cyber-panel border border-cyber-border rounded-xl p-4 min-h-[200px]">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Histórico Recente</h4>

        <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1 custom-scrollbar">
          {loading && <div className="text-center py-4"><Loader2 className="animate-spin inline text-cyber-primary" /></div>}

          {!loading && transactions.length === 0 && (
            <p className="text-xs text-slate-600 text-center mt-8">Nenhuma movimentação registrada.</p>
          )}

          {transactions.map(t => (
            <div key={t.id} className="flex items-center justify-between p-3 rounded bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors group">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${t.type === 'INCOME' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                  {t.type === 'INCOME' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-200">{t.description}</p>
                  <p className="text-[10px] text-slate-500">
                    {new Date(t.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-sm font-mono font-bold ${t.type === 'INCOME' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {t.type === 'EXPENSE' ? '- ' : '+ '}
                  {formatBRL(t.amount)}
                </span>
                <button
                  onClick={() => deleteTransaction(t.id)}
                  className="text-slate-700 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinanceModule;