import React from 'react';
import { Timer } from './components/Timer';
import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList';
import { Settings } from './components/Settings';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Pomodoro Timer
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <Timer />
            </div>
            <Settings />
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Tasks</h2>
              <TaskInput />
              <TaskList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;