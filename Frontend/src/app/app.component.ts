import { Component } from '@angular/core';
import { BackendService } from './backend.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Todo } from './models/todo.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  todo?: Observable<Todo[]> = of([]);
  id!: number;
  newTodoTitle: string = '';
  selectedTodo?: Todo; // Add a property to store the selected Todo to update

  constructor(private backend: BackendService) {
    this.populateTodoList();
  }

  populateTodoList() {
    this.todo = this.backend.todo(this.id);
  }

  createTodoItem() {
    if (this.newTodoTitle.trim()) {
      const newTodo: Todo = {
        id: 0,
        title: this.newTodoTitle,
        isCompleted: false
      };

      this.backend.createTodo(newTodo).subscribe((createdTodo) => {
        this.populateTodoList();
        this.newTodoTitle = '';
      });
    }
  }

  updateTodoItem() {
    if (this.selectedTodo) {
      this.selectedTodo.isCompleted = !this.selectedTodo.isCompleted;

      this.backend.updateTodo(this.selectedTodo).subscribe(
        (updatedTodo) => {
          this.populateTodoList();
        },
        (error) => {
          console.error('Error updating Todo:', error);
        }
      );
    }
  }

  // short method for selecting items
  selectTodoToUpdate(todo: Todo) {
    this.selectedTodo = { ...todo };
  }
}
