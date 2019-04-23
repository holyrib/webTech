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
  public show =''

  constructor(private provider: ProviderService) {
  }

  ngOnInit() {
    this.provider.getTaskLists().then(res => {
      this.tasklists = res;
    })
  }
  changeshow(show: String){
    this.show = show;
  }
  getTaskList(tasklist: TaskList){
    this.provider.getTaskList(tasklist).then(res => {
      this.current_tasklist = res;
    })
    this.changeshow('update_list');
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
  createTaskList(){
    this.changeshow('create_list');
    if(this.tasklist_name != '') {
      this.provider.createTaskList(this.tasklist_name).then(res => {
        this.tasklists.push(res)
        this.tasklist_name = ''
      })
    }
  }
  createTask(task_list: TaskList){
    this.changeMode('create_task');
    if(this.task_name != '' || this.task_created_at != '' || this.task_due_on != '' || this.task_status != '') {
      this.provider.createTask(task_list, this.task_name, this.task_created_at, this.task_due_on, this.task_status).then(res => {
        this.mode = 'tasks';
        this.tasks.push(res);
        this.task_list_name = '';
        this.task_created_at = '';
        this.task_due_on = '';
        this.task_status = ''
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
  updateTask(task: Task){
    this.provider.updateTask(task).then(res => {
      this.task_name = '';
      this.task_created_at = '';
      this.task_due_on = '';
      this.task_status = '';
    })
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
  deleteTask(id: number){
    this.provider.deleteTask(id).then(res => {
      for( let i = 0; i < this.tasks.length; i++){
        if ( this.tasks[i].id === id) {
          this.tasks.splice(i, 1);
        }
      }
    })
  }



}

