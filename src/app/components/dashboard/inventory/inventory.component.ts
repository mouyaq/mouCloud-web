import { Subscription } from 'rxjs/Subscription';
import { InventoryService } from './../../../shared/services/inventory.service';
import { Router } from '@angular/router';
import { Host } from './../../../shared/model/host.model';
import { HostService } from './../../../shared/services/host.service';
import { Vm } from './../../../shared/model/vm.model';
import { VmService } from './../../../shared/services/vm.service';
import { SessionService } from './../../../shared/services/session.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit, OnDestroy {
  vms: Array<Vm>;
  vmsSubscription: Subscription;
  hosts: Array<Host>;
  hostsSubscription: Subscription;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private vmService: VmService,
    private hostService: HostService
    // private inventoryService: InventoryService
  ) { }

  ngOnInit() {
    // this.inventoryService.updateVms()
    //   .subscribe((vms) => {
    //     this.vms = vms;
    //   });
    // this.inventoryService.updateHosts()
    //   .subscribe((hosts) => {
    //     this.hosts = hosts;
    //   });
    this.hosts = this.hostService.getHosts();
    this.hostsSubscription = this.hostService.onHostsChanges()
      .subscribe(hosts => {
        this.hosts = hosts;
      });

    this.vms = this.vmService.getVms();
    this.vmsSubscription = this.vmService.onVmsChanges()
      .subscribe(vms => {
        this.vms = vms;
      });
  }

  ngOnDestroy() {
    this.vmsSubscription.unsubscribe();
    this.hostsSubscription.unsubscribe();
  }

  onClickHosts() {
    this.router.navigate(['/dashboard/host']);
    // const isExpanded = $('#collapse-host').hasClass('show');
    // if (isExpanded) {
    //   this.router.navigate(['/dashboard/host']);
    // }
  }

  onClickVms() {
    this.router.navigate(['/dashboard/vm']);
  //   const isExpanded = $('#collapse-vm').hasClass('show');
  //   if (isExpanded) {
  //     this.router.navigate(['/dashboard/vm']);
  //   }
  }

}
