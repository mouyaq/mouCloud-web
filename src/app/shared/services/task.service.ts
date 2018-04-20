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
    this.task.id = task.id;
    this.task.text = task.text;
    this.task.timestamp = task.timestamp;
    this.task.username = this.sessionService.getUser().username;
    this.tasks.unshift(this.task);
  }

  assignTaskId(): number {
    if (this.tasks.length > 0) {
      console.log(`TASK ID: ${this.tasks[0].id}`);
      const newId = this.tasks[0].id + 1;
      return newId;
    } else {
      return 1;
    }
  }

  getTasks(): Array<Task> {
    return this.tasks;
  }

  log(task: Task): string {
    return task.text;
  }

}
