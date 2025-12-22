import React from 'react';
import { AssessmentState } from '@/types';

export const ResultsView = ({ state }: { state: AssessmentState }) => {
    const { score, recommendation } = state;

    return (
        <div className="space-y-8 animate-in zoom-in-95 duration-700 max-w-xl mx-auto pt-8">
            <div className="text-center space-y-2">
                <span className="text-xs uppercase tracking-[0.2em] text-[#00FF9D]">Diagnóstico Concluído</span>
                <h2 className="text-3xl font-light text-white">Aqui está seu plano.</h2>
            </div>

            <div className="p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-6">
                    <span className="text-lg font-medium text-[#F0F0EB]">Complexity Score</span>
                    <div className="flex items-center gap-2">
                        <span className="text-3xl font-bold text-[#00FF9D]">{score}</span>
                        <span className="text-white/40">/ 5</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <p className="text-sm text-[#F0F0EB]/60">Recomendação do Sistema:</p>
                    <div className="text-2xl font-light text-white">
                        <span className="font-bold text-[#00FF9D]">{recommendation?.base.toUpperCase()}</span>
                        {' + '}
                        {recommendation?.modules.map(m => m.toUpperCase()).join(' + ')}
                    </div>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#00FF9D]/10 border border-[#00FF9D]/20 text-xs text-[#00FF9D]">
                        Modelo: {recommendation?.path.toUpperCase()} ({recommendation?.plan_hint})
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-4">
                <p className="text-center text-[#F0F0EB]/60">Gostaria de implementar essa estratégia?</p>
                <button className="w-full h-14 text-lg font-bold bg-[#00FF9D] text-[#051F18] rounded-xl hover:bg-[#00CC7D] transition-all shadow-[0_0_20px_rgba(0,255,157,0.2)] hover:shadow-[0_0_30px_rgba(0,255,157,0.4)]">
                    {score >= 4 ? 'Agendar Consultoria Consultiva' : 'Começar Implementação Agora'}
                </button>
            </div>
        </div>
    );
};
