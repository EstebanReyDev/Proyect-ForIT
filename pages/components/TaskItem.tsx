import React, { useState } from 'react';

interface TaskItemProps {
  id: number;
  taskText: string;
  completed: boolean;
  toggleTaskCompletion: (id: number) => void;
  removeTask: (id: number) => void;
  updateTask: (id: number, newTaskText: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  taskText,
  completed,
  toggleTaskCompletion,
  removeTask,
  updateTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskText, setEditTaskText] = useState<string>(taskText);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTaskText(taskText);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditTaskText(e.target.value);
  };
  return (
    <li className="flex items-center justify-between p-2 border-b">
      {isEditing ? (
        <textarea
          value={editTaskText}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      ) : (
        <span
          onClick={() => toggleTaskCompletion(id)}
          className={`flex-1 cursor-pointer text-black ${
            completed ? 'line-through text-gray-500' : ''
          }`}
        >
          {taskText}
        </span>
      )}
      <div className="flex">
        {isEditing ? (
          <>
            <button onClick={() => { updateTask(id, editTaskText); setIsEditing(false); }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">Guardar</button>
            <button onClick={handleCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancelar</button>
          </>
        ) : (
          <button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Editar</button>
        )}
        <button onClick={() => removeTask(id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Borrar</button>
      </div>
    </li>
  );
};

export default TaskItem;