import { Component, OnInit } from '@angular/core';
import {TaskList} from "./interface/task-list";
import {Task} from './interface/task';
import {ProviderService} from "./services/provider.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public tasklists: TaskList[] = [];
  public tasks: Task[] = [];
  public current_tasklist: TaskList;
  public current_task: Task;
  public isCollapsed = false;


  constructor(private provider: ProviderService) {
  }

  ngOnInit() {
    this.provider.getTaskLists().then(res => {
      this.tasklists = res;
    })
  }

  getTasks(task_list: TaskList) {
    this.provider.getTasks(task_list).then(res => {
      this.tasks = res;
      this.current_tasklist = task_list;
    })
  }

  getTask(task: Task) {
    this.provider.getTask(task).then(res => {
      this.current_task = res;
    })
  }
}

