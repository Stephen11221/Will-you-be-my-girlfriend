import React, { useState } from 'react';
import { CuteMascot } from './CuteMascot';
import { audio } from '../utils/sound';

interface EnvelopeScreenProps {
  onOpen: () => void;
}

export const EnvelopeScreen: React.FC<EnvelopeScreenProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (isOpen) return;
    setIsOpen(true);
    audio.playPop();
    audio.playSuccessChime();
    audio.startRomanticMusic();

    setTimeout(() => {
      onOpen();
    }, 1400);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4 text-center">
      {/* Floating Sparkles & Hearts */}
      <div className="animate-float mb-4">
        <CuteMascot mood="shy" className="w-28 h-28 md:w-36 md:h-36 drop-shadow-lg" />
      </div>

      <div className="max-w-md w-full mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-pink-600 tracking-tight mb-2 drop-shadow-sm font-heading">
          Will You Be My Girlfriend?
        </h1>
        <p className="text-sm md:text-base text-rose-500 font-medium mb-8">
          A tiny interactive journey made just for you ✨
        </p>

        {/* Envelope Container */}
        <div
          onClick={handleClick}
          onMouseEnter={() => {
            setIsHovered(true);
            audio.playHover();
          }}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative mx-auto w-72 sm:w-84 h-52 sm:h-60 cursor-pointer transition-transform duration-300 ${
            isHovered && !isOpen ? 'scale-105' : ''
          }`}
          role="button"
          tabIndex={0}
          aria-label="Open romantic envelope"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleClick();
            }
          }}
        >
          {/* Envelope Body */}
          <div className="relative h-full w-full rounded-2xl bg-gradient-to-br from-rose-200 via-pink-200 to-rose-300 p-1 shadow-2xl border-2 border-white/60 overflow-hidden">
            {/* Letter Inside that slides up when opened */}
            <div
              className={`absolute left-3 right-3 bottom-3 top-3 rounded-xl bg-white p-4 shadow-md transition-all duration-700 flex flex-col items-center justify-center ${
                isOpen ? '-translate-y-20 z-20 opacity-100 scale-105' : 'translate-y-0 z-0 opacity-80'
              }`}
            >
              <span className="text-3xl animate-bounce">💌</span>
              <p className="font-handwriting text-2xl text-rose-600 font-bold mt-1">
                For the prettiest girl...
              </p>
              <p className="text-xs text-rose-400 mt-0.5">Let’s see if you can pass my quiz! 💕</p>
            </div>

            {/* Envelope Bottom Triangle Flaps */}
            <div className="absolute inset-0 pointer-events-none z-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Left fold */}
                <polygon points="0,0 50,55 0,100" fill="#fbcfe8" fillOpacity="0.85" />
                {/* Right fold */}
                <polygon points="100,0 50,55 100,100" fill="#f472b6" fillOpacity="0.4" />
                {/* Bottom fold */}
                <polygon points="0,100 50,45 100,100" fill="#fda4af" fillOpacity="0.95" />
              </svg>
            </div>

            {/* Envelope Top Flap (Animated) */}
            <div
              className={`absolute top-0 left-0 right-0 h-1/2 origin-top transition-transform duration-700 pointer-events-none z-10 ${
                isOpen ? '-scale-y-100 opacity-20' : 'scale-y-100'
              }`}
            >
              <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                <polygon points="0,0 100,0 50,50" fill="#fb7185" />
                <polygon points="5,2 95,2 50,46" fill="#f43f5e" fillOpacity="0.15" />
              </svg>
            </div>

            {/* Glowing Wax Seal */}
            {!isOpen && (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-rose-600 text-white shadow-lg border-2 border-rose-400 animate-pulse-glow">
                  <span className="text-2xl sm:text-3xl animate-heartbeat">❤️</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Call to action label */}
        <div className="mt-8">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-sm border border-rose-200 shadow-sm text-rose-700 font-semibold text-sm sm:text-base animate-pulse">
            <span>You have a special message 💌</span>
            <span className="font-bold text-rose-500 underline underline-offset-4">Click to open</span>
          </div>
        </div>
      </div>
    </div>
  );
};
