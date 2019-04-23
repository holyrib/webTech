import { Injectable, EventEmitter } from '@angular/core';
import {MainService} from "./main.service";
import {HttpClient} from "@angular/common/http";
import {TaskList} from "../interface/task-list";
import {Task} from '../interface/task';

@Injectable({
  providedIn: 'root'
})

export class ProviderService extends MainService{
  public sendMessage = new EventEmitter<string>();

  constructor(http: HttpClient) {
    super(http);
  }

  getTaskLists(): Promise<TaskList[]>{
    return this.get(`http://localhost:8000/api/tasklist/`, {});
  }

  getTasks(tasklist: TaskList): Promise<Task[]>{
    return this.get(`http://localhost:8000/api/tasklist/${tasklist.id}/tasks/`, {})
  }

  getTask(task: Task): Promise<Task>{
    return this.get(`http://localhost:8000/api/tasks/${task.id}/`, {})
  }
}
