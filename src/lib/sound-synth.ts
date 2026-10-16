/**
 * Ambient Ocean Wave Sound Generator using Web Audio API
 * Generates an organic, looping pink-noise ocean wave swell without requiring external audio files.
 * Also provides fallback and volume control.
 */

class OceanWaveSynth {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private masterGain: GainNode | null = null;
  private noiseSource: AudioBufferSourceNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private lfoOscillator: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;
  private volume: number = 0.5;
  private isMuted: boolean = false;

  public isSupported(): boolean {
    if (typeof window === "undefined") return false;
    return typeof (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext) !== "undefined";
  }

  private initContext(): boolean {
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      return true;
    } catch {
      return false;
    }
  }

  public async start(): Promise<boolean> {
    if (!this.initContext() || !this.ctx) return false;

    if (this.isRunning) return true;

    try {
      // Create master gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume * 0.4, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Create a 6-second stereo pink/brown noise buffer
      const bufferSize = this.ctx.sampleRate * 6;
      const noiseBuffer = this.ctx.createBuffer(2, bufferSize, this.ctx.sampleRate);
      
      for (let channel = 0; channel < 2; channel++) {
        const output = noiseBuffer.getChannelData(channel);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          // Pink noise filter approximation
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.1;
          b6 = white * 0.115926;
        }
      }

      // Loop source
      this.noiseSource = this.ctx.createBufferSource();
      this.noiseSource.buffer = noiseBuffer;
      this.noiseSource.loop = true;

      // Filter: Lowpass that opens and closes like a natural ocean swell
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = "lowpass";
      this.filterNode.frequency.setValueAtTime(320, this.ctx.currentTime);
      this.filterNode.Q.setValueAtTime(1.2, this.ctx.currentTime);

      // LFO for wave cycle: ~0.12 Hz (approx 8.3 second wave period)
      this.lfoOscillator = this.ctx.createOscillator();
      this.lfoOscillator.type = "sine";
      this.lfoOscillator.frequency.setValueAtTime(0.12, this.ctx.currentTime);

      this.lfoGain = this.ctx.createGain();
      // Swell filter frequency between ~180Hz and ~550Hz
      this.lfoGain.gain.setValueAtTime(180, this.ctx.currentTime);

      this.lfoOscillator.connect(this.lfoGain);
      this.lfoGain.connect(this.filterNode.frequency);

      // Chain audio graph
      this.noiseSource.connect(this.filterNode);
      this.filterNode.connect(this.masterGain);

      // Smooth fade in
      const now = this.ctx.currentTime;
      this.masterGain.gain.setValueAtTime(0.001, now);
      this.masterGain.gain.exponentialRampToValueAtTime(
        this.isMuted ? 0.001 : Math.max(0.01, this.volume * 0.35),
        now + 1.5
      );

      this.lfoOscillator.start();
      this.noiseSource.start();
      this.isRunning = true;
      return true;
    } catch {
      this.isRunning = false;
      return false;
    }
  }

  public stop(): void {
    if (!this.isRunning || !this.ctx) return;

    try {
      if (this.masterGain) {
        const now = this.ctx.currentTime;
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
      }

      setTimeout(() => {
        try {
          this.noiseSource?.stop();
          this.noiseSource?.disconnect();
          this.lfoOscillator?.stop();
          this.lfoOscillator?.disconnect();
          this.filterNode?.disconnect();
          this.masterGain?.disconnect();
        } catch {
          // ignore cleanup errors
        }
        this.noiseSource = null;
        this.lfoOscillator = null;
        this.filterNode = null;
        this.masterGain = null;
        this.isRunning = false;
      }, 700);
    } catch {
      this.isRunning = false;
    }
  }

  public setVolume(val: number): void {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx && !this.isMuted) {
      const targetGain = Math.max(0.001, this.volume * 0.35);
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.08);
    }
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      const targetGain = muted ? 0.0001 : Math.max(0.001, this.volume * 0.35);
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.05);
    }
  }

  public getIsPlaying(): boolean {
    return this.isRunning;
  }
}

export const oceanSynth = new OceanWaveSynth();
