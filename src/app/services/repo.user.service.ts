/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { LogedUser, LoginData, User, UserNoId } from '../model/user.model';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class RepoUserService {
  url: string;
  token = '';
  constructor(private http: HttpClient, private state: StateService) {
    this.url = 'http://localhost:4300/users';
    this.state.getUser().subscribe((resp) => (this.token = resp.token));
  }

  register(data: UserNoId): Observable<User> {
    const url = this.url + '/register';
    const response = this.http
      .post<User>(url, data)
      .pipe(catchError((error) => throwError(() => error.error)));
    return response;
  }
  login(data: LoginData): Observable<LogedUser> {
    const url = this.url + '/login';
    const response = this.http
      .patch<LogedUser>(url, data)
      .pipe(catchError((error) => throwError(() => error.error)));

    return response;
  }

  patch(data: Partial<User>, id: string): Observable<User> {
    const url = this.url + `/${id}`;
    const response = this.http
      .patch<User>(url, data, {
        headers: {
          ['Authorization']: `Bearer ${this.token}`,
        },
      })
      .pipe(catchError((error) => throwError(() => error.error)));

    return response;
  }

  delete(id: string): Observable<void> {
    const url = this.url + `/${id}`;
    const response = this.http
      .delete<void>(url, {
        headers: {
          ['Authorization']: `Bearer ${this.token}`,
        },
      })
      .pipe(catchError((error) => throwError(() => error.error)));
    return response;
  }
}
