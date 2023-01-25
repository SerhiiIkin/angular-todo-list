import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { INewTodo, ITodo } from '../todo-list/todo-list';
import { TodoService } from '../todo-list/todo-list.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {
  constructor(
    private todoService: TodoService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {}

  message: string = '';

  profileForm = this.fb.group({
    description: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.profileForm.value?.description) {
      const newTodo: INewTodo = {
        description: this.profileForm.value.description,
        isDone: false,
      };

      this.todoService.createTodo(newTodo).subscribe({
        next: () => {
          this.message = 'Todo was successfully added!';

          setTimeout(() => {
            this.message = '';
            this.router.navigate(['/']);
          }, 3000);
        },
        error: () => {
          this.message = 'Error with adding todo';

          setTimeout(() => {
            this.message = '';
          }, 3000);
        },
      });

      this.profileForm.controls.description.reset();
    }
  }
}
