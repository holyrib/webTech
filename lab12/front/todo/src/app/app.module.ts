import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import {ProviderService} from "./main/services/provider.service";
import {HttpClientModule} from "@angular/common/http";
import {Routes} from "@angular/router";
import { TaskCreateComponent } from './task-create/task-create.component';
import { TasklistCreateComponent } from './tasklist-create/tasklist-create.component';




@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TaskCreateComponent,
    TasklistCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [ProviderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
