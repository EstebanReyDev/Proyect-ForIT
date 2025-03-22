import React from 'react';

interface TaskItemProps {
  id: number;
  text: string;
  completed: boolean;
  toggleTaskCompletion: (id: number) => void;
  removeTask: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  text,
  completed,
  toggleTaskCompletion,
  removeTask,
}) => {
  return (
    <li className="flex items-center justify-between p-2 border-b">
      <span
        onClick={() => toggleTaskCompletion(id)}
        className={`flex-1 cursor-pointer text-black ${
          completed ? 'line-through text-gray-500' : ''
        }`}
      >
        {text}
      </span>
      <button
        onClick={() => removeTask(id)}
        className="text-red-500 hover:text-red-700"
      >
        ✖
      </button>
    </li>
  );
};

export default TaskItem;