import { Component, OnInit } from '@angular/core';
import {ProviderService} from "../main/services/provider.service";
import {TaskList} from "../main/interface/task-list";

@Component({
  selector: 'app-tasklist-create',
  templateUrl: './tasklist-create.component.html',
  styleUrls: ['./tasklist-create.component.css']
})
export class TasklistCreateComponent implements OnInit {
  public tasklist_name: any = '';
  public tasklists: TaskList[] = [];

  constructor(private provider: ProviderService) { }

  ngOnInit() {
  }
  createTaskList(){
    if(this.tasklist_name != '') {
      this.provider.createTaskList(this.tasklist_name).then(res => {
        this.tasklists.push(res)
        this.tasklist_name = ''
      })
    }
  }
}
