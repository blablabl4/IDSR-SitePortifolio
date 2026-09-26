import { useState, useEffect, useCallback } from 'react';
import { useAssessor } from './useAssessor';
import { Message, SelectionValue } from '@/components/chat/ChatInterface';
import { Segment, PainPoint, Impact, DataMaturity } from '@/types';

export function useChatAssessor() {
    const assessor = useAssessor();
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [lastProcessedMessageId, setLastProcessedMessageId] = useState<string | null>(null);
    const [awaitingNextQuestion, setAwaitingNextQuestion] = useState(false);

    const addBotMessage = useCallback((text: string, type: 'text' | 'options' = 'text', options: { label: string; value: SelectionValue }[] = []) => {
        const id = Math.random().toString(36).substr(2, 9);
        setMessages(prev => [...prev, { id, role: 'bot', text, type, options }]);
    }, []);

    const addUserMessage = useCallback((text: string) => {
        const id = Math.random().toString(36).substr(2, 9);
        setMessages(prev => [...prev, { id, role: 'user', text }]);
    }, []);

    const initFlow = useCallback(() => {
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            addBotMessage("Olá! Sou a IA do IDSR. Entendi sua necessidade.");

            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                addBotMessage("Para continuarmos, em qual segmento sua empresa se encaixa melhor?", "options", [
                    { label: "Varejo / Loja", value: "varejo" },
                    { label: "Restaurante / Delivery", value: "restaurante" },
                    { label: "Clínica / Agendamento", value: "agendamento" },
                    { label: "Outro", value: "outro" }
                ]);
            }, 800);
        }, 600);
    }, [addBotMessage]);

    // Hook for "Diagnosticar Agora" button or explicit start
    const startDiagnosis = () => {
        if (hasStarted) return;
        setHasStarted(true);
        initFlow();
    };

    // Handle open text from user (e.g. from Home Input)
    const handleUserText = useCallback((text: string) => {
        addUserMessage(text);
        if (!hasStarted) {
            setHasStarted(true);
            initFlow(); // Treat first message as "Start" trigger
        }
        // If already started, we would need NLP to parse. For MVP, we proceed flow.
    }, [hasStarted, addUserMessage, initFlow]);

    const askNextQuestion = useCallback(() => {
        const s = assessor.state;
        // Map step to question
        // IMPORTANT: If user just sent text (initial), we might be in 'start'. 
        // We already moved to 'segment' inside initFlow (conceptually), but useAssessor state is separate.
        // For MVP, if we are in 'start' and user msg exists, we assume we need to ask Segment (handled by initFlow).

        if (s.step === 'start') return; // Handled by initFlow or user override

        switch (s.step) {
            case 'size':
                addBotMessage("Quantas unidades ou colaboradores sua operação possui?", "options", [
                    { label: "1 Unidade (Pequena)", value: { units: 1, team: 1 } },
                    { label: "2-5 Unidades (Média)", value: { units: 3, team: 10 } },
                    { label: "Franquia / Rede (Grande)", value: { units: 6, team: 20 } }
                ]);
                break;
            case 'pain':
                addBotMessage("Entendi. E qual é o maior gargalo hoje?", "options", [
                    { label: "Perdemos leads (resposta lenta)", value: "leads" },
                    { label: "Cliente agenda e não vai (No-Show)", value: "noshow" },
                    { label: "Equipe perdida / Dúvidas", value: "ops" },
                    { label: "Desorganização de dados", value: "nodata" }
                ]);
                break;
            case 'impact':
                addBotMessage("Onde isso mais dói no financeiro?", "options", [
                    { label: "Vendas perdidas", value: "vendas" },
                    { label: "Custo com equipe", value: "tempo" },
                    { label: "Caos operacional", value: "estresse" }
                ]);
                break;
            case 'channels':
                addBotMessage("Canais principais de atendimento:", "options", [
                    { label: "WhatsApp", value: ["WhatsApp"] },
                    { label: "Instagram", value: ["Instagram"] },
                    { label: "Web / Email", value: ["Site", "Email"] }
                ]);
                break;
            case 'tools':
                addBotMessage("Onde vocês controlam tudo isso?", "options", [
                    { label: "Planilhas Excel", value: ["Planilha"] },
                    { label: "Caderno / Cabeça", value: ["Nenhuma"] },
                    { label: "Sistema ERP / CRM", value: ["ERP"] }
                ]);
                break;
            case 'data_maturity':
                addBotMessage("Nota sincera para a organização dos dados (0 a 10):", "options", [
                    { label: "0-3 (Caos)", value: "none" },
                    { label: "4-7 (Planilhas básicas)", value: "low" },
                    { label: "8-10 (Tudo em sistema)", value: "good" }
                ]);
                break;
            case 'results':
                addBotMessage(`Diagnóstico Pronto! Score de Complexidade: ${s.score}/5.`);
                setTimeout(() => {
                    addBotMessage(`Solução Ideal: IDSR ${s.recommendation?.base.toUpperCase()} com módulo(s) ${s.recommendation?.modules.map(m => m.toUpperCase()).join(' & ')}.`);
                    setTimeout(() => {
                        addBotMessage("Próximo passo?", "options", [
                            { label: "Agendar Implantação", value: "ACTION_BOOK" },
                            { label: "Detalhes Técnicos", value: "ACTION_DETAILS" }
                        ]);
                    }, 500);
                }, 800);
                break;
        }
    }, [assessor.state, addBotMessage]);

    // Detecta uma nova mensagem do usuário durante o render (padrão oficial do React
    // para "ajustar estado em resposta a uma mudança", comparando com o último id
    // processado) e liga o "digitando" na hora — em vez de um setState síncrono no
    // corpo do efeito abaixo (react-hooks/set-state-in-effect).
    const lastMsg = messages[messages.length - 1];
    if (hasStarted && lastMsg?.role === 'user' && lastMsg.id !== lastProcessedMessageId) {
        setLastProcessedMessageId(lastMsg.id);
        setIsTyping(true);
        setAwaitingNextQuestion(true);
    }

    // Efeito de transição de etapa (Lógica -> ChatUI): só o timer (algo externo)
    // fica no efeito, disparado exclusivamente pela detecção de mensagem acima —
    // não reusa isTyping como dep porque initFlow também liga/desliga isTyping
    // para as falas iniciais do bot, sem relação com askNextQuestion. Precisa vir
    // depois de askNextQuestion estar declarada: chamá-la antes da declaração
    // (mesmo dentro de um setTimeout, que só executa depois) violava
    // react-hooks/immutability.
    useEffect(() => {
        if (!awaitingNextQuestion) return;
        const timeout = setTimeout(() => {
            askNextQuestion();
            setIsTyping(false);
            setAwaitingNextQuestion(false);
        }, 800 + Math.random() * 500);
        return () => clearTimeout(timeout);
    }, [awaitingNextQuestion, askNextQuestion]);

    const handleSelection = (value: SelectionValue) => {
        // 1. Add User Message
        let label = "Selecionado";
        const lastBotMsg = messages.filter(m => m.role === 'bot').pop();
        if (lastBotMsg && lastBotMsg.options) {
            const opt = lastBotMsg.options.find(o => JSON.stringify(o.value) === JSON.stringify(value));
            if (opt) label = opt.label;
        }
        addUserMessage(label);

        // 2. Trigger Logic
        const currStep = assessor.state.step;

        if (currStep === 'start' || currStep === 'segment') {
            assessor.setSegment(value as Segment);
        } else if (currStep === 'size') {
            const size = value as { units: number; team: number };
            assessor.setSize(size.units, size.team);
        } else if (currStep === 'pain') {
            assessor.setPain(value as PainPoint);
        } else if (currStep === 'impact') {
            assessor.setImpact(value as Impact);
        } else if (currStep === 'channels') {
            assessor.setChannels(value as string[]);
        } else if (currStep === 'tools') {
            assessor.setTools(value as string[]);
        } else if (currStep === 'data_maturity') {
            assessor.setDataMaturity(value as DataMaturity);
        } else if (currStep === 'results') {
            if (value === 'ACTION_BOOK') {
                window.open('https://cal.com/idsr', '_blank');
            }
        }
    };

    return {
        messages,
        isTyping,
        handleSelection,
        startDiagnosis,
        handleUserText // Exposed
    };
}
