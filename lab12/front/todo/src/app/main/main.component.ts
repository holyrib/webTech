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
  public tasklist_name: any = '';
  public task_name: any='';
  public task_created_at: any='';
  public task_due_on: any='';
  public task_status: any='';
  public default_date = '2019-04-23'
  public mode: String='';

  constructor(private provider: ProviderService) {
  }

  ngOnInit() {
    this.provider.getTaskLists().then(res => {
      this.tasklists = res;
    })
  }

  getTaskList(task_list: TaskList){
    this.provider.getTaskList(task_list).then(res => {
      this.current_tasklist = res;
    })
    this.changeMode('update_list');
  }

  createTaskList(){
    this.changeMode('create_list');
    if(this.tasklist_name != '') {
      this.provider.createTaskList(this.tasklist_name).then(res => {
        this.tasklists.push(res)
        this.tasklist_name = ''
      })
    }
  }

  updateTaskList(){
    if(this.tasklist_name != ''){
      this.current_tasklist.name = this.tasklist_name;
      this.provider.updateTaskList(this.current_tasklist).then(res => {
        for (let i = 0; i < this.tasklists.length; i++){
          if (this.tasklists[i].id == this.current_tasklist.id){
            this.tasklists[i].name = this.tasklist_name;
          }
        }
        this.tasklist_name = '';
      })
    }

  }

  deleteTaskList(id: number){
    this.provider.deleteTaskList(id).then(res => {
      for( let i = 0; i < this.tasklists.length; i++){
        if ( this.tasklists[i].id === id) {
          this.tasklists.splice(i, 1);
        }
      }
    })
  }

  getTasks(task_lists: TaskList){
    this.changeMode('tasks');
    this.provider.getTasks(task_lists).then(res => {
      this.tasks = res;
      this.current_tasklist = task_lists;
    })
  }

  createTask(tasklist: TaskList){
    this.changeMode('create_task');
    if(this.task_name != '' || this.task_created_at != '' || this.task_due_on != '' || this.task_status != '') {
      this.provider.createTask(tasklist, this.task_name, this.task_due_on, this.task_status).then(res => {
        this.tasks.push(res);
        this.tasklist_name = '';
        this.task_due_on = '';
        this.task_status = ''
      })
    }
  }

  getTask(task: Task){
    this.provider.getTask(task).then( res => {
      this.current_task = res;
    })
  }

  updateTask(task: Task){
    this.changeMode('update_task');
    this.provider.updateTask(task).then(res => {
      this.changeMode('task')
      this.task_name = '';
      this.task_created_at = '';
      this.task_due_on = '';
      this.task_status = '';
    })
  }

  deleteTask(id: number){
    this.provider.deleteTask(id).then(res => {
      for( let i = 0; i < this.tasks.length; i++){
        if ( this.tasks[i].id === id) {
          this.tasks.splice(i, 1);
        }
      }
    })
  }

  changeMode(mode: String){
    this.mode = mode;
  }



}

