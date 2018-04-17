import { InventoryService } from './../../../shared/services/inventory.service';
import { Router } from '@angular/router';
import { Host } from './../../../shared/model/host.model';
import { HostService } from './../../../shared/services/host.service';
import { Vm } from './../../../shared/model/vm.model';
import { VmService } from './../../../shared/services/vm.service';
import { SessionService } from './../../../shared/services/session.service';
import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  vms: Array<Vm> = [];
  hosts: Array<Host> = [];

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private vmService: VmService,
    private hostService: HostService,
    private inventoryService: InventoryService
  ) { }

  ngOnInit() {
    this.inventoryService.updateVms()
      .subscribe((vms) => {
        this.vms = vms;
      });
    this.inventoryService.updateHosts()
      .subscribe((hosts) => {
        this.hosts = hosts;
      });
  }

  onClick() {
    const isExpanded = $('#collapse-vm').hasClass('show');
    if (isExpanded) {
      this.router.navigate(['/dashboard/vm']);
    }
  }

}
