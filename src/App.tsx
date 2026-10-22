import { useState, useEffect } from 'react';
import { EnvelopeScreen } from './components/EnvelopeScreen';
import { QuizScreen } from './components/QuizScreen';
import { ProposalScreen } from './components/ProposalScreen';
import { CelebrationScreen } from './components/CelebrationScreen';
import { ConfettiCanvas } from './components/ConfettiCanvas';
import { audio } from './utils/sound';
import { generateSingleFileHtml } from './utils/exportSingleFile';

type ScreenStep = 'envelope' | 'quiz' | 'proposal' | 'celebration';

export default function App() {
  const [currentStep, setCurrentStep] = useState<ScreenStep>('envelope');
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Sync muted state
    setIsMuted(audio.getMuted());
  }, []);

  const handleToggleMute = () => {
    const muted = audio.toggleMute();
    setIsMuted(muted);
  };

  const handleDownloadSingleFile = () => {
    audio.playPop();
    const htmlContent = generateSingleFileHtml();
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'will_you_be_my_girlfriend.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-rose-50 via-pink-100 to-rose-100 text-slate-800 flex flex-col justify-between overflow-x-hidden">
      {/* Background Hearts & Confetti Canvas */}
      <ConfettiCanvas
        active={true}
        intensity={currentStep === 'celebration' ? 'celebration' : 'subtle'}
      />

      {/* Top Floating Controls Bar */}
      <header className="fixed top-4 right-4 z-50 flex items-center gap-2">
        {/* Standalone File Export button */}
        <button
          onClick={handleDownloadSingleFile}
          onMouseEnter={() => audio.playHover()}
          title="Download standalone single-file proposal"
          className="flex h-10 items-center gap-1.5 rounded-full border border-rose-200/80 bg-white/90 px-3.5 text-xs font-semibold text-rose-600 shadow-sm backdrop-blur-md hover:bg-rose-50 active:scale-95 transition-all cursor-pointer"
        >
          <span>📥</span>
          <span className="hidden sm:inline">Single-File .html</span>
        </button>

        {/* Music Sound Toggle */}
        <button
          onClick={handleToggleMute}
          onMouseEnter={() => audio.playHover()}
          aria-label={isMuted ? 'Unmute romantic music' : 'Mute music'}
          title={isMuted ? 'Unmute music' : 'Mute music'}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-rose-200/80 bg-white/90 text-lg shadow-sm backdrop-blur-md hover:bg-rose-50 active:scale-95 transition-all cursor-pointer"
        >
          {isMuted ? '🔇' : '🎵'}
        </button>
      </header>

      {/* Main Dynamic Screen */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center">
        {currentStep === 'envelope' && (
          <EnvelopeScreen onOpen={() => setCurrentStep('quiz')} />
        )}

        {currentStep === 'quiz' && (
          <QuizScreen onComplete={() => setCurrentStep('proposal')} />
        )}

        {currentStep === 'proposal' && (
          <ProposalScreen onYes={() => setCurrentStep('celebration')} />
        )}

        {currentStep === 'celebration' && (
          <CelebrationScreen
            onRestart={() => setCurrentStep('envelope')}
            onDownloadSingleFile={handleDownloadSingleFile}
          />
        )}
      </main>

      {/* Sweet Footer Note */}
      <footer className="relative z-20 py-3 text-center text-[11px] sm:text-xs text-rose-400 font-medium tracking-wide">
        Made with ❤️ for the most special girl in the world
      </footer>
    </div>
  );
}
