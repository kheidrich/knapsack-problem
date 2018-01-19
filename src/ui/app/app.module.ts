import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router'


import { AppComponent } from './app.component';
import { Router } from '@angular/router/src/router';


@NgModule({
  declarations: [
    RecursoVideoComponent, GenericoComponent,
    LoggerService
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule
  ],
  exports: [RecursoVideoComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
 