import { User } from './../model/user.model';
import { Observable } from 'rxjs/Observable';
import { BaseApiService } from './base-api.service';
import { SessionService } from './session.service';
import { Http, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Vm } from '../model/vm.model';

@Injectable()
export class VmsService extends BaseApiService {
  protected static readonly VMS_API = `${BaseApiService.BASE_API}/vm`;
  private user: User;
  // private options: RequestOptions = new RequestOptions(BaseApiService.defaultOptions);

  constructor(
    private http: Http,
    private sessionService: SessionService ) {
      super();
     }


  getVms(): Observable<Array<Vm>> {
    // this.options.headers.append('vmware-api-session-id', this.user.token);
    return this.http.get(VmsService.VMS_API)
      .map((res: Response) => {
          return res.json();
        })
      .catch(error => this.handleError(error));
  }

}

