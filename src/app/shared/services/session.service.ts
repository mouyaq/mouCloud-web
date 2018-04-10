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
    //BaseApiService.defaultOptions.headers.append('Set-Cookie', this.user.cookie);
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
    // let headers = new Headers();
    // headers.append('content-type', 'application/json');
    // headers.append('vmware-api-session-id', this.user.token);
    // let opts = new RequestOptions({withCredentials: true});
    // opts.headers = headers;
    BaseApiService.defaultOptions.headers.append('vmware-api-session-id', this.user.token);
    // console.log(BaseApiService.defaultOptions);
    return this.http.delete(SessionService.SESSION_API, BaseApiService.defaultOptions)
    // return this.http.delete(SessionService.SESSION_API, opts)
      .map(res => {
        return this.doLogout();
      })
      .catch(error => this.handleError(error));
  }

  protected doLogout(): void {
    // BaseApiService.defaultOptions.headers.delete('Set-Cookie');
    sessionStorage.removeItem(CURRENT_USER_KEY);
    this.user = null;
    this.notifyUserChanges();
  }

  isAuthenticated(): boolean {
    return this.user ? true : false;
  }

}
