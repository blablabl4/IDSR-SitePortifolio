import React, { useState } from 'react';
import { Segment, PainPoint, Impact, DataMaturity } from '@/types';

// Updated StepWrapper for Dark Mode
const StepWrapper = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-light text-white text-center">{title}</h2>
        <div className="space-y-4">{children}</div>
    </div>
);

// Updated Buttons to use IDSR Green Neon styles manually or via revised Button component.
// For now, I'll use the existing Button component but add specific classNames for this context
// or I should refactor the Button component itself. Let's rely on standard Buttons but pass classNames.
// Better: Update the Button component to handle a "dark-mode" variant or just use standard styles.
// I will assume Button component needs update, but for now I will style inline/via className to ensure it works.

const btnBase = "w-full text-left justify-start h-auto py-4 px-6 text-lg border rounded-xl transition-all duration-200";
const btnInactive = "bg-white/5 border-white/10 text-[#F0F0EB]/80 hover:bg-white/10 hover:border-[#00FF9D]/30 hover:text-white";
const btnActive = "bg-[#00FF9D]/10 border-[#00FF9D] text-[#00FF9D] shadow-[0_0_15px_rgba(0,255,157,0.1)]";

const OptionButton = ({ selected, onClick, children }: { selected?: boolean, onClick: () => void, children: React.ReactNode }) => (
    <button onClick={onClick} className={`${btnBase} ${selected ? btnActive : btnInactive}`}>
        {children}
    </button>
);

export const StepSegment = ({ onSelect }: { onSelect: (s: Segment) => void }) => (
    <StepWrapper title="Qual é o seu segmento?">
        <div className="grid grid-cols-1 gap-3">
            <OptionButton onClick={() => onSelect('varejo')}>Varejo / Loja</OptionButton>
            <OptionButton onClick={() => onSelect('restaurante')}>Restaurante / Delivery</OptionButton>
            <OptionButton onClick={() => onSelect('agendamento')}>Clínica / Agendamento</OptionButton>
            <OptionButton onClick={() => onSelect('outro')}>Outro</OptionButton>
        </div>
    </StepWrapper>
);

export const StepSize = ({ onNext }: { onNext: (u: number, t: number) => void }) => {
    const [units, setUnits] = useState(1);
    const [team, setTeam] = useState(1);
    return (
        <StepWrapper title="Qual o tamanho da operação?">
            <div className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10">
                <div>
                    <label className="block text-sm font-medium mb-3 text-[#F0F0EB]/60">Unidades</label>
                    <input type="number" min="1" value={units} onChange={e => setUnits(parseInt(e.target.value))}
                        className="w-full p-4 border rounded-xl bg-black/20 border-white/10 text-white focus:border-[#00FF9D] focus:ring-1 focus:ring-[#00FF9D] outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-3 text-[#F0F0EB]/60">Pessoas na equipe</label>
                    <input type="number" min="1" value={team} onChange={e => setTeam(parseInt(e.target.value))}
                        className="w-full p-4 border rounded-xl bg-black/20 border-white/10 text-white focus:border-[#00FF9D] focus:ring-1 focus:ring-[#00FF9D] outline-none transition-all"
                    />
                </div>
                <button onClick={() => onNext(units, team)} className="w-full bg-[#00FF9D] text-[#051F18] font-bold py-4 rounded-xl hover:bg-[#00CC7D] transition-colors">
                    Continuar
                </button>
            </div>
        </StepWrapper>
    );
};

export const StepPain = ({ onSelect }: { onSelect: (p: PainPoint) => void }) => (
    <StepWrapper title="Qual a sua maior dor hoje?">
        <OptionButton onClick={() => onSelect('leads')}>Perdendo Leads (Demora para responder)</OptionButton>
        <OptionButton onClick={() => onSelect('noshow')}>No-Show (Cliente agenda e não vai)</OptionButton>
        <OptionButton onClick={() => onSelect('ops')}>Operacional (Muitas dúvidas repetitivas)</OptionButton>
        <OptionButton onClick={() => onSelect('nodata')}>Falta de Dados (Não sei meus números)</OptionButton>
        <OptionButton onClick={() => onSelect('other')}>Outro</OptionButton>
    </StepWrapper>
);

export const StepImpact = ({ onSelect }: { onSelect: (i: Impact) => void }) => (
    <StepWrapper title="Onde isso mais impacta?">
        <div className="grid grid-cols-2 gap-3">
            <OptionButton onClick={() => onSelect('vendas')}>Vendas perdidas</OptionButton>
            <OptionButton onClick={() => onSelect('tempo')}>Tempo gasto</OptionButton>
            <OptionButton onClick={() => onSelect('estresse')}>Estresse</OptionButton>
            <OptionButton onClick={() => onSelect('outro')}>Outro</OptionButton>
        </div>
    </StepWrapper>
);

export const StepChannels = ({ onNext }: { onNext: (c: string[]) => void }) => {
    const [selected, setSelected] = useState<string[]>([]);
    const toggle = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

    return (
        <StepWrapper title="Quais canais você usa?">
            <div className="grid grid-cols-2 gap-3 mb-6">
                {['WhatsApp', 'Instagram', 'Site', 'Email', 'Telefone', 'Outro'].map(c => (
                    <OptionButton key={c} selected={selected.includes(c)} onClick={() => toggle(c)}>
                        {c}
                    </OptionButton>
                ))}
            </div>
            <button onClick={() => onNext(selected)} disabled={selected.length === 0} className="w-full bg-[#00FF9D] text-[#051F18] font-bold py-4 rounded-xl hover:bg-[#00CC7D] transition-colors disabled:opacity-50">
                Continuar
            </button>
        </StepWrapper>
    )
};

export const StepTools = ({ onNext }: { onNext: (t: string[]) => void }) => {
    const [selected, setSelected] = useState<string[]>([]);
    const toggle = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

    return (
        <StepWrapper title="Quais ferramentas usa hoje?">
            <div className="grid grid-cols-2 gap-3 mb-6">
                {['Planilha', 'Google Agenda', 'CRM', 'ERP', 'Sistema Próprio', 'Nenhuma'].map(c => (
                    <OptionButton key={c} selected={selected.includes(c)} onClick={() => toggle(c)}>
                        {c}
                    </OptionButton>
                ))}
            </div>
            <button onClick={() => onNext(selected)} className="w-full bg-[#00FF9D] text-[#051F18] font-bold py-4 rounded-xl hover:bg-[#00CC7D] transition-colors">
                Continuar
            </button>
        </StepWrapper>
    )
};

export const StepDataMaturity = ({ onSelect }: { onSelect: (d: DataMaturity) => void }) => (
    <StepWrapper title="Como você organiza seus dados?">
        <OptionButton onClick={() => onSelect('none')}>Não organizo / Caderno</OptionButton>
        <OptionButton onClick={() => onSelect('low')}>Planilhas soltas</OptionButton>
        <OptionButton onClick={() => onSelect('basic')}>Sistema básico</OptionButton>
        <OptionButton onClick={() => onSelect('good')}>CRM / ERP integrado</OptionButton>
    </StepWrapper>
);
