import React, { useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatTime } from '../utils/time';
import { playSound } from '../utils/audio';
import { TimerMode } from '../types';

export const Timer: React.FC = () => {
  const {
    timerMode,
    isRunning,
    timeLeft,
    settings,
    setTimeLeft,
    setIsRunning,
    setTimerMode,
    updateSettings,
  } = useStore();

  const handleTimerComplete = useCallback(() => {
    if (!settings.isMuted) {
      playSound('complete', settings.volume);
    }
    
    let nextMode: TimerMode;
    if (timerMode === 'work') {
      nextMode = 'shortBreak';
    } else if (timerMode === 'shortBreak') {
      nextMode = 'work';
    } else {
      nextMode = 'work';
    }
    
    setTimerMode(nextMode);
    setTimeLeft(settings[`${nextMode}Duration`]);
  }, [timerMode, settings]);

  useEffect(() => {
    let interval: number;
    
    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, handleTimerComplete]);

  const progress = 1 - timeLeft / settings[`${timerMode}Duration`];

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative w-64 h-64">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            className="stroke-gray-200"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="128"
            cy="128"
            r="120"
            className="stroke-indigo-600"
            strokeWidth="8"
            fill="none"
            strokeDasharray={2 * Math.PI * 120}
            strokeDashoffset={2 * Math.PI * 120 * (1 - progress)}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold">{formatTime(timeLeft)}</span>
          <span className="text-lg font-medium capitalize">{timerMode}</span>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
        >
          {isRunning ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(settings[`${timerMode}Duration`]);
          }}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <RotateCcw size={24} />
        </button>
        <button
          onClick={() => updateSettings({ isMuted: !settings.isMuted })}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          {settings.isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      </div>
    </div>
  );
};