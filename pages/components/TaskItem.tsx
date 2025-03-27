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
          <button onClick={() => { updateTask(id, editTaskText); setIsEditing(false); }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 p-0"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg></button>
          <button onClick={handleCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded p-0 mr-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg></button>
        </>
      ) : (
        <button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 p-0"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg></button>
      )}
      <button onClick={() => removeTask(id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded p-0"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg></button>
      </div>
    </li>
  );
};

export default TaskItem;