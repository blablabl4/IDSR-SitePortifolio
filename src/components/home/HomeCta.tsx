'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DotContainer } from '@/components/ui/DotContainer';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export function HomeCta() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <DotContainer className="w-full py-28 text-center">
      <div className="max-w-3xl mx-auto px-6">
        <AnimatedSection variant="blur">
          <div className="inline-block px-4 py-2 bg-[#0f0f0f]/80 backdrop-blur-md border border-[#2a2a2a]/50 rounded-lg mb-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#0B3B2E] font-medium">
              Próximo Passo
            </p>
          </div>
          <h2 className="text-3xl md:text-5xl font-extralight text-[#E7ECEF] mb-6 leading-tight">
            Sua operação pode funcionar melhor.<br className="hidden md:block" />
            Vamos desenhar como.
          </h2>
          <p className="text-sm text-[#E7ECEF]/50 mb-10 max-w-md mx-auto leading-relaxed">
            Inicie o diagnóstico guiado pela nossa IA ou fale diretamente com a diretoria técnica da IDSR.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-8 py-4 bg-[#0D7C66] text-[#E7ECEF] rounded-xl text-sm font-medium hover:bg-[#0F5A47] transition-all shadow-xl shadow-[#0D7C66]/30 flex items-center justify-center gap-2 group cursor-pointer"
            >
              Começar diagnóstico no topo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/contato"
                className="w-full sm:w-auto px-8 py-4 bg-[#111111] border border-[#2a2a2a] text-[#E7ECEF]/80 hover:text-[#E7ECEF] hover:border-[#0D7C66]/40 rounded-xl text-sm font-medium transition-all inline-block"
              >
                Ir para página de contato
              </Link>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </DotContainer>
  );
}
