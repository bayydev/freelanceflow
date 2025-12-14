import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { supabase } from './services/supabase';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import LandingPage from './components/LandingPage';
import PremiumModal from './components/PremiumModal';
import AdminConsole from './components/AdminConsole';
import LearningHub from './components/LearningHub';
import WelcomeTour from './components/WelcomeTour';
import { User, NicheType, RoleType } from './types';
import { Loader2, ShieldAlert } from 'lucide-react';

// ADICIONE SEU E-MAIL AQUI PARA SER ADMIN AUTOMATICAMENTE
const ADMIN_EMAILS = [
  'cauacoutinho121@gmail.com',
];

// Componente simples para redirecionar para /app
const NavigateToApp = () => <Navigate to="/app" replace />;

// Componente interno que tem acesso ao router
const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [isAdminConsoleOpen, setIsAdminConsoleOpen] = useState(false);
  const [showWelcomeTour, setShowWelcomeTour] = useState(false);

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

  // Abre modal de upgrade quando navega para /upgrade
  useEffect(() => {
    if (location.pathname === '/upgrade' && session && user?.onboarded) {
      setIsPremiumModalOpen(true);
    }
  }, [location.pathname, session, user]);

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

      // 4. Mostra o tour de boas-vindas
      const hasSeenTour = localStorage.getItem('ff_tour_completed');
      if (!hasSeenTour) {
        setShowWelcomeTour(true);
      }

      // 5. Navega para o dashboard
      navigate('/app');

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
    navigate('/app');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/');
  };

  const handleRequestUpgrade = () => {
    setIsPremiumModalOpen(true);
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

  // Verifica se é admin baseado no Email
  const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email);

  // Se não tem sessão, mostra landing ou auth
  if (!session) {
    return (
      <Routes>
        <Route path="/login" element={<Auth onBack={() => navigate('/')} />} />
        <Route path="*" element={<LandingPage onGetStarted={() => navigate('/login')} />} />
      </Routes>
    );
  }

  // Se tem sessão mas não fez onboarding
  if (!user || !user.onboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // Usuário logado e onboardado - rotas protegidas
  return (
    <>
      <Routes>
        <Route
          path="/academy"
          element={
            <LearningHub
              user={user}
              onBack={() => navigate('/app')}
              onRequestUpgrade={handleRequestUpgrade}
            />
          }
        />
        <Route
          path="/app/*"
          element={
            <>
              <Dashboard
                user={user}
                onUpdateNiche={handleUpdateNiche}
                onLogout={handleLogout}
                onRequestUpgrade={handleRequestUpgrade}
                onOpenLearningHub={() => navigate('/academy')}
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
            </>
          }
        />
        {/* Redireciona qualquer outra rota para /app quando logado */}
        <Route path="*" element={<NavigateToApp />} />
      </Routes>

      <PremiumModal
        isOpen={isPremiumModalOpen}
        onClose={() => {
          setIsPremiumModalOpen(false);
          // Remove /upgrade da URL se estiver lá
          if (location.pathname === '/upgrade') {
            navigate('/app');
          }
        }}
        onSuccess={handleUpgradeSuccess}
        userName={user.name}
        userEmail={user.email || ''}
      />

      {isAdminConsoleOpen && <AdminConsole onClose={() => setIsAdminConsoleOpen(false)} />}

      {/* Welcome Tour para novos usuários */}
      {showWelcomeTour && (
        <WelcomeTour
          userName={user.name}
          onComplete={() => {
            localStorage.setItem('ff_tour_completed', 'true');
            setShowWelcomeTour(false);
          }}
        />
      )}

      {/* Vercel Web Analytics */}
      <Analytics />
    </>
  );
};

// Componente App que envolve tudo com HashRouter
const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;