import {EventEmitter, Injectable} from '@angular/core';
import {MainService} from './main.service';
import {HttpClient} from '@angular/common/http';
import {TaskList} from "../interface/task-list";
import {Task} from "../interface/task";
@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  public sendMessage = new EventEmitter<string>();

  constructor(http: HttpClient) {
    super(http);
  }
  getTaskList(task_list: TaskList): Promise<TaskList>{
    return this.get(`http://localhost:8000/api/task_list/${task_list.id}/`, {})
  }

  getTaskLists(): Promise<TaskList[]> {
    return this.get('http://localhost:8000/api/tasklist/', {});
  }

  getTasks(tasklist: TaskList): Promise<Task[]> {
    return this.get(`http://localhost:8000/api/tasklists/${tasklist.id}/tasks/`, {});
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
    return this.put(`http://localhost:8000/api/task_lists/${list.id}/`, {
      name: list.name
    });
  }
  deleteTaskList(id: number): Promise<any> {
    return this.delet(`http://localhost:8000/api/task_lists/${id}/`, {});
  }

  createTask(name: any,created_at:any,due_on:any,status:any,list:TaskList): Promise<Task> {
    return this.post(`http://localhost:8000/api/task_lists/${list.id}/tasks/`, {
      name: name,
      created_at : created_at,
      due_on:due_on,
      status:status
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
    return this.delet(`http://localhost:8000/api/tasks/${id}/`, {})
  }
}
