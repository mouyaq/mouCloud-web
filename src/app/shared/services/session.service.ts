import { Observable, Subject } from 'rxjs/Rx';
import { User } from './../model/user.model';
import { BaseApiService } from './base-api.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

const CURRENT_USER_KEY = 'currentUser';

@Injectable()
export class SessionService extends BaseApiService {
  protected static readonly SESSION_API = `${BaseApiService.BASE_API}/session`;

  private user: User;
  private userSubject: Subject<User> = new Subject();

  constructor(private http: Http) {
    super();
    this.user = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
    this.notifyUserChanges();
  }

  authenticate(user: User): Observable<User> {
    return this.http.post(SessionService.SESSION_API, JSON.stringify(user), BaseApiService.defaultOptions)
      .map(res => {
        return this.doAuthentication(res.json());
      })
      .catch(error => this.handleError(error));
  }

  private doAuthentication(user: User): User {
    this.user = user;
    BaseApiService.defaultOptions.headers.append('Set-Cookie', this.user.cookie);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(this.user));
    this.notifyUserChanges();
    return this.user;
  }

  private notifyUserChanges() {
    this.userSubject.next(this.user);
  }

  getUser(): User {
    return this.user;
  }

  onUserChanges(): Observable<User> {
    return this.userSubject.asObservable();
  }

  logout(): Observable<void> {
    return this.http.delete(SessionService.SESSION_API, BaseApiService.defaultOptions)
      .map(res => {
        return this.doLogout();
      })
      .catch(error => this.handleError(error));
  }

  protected doLogout(): void {
    this.user = null;
    BaseApiService.defaultOptions.headers.delete('Set-Cookie');
    localStorage.removeItem(CURRENT_USER_KEY);
    this.notifyUserChanges();
  }

  isAuthenticated(): boolean {
    return this.user ? true : false;
  }

}
