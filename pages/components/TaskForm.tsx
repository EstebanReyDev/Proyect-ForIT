import React, { useState } from 'react';

interface TaskFormProps {
  addTask: (text: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (taskText.trim()) {
      addTask(taskText);
      setTaskText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        className="flex-1 p-2 border rounded text-black"
        placeholder="Nueva tarea..."
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Agregar Tarea
      </button>
    </form>
  );
};

export default TaskForm;