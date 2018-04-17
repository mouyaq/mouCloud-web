import { Observable } from 'rxjs/Rx';
import { Host } from './../model/host.model';
import { Vm } from './../model/vm.model';
import { HostService } from './host.service';
import { Injectable } from '@angular/core';
import { VmService } from './vm.service';

@Injectable()
export class InventoryService {
  vms: Array<Vm> = [];
  hosts: Array<Host> = [];

  constructor(
    private vmService: VmService,
    private hostService: HostService
  ) { }

  updateVms(): Observable<Array<Vm>> {
    return this.vmService.list();
  }

  updateHosts(): Observable<Array<Host>>{
    return this.hostService.list();
  }

}
