import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getData(page: number, limit: number): Observable<any> {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('limit', limit.toString());

    return this.http.get<any>(`${this.apiUrl}/users`, { params });
  }
}
