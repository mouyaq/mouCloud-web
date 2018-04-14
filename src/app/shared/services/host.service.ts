import { Host } from './../model/host.model';
import { Observable } from 'rxjs/Observable';
import { BaseApiService } from './base-api.service';
import { SessionService } from './session.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HostService extends BaseApiService {
  protected static readonly HOST_API = `${BaseApiService.BASE_API}/host`;


  constructor(
    private http: HttpClient,
    private sessionService: SessionService) {
      super();
  }

  list(): Observable<Array<Host>> {
    return this.http.get(HostService.HOST_API)
      .catch(error => this.handleError(error));
  }

}
