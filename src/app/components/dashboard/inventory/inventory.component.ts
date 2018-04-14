import { Vm } from './../../../shared/model/vm.model';
import { VmsService } from './../../../shared/services/vms.service';
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
    private vmsService: VmsService
  ) { }

  ngOnInit() {
    this.vmsService.list().subscribe(
      (vms) => {
        this.vms = vms;
      }
    );
  }

}
