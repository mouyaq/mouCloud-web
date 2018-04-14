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

  constructor(
    private sessionService: SessionService,
    private vmService: VmService
  ) { }

  ngOnInit() {
    this.vmService.list().subscribe(
      (vms) => {
        this.vms = vms;
      }
    );
  }

}
