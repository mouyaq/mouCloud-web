import { Task } from './../../../shared/model/task.model';
import { TaskService } from './../../../shared/services/task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  tasks: Array<Task> = [];
  private taskEnabled = true;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }

  disableTasks() {
    this.tasks = [];
    this.taskEnabled = false;
  }

  enableTasks() {
    this.tasks = this.taskService.getTasks();
    this.taskEnabled = true;
  }

  isTasksEnabled() {
    return this.taskEnabled;
  }

}
