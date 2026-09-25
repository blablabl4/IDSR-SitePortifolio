'use client';

import React from 'react';

export type IrisState = 'closed' | 'opening' | 'open';

interface IrisSymbolProps {
  size?: number;
  state?: IrisState;
  className?: string;
}

export function IrisSymbol({ size = 40, state = 'closed', className = '' }: IrisSymbolProps) {
  const isClosed = state === 'closed';
  const isOpening = state === 'opening';

  // Mechanical iris offsets:
  // Closed = 0px shift, 0deg
  // Opening = 4px shift, 15deg
  // Open = 8px shift, 45deg
  const offset = isClosed ? 0 : isOpening ? 4 : 8;
  const rotation = isClosed ? 0 : isOpening ? 15 : 45;

  const clipId = `iris-clip-${size}-${Math.random().toString(36).slice(2, 7)}`;
  const gradientId = `aurora-core-${size}-${Math.random().toString(36).slice(2, 7)}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-500 ease-out ${className}`}
    >
      <defs>
        {/* Outer Circular Boundary */}
        <clipPath id={clipId}>
          <circle cx="20" cy="20" r="18" />
        </clipPath>

        {/* Official Aurora Core Gradient */}
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c6cf6" />
          <stop offset="50%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#38e0e0" />
        </linearGradient>
      </defs>

      {/* Bezel Ring */}
      <circle cx="20" cy="20" r="18" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />

      {/* Internal Aurora Energy Core (Revealed when open) */}
      <g
        style={{
          opacity: isClosed ? 0 : 1,
          transform: `scale(${isClosed ? 0.8 : 1})`,
          transformOrigin: '20px 20px',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <circle cx="20" cy="20" r="14" fill={`url(#${gradientId})`} />

        {/* Organic Sine Waves of the Core */}
        <path
          d="M 10 20 Q 15 12 20 20 T 30 20"
          stroke="#ffffff"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M 12 15 Q 16 9 20 15 T 28 15"
          stroke="#ffffff"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M 12 25 Q 16 19 20 25 T 28 25"
          stroke="#ffffff"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
        <circle cx="20" cy="20" r="2.5" fill="#ffffff" />
      </g>

      {/* 4 Mechanical Glass Aperture Blades */}
      <g clipPath={`url(#${clipId})`}>
        <g
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: '20px 20px',
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Top Blade */}
          <path
            d="M -10 -10 L 40 10 L 20 20 Z"
            fill="rgba(255,255,255,0.12)"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="1"
            style={{
              transform: `translate(0, ${-offset}px)`,
              transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />

          {/* Right Blade */}
          <path
            d="M 50 -10 L 30 40 L 20 20 Z"
            fill="rgba(255,255,255,0.12)"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="1"
            style={{
              transform: `translate(${offset}px, 0)`,
              transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />

          {/* Bottom Blade */}
          <path
            d="M 50 50 L 0 30 L 20 20 Z"
            fill="rgba(255,255,255,0.12)"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="1"
            style={{
              transform: `translate(0, ${offset}px)`,
              transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />

          {/* Left Blade */}
          <path
            d="M -10 50 L 10 0 L 20 20 Z"
            fill="rgba(255,255,255,0.12)"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="1"
            style={{
              transform: `translate(${-offset}px, 0)`,
              transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </g>
      </g>
    </svg>
  );
}
