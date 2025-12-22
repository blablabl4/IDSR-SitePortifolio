import { useReducer } from 'react';
import { AssessmentState, ComplexityFlags, Segment, PainPoint, Impact, DataMaturity, RecommendedBundle } from '@/types';

type Action =
    | { type: 'SET_SEGMENT'; payload: Segment }
    | { type: 'SET_SIZE'; payload: { units: number; team: number } }
    | { type: 'SET_PAIN'; payload: PainPoint }
    | { type: 'SET_IMPACT'; payload: Impact }
    | { type: 'SET_CHANNELS'; payload: string[] }
    | { type: 'SET_TOOLS'; payload: string[] }
    | { type: 'SET_DATA_MATURITY'; payload: DataMaturity }
    | { type: 'ADD_COMPLEXITY_FLAG'; payload: keyof ComplexityFlags }
    | { type: 'CALCULATE_RESULT' }
    | { type: 'NEXT_STEP' }
    | { type: 'RESET' };

const INITIAL_STATE: AssessmentState = {
    step: 'start',
    channels: [],
    tools: [],
    complexity_flags: {
        integrations: false,
        multi_channels: false,
        multi_units: false,
        data_migration: false,
        custom_rules: false,
    },
    score: 0,
};

function assessorReducer(state: AssessmentState, action: Action): AssessmentState {
    switch (action.type) {
        case 'SET_SEGMENT':
            return { ...state, segment: action.payload };
        case 'SET_SIZE':
            return {
                ...state,
                units: action.payload.units,
                team_size: action.payload.team,
                complexity_flags: {
                    ...state.complexity_flags,
                    multi_units: action.payload.units > 1 || action.payload.team > 5
                }
            };
        case 'SET_PAIN':
            return { ...state, primary_pain: action.payload };
        case 'SET_IMPACT':
            return { ...state, impact: action.payload };
        case 'SET_CHANNELS':
            return {
                ...state,
                channels: action.payload,
                complexity_flags: {
                    ...state.complexity_flags,
                    multi_channels: action.payload.length > 1
                }
            };
        case 'SET_TOOLS':
            return { ...state, tools: action.payload };
        case 'SET_DATA_MATURITY':
            return {
                ...state,
                data_maturity: action.payload,
                complexity_flags: {
                    ...state.complexity_flags,
                    data_migration: action.payload !== 'none'
                }
            };
        case 'ADD_COMPLEXITY_FLAG':
            return {
                ...state,
                complexity_flags: {
                    ...state.complexity_flags,
                    [action.payload]: true
                }
            };
        case 'CALCULATE_RESULT':
            return calculateFinalResult(state);
        case 'NEXT_STEP':
            return advanceStep(state);
        case 'RESET':
            return INITIAL_STATE;
        default:
            return state;
    }
}

function advanceStep(state: AssessmentState): AssessmentState {
    const order = ['start', 'segment', 'size', 'pain', 'impact', 'channels', 'tools', 'data_maturity', 'results'];
    const currentIndex = order.indexOf(state.step);
    if (currentIndex < order.length - 1) {
        return { ...state, step: order[currentIndex + 1] };
    }
    return state;
}

function calculateFinalResult(state: AssessmentState): AssessmentState {
    let score = 0;
    const flags = state.complexity_flags;

    // Scoring Logic (11.4)
    if (flags.integrations) score += 1;
    if (flags.multi_channels) score += 1;
    if (flags.multi_units) score += 1;
    if (flags.data_migration) score += 1;
    if (flags.custom_rules) score += 1;

    // Recommendation Mapping (11.5)
    const modules = [];
    if (state.primary_pain === 'noshow') modules.push('scheduleflow');
    if (state.primary_pain === 'leads') modules.push('leadflow');
    if (state.primary_pain === 'ops') modules.push('opsflow');

    // Implicit rule: If Score >= 4, Scale/Custom. If Score <= 1, maybe Starter.
    const plan_hint = score >= 4 ? 'scale' : (score >= 2 ? 'pro' : 'starter');
    const path = score >= 2 ? 'managed' : 'byo'; // Simplified logic based on docs

    const recommendation: RecommendedBundle = {
        base: 'pulse',
        modules,
        path: path as 'managed' | 'byo',
        plan_hint: plan_hint as 'starter' | 'pro' | 'scale',
    };

    return { ...state, score, recommendation, step: 'results' };
}

export function useAssessor() {
    const [state, dispatch] = useReducer(assessorReducer, INITIAL_STATE);

    return {
        state,
        start: () => dispatch({ type: 'NEXT_STEP' }),
        setSegment: (s: Segment) => { dispatch({ type: 'SET_SEGMENT', payload: s }); dispatch({ type: 'NEXT_STEP' }); },
        setSize: (u: number, t: number) => { dispatch({ type: 'SET_SIZE', payload: { units: u, team: t } }); dispatch({ type: 'NEXT_STEP' }); },
        setPain: (p: PainPoint) => { dispatch({ type: 'SET_PAIN', payload: p }); dispatch({ type: 'NEXT_STEP' }); },
        setImpact: (i: Impact) => { dispatch({ type: 'SET_IMPACT', payload: i }); dispatch({ type: 'NEXT_STEP' }); },
        setChannels: (c: string[]) => { dispatch({ type: 'SET_CHANNELS', payload: c }); dispatch({ type: 'NEXT_STEP' }); },
        setTools: (t: string[]) => { dispatch({ type: 'SET_TOOLS', payload: t }); dispatch({ type: 'NEXT_STEP' }); },
        setDataMaturity: (d: DataMaturity) => {
            dispatch({ type: 'SET_DATA_MATURITY', payload: d });
            dispatch({ type: 'CALCULATE_RESULT' }); // End of flow
        },
        reset: () => dispatch({ type: 'RESET' }),
    };
}
