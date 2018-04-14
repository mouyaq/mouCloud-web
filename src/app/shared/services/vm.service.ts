import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { User } from './../model/user.model';
import { Observable } from 'rxjs/Observable';
import { BaseApiService } from './base-api.service';
import { SessionService } from './session.service';
import { Injectable } from '@angular/core';
import { Vm } from '../model/vm.model';

@Injectable()
export class VmService extends BaseApiService {
  protected static readonly VMS_API = `${BaseApiService.BASE_API}/vm`;
  private user: User;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService ) {
      super();
     }


  list(): Observable<Array<Vm>> {
    return this.http.get(VmService.VMS_API)
      .catch(error => this.handleError(error));
  }

  getVmDetails() {}

  powerOn() {}

  powerOff() {}

  reset() {}

}

