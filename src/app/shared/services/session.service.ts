import { Observable, Subject } from 'rxjs/Rx';
import { User } from './../model/user.model';
import { BaseApiService } from './base-api.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

const CURRENT_USER_KEY = 'currentUser';

@Injectable()
export class SessionService extends BaseApiService {
  protected static readonly SESSION_API = `${BaseApiService.BASE_API}/session`;

  private user: User;
  private userSubject: Subject<User> = new Subject();

  constructor(private http: Http) {
    super();
    this.user = JSON.parse(sessionStorage.getItem(CURRENT_USER_KEY));
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
    sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(this.user));
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
    BaseApiService.defaultOptions.headers.append('vmware-api-session-id', this.user.token);
    return this.http.delete(SessionService.SESSION_API, BaseApiService.defaultOptions)
      .map(res => {
        return this.doLogout();
      })
      .catch(error => this.handleError(error));
  }

  protected doLogout(): void {
    BaseApiService.defaultOptions.headers.delete('vmware-api-session-id');
    sessionStorage.removeItem(CURRENT_USER_KEY);
    this.user = null;
    this.notifyUserChanges();
  }

  isAuthenticated(): boolean {
    return this.user ? true : false;
  }

}
