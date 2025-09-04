import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { TodoAddEdit } from './todo-add-edit/todo-add-edit';
import { Todos } from './services/todos';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatTableModule, DatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todos-app');
  todoService: Todos = inject(Todos);

  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = ['id', 'description', 'targetDate', 'done', 'actions'];
  dataSource!: MatTableDataSource<any>;

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos() {
    this.todoService.getAllTodos().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
      }, error: (err) => {
        console.error(err);
      }
    });
  }

  openAddEditTodoForm() {
    const dialogRef = this.dialog.open(TodoAddEdit);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllTodos();
        }
      }
    });
  }

  openEditTodoForm(data: any) {
    const dialogRef = this.dialog.open(TodoAddEdit, { data });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllTodos();
        }
      }
    });
  }

  deleteTodo(id: number) {
    this.todoService.detletTod(id).subscribe({
      next: (res) => {
        alert('Todo Deleted');
        this.getAllTodos();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
