'use client';

import React, { useEffect } from 'react';
import { useChatAssessor } from '@/hooks/useChatAssessor';
import { ChatInterface } from '@/components/chat/ChatInterface';

interface Props {
    isExpanded: boolean;
    initialUserMessage?: string | null;
}

export function AssessmentContainer({ isExpanded, initialUserMessage }: Props) {
    const { messages, isTyping, handleSelection, startDiagnosis, handleUserText } = useChatAssessor();

    // Handle Initial Message from Home Input
    useEffect(() => {
        if (initialUserMessage && messages.length === 0) {
            handleUserText(initialUserMessage);
        }
    }, [initialUserMessage]);

    return (
        <div className="w-full h-full flex flex-col text-[#E7ECEF]">
            <div className="flex-1 overflow-hidden">
                <ChatInterface
                    messages={messages}
                    onOptionSelect={handleSelection}
                    isTyping={isTyping}
                    onStartDiagnosis={startDiagnosis}
                />
            </div>
        </div>
    );
}
