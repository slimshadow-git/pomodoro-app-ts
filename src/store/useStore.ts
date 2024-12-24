import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, TimerMode, TimerSettings } from '../types';

interface State {
  tasks: Task[];
  timerMode: TimerMode;
  isRunning: boolean;
  timeLeft: number;
  settings: TimerSettings;
  addTask: (title: string, category: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  reorderTasks: (tasks: Task[]) => void;
  setTimerMode: (mode: TimerMode) => void;
  setIsRunning: (isRunning: boolean) => void;
  setTimeLeft: (timeLeft: number) => void;
  updateSettings: (settings: Partial<TimerSettings>) => void;
}

const defaultSettings: TimerSettings = {
  workDuration: 25 * 60,
  shortBreakDuration: 5 * 60,
  longBreakDuration: 15 * 60,
  volume: 0.7,
  isMuted: false,
  selectedSound: 'bell',
};

export const useStore = create<State>()(
  persist(
    (set) => ({
      tasks: [],
      timerMode: 'work',
      isRunning: false,
      timeLeft: defaultSettings.workDuration,
      settings: defaultSettings,

      addTask: (title, category) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: crypto.randomUUID(),
              title,
              completed: false,
              category,
              createdAt: Date.now(),
            },
          ],
        })),

      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      reorderTasks: (tasks) => set({ tasks }),

      setTimerMode: (timerMode) => set({ timerMode }),
      setIsRunning: (isRunning) => set({ isRunning }),
      setTimeLeft: (timeLeft) => set({ timeLeft }),
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
    }),
    {
      name: 'pomodoro-storage',
    }
  )
);