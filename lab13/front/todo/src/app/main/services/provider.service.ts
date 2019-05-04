import {EventEmitter, Injectable} from '@angular/core';
import {MainService} from './main.service';
import {HttpClient} from '@angular/common/http';
import {TaskList} from "../interface/task-list";
import {Task} from "../interface/task";
import {User} from "../interface/user";
import {AuthResponse} from "../interface/user";

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  constructor(http: HttpClient) {
    super(http);
  }
  getTaskList(task_list: TaskList): Promise<TaskList>{
    return this.get(`http://localhost:8000/api/tasklist/${task_list.id}/`, {})
  }

  getTaskLists(): Promise<TaskList[]> {
    return this.get('http://localhost:8000/api/tasklist/', {});
  }

  getTasks(tasklist: TaskList): Promise<Task[]> {
    return this.get(`http://localhost:8000/api/tasklist/${tasklist.id}/tasks/`, {});
  }
  getTask(task: Task): Promise<Task>{
    return this.get(`http://localhost:8000/api/tasks/${task.id}/`, {})
  }
  getDetailedProducts(tasklist: number): Promise<Task> {
    return this.get(`http://localhost:8000/api/tasks/${tasklist}`, {});
  }
  createTaskList(name: any): Promise<TaskList> {
    return this.post('http://localhost:8000/api/tasklist/', {
      name: name
    });
  }

  updateTaskList(list: TaskList): Promise<TaskList> {
    return this.put(`http://localhost:8000/api/tasklists/${list.id}/`, {
      name: list.name
    });
  }
  deleteTaskList(id: number): Promise<any> {
    return this.delete(`http://localhost:8000/api/task_lists/${id}/`, {});
  }

  createTask(list:TaskList, name: any,due_on:any,status:any): Promise<Task> {
    console.log(list)
    console.log('iiiiiid')
    return this.post(`http://localhost:8000/api/tasklist/${list.id}/tasks/`, {
      name: name,
      due_on: due_on,
      status: status,
      task_list: list.id
    });
  }
  updateTask(task: Task){
    return this.put(`http://localhost:8000/api/tasks/${task.id}/`, {
      name: task.name,
      created_at: task.created_at,
      due_on: task.due_on,
      status: task.status
    })
  }

  deleteTask(id: number){
    return this.delete(`http://localhost:8000/api/tasks/${id}/`, {})
  }
  login(username: any, password: any): Promise<AuthResponse>{
    return this.post('http://localhost:8000/api/user/signin/', {
      username: username,
      password: password
    })
  }

  register(username: any, password: any): Promise<User>{
    return this.post('http://localhost:8000/api/user/signup/', {
      username: username,
      password: password,
    })
  }
}
