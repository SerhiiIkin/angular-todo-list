import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { IDialogTodo, ITodo } from './todo-list';
import { TodoService } from './todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos: ITodo[] = [];

  constructor(private todoService: TodoService) {}

  getTodos(): void {
    this.todoService.getTodos().subscribe({
      next: (todos) => (this.todos = todos),
      error: (error) => console.error(error),
    });
  }

  updateTodos(todo:ITodo):void {
    this.todos = this.todos.map((t) => {
      t.id === todo.id && (t = todo);
      return t;
    });
  }

  ngOnInit(): void {
    this.getTodos();
  }

  onDeleteBtnClick(id: string | undefined) {
    if (id) {
      this.todoService.deleteTodo(id).subscribe();
      this.todos = this.todos.filter((t) => t.id !== id);
    }
  }

  onInputCLick(todo: ITodo | undefined) {
    if (todo) {
      const changedTodo: ITodo = {
        description: todo.description,
        isDone: !todo.isDone,
        id: todo.id,
      };

      this.todoService.updateTodo(changedTodo).subscribe();
      this.updateTodos(changedTodo);
    }
  }
}
