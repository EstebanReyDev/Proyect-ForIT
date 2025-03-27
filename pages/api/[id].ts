import { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data/task.json');

interface Task {
    id: number;
    taskText: string;
    completed: boolean;
}


const readTasks = async (): Promise<Task[]> => {
    try {
        const jsonData = await fs.readFile(dataFilePath, 'utf8');
        return JSON.parse(jsonData);
    } catch (error) {
        return [];
    }
};

const writeTasks = async (tasks: Task[]): Promise<void> => {
    const jsonData = JSON.stringify(tasks, null, 2);
    await fs.writeFile(dataFilePath, jsonData, 'utf8');

};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;

    if(req.url === "/api/tasks"){

        if (req.method === 'GET') {
            try {
                const tasks = await readTasks();
                res.status(200).json(tasks);
            } catch (error) {
                res.status(500).json({ error: 'Error en lectura.' });
            }
        } else if (req.method === 'POST') {
            try {
                const { taskText } = req.body;
                const tasks = await readTasks();
                const newId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
                const newTask: Task = { id: newId, taskText, completed: false };
                tasks.push(newTask);
                await writeTasks(tasks);
                res.status(201).json(newTask);
            } catch (error) {
                res.status(500).json({ error: 'Error en escritura.' });
            }
        }
    } else if (req.method === 'PUT') {
        try {
            const { taskText, completed } = req.body;
            const tasks = await readTasks();
            const taskIndex = tasks.findIndex((task) => task.id === Number(id));
            if (taskIndex === -1) {
                res.status(404).json({ error: 'Tarea no encontrada.' });
            } else {
                tasks[taskIndex] = { ...tasks[taskIndex], taskText, completed };
                res.status(200).json(tasks[taskIndex]);
                await writeTasks(tasks);
            }
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar la tarea.' });
        }
    } else if (req.method === 'DELETE') {
        try {
            console.log("Received ID:", id);
            const tasks = await readTasks();
            const taskIndex = tasks.findIndex((task) => task.id === Number(id));
            if (taskIndex === -1) {
                res.status(404).json({ error: 'Tarea no encontrada.' });
            } else {
                tasks.splice(taskIndex, 1);
                await writeTasks(tasks);
                res.status(200).json({ message: 'Tarea eliminada correctamente.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar la tarea.' });
        }
    }

}