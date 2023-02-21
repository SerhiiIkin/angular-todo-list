import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INewTodo , ITodo } from './todo-list';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todoURl: string = environment.baseApiUrl + "TodoList";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getTodos(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(`${this.todoURl}/GetAll`);
  }

  createTodo(todo: INewTodo): Observable<ITodo> {
    return this.http.post<ITodo>(
      `${this.todoURl}/Create`,
      todo,
      this.httpOptions
    );
  }

  updateTodo(todo: ITodo): Observable<ITodo> {
    return this.http.put<ITodo>(
      `${this.todoURl}/UpdateTodo?id=${todo.id}`,
      todo,
      this.httpOptions
    );
  }

  deleteTodo(id: string): Observable<ITodo> {
    return this.http.delete<ITodo>(
      `${this.todoURl}/Delete?id=${id}`,
      this.httpOptions
    );
  }

  getTodo(id: string): Observable<ITodo> {
    return this.http.get<ITodo>(
      `${this.todoURl}/Get?id=${id}`,
      this.httpOptions
    );
  }
}
