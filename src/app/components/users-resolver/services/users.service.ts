import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://jsonplaceholder.typicode.com/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }

  fetchUsers(): Observable<any> {
    return this.http.get(baseUrl);
  }

  fetchUser(id: number): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }
}
