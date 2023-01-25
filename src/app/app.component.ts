import { TodoService } from './todo-list/todo-list.service';
import { Component } from '@angular/core';
import { ITodo } from './todo-list/todo-list';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo-list';

}
