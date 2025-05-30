import { Injectable } from "@angular/core";
import { NewTaskData } from "./task/task.model";

@Injectable({ providedIn: 'root'} )
export class TasksService {
    private completedTasks: ({ id: string; userId: string; title: string; summary: string; dueDate: string; })[] = [];
    private tasks = [
        {
            id: 't1',
            userId: 'u1',
            title: 'Master Angular',
            summary:
            'Learn all the basic and advanced features of Angular & how to apply them.',
            dueDate: '2025-12-31',
        },
        {
            id: 't2',
            userId: 'u3',
            title: 'Build first prototype',
            summary: 'Build a first prototype of the online shop website',
            dueDate: '2024-05-31',
        },
        {
            id: 't3',
            userId: 'u3',
            title: 'Prepare issue template',
            summary:
            'Prepare and describe an issue template which will help with project management',
            dueDate: '2024-06-15',
        },
    ];

    constructor() {
        const tasks = localStorage.getItem('tasks');
        const completedTasks = localStorage.getItem('completedTasks');
        if (tasks && completedTasks) {
            this.tasks = JSON.parse(tasks);
            this.completedTasks = JSON.parse(completedTasks);
        } else {
            this.saveTasks();
        }
    }

    getUserTasks(userId: string) {
        return this.tasks.filter(task => task.userId === userId);
    }

    getUserCompletedTasks(userId: string) {
        return this.completedTasks.filter(task => task.userId === userId);
    }

    addTask(taskData:NewTaskData, userId: string) {
        this.tasks.unshift({
            id: new Date().getTime().toString(),
            userId: userId,
            title: taskData.title,
            summary: taskData.summary,
            dueDate: taskData.dueDate,
        });
        this.saveTasks();
    }

    removeTask(id: string) {
        this.addTaskToCompleatedTasks(id);
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
    }

    private saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    addTaskToCompleatedTasks(taskId: string) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            this.completedTasks.push(task);
            console.log(this.completedTasks);
            console.log(task);
            localStorage.setItem('completedTasks', JSON.stringify(this.completedTasks));
        }
    }
}