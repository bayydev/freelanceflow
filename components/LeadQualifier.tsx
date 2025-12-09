import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
    Plus, Flame, ThermometerSun, Snowflake, Search, Trash2,
    ArrowRight, Phone, Instagram, MapPin, Tag, Loader2, X,
    Check, ChevronRight, Building2, Globe, Users, Eye, Megaphone, Target,
    Filter, SortDesc
} from 'lucide-react';
import { supabase } from '../services/supabase';
import { QualifiedLead, QualificationAnswers, LeadTemperature, LeadSource } from '../types';

interface LeadQualifierProps {
    userId: string;
    isPremium: boolean;
    onRequestUpgrade: () => void;
    onMoveToCRM: () => void;
}

// Scoring weights and values
const SCORING_CONFIG = {
    hasDigitalPresence: { yes: 20, partial: 10, no: 0 },
    postFrequency: { daily: 15, weekly: 8, rarely: 0 },
    visualQuality: { poor: 20, average: 10, professional: 0 },
    paidAds: { yes: 15, maybe: 5, no: 0 },
    engagement: { high: 10, medium: 5, low: 2 },
    nicheMatch: { exact: 20, related: 10, different: 0 }
};

const QUALIFICATION_QUESTIONS = [
    {
        key: 'hasDigitalPresence',
        question: 'Tem presença digital ativa?',
        icon: Globe,
        options: [
            { value: 'yes', label: 'Sim, está ativo' },
            { value: 'partial', label: 'Parcialmente' },
            { value: 'no', label: 'Não tem' }
        ]
    },
    {
        key: 'postFrequency',
        question: 'Com que frequência posta?',
        icon: Eye,
        options: [
            { value: 'daily', label: 'Diariamente' },
            { value: 'weekly', label: 'Semanalmente' },
            { value: 'rarely', label: 'Raramente' }
        ]
    },
    {
        key: 'visualQuality',
        question: 'Qualidade visual/vídeo atual?',
        icon: Target,
        options: [
            { value: 'poor', label: 'Precária' },
            { value: 'average', label: 'Média' },
            { value: 'professional', label: 'Profissional' }
        ]
    },
    {
        key: 'paidAds',
        question: 'Investe em tráfego pago?',
        icon: Megaphone,
        options: [
            { value: 'yes', label: 'Sim' },
            { value: 'maybe', label: 'Talvez' },
            { value: 'no', label: 'Não' }
        ]
    },
    {
        key: 'engagement',
        question: 'Nível de engajamento?',
        icon: Users,
        options: [
            { value: 'high', label: 'Alto' },
            { value: 'medium', label: 'Médio' },
            { value: 'low', label: 'Baixo' }
        ]
    },
    {
        key: 'nicheMatch',
        question: 'Encaixa no seu nicho?',
        icon: Tag,
        options: [
            { value: 'exact', label: 'Exato' },
            { value: 'related', label: 'Relacionado' },
            { value: 'different', label: 'Diferente' }
        ]
    }
];

const CATEGORY_OPTIONS = [
    'Restaurante', 'Delivery', 'Clínica', 'Escritório',
    'Loja', 'Influencer', 'Academia', 'Salão de Beleza', 'Outro'
];

const SOURCE_OPTIONS: { value: LeadSource; label: string }[] = [
    { value: 'instagram', label: 'Instagram' },
    { value: 'google_maps', label: 'Google Maps' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'indicacao', label: 'Indicação' },
    { value: 'outro', label: 'Outro' }
];

const calculateScore = (answers: Partial<QualificationAnswers>): number => {
    let score = 0;
    Object.entries(answers).forEach(([key, value]) => {
        const config = SCORING_CONFIG[key as keyof typeof SCORING_CONFIG];
        if (config && value) {
            score += config[value as keyof typeof config] || 0;
        }
    });
    return score;
};

const getTemperature = (score: number): LeadTemperature => {
    if (score >= 70) return 'HOT';
    if (score >= 40) return 'WARM';
    return 'COLD';
};

const TemperatureIcon: React.FC<{ temperature: LeadTemperature; size?: number }> = ({ temperature, size = 16 }) => {
    switch (temperature) {
        case 'HOT':
            return <Flame size={size} className="text-orange-500" />;
        case 'WARM':
            return <ThermometerSun size={size} className="text-yellow-500" />;
        case 'COLD':
            return <Snowflake size={size} className="text-blue-400" />;
    }
};

const LeadQualifier: React.FC<LeadQualifierProps> = ({ userId, isPremium, onRequestUpgrade, onMoveToCRM }) => {
    const [leads, setLeads] = useState<QualifiedLead[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [qualifyingLead, setQualifyingLead] = useState<Partial<QualifiedLead> | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [filterTemperature, setFilterTemperature] = useState<LeadTemperature | 'ALL'>('ALL');
    const [searchQuery, setSearchQuery] = useState('');

    // Form state for new lead
    const [formData, setFormData] = useState({
        business_name: '',
        whatsapp: '',
        instagram_handle: '',
        city: '',
        category: '',
        source: 'instagram' as LeadSource
    });

    useEffect(() => {
        fetchLeads();
    }, [userId]);

    const fetchLeads = async () => {
        try {
            const { data, error } = await supabase
                .from('qualified_leads')
                .select('*')
                .eq('user_id', userId)
                .order('score', { ascending: false });

            if (error) throw error;
            if (data) setLeads(data as QualifiedLead[]);
        } catch (error) {
            console.error('Erro ao carregar leads qualificados:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStartQualification = () => {
        if (!formData.business_name || !formData.city || !formData.category) return;

        setQualifyingLead({
            ...formData,
            user_id: userId,
            answers: {} as QualificationAnswers,
            score: 0,
            temperature: 'COLD'
        });
        setCurrentQuestionIndex(0);
        setShowAddModal(false);
    };

    const handleAnswerQuestion = async (answer: string) => {
        if (!qualifyingLead) return;

        const questionKey = QUALIFICATION_QUESTIONS[currentQuestionIndex].key;
        const updatedAnswers = {
            ...qualifyingLead.answers,
            [questionKey]: answer
        } as QualificationAnswers;

        const newScore = calculateScore(updatedAnswers);
        const newTemperature = getTemperature(newScore);

        const updatedLead = {
            ...qualifyingLead,
            answers: updatedAnswers,
            score: newScore,
            temperature: newTemperature
        };

        if (currentQuestionIndex < QUALIFICATION_QUESTIONS.length - 1) {
            setQualifyingLead(updatedLead);
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            // Final question - save to database
            try {
                const { error } = await supabase.from('qualified_leads').insert([{
                    user_id: userId,
                    business_name: updatedLead.business_name,
                    whatsapp: updatedLead.whatsapp || null,
                    instagram_handle: updatedLead.instagram_handle || null,
                    city: updatedLead.city,
                    category: updatedLead.category,
                    source: updatedLead.source,
                    score: newScore,
                    temperature: newTemperature,
                    answers: updatedAnswers,
                    qualified_at: new Date().toISOString()
                }]);

                if (error) throw error;

                setQualifyingLead(null);
                setFormData({
                    business_name: '',
                    whatsapp: '',
                    instagram_handle: '',
                    city: '',
                    category: '',
                    source: 'instagram'
                });
                fetchLeads();
            } catch (error) {
                console.error('Erro ao salvar lead:', error);
            }
        }
    };

    const deleteLead = async (id: string) => {
        try {
            const { error } = await supabase.from('qualified_leads').delete().eq('id', id);
            if (error) throw error;
            setLeads(leads.filter(l => l.id !== id));
        } catch (error) {
            console.error('Erro ao deletar lead:', error);
        }
    };

    const handleMoveToCRM = async (lead: QualifiedLead) => {
        try {
            // Mark as moved in qualified_leads
            await supabase
                .from('qualified_leads')
                .update({ moved_to_crm: true })
                .eq('id', lead.id);

            // Add to CRM leads table
            await supabase.from('leads').insert([{
                user_id: userId,
                name: lead.business_name,
                status: 'CONTACTED',
                value: 0
            }]);

            onMoveToCRM();
            fetchLeads();
        } catch (error) {
            console.error('Erro ao mover para CRM:', error);
        }
    };

    // Filter and search leads
    const filteredLeads = leads.filter(lead => {
        const matchesTemperature = filterTemperature === 'ALL' || lead.temperature === filterTemperature;
        const matchesSearch = lead.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.city.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTemperature && matchesSearch && !lead.moved_to_crm;
    });

    const temperatureStats = {
        HOT: leads.filter(l => l.temperature === 'HOT' && !l.moved_to_crm).length,
        WARM: leads.filter(l => l.temperature === 'WARM' && !l.moved_to_crm).length,
        COLD: leads.filter(l => l.temperature === 'COLD' && !l.moved_to_crm).length
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-100 flex items-center gap-2">
                    <Target size={18} className="text-cyber-primary" />
                    Qualificador de Leads
                </h3>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-cyber-primary/20 hover:bg-cyber-primary/30 text-cyber-primary px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all"
                >
                    <Plus size={14} /> Adicionar
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2">
                <button
                    onClick={() => setFilterTemperature(filterTemperature === 'HOT' ? 'ALL' : 'HOT')}
                    className={`p-2 rounded-lg border text-center transition-all ${filterTemperature === 'HOT'
                        ? 'bg-orange-500/20 border-orange-500/50'
                        : 'bg-slate-900/50 border-slate-800 hover:border-orange-500/30'
                        }`}
                >
                    <div className="flex items-center justify-center gap-1 mb-1">
                        <Flame size={12} className="text-orange-500" />
                        <span className="text-[10px] text-orange-400 font-bold">HOT</span>
                    </div>
                    <span className="text-lg font-bold text-slate-200">{temperatureStats.HOT}</span>
                </button>

                <button
                    onClick={() => setFilterTemperature(filterTemperature === 'WARM' ? 'ALL' : 'WARM')}
                    className={`p-2 rounded-lg border text-center transition-all ${filterTemperature === 'WARM'
                        ? 'bg-yellow-500/20 border-yellow-500/50'
                        : 'bg-slate-900/50 border-slate-800 hover:border-yellow-500/30'
                        }`}
                >
                    <div className="flex items-center justify-center gap-1 mb-1">
                        <ThermometerSun size={12} className="text-yellow-500" />
                        <span className="text-[10px] text-yellow-400 font-bold">MORNO</span>
                    </div>
                    <span className="text-lg font-bold text-slate-200">{temperatureStats.WARM}</span>
                </button>

                <button
                    onClick={() => setFilterTemperature(filterTemperature === 'COLD' ? 'ALL' : 'COLD')}
                    className={`p-2 rounded-lg border text-center transition-all ${filterTemperature === 'COLD'
                        ? 'bg-blue-500/20 border-blue-500/50'
                        : 'bg-slate-900/50 border-slate-800 hover:border-blue-500/30'
                        }`}
                >
                    <div className="flex items-center justify-center gap-1 mb-1">
                        <Snowflake size={12} className="text-blue-400" />
                        <span className="text-[10px] text-blue-400 font-bold">FRIO</span>
                    </div>
                    <span className="text-lg font-bold text-slate-200">{temperatureStats.COLD}</span>
                </button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                    type="text"
                    placeholder="Buscar por nome ou cidade..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:border-cyber-primary outline-none"
                />
            </div>

            {/* Lead List */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                {loading && (
                    <div className="text-center py-8">
                        <Loader2 className="animate-spin inline text-cyber-primary" />
                    </div>
                )}

                {!loading && filteredLeads.length === 0 && (
                    <div className="text-center py-8 text-slate-500 text-sm">
                        {leads.length === 0
                            ? 'Nenhum lead qualificado ainda. Adicione seu primeiro!'
                            : 'Nenhum lead encontrado com esses filtros.'
                        }
                    </div>
                )}

                {filteredLeads.map(lead => (
                    <div
                        key={lead.id}
                        className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 hover:border-slate-700 transition-all group"
                    >
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                                <TemperatureIcon temperature={lead.temperature} size={18} />
                                <div className="min-w-0">
                                    <p className="font-bold text-sm text-slate-200 truncate">{lead.business_name}</p>
                                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                                        <span className="flex items-center gap-0.5">
                                            <MapPin size={10} /> {lead.city}
                                        </span>
                                        <span className="flex items-center gap-0.5">
                                            <Tag size={10} /> {lead.category}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                                <span className="text-xs font-mono text-cyber-primary bg-cyber-primary/10 px-1.5 py-0.5 rounded">
                                    {lead.score}pts
                                </span>
                            </div>
                        </div>

                        {/* Contact info */}
                        <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-400">
                            {lead.whatsapp && (
                                <a
                                    href={`https://wa.me/55${lead.whatsapp.replace(/\D/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 hover:text-green-400 transition-colors"
                                >
                                    <Phone size={10} /> {lead.whatsapp}
                                </a>
                            )}
                            {lead.instagram_handle && (
                                <a
                                    href={`https://instagram.com/${lead.instagram_handle.replace('@', '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 hover:text-pink-400 transition-colors"
                                >
                                    <Instagram size={10} /> {lead.instagram_handle}
                                </a>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800">
                            <button
                                onClick={() => deleteLead(lead.id)}
                                className="text-slate-600 hover:text-red-400 transition-colors p-1"
                            >
                                <Trash2 size={14} />
                            </button>
                            <button
                                onClick={() => handleMoveToCRM(lead)}
                                className="flex items-center gap-1 text-xs font-bold text-cyber-primary hover:text-cyber-secondary transition-colors"
                            >
                                Abordar <ArrowRight size={12} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Lead Modal */}
            {showAddModal && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-cyber-dark/95 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
                    <div className="relative bg-cyber-panel border border-cyber-primary w-full max-w-md rounded-2xl shadow-2xl p-6 animate-fade-in">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Plus className="text-cyber-primary" size={20} /> Adicionar Lead
                            </h3>
                            <button onClick={() => setShowAddModal(false)} className="text-slate-500 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-slate-400 uppercase font-bold mb-1 block">Nome do Negócio *</label>
                                <input
                                    type="text"
                                    placeholder="Ex: Pizzaria do João"
                                    value={formData.business_name}
                                    onChange={e => setFormData({ ...formData, business_name: e.target.value })}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-cyber-primary outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs text-slate-400 uppercase font-bold mb-1 block">WhatsApp</label>
                                    <input
                                        type="text"
                                        placeholder="(11) 99999-9999"
                                        value={formData.whatsapp}
                                        onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-cyber-primary outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-slate-400 uppercase font-bold mb-1 block">Instagram</label>
                                    <input
                                        type="text"
                                        placeholder="@usuario"
                                        value={formData.instagram_handle}
                                        onChange={e => setFormData({ ...formData, instagram_handle: e.target.value })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-cyber-primary outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs text-slate-400 uppercase font-bold mb-1 block">Cidade *</label>
                                <input
                                    type="text"
                                    placeholder="Ex: São Paulo"
                                    value={formData.city}
                                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-cyber-primary outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs text-slate-400 uppercase font-bold mb-1 block">Categoria *</label>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-cyber-primary outline-none"
                                    >
                                        <option value="">Selecione</option>
                                        {CATEGORY_OPTIONS.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs text-slate-400 uppercase font-bold mb-1 block">Origem *</label>
                                    <select
                                        value={formData.source}
                                        onChange={e => setFormData({ ...formData, source: e.target.value as LeadSource })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-cyber-primary outline-none"
                                    >
                                        {SOURCE_OPTIONS.map(src => (
                                            <option key={src.value} value={src.value}>{src.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <button
                                onClick={handleStartQualification}
                                disabled={!formData.business_name || !formData.city || !formData.category}
                                className="w-full bg-gradient-to-r from-cyber-primary to-cyber-secondary text-white font-bold py-3 rounded-lg hover:shadow-neon-cyan transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                Qualificar Lead <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {/* Qualification Modal */}
            {qualifyingLead && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-cyber-dark/95 backdrop-blur-sm" />
                    <div className="relative bg-cyber-panel border border-cyber-primary w-full max-w-md rounded-2xl shadow-2xl p-6 animate-fade-in">
                        {/* Progress bar */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs text-slate-400">Qualificando: <span className="text-white font-bold">{qualifyingLead.business_name}</span></span>
                                <span className="text-xs text-cyber-primary font-mono">{currentQuestionIndex + 1}/{QUALIFICATION_QUESTIONS.length}</span>
                            </div>
                            <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-cyber-primary to-cyber-secondary transition-all duration-300"
                                    style={{ width: `${((currentQuestionIndex + 1) / QUALIFICATION_QUESTIONS.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Current Score */}
                        <div className="flex items-center justify-center gap-3 mb-6 p-3 bg-slate-900/50 rounded-lg">
                            <TemperatureIcon temperature={qualifyingLead.temperature || 'COLD'} size={24} />
                            <div className="text-center">
                                <p className="text-2xl font-bold text-white">{qualifyingLead.score || 0}</p>
                                <p className="text-[10px] text-slate-500 uppercase">pontos</p>
                            </div>
                        </div>

                        {/* Question */}
                        {(() => {
                            const question = QUALIFICATION_QUESTIONS[currentQuestionIndex];
                            const IconComponent = question.icon;
                            return (
                                <div className="space-y-4">
                                    <div className="text-center">
                                        <IconComponent size={32} className="text-cyber-primary mx-auto mb-3" />
                                        <h4 className="text-lg font-bold text-white">{question.question}</h4>
                                    </div>

                                    <div className="space-y-2">
                                        {question.options.map(option => (
                                            <button
                                                key={option.value}
                                                onClick={() => handleAnswerQuestion(option.value)}
                                                className="w-full p-4 bg-slate-900 border border-slate-700 rounded-xl text-left hover:border-cyber-primary hover:bg-slate-800 transition-all group"
                                            >
                                                <span className="text-sm text-slate-200 group-hover:text-white">{option.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default LeadQualifier;
