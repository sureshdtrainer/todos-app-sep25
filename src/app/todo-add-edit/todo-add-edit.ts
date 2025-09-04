import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Todos } from '../services/todos';

@Component({
  selector: 'app-todo-add-edit',
  providers: [provideNativeDateAdapter()],
  imports: [MatDialogModule,
    MatButtonModule,
    MatFormFieldModule, MatInputModule,
    MatIconModule, MatDatepickerModule,
    MatSelectModule, ReactiveFormsModule,
  ],
  templateUrl: './todo-add-edit.html',
  styleUrl: './todo-add-edit.css'
})
export class TodoAddEdit {

  todoForm = new FormGroup({
    description: new FormControl(''),
    targetDate: new FormControl(''),
    status: new FormControl(''),
  });

  todoService: Todos = inject(Todos);

  onTodoFormSubmit() {
    if (this.todoForm.valid) {
      this.todoService.addTodo(this.todoForm.value).subscribe({
        next: (res) => {
          alert('Todo Added')
          console.log(res);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }
} 
