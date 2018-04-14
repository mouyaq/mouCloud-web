import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class BaseApiService {
  protected static readonly BASE_API = environment.baseApi;
  // protected static defaultHeaders: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor() { }

  protected handleError(error: Response | any): Observable<any> {
    if (!environment.production) {
      console.error(`${this.constructor.name} error: ${error}`);
    }
    const errorData = error.json();
    errorData.status = error.status;
    return Observable.throw(errorData);
  }

}
