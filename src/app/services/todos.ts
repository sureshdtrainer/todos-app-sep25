import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Todos {
  targetUrl: string = 'http://localhost:8080/api/v1/todos';

  constructor(private _http: HttpClient) { }

  addTodo(data: any): Observable<any> {
    return this._http.post(this.targetUrl, data);
  }

  getAllTodos(): Observable<any> {
    return this._http.get(this.targetUrl);
  }

  detletTod(id: number): Observable<any> {
    return this._http.delete(`${this.targetUrl}/${id}`);
  }

  updateTodo(id: number, data: any): Observable<any> {
    return this._http.put(`${this.targetUrl}/${id}`, data);
  }

}
