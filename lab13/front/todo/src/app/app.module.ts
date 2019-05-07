import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ClassProvider } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import {ProviderService} from "./main/services/provider.service";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {Routes} from "@angular/router";
import { TaskCreateComponent } from './task-create/task-create.component';
import { TasklistCreateComponent } from './tasklist-create/tasklist-create.component';
import {FormsModule} from "@angular/forms";
import {AuthInterceptor} from "./AuthInterceptor"




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
    FormsModule,

  ],
  providers: [
    ProviderService,
    <ClassProvider> {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
