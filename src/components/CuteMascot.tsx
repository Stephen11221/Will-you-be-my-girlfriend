import React from 'react';

interface CuteMascotProps {
  mood?: 'curious' | 'shy' | 'celebrating' | 'holdingHeart' | 'pleading';
  className?: string;
}

export const CuteMascot: React.FC<CuteMascotProps> = ({ mood = 'curious', className = 'w-32 h-32' }) => {
  return (
    <div className={`relative inline-block select-none ${className}`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full drop-shadow-md"
      >
        {/* Soft Shadow */}
        <ellipse cx="100" cy="180" rx="55" ry="12" fill="#fbcfe8" fillOpacity="0.6" />

        {/* Ears */}
        {/* Left Ear */}
        <circle cx="65" cy="62" r="24" fill="#d97706" />
        <circle cx="65" cy="62" r="14" fill="#fed7aa" />
        {/* Right Ear */}
        <circle cx="135" cy="62" r="24" fill="#d97706" />
        <circle cx="135" cy="62" r="14" fill="#fed7aa" />

        {/* Head */}
        <ellipse cx="100" cy="95" rx="52" ry="46" fill="#f59e0b" />
        {/* Snout Area */}
        <ellipse cx="100" cy="106" rx="22" ry="16" fill="#fef3c7" />

        {/* Eyes */}
        {mood === 'pleading' ? (
          <>
            {/* Big starry pleading eyes */}
            <circle cx="82" cy="90" r="9" fill="#1e293b" />
            <circle cx="85" cy="88" r="3.5" fill="#ffffff" />
            <circle cx="79" cy="94" r="2" fill="#ffffff" />

            <circle cx="118" cy="90" r="9" fill="#1e293b" />
            <circle cx="121" cy="88" r="3.5" fill="#ffffff" />
            <circle cx="115" cy="94" r="2" fill="#ffffff" />
          </>
        ) : mood === 'celebrating' ? (
          <>
            {/* Happy curved eyes ^^ */}
            <path d="M74 92 C78 86 86 86 90 92" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M110 92 C114 86 122 86 126 92" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </>
        ) : (
          <>
            {/* Normal cute shiny eyes */}
            <circle cx="82" cy="92" r="7" fill="#1e293b" />
            <circle cx="84.5" cy="89.5" r="2.5" fill="#ffffff" />

            <circle cx="118" cy="92" r="7" fill="#1e293b" />
            <circle cx="120.5" cy="89.5" r="2.5" fill="#ffffff" />
          </>
        )}

        {/* Cute rosy blush cheeks */}
        <ellipse cx="68" cy="104" rx="10" ry="6" fill="#f43f5e" fillOpacity="0.45" />
        <ellipse cx="132" cy="104" rx="10" ry="6" fill="#f43f5e" fillOpacity="0.45" />

        {/* Cute button nose */}
        <ellipse cx="100" cy="102" rx="6" ry="4.5" fill="#854d0e" />
        {/* Mouth */}
        {mood === 'celebrating' ? (
          <path d="M94 109 Q100 118 106 109" stroke="#854d0e" strokeWidth="2.5" strokeLinecap="round" fill="#f43f5e" />
        ) : (
          <path d="M95 109 Q100 114 105 109" stroke="#854d0e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        )}

        {/* Body */}
        <ellipse cx="100" cy="148" rx="42" ry="34" fill="#f59e0b" />
        {/* Tummy patch */}
        <ellipse cx="100" cy="148" rx="26" ry="22" fill="#fef3c7" />

        {/* Feet */}
        <circle cx="70" cy="168" r="16" fill="#d97706" />
        <circle cx="70" cy="168" r="9" fill="#fef3c7" />
        <circle cx="130" cy="168" r="16" fill="#d97706" />
        <circle cx="130" cy="168" r="9" fill="#fef3c7" />

        {/* Arms / Hands & Props */}
        {mood === 'holdingHeart' || mood === 'pleading' ? (
          <>
            {/* Big Valentine Heart held in paws */}
            <g className="animate-heartbeat origin-center" transform="translate(100, 142) scale(0.9) translate(-100, -142)">
              <path
                d="M100 162 C70 142 55 125 55 110 C55 95 68 85 82 85 C91 85 97 90 100 95 C103 90 109 85 118 85 C132 85 145 95 145 110 C145 125 130 142 100 162 Z"
                fill="#f43f5e"
              />
              <ellipse cx="80" cy="98" rx="6" ry="3" fill="#ffffff" fillOpacity="0.4" transform="rotate(-30, 80, 98)" />
            </g>
            {/* Paws on heart */}
            <ellipse cx="72" cy="132" rx="10" ry="8" fill="#d97706" />
            <ellipse cx="128" cy="132" rx="10" ry="8" fill="#d97706" />
          </>
        ) : mood === 'celebrating' ? (
          <>
            {/* Arms raised in celebration! */}
            <ellipse cx="56" cy="120" rx="12" ry="8" fill="#d97706" transform="rotate(-40, 56, 120)" />
            <ellipse cx="144" cy="120" rx="12" ry="8" fill="#d97706" transform="rotate(40, 144, 120)" />
            {/* Party Hat */}
            <polygon points="100,28 85,58 115,58" fill="#ec4899" />
            <circle cx="100" cy="27" r="5" fill="#facc15" />
            <line x1="88" y1="46" x2="112" y2="46" stroke="#fbbf24" strokeWidth="2.5" />
          </>
        ) : (
          <>
            {/* Shy/curious arms resting */}
            <ellipse cx="64" cy="144" rx="10" ry="8" fill="#d97706" />
            <ellipse cx="136" cy="144" rx="10" ry="8" fill="#d97706" />
          </>
        )}
      </svg>
    </div>
  );
};
