import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoAddEdit } from './todo-add-edit';

describe('TodoAddEdit', () => {
  let component: TodoAddEdit;
  let fixture: ComponentFixture<TodoAddEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoAddEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoAddEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
