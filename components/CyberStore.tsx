import React from 'react';
import { ShoppingBag, X, Lock, Download, FileText, Zap, FileImage, Layers, Box, Layout } from 'lucide-react';

interface StoreItem {
  id: string;
  title: string;
  description: string;
  cost: number;
  type: 'PACK' | 'EBOOK' | 'TEMPLATE';
  url: string; // Link real para o asset
  icon: any;
}

// ITENS DA LOJA ATUALIZADOS
const STORE_ITEMS: StoreItem[] = [
  {
    id: 'pack_psd_niche',
    title: 'Pack: 5 PSDs Editáveis (Nicho)',
    description: 'Arquivos abertos de alta conversão focados especificamente no seu nicho. O item mais valioso.',
    cost: 2500,
    type: 'PACK',
    url: '#', 
    icon: FileImage
  },
  {
    id: 'tool_notion_template',
    title: 'Template Notion: Freelance OS',
    description: 'Estrutura completa (CRM + Financeiro + Projetos) para clonar no seu Notion.',
    cost: 1500,
    type: 'TEMPLATE',
    url: '#',
    icon: Layout
  },
  {
    id: 'ebook_cold_mail',
    title: 'PDF: Cold Mail Templates',
    description: 'Scripts validados para abordagem fria que não caem no spam.',
    cost: 800,
    type: 'EBOOK',
    url: '#', 
    icon: FileText
  },
  {
    id: 'pack_textures',
    title: 'Pack: +30 Texturas Cyber/Grit',
    description: 'Texturas de alta resolução (PNG/JPG) para dar profundidade e ruído aos seus designs.',
    cost: 500,
    type: 'PACK',
    url: '#',
    icon: Layers
  },
  {
    id: 'pack_elements',
    title: 'Pack: +20 Elementos Visuais',
    description: 'Ícones, setas futuristas e assets em vetor para compor layouts rápidos.',
    cost: 400,
    type: 'PACK',
    url: '#',
    icon: Box
  }
];

interface CyberStoreProps {
  isOpen: boolean;
  onClose: () => void;
  credits: number;
  inventory: string[];
  onPurchase: (itemId: string, cost: number) => void;
}

const CyberStore: React.FC<CyberStoreProps> = ({ isOpen, onClose, credits, inventory, onPurchase }) => {
  if (!isOpen) return null;

  const handleBuy = (item: StoreItem) => {
    if (credits >= item.cost && !inventory.includes(item.id)) {
      onPurchase(item.id, item.cost);
    }
  };

  const handleAccess = (url: string) => {
      window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-slate-900 border border-cyber-secondary w-full max-w-4xl rounded-2xl shadow-[0_0_50px_rgba(217,70,239,0.2)] overflow-hidden flex flex-col max-h-[85vh] animate-fade-in">
        
        {/* Header Loja */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950">
           <div className="flex items-center gap-3">
               <div className="p-3 bg-cyber-secondary/20 rounded-lg text-cyber-secondary border border-cyber-secondary shadow-neon-pink">
                   <ShoppingBag size={24} />
               </div>
               <div>
                   <h2 className="text-2xl font-black text-white italic uppercase tracking-wider">
                       Cyber <span className="text-cyber-secondary">Store</span>
                   </h2>
                   <p className="text-xs text-slate-400">Troque seus créditos por assets de alto valor.</p>
               </div>
           </div>
           
           <div className="flex items-center gap-4">
               <div className="bg-black border border-cyber-secondary/50 px-4 py-2 rounded-lg flex items-center gap-2">
                   <span className="text-cyber-secondary font-bold text-lg">{credits}</span>
                   <span className="text-[10px] text-slate-500 font-mono uppercase">$CYB</span>
               </div>
               <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                   <X size={24} />
               </button>
           </div>
        </div>

        {/* Grid de Itens */}
        <div className="flex-1 overflow-y-auto p-6 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {STORE_ITEMS.map((item) => {
                    const isOwned = inventory.includes(item.id);
                    const canAfford = credits >= item.cost;
                    const Icon = item.icon;

                    return (
                        <div key={item.id} className={`relative group border rounded-xl p-4 transition-all duration-300 flex flex-col justify-between ${isOwned ? 'bg-emerald-900/10 border-emerald-500/50' : 'bg-slate-800/80 border-slate-700 hover:border-cyber-secondary hover:shadow-neon-pink'}`}>
                            
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-lg ${isOwned ? 'bg-emerald-500 text-black' : 'bg-slate-900 text-cyber-secondary'}`}>
                                        <Icon size={24} />
                                    </div>
                                    {isOwned ? (
                                        <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded uppercase flex items-center gap-1">
                                            Adquirido <Download size={10} />
                                        </span>
                                    ) : (
                                        <span className="bg-black text-white text-xs font-mono px-2 py-1 rounded border border-slate-700">
                                            {item.cost} $CYB
                                        </span>
                                    )}
                                </div>

                                <h3 className="font-bold text-slate-100 mb-1">{item.title}</h3>
                                <p className="text-xs text-slate-400 mb-4 min-h-[40px] leading-relaxed">{item.description}</p>
                            </div>

                            {isOwned ? (
                                <button 
                                    onClick={() => handleAccess(item.url)}
                                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded flex items-center justify-center gap-2 text-sm transition-colors"
                                >
                                    ACESSAR AGORA
                                </button>
                            ) : (
                                <button 
                                    onClick={() => handleBuy(item)}
                                    disabled={!canAfford}
                                    className={`w-full py-2 font-bold rounded flex items-center justify-center gap-2 text-sm transition-all ${
                                        canAfford 
                                        ? 'bg-cyber-secondary hover:bg-fuchsia-400 text-white shadow-lg' 
                                        : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                    }`}
                                >
                                    {!canAfford && <Lock size={14} />}
                                    {canAfford ? 'COMPRAR' : 'SALDO INSUFICIENTE'}
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>

        <div className="p-4 bg-slate-950 border-t border-slate-800 text-center">
            <p className="text-[10px] text-slate-600 font-mono">
                DICA: Usuários PRO ganham <span className="text-cyber-secondary">1.5x mais $CYB</span> por tarefa completada.
            </p>
        </div>

      </div>
    </div>
  );
};

export default CyberStore;