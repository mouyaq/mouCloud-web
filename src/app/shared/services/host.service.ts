import { Subject } from 'rxjs/Rx';
import { Host } from './../model/host.model';
import { Observable } from 'rxjs/Observable';
import { BaseApiService } from './base-api.service';
import { SessionService } from './session.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HostService extends BaseApiService {
  protected static readonly HOST_API = `${BaseApiService.BASE_API}/host`;

  private host: Host;
  private hosts: Array<Host> = [];
  private hostSubject: Subject<Host> = new Subject();
  private hostsSubject: Subject<Array<Host>> = new Subject();

  constructor(
    private http: HttpClient,
    private sessionService: SessionService) {
      super();
  }

  list(): Observable<Array<Host>> {
    return this.http.get<Array<Host>>(HostService.HOST_API)
      .map(res => {
        return this.setHosts(res);
      })
      .catch(error => this.handleError(error));
  }

  get(id: string): Observable<Host> {
    return this.http.get<Host>(`${HostService.HOST_API}/${id}`)
      .map(res => {
        return this.setHost(res);
      })
      .catch(error => this.handleError(error));
  }

  getHosts(): Array<Host> {
    return this.hosts;
  }

  onHostsChanges(): Observable<Array<Host>> {
    return this.hostsSubject.asObservable();
  }

  private notifyHostsChanges(): void {
    this.hostsSubject.next(this.hosts);
  }

  private notifyHostChange(): void {
    this.hostSubject.next(this.host);
  }

  setHost(host: Host): Host {
    this.host = host;
    this.notifyHostChange();
    return this.host;
  }

  setHosts(hosts: Array<Host>): Array<Host> {
    this.hosts = hosts;
    this.notifyHostsChanges();
    return this.hosts;
  }

}
