
import { TimeBlock, NicheType, BlockType, RoleType } from './types';
import { Brain, Target, Zap, Coffee, Search } from 'lucide-react';

// Icons mapping
export const BLOCK_ICONS: Record<BlockType, any> = {
  TREND_HUNTING: Search,
  PROSPECTING: Target,
  DEEP_WORK: Brain,
  ADMIN: Zap,
  REST: Coffee,
};

export const BLOCK_COLORS: Record<BlockType, string> = {
  TREND_HUNTING: 'text-blue-400 border-blue-400/20 bg-blue-400/5',
  PROSPECTING: 'text-green-400 border-green-400/20 bg-green-400/5',
  DEEP_WORK: 'text-purple-400 border-purple-400/20 bg-purple-400/5',
  ADMIN: 'text-slate-400 border-slate-400/20 bg-slate-400/5',
  REST: 'text-orange-400 border-orange-400/20 bg-orange-400/5',
};

// --- ROLE SPECIFIC CONTENT ---
const ROLE_CONTENT: Record<RoleType, {
    deepWorkTasks: string[];
    trendHuntingTasks: string[];
    prospectingTip: string;
}> = {
    'GRAPHIC_DESIGNER': {
        deepWorkTasks: [
            'Desenvolver 3 variações de KV', 
            'Vetorizar rascunhos aprovados', 
            'Diagramar lâminas de apresentação', 
            'Finalizar fechamento de arquivo para impressão', 
            'Organizar camadas e nomes de arquivos'
        ],
        trendHuntingTasks: [
            'Analisar Behance Daily Picks', 
            'Salvar 5 referências de tipografia', 
            'Criar moodboard para projeto atual'
        ],
        prospectingTip: 'Analise o site do cliente e aponte 1 erro visual grave que você pode corrigir hoje.'
    },
    'MOTION_DESIGNER': {
        deepWorkTasks: [
            'Ajustar curvas de velocidade (Graph Editor)', 
            'Fazer clean-up de assets no Illustrator', 
            'Sincronizar cortes com a trilha sonora', 
            'Renderizar previews em baixa qualidade'
        ],
        trendHuntingTasks: [
            'Ver breakdown de efeitos no YouTube', 
            'Salvar referências de transição no Instagram', 
            'Testar um novo script/plugin no AE'
        ],
        prospectingTip: 'Envie um link oculto do YouTube com um showreel de 30s focado no nicho dele.'
    },
    'VIDEO_EDITOR': {
        deepWorkTasks: [
            'Fazer a decupagem (Cortes brutos)', 
            'Aplicar correção de cor básica', 
            'Inserir B-Rolls e imagens de cobertura', 
            'Legendar e animar textos de retenção'
        ],
        trendHuntingTasks: [
            'Analisar os primeiros 3s de vídeos virais', 
            'Buscar pacotes de SFX (Efeitos sonoros)', 
            'Estudar tendências de cortes rápidos (TikTok)'
        ],
        prospectingTip: 'Pegue um vídeo longo do cliente e corte um "Nugget" (Short) gratuito para provar valor.'
    }
};

// Helper to manipulate time strings "HH:MM"
const addMinutes = (time: string, minutes: number): string => {
  const [h, m] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(h, m, 0, 0);
  date.setMinutes(date.getMinutes() + minutes);
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

const getDurationInMinutes = (start: string, end: string): number => {
  const [h1, m1] = start.split(':').map(Number);
  const [h2, m2] = end.split(':').map(Number);
  return (h2 * 60 + m2) - (h1 * 60 + m1);
};

// Helper to get mixed tasks based on roles
const getTasksForBlock = (roles: RoleType[], blockType: 'DEEP_WORK' | 'TREND_HUNTING'): string[] => {
    let tasks: string[] = [];
    
    // Se não tiver roles definidas (fallback), usa genéricos
    if (!roles || roles.length === 0) {
        if (blockType === 'DEEP_WORK') return ['Focar na tarefa mais difícil do dia', 'Revisar entregas pendentes', 'Limpar caixa de entrada de e-mails'];
        if (blockType === 'TREND_HUNTING') return ['Ler notícias do mercado', 'Buscar referências visuais', 'Organizar área de trabalho'];
    }

    roles.forEach(role => {
        if (ROLE_CONTENT[role]) {
            if (blockType === 'DEEP_WORK') tasks = [...tasks, ...ROLE_CONTENT[role].deepWorkTasks];
            if (blockType === 'TREND_HUNTING') tasks = [...tasks, ...ROLE_CONTENT[role].trendHuntingTasks];
        }
    });

    // Remove duplicatas e embaralha
    const uniqueTasks = Array.from(new Set(tasks));
    return uniqueTasks.sort(() => 0.5 - Math.random()).slice(0, 3);
};

const getTipForProspecting = (roles: RoleType[]): string => {
    if (!roles || roles.length === 0) return 'Personalize a mensagem. Ninguém gosta de copy/paste.';
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    return ROLE_CONTENT[randomRole]?.prospectingTip || 'Foque em resolver um problema real do cliente.';
};

// THE ALGORITHM (Dynamic based on User Hours & Roles)
export const generateSchedule = (niche: NicheType, roles: RoleType[], userStart: string = '09:00', userEnd: string = '18:00'): TimeBlock[] => {
  const totalMinutes = getDurationInMinutes(userStart, userEnd);
  
  // Fallback para horários inválidos
  if (totalMinutes < 120) { 
     return [{
        id: '1',
        title: 'Modo de Emergência',
        type: 'DEEP_WORK',
        startTime: userStart,
        endTime: userEnd,
        description: 'Tempo muito curto. Foque na única coisa que importa hoje.',
        suggestedTasks: ['Executar tarefa principal', 'Ignorar distrações'],
        status: 'PENDING',
        actionableTip: 'Prioridade máxima na entrega.'
     }];
  }

  const blocks: TimeBlock[] = [];
  let currentTime = userStart;

  // 1. Aquecimento (30-60 min)
  const warmupDuration = 45;
  blocks.push({
      id: 'block-warmup',
      title: 'Radar de Tendências',
      type: 'TREND_HUNTING',
      startTime: currentTime,
      endTime: addMinutes(currentTime, warmupDuration),
      description: 'Consuma referências de alto nível antes de começar a produzir. Calibre seu olhar.',
      suggestedTasks: getTasksForBlock(roles, 'TREND_HUNTING'),
      status: 'PENDING',
      actionableTip: 'Não fique rolando o feed. Busque algo específico para o projeto de hoje.'
  });
  currentTime = addMinutes(currentTime, warmupDuration);

  // Calcula tempo restante para dividir o miolo
  const endAdminTime = addMinutes(userEnd, -45); // Reserva 45 min finais para Admin
  const coreMinutes = getDurationInMinutes(currentTime, endAdminTime);
  const breakDuration = 60; // Almoço/Pausa
  const workBlockMinutes = Math.floor((coreMinutes - breakDuration) / 2);

  if (niche === NicheType.B2B) {
    // B2B: Manhã (Vendas) -> Pausa -> Tarde (Deep Work)
    
    blocks.push({
        id: 'block-prospect',
        title: 'Prospecção Ativa (B2B)',
        type: 'PROSPECTING',
        startTime: currentTime,
        endTime: addMinutes(currentTime, workBlockMinutes),
        description: 'Horário comercial. As empresas estão operando. É hora de contato.',
        suggestedTasks: ['Fazer 5 Follow-ups', 'Enviar 3 Propostas', 'Responder Leads no WhatsApp'],
        status: 'PENDING',
        actionableTip: getTipForProspecting(roles)
    });
    currentTime = addMinutes(currentTime, workBlockMinutes);

    blocks.push({
        id: 'block-rest',
        title: 'Descompressão',
        type: 'REST',
        startTime: currentTime,
        endTime: addMinutes(currentTime, breakDuration),
        description: 'Saia da frente da tela. Seu cérebro precisa resetar.',
        suggestedTasks: ['Almoçar sem celular', 'Alongamento', 'Caminhada rápida'],
        status: 'PENDING',
    });
    currentTime = addMinutes(currentTime, breakDuration);

    blocks.push({
        id: 'block-deep',
        title: 'Deep Work (Imersão)',
        type: 'DEEP_WORK',
        startTime: currentTime,
        endTime: addMinutes(currentTime, workBlockMinutes),
        description: 'Sem notificações. Fone de ouvido. Hora de entregar.',
        suggestedTasks: getTasksForBlock(roles, 'DEEP_WORK'),
        status: 'PENDING',
        actionableTip: 'Use o Timer Pomodoro ao lado para manter o ritmo.'
    });
    currentTime = addMinutes(currentTime, workBlockMinutes);

  } else {
    // B2C: Manhã (Deep Work) -> Pausa -> Noite (Vendas)

    blocks.push({
        id: 'block-deep',
        title: 'Deep Work (Produção)',
        type: 'DEEP_WORK',
        startTime: currentTime,
        endTime: addMinutes(currentTime, workBlockMinutes),
        description: 'Seus clientes (donos de restaurante/loja) estão ocupados. Aproveite para produzir.',
        suggestedTasks: getTasksForBlock(roles, 'DEEP_WORK'),
        status: 'PENDING',
        actionableTip: 'Comece pela tarefa mais complexa enquanto sua mente está fresca.'
    });
    currentTime = addMinutes(currentTime, workBlockMinutes);

    blocks.push({
        id: 'block-rest',
        title: 'Pausa Estratégica',
        type: 'REST',
        startTime: currentTime,
        endTime: addMinutes(currentTime, breakDuration),
        description: 'Recarregue as energias. A noite será de negociação.',
        suggestedTasks: ['Treino/Academia', 'Resolver pendências pessoais', 'Almoço'],
        status: 'PENDING',
    });
    currentTime = addMinutes(currentTime, breakDuration);

    blocks.push({
        id: 'block-prospect',
        title: 'Horário Nobre (Vendas B2C)',
        type: 'PROSPECTING',
        startTime: currentTime,
        endTime: addMinutes(currentTime, workBlockMinutes),
        description: 'O movimento começa agora. Esteja online e visível.',
        suggestedTasks: ['Interagir em Stories de alvos', 'Postar bastidores trabalhando', 'Responder DMs rápido'],
        status: 'PENDING',
        actionableTip: getTipForProspecting(roles)
    });
    currentTime = addMinutes(currentTime, workBlockMinutes);
  }

  // Encerramento
  blocks.push({
      id: 'block-admin',
      title: 'Encerramento & Organização',
      type: 'ADMIN',
      startTime: currentTime,
      endTime: userEnd,
      description: 'Prepare o terreno para amanhã. Não durma com pendências mentais.',
      suggestedTasks: ['Atualizar Financeiro', 'Listar top 3 metas de amanhã', 'Backup de arquivos'],
      status: 'PENDING',
  });

  return blocks;
};
