
// Domain Entities

export enum NicheType {
  B2B = 'B2B', // Business to Business (Morning Prospecting)
  B2C = 'B2C', // Business to Consumer (Evening Prospecting)
}

export type RoleType = 'GRAPHIC_DESIGNER' | 'MOTION_DESIGNER' | 'VIDEO_EDITOR';

export type BlockType = 'TREND_HUNTING' | 'PROSPECTING' | 'DEEP_WORK' | 'ADMIN' | 'REST';

export type BlockStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

export interface TimeBlock {
  id: string;
  title: string;
  type: BlockType;
  startTime: string; // "09:00"
  endTime: string;   // "12:00"
  description: string;
  suggestedTasks: string[];
  status: BlockStatus;
  actionableTip?: string; // Dica específica para iniciantes
}

export interface User {
  id: string;
  name: string;
  email?: string; // Added email for admin check
  phone: string; // WhatsApp Number
  niche: NicheType | null;
  roles: RoleType[]; // Novas profissões selecionadas
  onboarded: boolean;
  isPremium: boolean; // Status da Assinatura
  // Novos campos de horário
  workDays?: string[];
  workStart?: string;
  workEnd?: string;
  // Meta financeira
  monthlyGoal?: number;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  blockType?: BlockType;
}

export interface DailyWinState {
  completed: boolean;
  notes: string;
}

// CRM / Pipeline Types
export type LeadStatus = 'NEW' | 'CONTACTED' | 'NEGOTIATING' | 'CLOSED' | 'LOST';

export interface Lead {
  id: string;
  name: string;
  value: number;
  status: LeadStatus;
}

// Contract Structure Types
export interface ContractData {
  contractor: {
    name: string;
    document: string;
    address: string;
  };
  client: {
    name: string;
    document: string;
    address: string;
  };
  project: {
    title: string;
    scope_items: string[];
    deadlines: {
      first_preview_days: number;
      final_delivery_days: number;
    };
  };
  financial: {
    total_value: number;
    currency: string;
    payment_method: string;
    payment_terms: {
      entry_percentage: number;
      final_percentage: number;
    };
    late_fee_percentage: number;
    interest_rate_monthly: number;
  };
  terms: {
    max_revisions: number;
    extra_revision_cost: number;
    editable_files_fee_percentage: number;
    jurisdiction_city: string;
    jurisdiction_state: string;
  };
  dates: {
    created_at: string;
    valid_until: string;
  };
}

// Lead Qualification Types
export type LeadTemperature = 'HOT' | 'WARM' | 'COLD';

export type LeadSource = 'instagram' | 'google_maps' | 'facebook' | 'indicacao' | 'outro';

export interface QualificationAnswers {
  hasDigitalPresence: 'yes' | 'partial' | 'no';
  postFrequency: 'daily' | 'weekly' | 'rarely';
  visualQuality: 'poor' | 'average' | 'professional';
  paidAds: 'yes' | 'maybe' | 'no';
  engagement: 'high' | 'medium' | 'low';
  nicheMatch: 'exact' | 'related' | 'different';
}

export interface QualifiedLead {
  id: string;
  user_id: string;
  business_name: string;
  whatsapp?: string;
  instagram_handle?: string;
  city: string;
  category: string;
  source: LeadSource;
  score: number;
  temperature: LeadTemperature;
  answers: QualificationAnswers;
  notes?: string;
  created_at: string;
  qualified_at?: string;
  moved_to_crm: boolean;
}
