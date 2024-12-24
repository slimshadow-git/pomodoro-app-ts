import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Settings: React.FC = () => {
  const { settings, updateSettings } = useStore();

  return (
    <div className="mt-8 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center mb-4">
        <SettingsIcon size={20} className="mr-2" />
        <h2 className="text-lg font-semibold">Settings</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Work Duration (minutes)
          </label>
          <input
            type="number"
            value={settings.workDuration / 60}
            onChange={(e) =>
              updateSettings({ workDuration: Number(e.target.value) * 60 })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Short Break Duration (minutes)
          </label>
          <input
            type="number"
            value={settings.shortBreakDuration / 60}
            onChange={(e) =>
              updateSettings({ shortBreakDuration: Number(e.target.value) * 60 })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Long Break Duration (minutes)
          </label>
          <input
            type="number"
            value={settings.longBreakDuration / 60}
            onChange={(e) =>
              updateSettings({ longBreakDuration: Number(e.target.value) * 60 })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Volume
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={settings.volume}
            onChange={(e) =>
              updateSettings({ volume: Number(e.target.value) })
            }
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Notification Sound
          </label>
          <select
            value={settings.selectedSound}
            onChange={(e) =>
              updateSettings({ selectedSound: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="bell">Bell</option>
            <option value="chime">Chime</option>
            <option value="notification">Notification</option>
          </select>
        </div>
      </div>
    </div>
  );
};