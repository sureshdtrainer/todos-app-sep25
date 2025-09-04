import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  todoForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<TodoAddEdit>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.todoForm = this._fb.group({
      description: new FormControl(''),
      targetDate: new FormControl(''),
      done: false,
    });

  };





  todoService: Todos = inject(Todos);

  ngOnInit(): void {
    this.todoForm.patchValue(this.data);
  }

  onTodoFormSubmit() {
    if (this.todoForm.valid) {
      if (this.data) { //Update todo
        this.todoService.updateTodo(this.data.id, this.todoForm.value).subscribe({
          next: (res) => {
            alert('Todo Updated')
            this._dialogRef.close(true);
            console.log(res);
          },
          error: (err) => {
            console.error(err);
          }
        });
      } else { //Add todo
        this.todoService.addTodo(this.todoForm.value).subscribe({
          next: (res) => {
            alert('Todo Added')
            this._dialogRef.close(true);
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
    }
  }
} 
