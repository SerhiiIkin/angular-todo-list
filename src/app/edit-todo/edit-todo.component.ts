import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IDialogTodo, ITodo } from '../todo-list/todo-list';
import { TodoService } from '../todo-list/todo-list.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss'],
})
export class EditTodoComponent implements OnInit {
  @Input() todoId?: string;
  @Output() UpdateTodos = new EventEmitter<ITodo>();

  dialog:boolean= false;

  message: string = '';

  profileForm = this.fb.group({
    isDone: [false],
    description: ['', Validators.required],
    Id: new FormControl({ value: '', disabled: true }),
  });

  constructor(private fb: FormBuilder, private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoId && this.profileForm.controls.Id.setValue(this.todoId);
  }

  updateTodo(todo: ITodo) {
    this.UpdateTodos.emit(todo);
  }

  onEditBtnClick(): void {
    this.dialog = !this.dialog;


    this.todoService.getTodo(this.profileForm.controls.Id.value!).subscribe({
      next: (todo) => {
        this.profileForm.controls.Id.setValue(todo.id);
        this.profileForm.controls.description.setValue(todo.description);
        this.profileForm.controls.isDone.setValue(todo.isDone);
      },
      error: (error) => {
        this.message = 'Cannot get todo!';

        setTimeout(() => {
          this.message = '';
        }, 3000);
      },
    });
  }

  onSubmit(): void {
    if (this.profileForm.value?.description) {
      const updatedTodo: ITodo = {
        id: this.profileForm.controls.Id.value!,
        description: this.profileForm.value.description,
        isDone: this.profileForm.value.isDone!,
      };

      this.todoService.updateTodo(updatedTodo).subscribe({
        next: (todo) => {
          this.message = 'Todo was successfully edited!';
          this.updateTodo(todo);
          setTimeout(() => {
            this.message = '';
            this.dialog = !this.dialog;
          }, 3000);
        },
        error: (error) => {
          this.message = 'Error with update todo';
          console.error(error);

          setTimeout(() => {
            this.message = '';
          }, 3000);
        },
      });
    }
  }
}
