import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, GripVertical } from 'lucide-react';
import { Task as TaskType } from '../types';
import { useStore } from '../store/useStore';
import clsx from 'clsx';

interface TaskProps {
  task: TaskType;
}

export const Task: React.FC<TaskProps> = ({ task }) => {
  const { toggleTask, deleteTask } = useStore();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        'flex items-center p-3 bg-white rounded-lg shadow-sm',
        'border border-gray-200 hover:border-indigo-300 transition-colors'
      )}
    >
      <button
        className="mr-3 cursor-grab touch-none"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={20} className="text-gray-400" />
      </button>
      
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        className="mr-3 h-4 w-4 rounded border-gray-300 text-indigo-600"
      />
      
      <span className={clsx(
        'flex-1',
        task.completed && 'line-through text-gray-400'
      )}>
        {task.title}
      </span>
      
      <span className="mx-2 px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
        {task.category}
      </span>
      
      <button
        onClick={() => deleteTask(task.id)}
        className="ml-2 text-gray-400 hover:text-red-500"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};