import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './models/todo.model';
import { TodoResponse } from './models/todo-response.model';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}

  uri: string = 'http://localhost:5299/api';

  todo(id: number | undefined): Observable<Todo[]> {
    const params =
      id && id > -1
        ? {
            id: id,
          }
        : undefined;

    return this.http.get<Todo[]>(`${this.uri}/Todo`, {
      params: params,
    });
  }

  todoItems(id: number) {
    return this.http.get<TodoResponse>(`${this.uri}/Todo/items/${id}`);
  }

  createTodo(newTodo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.uri}/Todo`, newTodo);
  }

  updateTodo(updateTodo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.uri}/Todo/items/${updateTodo.id}`, updateTodo);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.uri}/Todo/items/${id}`);
  }
  
}
