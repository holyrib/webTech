import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {TaskCreateComponent} from "./task-create/task-create.component";
import {TasklistCreateComponent} from "./tasklist-create/tasklist-create.component";

const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'create_task', component: TaskCreateComponent},
  { path: 'create_tasklist', component: TasklistCreateComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
