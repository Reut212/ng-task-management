import { Component, inject, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { Task } from './task.model';
import { CardComponent } from "../../shared/card/card.component";
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task',
  imports: [CardComponent, DatePipe, CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input({required: true}) task!: Task;
  @Input({required: true}) buttonVisiblity!: boolean;
  
  private tasksService = inject(TasksService)

  onCompleteTask() {
    console.log(this.buttonVisiblity);
    this.tasksService.removeTask(this.task.id);
  }
}
