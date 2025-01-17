import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackendService } from './backend.service';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Todo } from './models/todo.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  todo?: Observable<Todo[]> = of([]);
  id!: number;

  constructor(private backend: BackendService) {
    this.populateTodoList();
  }

  populateTodoList() {
    this.todo = this.backend.todo(this.id);
  }

  trackById(index: number, todoItem: Todo): number {
    return todoItem.id;
  }
}
