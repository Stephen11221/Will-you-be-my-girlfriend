// Zero-dependency romantic Web Audio API synthesizer
// Clean, reliable, and runs 100% offline without external mp3 files

class AudioManager {
  private ctx: AudioContext | null = null;
  private musicInterval: number | null = null;
  private isMuted: boolean = false;
  private isPlayingMusic: boolean = false;
  private musicStep: number = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Sweet chime on hover
  playHover() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(1174.66, this.ctx.currentTime + 0.08); // D6

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {
      // Audio context might be restricted before user gesture
    }
  }

  // Cute bubble pop sound on click
  playPop() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(820, this.ctx.currentTime + 0.07);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {
      // Ignore audio restriction
    }
  }

  // Sweet correct chime
  playSuccessChime() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.08, this.ctx!.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + idx * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(this.ctx!.currentTime + idx * 0.08);
        osc.stop(this.ctx!.currentTime + idx * 0.08 + 0.4);
      });
    } catch {
      // ignore
    }
  }

  // Joyful romantic celebration fanfare
  playCelebrationFanfare() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const melody = [
        { f: 523.25, d: 0.15 }, // C5
        { f: 659.25, d: 0.15 }, // E5
        { f: 783.99, d: 0.15 }, // G5
        { f: 1046.5, d: 0.4 },  // C6
        { f: 880.0, d: 0.2 },   // A5
        { f: 1046.5, d: 0.6 },  // C6
      ];

      let time = this.ctx.currentTime;
      melody.forEach(item => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.f, time);

        gain.gain.setValueAtTime(0.12, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + item.d);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(time);
        osc.stop(time + item.d + 0.05);

        time += item.d * 0.85;
      });
    } catch {
      // ignore
    }
  }

  // Gentle, romantic music-box arpeggio loop
  startRomanticMusic() {
    this.initContext();
    this.isPlayingMusic = true;
    if (this.musicInterval) return;

    // A dreamy chord progression in C major / F major:
    // Fmaj7 -> G6 -> Em7 -> Am7
    const chords = [
      [349.23, 440.0, 523.25, 659.25], // F4, A4, C5, E5 (Fmaj7)
      [392.00, 493.88, 587.33, 659.25], // G4, B4, D5, E5 (G6)
      [329.63, 392.00, 493.88, 587.33], // E4, G4, B4, D5 (Em7)
      [440.00, 523.25, 659.25, 783.99], // A4, C5, E5, G5 (Am7)
    ];

    this.musicInterval = window.setInterval(() => {
      if (!this.isPlayingMusic || this.isMuted || !this.ctx) return;
      if (this.ctx.state === 'suspended') return;

      const chordIndex = Math.floor(this.musicStep / 4) % chords.length;
      const noteIndex = this.musicStep % 4;
      const freq = chords[chordIndex][noteIndex];

      // Soft music box bell note
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.035, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.5);

      this.musicStep++;
    }, 280);
  }

  stopRomanticMusic() {
    this.isPlayingMusic = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  getMuted() {
    return this.isMuted;
  }
}

export const audio = new AudioManager();
