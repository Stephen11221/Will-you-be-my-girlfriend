import React, { useState, useRef, useEffect } from 'react';
import { CuteMascot } from './CuteMascot';
import { audio } from '../utils/sound';

interface ProposalScreenProps {
  onYes: () => void;
}

const FUNNY_MESSAGES = [
  "Oops, try again! 🤭",
  "No is not an option 😜",
  "You meant Yes right? 😏",
  "Nice try, cutie! 🏃‍♂️💨",
  "The 'No' button is allergic to your finger 🥺",
  "Are you sure? Try reading the big button! 💖",
  "Error 404: 'No' button disconnected! 🚀",
  "Destiny has already decided! ✨",
  "Just surrender to love already! 🙈💕",
  "Look how shiny the YES button is! 👑",
];

export const ProposalScreen: React.FC<ProposalScreenProps> = ({ onYes }) => {
  const [evasionCount, setEvasionCount] = useState(0);
  const [funnyMessage, setFunnyMessage] = useState<string | null>(null);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const noBtnRef = useRef<HTMLButtonElement | null>(null);

  // Calculate random safe position for the "No" button
  const moveNoButton = (cursorX?: number, cursorY?: number) => {
    audio.playPop();

    const padding = 20;
    const btnWidth = 120;
    const btnHeight = 52;
    const maxW = window.innerWidth - btnWidth - padding;
    const maxH = window.innerHeight - btnHeight - padding;

    let newX = Math.floor(Math.random() * (maxW - padding)) + padding;
    let newY = Math.floor(Math.random() * (maxH - padding)) + padding;

    // Avoid spawning directly under cursor
    if (cursorX !== undefined && cursorY !== undefined) {
      if (Math.abs(newX - cursorX) < 100 && Math.abs(newY - cursorY) < 100) {
        newX = (newX + 160) % maxW;
        newY = (newY + 160) % maxH;
      }
    }

    setNoPosition({ x: newX, y: newY });
    setEvasionCount((prev) => {
      const next = prev + 1;
      const msg = FUNNY_MESSAGES[(next - 1) % FUNNY_MESSAGES.length];
      setFunnyMessage(msg);
      return next;
    });
  };

  const handleNoInteraction = (e: React.MouseEvent | React.TouchEvent | React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();

    let clientX: number | undefined;
    let clientY: number | undefined;

    if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if ('touches' in e && (e as React.TouchEvent).touches.length > 0) {
      clientX = (e as React.TouchEvent).touches[0].clientX;
      clientY = (e as React.TouchEvent).touches[0].clientY;
    }

    moveNoButton(clientX, clientY);
  };

  // Scale of YES button grows smoothly with each evasion
  const yesScale = Math.min(2.2, 1 + evasionCount * 0.14);

  // YES button text variations
  const getYesButtonText = () => {
    if (evasionCount === 0) return "YES! 💖";
    if (evasionCount <= 2) return "YES!! 💖🥰";
    if (evasionCount <= 4) return "YES OF COURSE!! 💖";
    if (evasionCount <= 7) return "YES A MILLION TIMES! 💍✨";
    return "YESSS! I LOVE YOU! 💘👑";
  };

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center p-4 select-none overflow-hidden"
    >
      {/* Proposal Card */}
      <div className="w-full max-w-lg rounded-3xl bg-white/95 p-6 sm:p-10 shadow-2xl backdrop-blur-md border border-rose-100 text-center transition-all z-20">
        {/* Mascot */}
        <div className="mb-4 flex justify-center">
          <div className="animate-float">
            <CuteMascot mood="pleading" className="w-32 h-32 sm:w-40 sm:h-40 drop-shadow-md" />
          </div>
        </div>

        {/* Big Text */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-pink-600 tracking-tight mb-3 font-heading leading-tight drop-shadow-sm">
          Will you be my girlfriend? 🥺❤️
        </h1>

        <p className="text-sm sm:text-base text-rose-500 font-medium max-w-sm mx-auto mb-6">
          You make my life a million times happier, sweeter, and more magical every single day.
        </p>

        {/* Funny Evading Message Toast */}
        <div className="min-h-12 flex items-center justify-center mb-6">
          {funnyMessage && (
            <div className="inline-block px-4 py-2 rounded-2xl bg-rose-100 text-rose-700 font-bold text-sm sm:text-base shadow-sm border border-rose-200 animate-wiggle">
              {funnyMessage}
            </div>
          )}
          {!funnyMessage && (
            <span className="text-xs text-rose-400 font-medium">
              Choose the only right answer... 😉
            </span>
          )}
        </div>

        {/* Interactive Buttons Container */}
        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-6 min-h-[140px]">
          {/* YES BUTTON */}
          <button
            onClick={() => {
              audio.playCelebrationFanfare();
              onYes();
            }}
            onMouseEnter={() => audio.playHover()}
            style={{
              transform: `scale(${yesScale})`,
              transition: 'transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            }}
            className="z-30 cursor-pointer rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 px-8 py-4 font-bold text-white shadow-xl hover:shadow-2xl hover:brightness-105 active:scale-95 animate-pulse-glow flex items-center gap-2"
          >
            <span className="text-xl sm:text-2xl animate-heartbeat">💖</span>
            <span className="text-lg sm:text-xl font-heading whitespace-nowrap">
              {getYesButtonText()}
            </span>
          </button>

          {/* INITIAL NO BUTTON (Shown before first evasion) */}
          {noPosition === null && (
            <button
              ref={noBtnRef}
              onMouseEnter={handleNoInteraction}
              onMouseMove={handleNoInteraction}
              onTouchStart={handleNoInteraction}
              onPointerDown={handleNoInteraction}
              onClick={handleNoInteraction}
              className="rounded-2xl border-2 border-slate-300 bg-slate-100 px-6 py-3 text-sm sm:text-base font-semibold text-slate-600 shadow-sm transition-transform active:scale-90"
            >
              No 🙈
            </button>
          )}
        </div>

        {/* Evasion Counter Pill */}
        {evasionCount > 0 && (
          <div className="mt-8 text-xs font-semibold text-rose-400">
            Number of times "No" escaped: <span className="font-bold text-rose-600">{evasionCount}</span>
          </div>
        )}
      </div>

      {/* FLOATING RUNAWAY NO BUTTON (After first evasion, teleported anywhere on screen) */}
      {noPosition !== null && (
        <button
          ref={noBtnRef}
          onMouseEnter={handleNoInteraction}
          onMouseMove={handleNoInteraction}
          onTouchStart={handleNoInteraction}
          onPointerDown={handleNoInteraction}
          onClick={handleNoInteraction}
          style={{
            position: 'fixed',
            left: `${noPosition.x}px`,
            top: `${noPosition.y}px`,
            transition: 'all 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)',
            zIndex: 9999,
          }}
          className="rounded-2xl border-2 border-rose-300 bg-white/95 px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-xl backdrop-blur-sm cursor-pointer select-none active:scale-90"
          tabIndex={-1}
        >
          No 🙈
        </button>
      )}
    </div>
  );
};
