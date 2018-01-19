import { Component, Injectable } from '@angular/core';
import template from './app.component.html';
import { Input } from '@angular/core/src/metadata/directives';


@Injectable()
class LoggerService{

}
@Component({
  selector: 'app-root',
  template
})
export class AppComponent {
  constructor(private LoggerService){

  }

  title = 'to the jangou';
}
