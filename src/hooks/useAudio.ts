import { useRef, useCallback } from 'react';

interface AudioEngine {
  playHover: () => void;
  playClick: () => void;
  playAlert: () => void;
  initContext: () => void;
  isMuted: boolean;
  toggleMute: () => void;
}

let audioContext: AudioContext | null = null;
let _isMuted = localStorage.getItem('agri-muted') === 'true';

function getContext(): AudioContext | null {
  if (_isMuted) return null;
  return audioContext;
}

function playTone(frequency: number, duration: number, gain: number = 0.03, type: OscillatorType = 'sine') {
  const ctx = getContext();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gainNode.gain.setValueAtTime(gain, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Audio errors are non-critical
  }
}

export default function useAudio(): AudioEngine {
  const muted = useRef(_isMuted);

  const initContext = useCallback(() => {
    if (!audioContext) {
      audioContext = new AudioContext();
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
  }, []);

  const playHover = useCallback(() => {
    playTone(440, 0.03, 0.02);
  }, []);

  const playClick = useCallback(() => {
    playTone(880, 0.025, 0.03);
    setTimeout(() => playTone(660, 0.025, 0.02), 30);
  }, []);

  const playAlert = useCallback(() => {
    playTone(523, 0.1, 0.03); // C5
    setTimeout(() => playTone(659, 0.1, 0.03), 100); // E5
    setTimeout(() => playTone(784, 0.15, 0.03), 200); // G5
  }, []);

  const toggleMute = useCallback(() => {
    _isMuted = !_isMuted;
    muted.current = _isMuted;
    localStorage.setItem('agri-muted', String(_isMuted));
  }, []);

  return {
    playHover,
    playClick,
    playAlert,
    initContext,
    isMuted: muted.current,
    toggleMute,
  };
}
