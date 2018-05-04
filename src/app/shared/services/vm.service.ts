import { Router } from '@angular/router';
import { InventoryService } from './inventory.service';
import { Subject } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BaseApiService } from './base-api.service';
import { SessionService } from './session.service';
import { Injectable } from '@angular/core';
import { Vm } from '../model/vm.model';
import { VmSpec } from '../model/vmSpec.model';

@Injectable()
export class VmService extends BaseApiService {
  protected static readonly VM_API = `${BaseApiService.BASE_API}/vm`;

  private vm: Vm;
  private vms: Array<Vm> = [];
  private vmSubject: Subject<Vm> = new Subject();
  private vmsSubject: Subject<Array<Vm>> = new Subject();

  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    private router: Router ) {
      super();
     }


  list(): Observable<Array<Vm>> {
    return this.http.get<Array<Vm>>(VmService.VM_API)
      .map(res => {
        return this.setVms(res);
      })
      .catch(error => {
        if (error.status === 401) {
          this.sessionService.removeSession();
          this.router.navigate(['/login']);
        }
        return this.handleError(error);
      });
  }

  get(id: string): Observable<Vm> {
    return this.http.get<Vm>(`${VmService.VM_API}/${id}`)
      .map(res => {
        return this.setVm(res);
      })
      .catch(error => this.handleError(error));
  }

  getVm(): Vm {
    return this.vm;
  }

  getVms(): Array<Vm> {
    return this.vms;
  }

  onVmChange() {
    return this.vmSubject.asObservable();
  }

  onVmsChanges(): Observable<Array<Vm>> {
    return this.vmsSubject.asObservable();
  }

  private notifyVmChange(): void {
    this.vmSubject.next(this.vm);
  }

  private notifyVmsChanges(): void {
    this.vmsSubject.next(this.vms);
  }

  private update(id: string) {
    if (id !== null) {
      this.get(id).subscribe(() => {
        this.notifyVmChange();
      });
    }
    this.list().subscribe(() => {
      this.notifyVmsChanges();
    });
  }

  powerOn(id: string): Observable<string> {
    return this.http.post(`${VmService.VM_API}/${id}/power/start`, null)
      .map(() => {
        return this.update(id);
      })
      .catch(error => this.handleError(error));
  }

  powerOff(id: string): Observable<string> {
    return this.http.post(`${VmService.VM_API}/${id}/power/stop`, null)
    .map(() => {
      return this.update(id);
    })
    .catch(error => this.handleError(error));
  }

  powerReset(id: string): Observable<string> {
    return this.http.post(`${VmService.VM_API}/${id}/power/reset`, null)
    .map(() => {
      return this.update(id);
    })
    .catch(error => this.handleError(error));
  }

  setVm(vm: Vm): Vm {
    this.vm = vm;
    this.notifyVmChange();
    return this.vm;
  }

  setVms(vms: Array<Vm>): Array<Vm> {
    this.vms = vms;
    this.notifyVmsChanges();
    return this.vms;
  }

  // returns "value": "vm-65"
  create(spec: VmSpec): Observable<Vm> {
    return this.http.post(`${VmService.VM_API}`, spec)
      .map((vm) => {
        console.log(vm);
        console.log(typeof(vm));
        this.update(null);
        return this.getVm();
      });
  }

  delete(id: string): Observable<void> {
    return this.http.delete(`${VmService.VM_API}/${id}`)
      .map(() => {
        return this.update(null);
      });
  }

  getConsoleUrl(id: string): Observable<Vm> {
    return this.http.get<Vm>(`${VmService.VM_API}/${id}/console`)
      .map(res => {
        console.log(res);
        return res;
      })
      .catch(error => this.handleError(error));
  }

}
