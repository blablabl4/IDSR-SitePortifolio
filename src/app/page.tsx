'use client';

import React from 'react';
import { TransitionProvider } from '@/context/TransitionContext';
import { SitePrincipalStage } from '@/components/central/SitePrincipalStage';

export default function Home() {
  return (
    <TransitionProvider>
      <SitePrincipalStage />
    </TransitionProvider>
  );
}
