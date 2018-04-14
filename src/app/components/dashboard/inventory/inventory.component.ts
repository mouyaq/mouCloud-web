import { Host } from './../../../shared/model/host.model';
import { HostService } from './../../../shared/services/host.service';
import { Vm } from './../../../shared/model/vm.model';
import { VmService } from './../../../shared/services/vm.service';
import { SessionService } from './../../../shared/services/session.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  vms: Array<Vm> = [];
  hosts: Array<Host> = [];

  constructor(
    private sessionService: SessionService,
    private vmService: VmService,
    private hostService: HostService
  ) { }

  ngOnInit() {
    this.vmService.list().subscribe(
      (vms) => {
        this.vms = vms;
      }
    );

    this.hostService.list().subscribe(
      (hosts) => {
        this.hosts = hosts;
      }
    )
  }

}
