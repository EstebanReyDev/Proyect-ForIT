import React from 'react';
import TaskItem from './TaskItem';

interface Task {
    id: number;
    taskText: string;
    completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  toggleTaskCompletion: (id: number) => void;
  removeTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  toggleTaskCompletion,
  removeTask,
}) => {
  return (
    <ul className="w-full text-black">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          taskText={task.taskText}
          completed={task.completed}
          toggleTaskCompletion={toggleTaskCompletion}
          removeTask={removeTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;