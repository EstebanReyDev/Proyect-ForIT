import { useState } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState("");

  // Agregar una nueva tarea
  const addTask = () => {
    if (!taskText.trim()) return; //Test ingreso de texto 
    setTasks([...tasks, { id: Date.now(), text: taskText, completed: false }]);
    setTaskText("");
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };


  // Marcar tarea como completada
  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Eliminar tarea
  const removeTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl text-black font-bold mb-4">To-Do List</h1>

      {/* Input para agregar nuevas tareas */}
      <div className="text-black flex gap-2 mb-4">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 p-2 border rounded"
          placeholder="Nueva tarea..."
        />
        <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Agregar Tarea
        </button>
      </div>

      {/* Lista de tareas */}
      <ul>
        {tasks.map(task => (
          <li key={task.id} className=" flex items-center text-black  justify-between p-2 border-b">
            <span
              onClick={() => toggleTaskCompletion(task.id)}
              className={`flex-1 cursor-pointer ${task.completed ? "line-through  text-gray-500" : ""}`}
            >
              {task.text}
            </span>
            <button onClick={() => removeTask(task.id)} className="text-red-500 hover:text-red-700">
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
