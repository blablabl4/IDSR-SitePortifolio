export type Segment = 'varejo' | 'restaurante' | 'agendamento' | 'outro';
export type PainPoint = 'leads' | 'noshow' | 'ops' | 'nodata' | 'other';
export type Impact = 'vendas' | 'tempo' | 'estresse' | 'outro';
export type DataMaturity = 'none' | 'low' | 'basic' | 'good';

export interface ComplexityFlags {
    integrations: boolean;
    multi_channels: boolean;
    multi_units: boolean;
    data_migration: boolean;
    custom_rules: boolean;
}

export type RecommendedBundle = {
    base: 'pulse';
    modules: string[]; // e.g., ['scheduleflow', 'leadflow']
    path: 'managed' | 'byo';
    plan_hint: 'starter' | 'pro' | 'scale';
};

export interface AssessmentState {
    step: string;
    segment?: Segment;
    units?: number;
    team_size?: number;
    primary_pain?: PainPoint;
    impact?: Impact;
    channels: string[];
    tools: string[];
    data_maturity?: DataMaturity;
    complexity_flags: ComplexityFlags;
    score: number;
    recommendation?: RecommendedBundle;
}

export interface Lead {
    name: string;
    phone: string;
    email?: string;
    consent_whatsapp: boolean;
}
