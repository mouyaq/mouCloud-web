import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';
import { User } from './../model/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const CURRENT_USER_KEY = 'currentUser';

@Injectable()
export class SessionService extends BaseApiService {
  protected static readonly SESSION_API = `${BaseApiService.BASE_API}/session`;

  private user: User;
  private userSubject: Subject<User> = new Subject();

  constructor(private http: HttpClient) {
    super();
    this.user = JSON.parse(sessionStorage.getItem(CURRENT_USER_KEY));
    this.notifyUserChanges();
  }

  authenticate(user: User): Observable<User> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<User>(SessionService.SESSION_API, JSON.stringify(user), {headers: headers, withCredentials: true})
      .map(res => {
        return this.doAuthentication(<User>res);
      })
      .catch(error => this.handleError(error));
  }

  getToken(): string {
    if (this.user) {
      return this.user.token;
    }
  }

  getUser(): User {
    return this.user;
  }

  isAuthenticated(): boolean {
    return this.user ? true : false;
  }

  logout(): Observable<void> {
    return this.http.delete(SessionService.SESSION_API)
      .map(res => {
        return this.doLogout();
      })
      .catch(error => this.handleError(error));
  }

  removeSession(): void {
    this.doLogout();
  }

  onUserChanges(): Observable<User> {
    return this.userSubject.asObservable();
  }


  private doAuthentication(user: User): User {
    this.user = user;
    sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(this.user));
    this.notifyUserChanges();
    return this.user;
  }

  private doLogout(): void {
    this.user = null;
    sessionStorage.removeItem(CURRENT_USER_KEY);
    this.notifyUserChanges();
  }

  private notifyUserChanges(): void {
    this.userSubject.next(this.user);
  }

}
