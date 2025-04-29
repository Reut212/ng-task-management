import { Component, Input } from '@angular/core';
import { TaskComponent } from "./task/task.component";
import { NewTaskComponent } from './new-task/new-task.component';
import { TasksService } from './tasks.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  imports: [TaskComponent, NewTaskComponent, CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  @Input({ required: true }) userID!: string
  @Input({ required: true }) name!: string;
  isAddingTask:boolean = false;
  watchCompletedTasks:boolean = false;

  constructor(private tasksService: TasksService) {}


  get selectedUserTasks() {
    return this.tasksService.getUserTasks(this.userID);
  }

  get selectedUserCompletedTasks() {
    return this.tasksService.getUserCompletedTasks(this.userID);
  }

  onStartSTask() {
    this.isAddingTask = true;
  }

  onCloseAddTask() {
    this.isAddingTask = false;
  }

  showCompleatedTasks() {
    this.watchCompletedTasks = true;
  }

  backToUserTasks() {
    this.watchCompletedTasks = false;
  }
}
