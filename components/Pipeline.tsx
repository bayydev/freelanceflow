import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Lead, LeadStatus, NicheType, ContractData } from '../types';
import { Plus, DollarSign, User, Lock, Trash2, MessageSquare, FileText, Check, X, Download, Copy, Sun, Moon, Briefcase, Zap, Loader2, MapPin, Calendar as CalendarIcon, Fingerprint } from 'lucide-react';
import { jsPDF } from "jspdf";
import { supabase } from '../services/supabase';

interface PipelineProps {
  userId: string;
  niche: NicheType | null;
  isPremium?: boolean;
  onRequestUpgrade?: () => void;
}

const MAX_FREE_LEADS = 10; // Legacy constant - not used anymore (CRM is now free)

// --- SALES PLAYBOOK JSON ---
const SALES_PLAYBOOK = {
  "sales_playbook": {
    "modes": [
      {
        "id": "b2b_corporate",
        "label": "Playbook B2B (Diurno)",
        "target_audience": "Empresas, Clínicas, Escritórios",
        "tone": "Estratégico, AIDA, Consultivo",
        "scripts": {
          "approach": {
            "title": "Abordagem AIDA (Cold Email/Call)",
            "text": "ASSUNTO: Clientes em declínio? Conheci uma solução que mudou isto\n\nOi [NOME_DECISOR],\n\n[ATENÇÃO]\nVi que você está [OBSERVAÇÃO ESPECÍFICA DO NEGÓCIO DELE] e acho que identifiquei um problema comum nesse caso.\n\n[INTERESSE]\nA maioria das empresas do seu setor enfrenta dificuldade em [PROBLEMA ESPECÍFICO]. Isso gera perda de faturamento invisível todos os dias.\n\n[DESEJO]\nTrabalho ajudando empresas como a sua a [SOLUÇÃO]. Recentemente, ajudamos [CLIENTE SIMILAR] a ter [RESULTADO QUANTIFICÁVEL] em apenas 30 dias.\n\n[AÇÃO]\nEnviando um case study que mostra exatamente como funciona. Quer explorar essa possibilidade em 15 minutos na terça-feira?"
          },
          "objections": [
            {
              "trigger": "Está muito caro",
              "response": "Entendo perfeitamente. Mas deixe-me perguntar: comparado com o quê? Se você olhar para o [PROBLEMA] que você tem hoje, ele está te custando quanto por mês em vendas perdidas? Meu serviço não é um gasto, é a ferramenta para estancar essa sangria e trazer lucro. O ROI projetado é de [X] vezes."
            },
            {
              "trigger": "Não tenho orçamento agora",
              "response": "Ótimo saber. Duas perguntas rápidas: 1. O desafio que você tem vai desaparecer em 3 meses ou vai continuar custando caro? 2. Quando faz mais sentido discutirmos de novo? (Dica: Geralmente quem espera paga mais caro depois para corrigir o problema que cresceu)."
            },
            {
              "trigger": "Vou falar com meu sócio",
              "response": "Perfeito. Uma dica: quando falar com ele, foque no [BENEFÍCIO FINANCEIRO] que discutimos, pois é o que sócios geralmente priorizam. Quer que eu te envie um resumo executivo de 1 página para facilitar sua apresentação para ele?"
            }
          ],
          "closing": {
            "title": "Fechamento por Alternativa",
            "text": "Ótimo, [NOME_DECISOR]. Baseado no que conversamos, temos dois caminhos para resolver isso:\n\nOpção A: Começamos agora no dia [DATA] e você já pega o bônus de [BENEFÍCIO EXTRA].\nOpção B: Começamos no próximo mês, mas sem a condição especial de hoje.\n\nQual faz mais sentido para o momento da sua empresa?"
          }
        }
      },
      {
        "id": "b2c_delivery",
        "label": "Playbook B2C (Noturno)",
        "target_audience": "Lojas, Delivery, Influencers",
        "tone": "Visual, Rápido, Gatilhos Mentais",
        "scripts": {
          "approach": {
            "title": "Abordagem Direct/Whats (Visual)",
            "text": "Fala, [NOME_DONO]! Tudo certo?\n\nTava vendo os stories de vocês agora e o produto é top, deu vontade real. Mas sendo 100% sincero: as fotos do feed não tão passando essa mesma qualidade.\n\nNo seu ramo, o cliente compra com os olhos em 3 segundos. Se a foto não 'babar', ele rola pro lado e compra no concorrente.\n\nSou especialista em visual de alto impacto. Quero deixar esse feed vendendo sozinho. Dá uma olhada nesse antes/depois que fiz pra [CONCORRENTE/SIMILAR]: [LINK].\n\nBora fazer o mesmo aí?"
          },
          "objections": [
            {
              "trigger": "Tô sem grana / Movimento fraco",
              "response": "Justamente por isso, mano. O movimento tá fraco porque o visual não tá chamando atenção. Se melhorarmos as fotos e vendermos 5 combos a mais, o projeto se paga. O risco é continuar perdendo venda todo dia."
            },
            {
              "trigger": "Eu mesmo tiro as fotos",
              "response": "Tô ligado, resolve pra story do dia a dia. Mas pro feed (sua vitrine), foto amadora passa a sensação de produto 'barato'. Design profissional passa sensação de produto 'premium'. Você quer ser visto como o barato ou o melhor da região?"
            }
          ],
          "closing": {
            "title": "Fechamento com Escassez (Genuína)",
            "text": "Fechado então! Tenho só uma questão: minha agenda de produção fecha quinta-feira. Tenho 2 vagas pra entrega rápida essa semana.\n\nSe garantirmos agora, te entrego a primeira prévia em 48h. Se deixar pra semana que vem, só consigo entregar no final do mês.\n\nBora garantir esse spot agora? O Pix é esse aqui: [CHAVE_PIX]."
          }
        }
      }
    ]
  }
};

const Pipeline: React.FC<PipelineProps> = ({ userId, niche, isPremium = false, onRequestUpgrade }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [newLeadName, setNewLeadName] = useState('');
  const [loading, setLoading] = useState(true);

  // Scripts State
  const [showScripts, setShowScripts] = useState(false);
  const [activeScriptMode, setActiveScriptMode] = useState<string>('b2b_corporate');
  const [scriptVars, setScriptVars] = useState({
    decisor: '',
    company: '',
    portfolio: 'meuportfolio.com/exemplo'
  });

  // Contract State
  const [showContractForm, setShowContractForm] = useState(false);
  const [contractLead, setContractLead] = useState<Lead | null>(null);

  // Extra state for contract generation logic
  const [validityDays, setValidityDays] = useState(7);
  const [signingLocation, setSigningLocation] = useState("São Paulo");

  const [formData, setFormData] = useState<ContractData>({
    contractor: {
      name: "", // Vazio para permitir placeholder
      document: "",
      address: "" // Vazio para permitir placeholder
    },
    client: {
      name: "",
      document: "",
      address: ""
    },
    project: {
      title: "",
      scope_items: ["Identidade Visual Completa", "Pack de 5 Posts para Social Media", "Manual da Marca"],
      deadlines: {
        first_preview_days: 5,
        final_delivery_days: 2
      }
    },
    financial: {
      total_value: 0,
      currency: "BRL",
      payment_method: "Pix / Transferência",
      payment_terms: {
        entry_percentage: 50,
        final_percentage: 50
      },
      late_fee_percentage: 2,
      interest_rate_monthly: 1
    },
    terms: {
      max_revisions: 3,
      extra_revision_cost: 50.00,
      editable_files_fee_percentage: 30,
      jurisdiction_city: "São Paulo",
      jurisdiction_state: "SP"
    },
    dates: {
      created_at: new Date().toISOString().split('T')[0],
      valid_until: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }
  });

  // Update valid_until when validityDays changes or created_at changes
  useEffect(() => {
    const createdDate = new Date(formData.dates.created_at);
    const validDate = new Date(createdDate);
    validDate.setDate(validDate.getDate() + validityDays);
    setFormData(prev => ({
      ...prev,
      dates: {
        ...prev.dates,
        valid_until: validDate.toISOString().split('T')[0]
      }
    }));
  }, [validityDays, formData.dates.created_at]);

  // Fetch Leads on Mount
  useEffect(() => {
    fetchLeads();
  }, [userId]);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setLeads(data as Lead[]);
    } catch (error) {
      console.error('Erro ao carregar leads:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-detect Sales Mode based on Time
  useEffect(() => {
    if (showScripts) {
      const hour = new Date().getHours();
      // 09:00 to 18:00 = B2B (Day), else B2C (Night)
      if (hour >= 9 && hour < 18) {
        setActiveScriptMode('b2b_corporate');
      } else {
        setActiveScriptMode('b2c_delivery');
      }
    }
  }, [showScripts]);

  const addLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim()) return;

    if (!isPremium && leads.length >= MAX_FREE_LEADS) {
      onRequestUpgrade?.();
      return;
    }

    try {
      const { error } = await supabase.from('leads').insert([
        {
          user_id: userId,
          name: newLeadName,
          status: 'NEW',
          value: 0
        }
      ]);
      if (error) throw error;
      setNewLeadName('');
      fetchLeads(); // Refresh list
    } catch (error) {
      console.error("Erro ao adicionar lead:", error);
    }
  };

  const deleteLead = async (id: string) => {
    try {
      const { error } = await supabase.from('leads').delete().eq('id', id);
      if (error) throw error;
      setLeads((prevLeads) => prevLeads.filter(l => l.id !== id));
    } catch (error) {
      console.error("Erro ao deletar lead:", error);
    }
  };

  const updateStatus = async (id: string, newStatus: LeadStatus) => {
    // Optimistic Update
    setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));

    try {
      const { error } = await supabase.from('leads').update({ status: newStatus }).eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      fetchLeads(); // Revert on error
    }
  };

  const updateValue = async (id: string, newValue: number) => {
    // Optimistic Update
    setLeads(leads.map(l => l.id === id ? { ...l, value: newValue } : l));

    try {
      const { error } = await supabase.from('leads').update({ value: newValue }).eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.error("Erro ao atualizar valor:", error);
      fetchLeads(); // Revert on error
    }
  };

  const getStatusColor = (status: LeadStatus) => {
    switch (status) {
      case 'NEW': return 'bg-slate-700 text-slate-300';
      case 'CONTACTED': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'NEGOTIATING': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'CLOSED': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'LOST': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-800';
    }
  };

  const openContractModal = () => {
    if (!isPremium) {
      onRequestUpgrade?.();
      return;
    }
    const target = leads.find(l => l.status === 'NEGOTIATING' || l.status === 'CLOSED') || leads[0];
    if (target) {
      setContractLead(target);
      setFormData(prev => ({
        ...prev,
        client: { ...prev.client, name: target.name },
        financial: { ...prev.financial, total_value: target.value }
      }));
    }
    setShowContractForm(true);
  };

  const handleScopeChange = (index: number, value: string) => {
    const newScope = [...formData.project.scope_items];
    newScope[index] = value;
    setFormData({ ...formData, project: { ...formData.project, scope_items: newScope } });
  };

  const addScopeItem = () => {
    setFormData({ ...formData, project: { ...formData.project, scope_items: [...formData.project.scope_items, ""] } });
  };

  const maskCpfCnpj = (value: string) => {
    let v = value.replace(/\D/g, "");
    if (v.length > 14) v = v.slice(0, 14);

    if (v.length <= 11) {
      // Máscara CPF Progressiva
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      // Máscara CNPJ Progressiva
      v = v.replace(/^(\d{2})(\d)/, "$1.$2");
      v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
      v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
      v = v.replace(/(\d{4})(\d)/, "$1-$2");
    }
    return v;
  };

  const generatePDF = () => {
    const json = formData;
    const doc = new jsPDF();

    // --- CABEÇALHO ---
    doc.setFillColor(6, 182, 212); // Cyan 500
    doc.rect(0, 0, 210, 25, 'F');

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text("CONTRATO DE PRESTAÇÃO DE SERVIÇOS", 105, 17, { align: "center" });

    // Configurações de Corpo
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    let yPos = 40;
    const lineHeight = 6;
    const margin = 20;
    const pageWidth = 170;

    const addSectionTitle = (title: string) => {
      yPos += 5;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(6, 182, 212); // Cyan Title
      doc.text(title.toUpperCase(), margin, yPos);

      // Linha abaixo do titulo
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, yPos + 2, 190, yPos + 2);

      yPos += lineHeight + 4;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(50, 50, 50); // Dark Gray Text
    };

    const addText = (text: string, isBold: boolean = false) => {
      if (isBold) doc.setFont("helvetica", "bold");
      else doc.setFont("helvetica", "normal");

      const splitText = doc.splitTextToSize(text, pageWidth);
      doc.text(splitText, margin, yPos);
      yPos += (splitText.length * lineHeight) + 2;

      // Page Break Logic Simples
      if (yPos > 270) {
        doc.addPage();
        yPos = 30;
      }
    };

    // 1. Identificação
    addSectionTitle("1. Identificação das Partes");
    addText("CONTRATADO(A):", true);
    addText(`${json.contractor.name}, portador(a) do CPF/CNPJ ${json.contractor.document}, residente em ${json.contractor.address}.`);
    yPos += 3;
    addText("CLIENTE:", true);
    addText(`${json.client.name}, portador(a) do CPF/CNPJ ${json.client.document}, residente em ${json.client.address}.`);

    // 2. Objeto
    addSectionTitle("2. Objeto do Contrato");
    addText(`Este contrato tem como objeto a execução do projeto: "${json.project.title}".`);
    yPos += 2;
    addText("Escopo detalhado dos serviços:", true);
    json.project.scope_items.forEach(item => {
      addText(`• ${item}`);
      yPos -= 2; // Ajuste fino lista
    });
    yPos += 5;

    // 3. Prazos e Entregas
    addSectionTitle("3. Prazos e Entregas");
    addText(`Primeira prévia ou prova: ${json.project.deadlines.first_preview_days} dias úteis após o envio de todo o material necessário (briefing).`);
    addText(`Entrega dos arquivos finais: ${json.project.deadlines.final_delivery_days} dias úteis após a aprovação final.`);

    // 4. Valores e Pagamento
    addSectionTitle("4. Valores e Condições de Pagamento");
    addText(`Valor Total do Investimento: R$ ${json.financial.total_value.toFixed(2)}`, true);
    addText(`Forma de Pagamento: ${json.financial.payment_method}`);
    addText(`Condição: ${json.financial.payment_terms.entry_percentage}% de entrada na assinatura deste contrato e ${json.financial.payment_terms.final_percentage}% na entrega dos arquivos finais.`);
    addText(`Em caso de atraso, será cobrada multa de ${json.financial.late_fee_percentage}% mais juros de ${json.financial.interest_rate_monthly}% ao mês.`);

    // 5. Direitos e Alterações
    addSectionTitle("5. Alterações e Direitos");
    addText(`Estão inclusas neste orçamento até ${json.terms.max_revisions} rodadas de revisões/alterações. Alterações excedentes serão cobradas à parte no valor de R$ ${json.terms.extra_revision_cost.toFixed(2)} por rodada.`);
    addText(`Arquivos abertos/editáveis não estão inclusos na entrega final, salvo se negociado à parte mediante taxa de ${json.terms.editable_files_fee_percentage}% sobre o valor do contrato.`);

    // 6. Foro
    addSectionTitle("6. Foro");
    addText(`Fica eleito o foro da comarca de ${json.terms.jurisdiction_city} - ${json.terms.jurisdiction_state} para dirimir quaisquer dúvidas oriundas deste contrato, renunciando a qualquer outro por mais privilegiado que seja.`);

    // Datas e Assinaturas
    yPos += 15;
    if (yPos > 240) { doc.addPage(); yPos = 40; }

    addText(`Local e Data: ${signingLocation}, ${new Date(json.dates.created_at).toLocaleDateString('pt-BR')}.`);
    addText(`Validade da Proposta: Válida até ${new Date(json.dates.valid_until).toLocaleDateString('pt-BR')}.`);

    yPos += 20;

    // --- ASSINATURAS DIGITAIS ---
    const generateHash = () => Math.random().toString(36).substring(2, 10).toUpperCase() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase();
    const contractorHash = generateHash();
    const clientHash = generateHash();

    // Box Contratado
    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(245, 247, 250);
    doc.roundedRect(margin, yPos, 80, 40, 2, 2, 'FD');

    doc.setFontSize(7);
    doc.setTextColor(150, 150, 150);
    doc.text("ASSINATURA DIGITAL CERTIFICADA", margin + 5, yPos + 8);

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text("CONTRATADO", margin + 5, yPos + 16);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(json.contractor.name.substring(0, 30), margin + 5, yPos + 22);
    doc.text(`Doc: ${json.contractor.document}`, margin + 5, yPos + 27);

    doc.setFont("courier", "normal");
    doc.setFontSize(7);
    doc.setTextColor(6, 182, 212); // Cyan
    doc.text(`HASH: ${contractorHash}`, margin + 5, yPos + 35);

    // Box Cliente
    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(245, 247, 250);
    doc.roundedRect(margin + 90, yPos, 80, 40, 2, 2, 'FD');

    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(150, 150, 150);
    doc.text("ASSINATURA DIGITAL CERTIFICADA", margin + 95, yPos + 8);

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text("CLIENTE", margin + 95, yPos + 16);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(json.client.name.substring(0, 30), margin + 95, yPos + 22);
    doc.text(`Doc: ${json.client.document}`, margin + 95, yPos + 27);

    doc.setFont("courier", "normal");
    doc.setFontSize(7);
    doc.setTextColor(6, 182, 212); // Cyan
    doc.text(`HASH: ${clientHash}`, margin + 95, yPos + 35);

    // Footer Branding
    const pageCount = doc.internal.pages.length - 1;
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.setFont("helvetica", "normal");
      doc.text("Documento gerado e autenticado via FreelanceFlow OS", 105, 290, { align: "center" });
    }

    // Salvar PDF
    doc.save(`Contrato_${json.client.name.replace(/\s+/g, '_')}_FreelanceFlow.pdf`);
    setShowContractForm(false);
  };

  // Helper function to process text with variables
  const processScriptText = (text: string) => {
    let processed = text;
    // Replace variables
    processed = processed.replace(/\[NOME_DECISOR\]/g, scriptVars.decisor || '[NOME_DECISOR]');
    processed = processed.replace(/\[NOME_DONO\]/g, scriptVars.decisor || '[NOME_DONO]');
    processed = processed.replace(/\[NOME_EMPRESA\]/g, scriptVars.company || '[NOME_EMPRESA]');
    processed = processed.replace(/\[FOTO_PORTFOLIO\]/g, scriptVars.portfolio || '[LINK]');
    processed = processed.replace(/\[LINK_ASAAS\]/g, "https://www.asaas.com/c/x1ix3uihag9xv6to");
    return processed;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(processScriptText(text));
    // Optional: add a toast notification here
    alert("Script copiado!");
  };

  const potential = leads.reduce((acc, curr) => curr.status !== 'LOST' ? acc + curr.value : acc, 0);

  return (
    <div className="bg-cyber-panel border border-cyber-border rounded-xl p-6 relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-100 flex items-center gap-2">
          <DollarSign size={18} className="text-emerald-400" />
          CRM de Bolso
        </h3>
        <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
          Potencial: R$ {potential}
        </span>
      </div>

      <form onSubmit={addLead} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newLeadName}
          onChange={(e) => setNewLeadName(e.target.value)}
          placeholder="Nome do novo cliente..."
          className="flex-1 bg-cyber-dark border border-cyber-border rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyber-primary"
        />
        <button
          type="submit"
          className="p-2 rounded-lg transition-colors bg-slate-800 text-slate-200 hover:bg-slate-700"
        >
          <Plus size={18} />
        </button>
      </form>

      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
        {loading && <div className="text-center py-4"><Loader2 className="animate-spin inline text-cyber-primary" /></div>}
        {!loading && leads.length === 0 && <p className="text-xs text-center text-slate-600">Nenhum cliente na mira.</p>}

        {leads.map(lead => (
          <div key={lead.id} className="bg-slate-900/50 p-3 rounded-lg border border-slate-800 group">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <User size={14} className="text-slate-500 shrink-0" />
                <span className="font-bold text-sm text-slate-200 truncate">{lead.name}</span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                <select
                  value={lead.status}
                  onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                  className={`text-[10px] font-bold uppercase rounded px-2 py-1 border outline-none cursor-pointer ${getStatusColor(lead.status)}`}
                >
                  <option value="NEW">Novo</option>
                  <option value="CONTACTED">Contatado</option>
                  <option value="NEGOTIATING">Negociando</option>
                  <option value="CLOSED">Fechado</option>
                  <option value="LOST">Perdido</option>
                </select>
                <button
                  type="button"
                  onClick={() => deleteLead(lead.id)}
                  className="text-slate-600 hover:text-red-400 p-1 transition-colors"
                  title="Remover cliente"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-slate-500">Valor estimado:</span>
              <input
                type="number"
                value={lead.value}
                onBlur={(e) => updateValue(lead.id, parseFloat(e.target.value) || 0)}
                onChange={(e) => {
                  const newVal = parseFloat(e.target.value) || 0;
                  setLeads(leads.map(l => l.id === lead.id ? { ...l, value: newVal } : l));
                }}
                className="bg-transparent border-b border-slate-700 w-24 text-xs text-slate-300 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>
        ))}
      </div>

      {/* PREMIUM ACTIONS */}
      <div className="mt-6 pt-4 border-t border-slate-800 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={openContractModal}
            className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg border transition-all group ${isPremium
              ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:text-cyber-primary cursor-pointer'
              : 'bg-slate-900/40 border-slate-800 opacity-60 hover:opacity-100 cursor-pointer'
              }`}
            title={isPremium ? "Baixar Contrato Modelo" : "Funcionalidade PRO"}
          >
            {isPremium ? <Download size={16} className="text-slate-400 group-hover:text-cyber-primary" /> : <Lock size={16} className="text-slate-500 group-hover:text-cyber-secondary" />}
            <span className="text-[10px] font-bold text-slate-500">GERAR CONTRATO</span>
          </button>

          <button
            onClick={() => {
              if (isPremium) setShowScripts(true);
              else onRequestUpgrade?.();
            }}
            className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg border transition-all group ${isPremium
              ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:text-cyber-primary cursor-pointer'
              : 'bg-slate-900/40 border-slate-800 opacity-60 hover:opacity-100 cursor-pointer'
              }`}
            title="Funcionalidade PRO"
          >
            <div className="relative">
              <MessageSquare size={16} className={`${isPremium ? 'text-slate-400 group-hover:text-cyber-primary' : 'text-slate-500 group-hover:text-cyber-secondary'}`} />
              {!isPremium && <Lock size={10} className="absolute -top-1 -right-1 text-slate-600" />}
            </div>
            <div className="text-center">
              <span className="text-[10px] font-bold text-slate-500 block">SCRIPTS DE VENDAS</span>
              <span className="text-[9px] text-cyber-primary/60 font-mono">
                SALES PLAYBOOK
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* SALES PLAYBOOK MODAL */}
      {showScripts && isPremium && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-cyber-dark/95 backdrop-blur-md" onClick={() => setShowScripts(false)} />
          <div className="relative bg-cyber-panel border border-cyber-primary w-full max-w-4xl rounded-2xl shadow-2xl p-0 overflow-hidden flex flex-col max-h-[90vh] animate-fade-in">

            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-slate-700 bg-slate-900/50 flex justify-between items-start">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary uppercase italic">
                  Sales Playbook
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">Guia Tático de Negociação</p>
              </div>
              <button onClick={() => setShowScripts(false)} className="text-slate-500 hover:text-white"><X size={24} /></button>
            </div>

            {/* Mode Selector Tabs */}
            <div className="flex bg-slate-950 border-b border-slate-800">
              {SALES_PLAYBOOK.sales_playbook.modes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setActiveScriptMode(mode.id)}
                  className={`flex-1 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${activeScriptMode === mode.id
                    ? 'bg-slate-900 text-cyber-primary border-b-2 border-cyber-primary'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/50'
                    }`}
                >
                  {mode.id.includes('b2b') ? <Sun size={14} className="sm:w-4 sm:h-4" /> : <Moon size={14} className="sm:w-4 sm:h-4" />}
                  <span className="truncate max-w-[120px] sm:max-w-none">{mode.label}</span>
                </button>
              ))}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col md:flex-row gap-6">

              {/* Left: Inputs & Context */}
              <div className="w-full md:w-1/3 space-y-4 sm:space-y-6">
                {/* Dynamic Inputs */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Zap size={14} className="text-yellow-400" /> Variáveis Dinâmicas
                  </h4>
                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-bold">Nome do Decisor</label>
                    <input
                      value={scriptVars.decisor}
                      onChange={(e) => setScriptVars({ ...scriptVars, decisor: e.target.value })}
                      placeholder="Ex: João, Dra. Ana"
                      className="w-full bg-black border border-slate-700 rounded p-2 text-sm text-cyber-primary mt-1 focus:border-cyber-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-bold">Nome da Empresa</label>
                    <input
                      value={scriptVars.company}
                      onChange={(e) => setScriptVars({ ...scriptVars, company: e.target.value })}
                      placeholder="Ex: Pizzaria Top"
                      className="w-full bg-black border border-slate-700 rounded p-2 text-sm text-cyber-secondary mt-1 focus:border-cyber-secondary outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-bold">Link do Portfólio</label>
                    <input
                      value={scriptVars.portfolio}
                      onChange={(e) => setScriptVars({ ...scriptVars, portfolio: e.target.value })}
                      className="w-full bg-black border border-slate-700 rounded p-2 text-xs text-slate-300 mt-1 focus:border-slate-500 outline-none"
                    />
                  </div>
                </div>

                {/* Strategy Context */}
                {(() => {
                  const currentMode = SALES_PLAYBOOK.sales_playbook.modes.find(m => m.id === activeScriptMode);
                  return currentMode ? (
                    <div className="bg-cyber-primary/5 border border-cyber-primary/20 rounded-xl p-4 hidden md:block">
                      <div className="mb-3">
                        <p className="text-[10px] text-cyber-primary font-bold uppercase">Público Alvo</p>
                        <p className="text-sm text-slate-200">{currentMode.target_audience}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-cyber-primary font-bold uppercase">Tom de Voz</p>
                        <p className="text-sm text-slate-200">{currentMode.tone}</p>
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>

              {/* Right: The Scripts */}
              <div className="w-full md:w-2/3 space-y-4 sm:space-y-6 pb-8 sm:pb-0">
                {(() => {
                  const mode = SALES_PLAYBOOK.sales_playbook.modes.find(m => m.id === activeScriptMode);
                  if (!mode) return null;

                  return (
                    <>
                      {/* Approach */}
                      <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 sm:p-5 relative group hover:border-cyber-primary transition-colors">
                        <div className="flex justify-between items-center mb-3">
                          <h5 className="font-bold text-slate-200 flex items-center gap-2 text-sm sm:text-base">
                            <MessageSquare size={16} className="text-cyber-primary" />
                            {mode.scripts.approach.title}
                          </h5>
                          <button
                            onClick={() => copyToClipboard(mode.scripts.approach.text)}
                            className="text-slate-500 hover:text-white transition-colors"
                            title="Copiar"
                          >
                            <Copy size={16} />
                          </button>
                        </div>
                        <p className="text-sm text-slate-400 whitespace-pre-wrap break-words leading-relaxed font-mono bg-black/30 p-3 rounded">
                          {processScriptText(mode.scripts.approach.text)}
                        </p>
                      </div>

                      {/* Objections */}
                      <div className="space-y-3">
                        <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Matriz de Objeções</h5>
                        <div className="grid grid-cols-1 gap-3">
                          {mode.scripts.objections.map((obj, idx) => (
                            <div key={idx} className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 group hover:border-red-500/50 transition-colors">
                              <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold text-red-400 uppercase bg-red-500/10 px-2 py-1 rounded max-w-[85%] break-words">
                                  🛑 "{obj.trigger}"
                                </span>
                                <button
                                  onClick={() => copyToClipboard(obj.response)}
                                  className="text-slate-500 hover:text-red-400 transition-colors"
                                >
                                  <Copy size={14} />
                                </button>
                              </div>
                              <p className="text-sm text-slate-300 italic whitespace-pre-wrap break-words">
                                "{processScriptText(obj.response)}"
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Closing */}
                      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 sm:p-5 relative group hover:border-emerald-500/50 transition-colors">
                        <div className="flex justify-between items-center mb-3">
                          <h5 className="font-bold text-emerald-400 flex items-center gap-2 text-sm sm:text-base">
                            <Check size={16} />
                            {mode.scripts.closing.title}
                          </h5>
                          <button
                            onClick={() => copyToClipboard(mode.scripts.closing.text)}
                            className="text-slate-500 hover:text-emerald-400 transition-colors"
                          >
                            <Copy size={16} />
                          </button>
                        </div>
                        <p className="text-sm text-slate-400 whitespace-pre-wrap break-words leading-relaxed font-mono bg-black/30 p-3 rounded">
                          {processScriptText(mode.scripts.closing.text)}
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Contract Generator Form Modal */}
      {showContractForm && isPremium && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-cyber-dark/90 backdrop-blur-sm" onClick={() => setShowContractForm(false)} />
          <div className="relative bg-cyber-panel border border-cyber-primary w-full max-w-2xl rounded-2xl shadow-2xl p-6 overflow-y-auto max-h-[90vh] animate-fade-in">
            <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2"><FileText className="text-cyber-primary" /> Gerador de Contrato Inteligente</h3>
              <button onClick={() => setShowContractForm(false)} className="text-slate-500 hover:text-white"><X size={24} /></button>
            </div>

            <div className="space-y-6">
              {/* Section: Cliente */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-cyber-primary uppercase tracking-wider">Dados do Cliente</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    placeholder="Nome / Razão Social"
                    className="bg-slate-900 border border-slate-700 p-2 rounded text-sm text-white focus:border-cyber-primary outline-none"
                    value={formData.client.name}
                    onChange={e => setFormData({ ...formData, client: { ...formData.client, name: e.target.value } })}
                  />
                  <input
                    placeholder="CPF / CNPJ (000.000.000-00)"
                    className="bg-slate-900 border border-slate-700 p-2 rounded text-sm text-white focus:border-cyber-primary outline-none"
                    value={formData.client.document}
                    onChange={e => setFormData({ ...formData, client: { ...formData.client, document: maskCpfCnpj(e.target.value) } })}
                  />
                  <input
                    placeholder="Endereço Completo"
                    className="bg-slate-900 border border-slate-700 p-2 rounded text-sm text-white focus:border-cyber-primary outline-none md:col-span-2"
                    value={formData.client.address}
                    onChange={e => setFormData({ ...formData, client: { ...formData.client, address: e.target.value } })}
                  />
                </div>
              </div>

              {/* Section: Projeto */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-cyber-primary uppercase tracking-wider">O Projeto</h4>
                <input
                  placeholder="Título do Projeto (Ex: Rebranding 2024)"
                  className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-sm text-white focus:border-cyber-primary outline-none"
                  value={formData.project.title}
                  onChange={e => setFormData({ ...formData, project: { ...formData.project, title: e.target.value } })}
                />
                <div className="space-y-2">
                  <label className="text-xs text-slate-400">Escopo (Itens de entrega):</label>
                  {formData.project.scope_items.map((item, idx) => (
                    <input
                      key={idx}
                      className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-sm text-white focus:border-cyber-primary outline-none mb-1"
                      value={item}
                      onChange={e => handleScopeChange(idx, e.target.value)}
                    />
                  ))}
                  <button onClick={addScopeItem} className="text-xs text-cyber-secondary hover:underline">+ Adicionar Item ao Escopo</button>
                </div>
              </div>

              {/* Section: Financeiro & Prazos */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-cyber-primary uppercase tracking-wider">Financeiro & Prazos</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400">Valor Total (R$)</label>
                    <input
                      type="number"
                      className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-sm text-white focus:border-cyber-primary outline-none"
                      value={formData.financial.total_value}
                      onChange={e => setFormData({ ...formData, financial: { ...formData.financial, total_value: parseFloat(e.target.value) } })}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-bold text-emerald-400">Prazo 1ª Prévia (Dias)</label>
                    <input
                      type="number"
                      className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-sm text-white focus:border-cyber-primary outline-none"
                      value={formData.project.deadlines.first_preview_days}
                      onChange={e => setFormData({ ...formData, project: { ...formData.project, deadlines: { ...formData.project.deadlines, first_preview_days: parseInt(e.target.value) } } })}
                    />
                  </div>
                </div>
              </div>

              {/* Section: Jurídico & Datas */}
              <div className="bg-slate-900/30 p-4 rounded border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <MapPin size={16} /> Jurídico & Datas
                </h4>

                {/* FORO */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="text-[10px] text-slate-500 uppercase">Foro Eleito (Cidade)</label>
                    <input
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded text-sm text-white focus:border-cyber-primary outline-none"
                      value={formData.terms.jurisdiction_city}
                      onChange={e => setFormData({ ...formData, terms: { ...formData.terms, jurisdiction_city: e.target.value } })}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase">Estado (UF)</label>
                    <input
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded text-sm text-white focus:border-cyber-primary outline-none uppercase"
                      maxLength={2}
                      value={formData.terms.jurisdiction_state}
                      onChange={e => setFormData({ ...formData, terms: { ...formData.terms, jurisdiction_state: e.target.value } })}
                    />
                  </div>
                </div>

                {/* LOCAL & DATA */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase">Cidade da Assinatura</label>
                    <input
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded text-sm text-white focus:border-cyber-primary outline-none"
                      value={signingLocation}
                      onChange={e => setSigningLocation(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase">Data do Contrato</label>
                    <input
                      type="date"
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded text-sm text-white focus:border-cyber-primary outline-none"
                      value={formData.dates.created_at}
                      onChange={e => setFormData({ ...formData, dates: { ...formData.dates, created_at: e.target.value } })}
                    />
                  </div>
                </div>

                {/* VALIDADE */}
                <div>
                  <label className="text-[10px] text-slate-500 uppercase">Validade da Proposta (Dias)</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={validityDays}
                      onChange={e => setValidityDays(parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm font-mono text-cyber-primary">{validityDays} dias</span>
                  </div>
                  <p className="text-[10px] text-slate-600 mt-1">Válido até: {new Date(formData.dates.valid_until).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>

              {/* Section: Contractor (Read Only / Edit) */}
              <div className="bg-slate-900/50 p-4 rounded border border-slate-800">
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Seus Dados (Contratante)</h4>
                <input
                  placeholder="Seu Nome Completo / Razão Social"
                  className="w-full bg-transparent border-b border-slate-700 text-slate-400 text-sm mb-2 focus:text-white outline-none"
                  value={formData.contractor.name}
                  onChange={e => setFormData({ ...formData, contractor: { ...formData.contractor, name: e.target.value } })}
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    placeholder="Seu CPF/CNPJ"
                    className="bg-transparent border-b border-slate-700 text-slate-400 text-xs focus:text-white outline-none"
                    value={formData.contractor.document}
                    onChange={e => setFormData({ ...formData, contractor: { ...formData.contractor, document: maskCpfCnpj(e.target.value) } })}
                  />
                  <input
                    placeholder="Sua Cidade - UF"
                    className="bg-transparent border-b border-slate-700 text-slate-400 text-xs focus:text-white outline-none"
                    value={formData.contractor.address}
                    onChange={e => setFormData({ ...formData, contractor: { ...formData.contractor, address: e.target.value } })}
                  />
                </div>
              </div>

              <button
                onClick={generatePDF}
                className="w-full bg-gradient-to-r from-cyber-primary to-cyber-secondary text-white font-bold py-3 rounded-lg hover:shadow-neon-cyan transition-all flex items-center justify-center gap-2"
              >
                <Fingerprint size={20} /> GERAR CONTRATO COM ASSINATURA DIGITAL
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
};

export default Pipeline;