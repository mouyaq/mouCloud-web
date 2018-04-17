import { InventoryService } from './inventory.service';
import { Subject } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BaseApiService } from './base-api.service';
import { SessionService } from './session.service';
import { Injectable } from '@angular/core';
import { Vm } from '../model/vm.model';

@Injectable()
export class VmService extends BaseApiService {
  protected static readonly VM_API = `${BaseApiService.BASE_API}/vm`;
  private vm: Vm;
  private vmSubject: Subject<Vm> = new Subject();

  constructor(
    private http: HttpClient,
    private sessionService: SessionService ) {
      super();
     }


  list(): Observable<Array<Vm>> {
    return this.http.get<Array<Vm>>(VmService.VM_API)
      .catch(error => this.handleError(error));
  }

  get(id: string): Observable<Vm> {
    return this.http.get<Vm>(`${VmService.VM_API}/${id}`)
      .catch(error => this.handleError(error));
  }

  powerOn(id: string): Observable<string> {
    return this.http.post(`${VmService.VM_API}/${id}/power/start`, null)
      .catch(error => this.handleError(error));
  }

  powerOff(id: string): Observable<string> {
    return this.http.post(`${VmService.VM_API}/${id}/power/stop`, null)
    .catch(error => this.handleError(error));
  }

  powerReset(id: string): Observable<string> {
    return this.http.post(`${VmService.VM_API}/${id}/power/reset`, null)
    .catch(error => this.handleError(error));
  }

}
