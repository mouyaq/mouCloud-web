import { SessionService } from './session.service';
import { Task } from './../model/task.model';
import { Injectable } from '@angular/core';

@Injectable()
export class TaskService {

  private task: Task;
  private tasks: Array<Task> = [];

  constructor(private sessionService: SessionService) { }

  addTask(task: Task): void {
    this.task = new Task();
    this.task.text = task.text;
    this.task.timestamp = task.timestamp;
    this.task.username = this.sessionService.getUser().username;
    this.tasks.unshift(this.task);
  }

  getTasks(): Array<Task> {
    return this.tasks;
  }

  log(task: Task): string {
    return task.text;
  }

}
