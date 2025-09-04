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
    console.log(data);
    return this._http.post(this.targetUrl, data);
  }

}
