import React, { useState, useEffect } from 'react';
import { supabase } from './services/supabase';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import LandingPage from './components/LandingPage';
import PremiumModal from './components/PremiumModal';
import AdminConsole from './components/AdminConsole';
import { User, NicheType, RoleType } from './types';
import { Loader2, ShieldAlert } from 'lucide-react';

// ADICIONE SEU E-MAIL AQUI PARA SER ADMIN AUTOMATICAMENTE
const ADMIN_EMAILS = [
  'cauacoutinho121@gmail.com',
];

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showLanding, setShowLanding] = useState(true);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [isAdminConsoleOpen, setIsAdminConsoleOpen] = useState(false);

  useEffect(() => {
    // 1. Verifica sessão ativa inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchProfileAndMapUser(session);
      } else {
        setLoading(false);
      }
    });

    // 2. Escuta mudanças de auth (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth Event:", event);
      setSession(session);
      if (session) {
        fetchProfileAndMapUser(session);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Nova função que busca dados da tabela 'profiles' (Fonte da verdade)
  const fetchProfileAndMapUser = async (session: any) => {
    try {
      const { user } = session;
      const metadata = user.user_metadata || {};

      // Tenta buscar o perfil na tabela criada via SQL
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      // LÓGICA DE PREMIUM (Apenas pago, sem Trial)
      let isPremium = false;

      // 1. Verifica se é PRO pelo banco de dados (pagamento confirmado) ou metadata
      if (profile?.is_premium || metadata.isPremium) {
        isPremium = true;
      }

      const name = profile?.name || metadata.name || '';
      const niche = (profile?.niche || metadata.niche) as NicheType || null;
      const roles = (profile?.roles || metadata.roles || []) as RoleType[];

      // Verifica se o onboarding foi feito
      const hasOnboarded = !!(name && niche && roles.length > 0);

      setUser({
        id: user.id,
        email: user.email,
        name: name,
        phone: metadata.phone || '',
        niche: niche,
        roles: roles,
        onboarded: hasOnboarded,
        isPremium: isPremium,
        workDays: profile?.work_days || [],
        workStart: profile?.work_start || '09:00',
        workEnd: profile?.work_end || '18:00',
      });

    } catch (e) {
      console.error("Erro ao carregar perfil (Fallback para metadata):", e);
      // Fallback robusto caso a tabela profiles falhe
      const { user } = session;
      const metadata = user.user_metadata || {};

      const isPremium = metadata.isPremium || false;

      setUser({
        id: user.id,
        email: user.email,
        name: metadata.name || '',
        phone: metadata.phone || '',
        niche: (metadata.niche as NicheType) || null,
        roles: (metadata.roles as RoleType[]) || [],
        onboarded: !!(metadata.name && metadata.niche),
        isPremium: isPremium
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOnboardingComplete = async (niche: NicheType, name: string, workDays: string[], workStart: string, workEnd: string, roles: RoleType[]) => {
    try {
      // 1. Atualiza Metadata (Auth) - Backup
      const { error: authError } = await supabase.auth.updateUser({
        data: { niche, name, roles }
      });

      if (authError) {
        console.error("Auth metadata error:", authError);
      }

      // 2. Tenta Atualizar Tabela Profiles (Principal)
      if (user) {
        // Tenta salvar TUDO
        const { error } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            niche,
            name,
            roles,
            work_days: workDays,
            work_start: workStart,
            work_end: workEnd
          });

        if (error) {
          console.warn("Erro ao salvar perfil completo (possivelmente faltando colunas no DB):", error);
          // FALLBACK
          const { error: basicError } = await supabase
            .from('profiles')
            .upsert({ id: user.id, niche, name });

          if (basicError) throw basicError;
        }
      }

      // 3. Atualiza estado local (UI)
      setUser(prev => prev ? ({
        ...prev,
        name,
        niche,
        roles,
        workDays,
        workStart,
        workEnd,
        onboarded: true
      }) : null);

    } catch (error: any) {
      console.error("Error updating profile:", error);
      alert(`Erro ao salvar perfil: ${error.message || "Erro desconhecido. Verifique o console."}`);
    }
  };

  const handleUpdateNiche = async (newNiche: NicheType) => {
    if (!user) return;
    setUser({ ...user, niche: newNiche });

    // Atualiza ambos (Auth e Profile) para garantir
    await supabase.auth.updateUser({ data: { niche: newNiche } });
    await supabase.from('profiles').update({ niche: newNiche }).eq('id', user.id);
  };

  const handleUpgradeSuccess = async () => {
    if (!user) return;
    setUser({ ...user, isPremium: true });
    await supabase.from('profiles').update({ is_premium: true }).eq('id', user.id);
    setIsPremiumModalOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-dark flex items-center justify-center text-cyber-primary">
        <div className="text-center">
          <Loader2 className="animate-spin w-10 h-10 mx-auto mb-4" />
          <p className="text-xs text-slate-500 uppercase tracking-widest">Carregando Sistema...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    if (showLanding) {
      return <LandingPage onGetStarted={() => setShowLanding(false)} />;
    }
    return <Auth />;
  }

  if (!user || !user.onboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // Verifica se é admin baseado no Email
  const isAdmin = user.email && ADMIN_EMAILS.includes(user.email);

  return (
    <>
      <Dashboard
        user={user}
        onUpdateNiche={handleUpdateNiche}
        onLogout={handleLogout}
        onRequestUpgrade={() => setIsPremiumModalOpen(true)}
      />

      {/* Botão Admin - Só aparece se o email estiver na lista ADMIN_EMAILS */}
      {isAdmin && (
        <button
          onClick={() => setIsAdminConsoleOpen(true)}
          className="fixed bottom-4 left-4 bg-red-900 text-red-100 p-3 rounded-full shadow-lg shadow-red-900/50 hover:bg-red-700 transition-all z-50 border border-red-500 animate-pulse"
          title="Painel do Dono"
        >
          <ShieldAlert size={20} />
        </button>
      )}

      <PremiumModal
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
        onSuccess={handleUpgradeSuccess}
        userName={user.name}
        userEmail={user.email || ''}
      />

      {isAdminConsoleOpen && <AdminConsole onClose={() => setIsAdminConsoleOpen(false)} />}
    </>
  );
};

export default App;