import { useState, useEffect } from "react";
import { BackgroundLines } from "@/pages/components/ui/background-lines";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}
const baseUrl = "/api/tasks";

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = async (text: string) => {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, completed: false }),
    });
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
  };

  const toggleTaskCompletion = async (taskId: number) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (!taskToUpdate) return;

    const response = await fetch(`${baseUrl}/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...taskToUpdate,
        completed: !taskToUpdate.completed,
      }),
    });
    const updatedTask = await response.json();
    setTasks(
      tasks.map((task) => (task.id === taskId ? updatedTask : task))
    );
  };

  const removeTask = async (taskId: number) => {
    await fetch(`${baseUrl}/${taskId}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <BackgroundLines className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      <div className="container mx-auto max-w-md mt-10 p-6 bg-white shadow-lg rounded-lg relative z-10">
        <h1 className="text-2xl font-bold mb-4 text-black">Lista de Tareas</h1>
        <div className="text-black">
          <TaskForm addTask={addTask} />
        </div>
        <div className="text-black">
          <TaskList
            tasks={tasks}
            toggleTaskCompletion={toggleTaskCompletion}
            removeTask={removeTask}
          />
        </div>
      </div>
    </BackgroundLines>
  );
}