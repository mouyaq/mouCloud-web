import { Library } from './../../../shared/model/library.model';
import { Subscription } from 'rxjs/Subscription';
import { InventoryService } from './../../../shared/services/inventory.service';
import { Router } from '@angular/router';
import { Host } from './../../../shared/model/host.model';
import { HostService } from './../../../shared/services/host.service';
import { Vm } from './../../../shared/model/vm.model';
import { VmService } from './../../../shared/services/vm.service';
import { SessionService } from './../../../shared/services/session.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContentLibraryService } from './../../../shared/services/content-library.service';

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
  libraries: Array<Library>;
  librariesSubscription: Subscription;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private vmService: VmService,
    private hostService: HostService,
    private contentLibraryService: ContentLibraryService
  ) { }

  ngOnInit() {
    this.hostService.list().subscribe();
    this.hostsSubscription = this.hostService.onHostsChanges()
      .subscribe(hosts => {
        this.hosts = hosts;
      });

    this.vmService.list().subscribe();
    this.vmsSubscription = this.vmService.onVmsChanges()
      .subscribe(vms => {
        this.vms = vms;
      });

    this.contentLibraryService.list().subscribe();
    this.librariesSubscription = this.contentLibraryService.onLibrariesChanges()
      .subscribe(libraries => {
        this.libraries = libraries;
      });

  }

  ngOnDestroy() {
    this.vmsSubscription.unsubscribe();
    this.hostsSubscription.unsubscribe();
    this.librariesSubscription.unsubscribe();
  }

  onClickHosts() {
    this.router.navigate(['/dashboard/host']);
  }

  onClickVms() {
    this.router.navigate(['/dashboard/vm']);
  }

  onClickLibraries() {
    this.router.navigate(['/dashboard/library']);
  }

}
