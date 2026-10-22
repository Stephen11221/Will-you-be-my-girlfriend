import React, { useState } from 'react';
import { CuteMascot } from './CuteMascot';
import { audio } from '../utils/sound';

interface CelebrationScreenProps {
  onRestart: () => void;
  onDownloadSingleFile?: () => void;
}

export const CelebrationScreen: React.FC<CelebrationScreenProps> = ({
  onRestart,
  onDownloadSingleFile,
}) => {
  const [partnerName, setPartnerName] = useState('My Beautiful Girlfriend');
  const [isEditingName, setIsEditingName] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  const todayDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleScreenshotAction = async () => {
    audio.playPop();

    const shareText = `I said YES to being your girlfriend! 🥺❤️ Officially official as of ${todayDate}! Sending you the biggest hug & screenshot right now! 😘💍`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'She Said YES! 💖',
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to copy or screenshot reminder
      }
    }

    // Fallback: Copy loving text to clipboard
    try {
      await navigator.clipboard.writeText(shareText);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 3000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4 text-center z-20">
      {/* Celebration Main Card */}
      <div className="w-full max-w-xl rounded-3xl bg-white/95 p-6 sm:p-10 shadow-2xl backdrop-blur-md border border-rose-100 relative overflow-hidden animate-scale-up">
        {/* Confetti Ribbon Banner */}
        <div className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-5 py-2 text-rose-600 font-bold text-sm sm:text-base mb-3 shadow-inner">
          <span className="animate-spin">✨</span>
          <span>BEST DAY EVER</span>
          <span className="animate-spin">✨</span>
        </div>

        {/* Celebrating Mascot */}
        <div className="flex justify-center mb-2">
          <div className="animate-bounce">
            <CuteMascot mood="celebrating" className="w-32 h-32 sm:w-40 sm:h-40 drop-shadow-lg" />
          </div>
        </div>

        {/* She said YES text */}
        <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-600 to-rose-500 font-heading tracking-tight drop-shadow-sm mb-3">
          She said YES!!! 🎉💖
        </h1>

        {/* Primary Sweet Message */}
        <p className="text-base sm:text-xl font-bold text-slate-800 leading-snug mb-6 max-w-md mx-auto">
          "I knew you'd say yes! I love you! ❤️ You are officially my girlfriend now!"
        </p>

        {/* Official Girlfriend Certificate Card */}
        <div className="relative rounded-2xl bg-gradient-to-b from-rose-50 to-pink-50/60 p-5 sm:p-6 border-2 border-dashed border-rose-300 text-left mb-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-rose-200/80 pb-3 mb-3">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-rose-400">
                Official Declaration
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-rose-700 font-heading">
                Certificate of True Love 📜💖
              </h2>
            </div>
            <span className="text-2xl sm:text-3xl">💍</span>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-slate-700">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-rose-500 font-medium shrink-0">Girlfriend:</span>
              {isEditingName ? (
                <input
                  type="text"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  onBlur={() => setIsEditingName(false)}
                  onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                  autoFocus
                  className="rounded-lg border border-rose-300 bg-white px-2 py-0.5 text-xs sm:text-sm font-semibold text-rose-700 outline-none w-full max-w-[200px]"
                />
              ) : (
                <button
                  onClick={() => setIsEditingName(true)}
                  className="font-bold text-rose-800 underline decoration-rose-300 underline-offset-4 hover:text-rose-600 flex items-center gap-1 text-right"
                  title="Click to personalize name"
                >
                  <span>{partnerName}</span>
                  <span className="text-xs text-rose-400">✏️</span>
                </button>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-rose-500 font-medium">Official Date:</span>
              <span className="font-semibold text-slate-800">{todayDate}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-rose-500 font-medium">Terms of Agreement:</span>
              <span className="font-semibold text-slate-800 text-right">
                Unlimited kisses, late-night talks & sweet hugs
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-rose-500 font-medium">Status:</span>
              <span className="inline-flex items-center gap-1 font-bold text-rose-600 bg-rose-200/60 px-2 py-0.5 rounded-full text-xs">
                <span>❤️</span> Officially Taken
              </span>
            </div>
          </div>

          {/* Certificate Seal Stamp */}
          <div className="mt-4 pt-3 border-t border-rose-200/80 flex items-center justify-between">
            <p className="font-handwriting text-lg sm:text-xl text-rose-600 font-bold">
              Forever & always yours ❤️
            </p>
            <div className="rounded-full border-2 border-rose-400 bg-white px-3 py-1 text-[11px] font-bold text-rose-600 shadow-xs uppercase tracking-wider rotate-[-6deg]">
              ★ 100% Verified ★
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* Send me a screenshot button */}
          <button
            onClick={handleScreenshotAction}
            onMouseEnter={() => audio.playHover()}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 font-bold text-white shadow-lg hover:shadow-xl hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="text-lg">📸</span>
            <span>Send me a screenshot 😘</span>
          </button>

          {/* Replay button */}
          <button
            onClick={() => {
              audio.playPop();
              onRestart();
            }}
            onMouseEnter={() => audio.playHover()}
            className="w-full sm:w-auto px-5 py-3.5 rounded-2xl border-2 border-rose-200 bg-white font-semibold text-rose-600 hover:bg-rose-50 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>🔄</span>
            <span>Replay Story</span>
          </button>
        </div>

        {/* Notification Toast */}
        {copiedNotification && (
          <div className="mt-4 inline-block px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold animate-fade-in shadow-md">
            Screenshot text copied to clipboard! Ready to paste & send! 💌
          </div>
        )}

        {/* Standalone Single File Download option */}
        {onDownloadSingleFile && (
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center">
            <button
              onClick={onDownloadSingleFile}
              onMouseEnter={() => audio.playHover()}
              className="text-xs text-rose-500 hover:text-rose-700 font-semibold underline underline-offset-4 flex items-center gap-1.5 cursor-pointer"
            >
              <span>📥</span>
              <span>Download Standalone Proposal File (Single-File .html)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
