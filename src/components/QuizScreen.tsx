import React, { useState } from 'react';
import { CuteMascot } from './CuteMascot';
import { audio } from '../utils/sound';

interface QuizScreenProps {
  onComplete: () => void;
}

interface Question {
  id: number;
  question: string;
  subtitle: string;
  options: { label: string; text: string; reaction: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "When did you first steal my heart?",
    subtitle: "Think carefully... or maybe don't! 😉",
    options: [
      {
        label: "A",
        text: "The very first second I saw your smile 😊",
        reaction: "Bingo! That smile stopped time completely! ⏳✨",
      },
      {
        label: "B",
        text: "The moment we had our first real conversation 💬",
        reaction: "Yes! I could listen to you talk forever. 🎧❤️",
      },
      {
        label: "C",
        text: "Trick question: you've always had it, even before we met ✨",
        reaction: "Awww, soulmates confirmed! 100% correct! 💫",
      },
    ],
  },
  {
    id: 2,
    question: "What's your true superpower?",
    subtitle: "Marvel wishes they had this hero 🦸‍♀️",
    options: [
      {
        label: "A",
        text: "Making me smile even on my worst days ☀️",
        reaction: "Instant sunshine therapy, guaranteed! 🌻",
      },
      {
        label: "B",
        text: "Being effortlessly adorable 24/7 🌸",
        reaction: "Honestly, how are you this cute?! 🥰",
      },
      {
        label: "C",
        text: "All of the above (and literally everything else) 💖",
        reaction: "Accurate! You’re totally out of this world! 🚀🌟",
      },
    ],
  },
  {
    id: 3,
    question: "Who is the most beautiful girl in the world?",
    subtitle: "A scientific inquiry with zero debate 🔬",
    options: [
      {
        label: "A",
        text: "You 🥰",
        reaction: "Without a single doubt in the universe! 🌍",
      },
      {
        label: "B",
        text: "You, obviously 👑",
        reaction: "The crown belongs to you, queen! 👑✨",
      },
      {
        label: "C",
        text: "Definitely You, 10,000% 🌟",
        reaction: "Fact check: Universally agreed! 💖",
      },
    ],
  },
  {
    id: 4,
    question: "What makes my day instantly 10x better?",
    subtitle: "The cure for literally anything 💊",
    options: [
      {
        label: "A",
        text: "Seeing your random cute text pop up 📱",
        reaction: "My phone lights up and my heart skips a beat! 💓",
      },
      {
        label: "B",
        text: "Hearing the sweet sound of your voice 🎶",
        reaction: "Better than any song on repeat! 🎵",
      },
      {
        label: "C",
        text: "Seeing your gorgeous smile and sparkling eyes ✨",
        reaction: "Gets me every single time! 🫠",
      },
    ],
  },
  {
    id: 5,
    question: "Are you ready for the final question? 🥺",
    subtitle: "Take a deep breath... no turning back now!",
    options: [
      {
        label: "A",
        text: "Yes, I was born ready! 🚀",
        reaction: "That's the spirit! Here it comes! 💓",
      },
      {
        label: "B",
        text: "My heart is fluttering so fast! 💓",
        reaction: "Mine too! Let's do this! 🥰",
      },
      {
        label: "C",
        text: "Ask me already, you cutie! 💖",
        reaction: "Okay, holding my breath... 💌",
      },
    ],
  },
];

export const QuizScreen: React.FC<QuizScreenProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const currentQ = QUESTIONS[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return; // Prevent double taps during animation
    setSelectedOption(idx);
    setFeedback(currentQ.options[idx].reaction);
    audio.playPop();
    audio.playSuccessChime();

    setTimeout(() => {
      if (currentIndex < QUESTIONS.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
        setFeedback(null);
      } else {
        onComplete();
      }
    }, 1100);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
      {/* Quiz Card */}
      <div className="w-full max-w-lg rounded-3xl bg-white/95 p-6 sm:p-8 shadow-2xl backdrop-blur-md border border-rose-100 transition-all">
        {/* Heart Progress Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-1.5">
            {QUESTIONS.map((q, idx) => (
              <span
                key={q.id}
                className={`text-lg sm:text-xl transition-all duration-300 ${
                  idx <= currentIndex ? 'scale-110 opacity-100' : 'opacity-30 grayscale'
                }`}
              >
                ❤️
              </span>
            ))}
          </div>
          <span className="text-xs font-bold text-rose-400 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
            Question {currentIndex + 1} of 5
          </span>
        </div>

        {/* Mascot Mascot illustration */}
        <div className="flex justify-center -mt-2 mb-3">
          <CuteMascot
            mood={currentIndex === 4 ? 'pleading' : selectedOption !== null ? 'celebrating' : 'curious'}
            className="w-24 h-24 sm:w-28 sm:h-28"
          />
        </div>

        {/* Question Heading */}
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight font-heading">
            {currentQ.question}
          </h2>
          <p className="text-xs sm:text-sm text-rose-500 font-medium mt-1">
            {currentQ.subtitle}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isChosen = selectedOption === idx;
            return (
              <button
                key={opt.label}
                onClick={() => handleSelectOption(idx)}
                onMouseEnter={() => audio.playHover()}
                disabled={selectedOption !== null}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-3.5 group ${
                  isChosen
                    ? 'border-rose-500 bg-rose-50 shadow-md scale-[1.02]'
                    : 'border-rose-100 bg-white hover:border-rose-300 hover:bg-rose-50/50 shadow-sm active:scale-95'
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-bold text-sm transition-colors ${
                    isChosen
                      ? 'bg-rose-500 text-white'
                      : 'bg-rose-100 text-rose-600 group-hover:bg-rose-200'
                  }`}
                >
                  {isChosen ? '✓' : opt.label}
                </span>
                <span className="text-sm sm:text-base font-medium text-slate-700 leading-snug">
                  {opt.text}
                </span>
              </button>
            );
          })}
        </div>

        {/* Instant feedback reaction */}
        <div className="min-h-10 mt-5 flex items-center justify-center">
          {feedback ? (
            <div className="text-center text-xs sm:text-sm font-semibold text-rose-600 bg-rose-100/80 px-4 py-2 rounded-xl animate-wiggle">
              {feedback}
            </div>
          ) : (
            <span className="text-xs text-rose-400 italic">
              Tap the option that feels most true! 💖
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
