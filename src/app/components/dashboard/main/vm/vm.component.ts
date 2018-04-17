import { InventoryService } from './../../../../shared/services/inventory.service';
import { VmService } from './../../../../shared/services/vm.service';
import { Router, ActivatedRoute, ParamMap, NavigationEnd, ActivatedRouteSnapshot, UrlTree, PRIMARY_OUTLET, UrlSegmentGroup, UrlSegment } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Vm } from './../../../../shared/model/vm.model';

@Component({
  selector: 'app-vm',
  templateUrl: './vm.component.html',
  styleUrls: ['./vm.component.css']
})
export class VmComponent implements OnInit {
  vm: Vm = new Vm();
  error: Object;

  constructor(
    private router: Router,
    private routes: ActivatedRoute,
    private vmService: VmService,
    private inventoryService: InventoryService
  ) { }

  ngOnInit() {
    this.routes
      .data
      .subscribe(data => {
        this.vm = data['VmDetailsResolverGuard'];
      });
    }

    private getId() {
      const urlTree: UrlTree = this.router.parseUrl(this.router.url);
      const g: UrlSegmentGroup = urlTree.root.children[PRIMARY_OUTLET];
      const s: UrlSegment[] = g.segments;
      return s[2].path;
    }

    onClickPowerOn() {
      this.vmService.powerOn(this.getId())
        .subscribe(() => {
          this.vmService.get(this.getId())
          .subscribe(data => {
            this.vm = data;
          });
        });
        console.log('Power On');
    }

    onClickPowerOff() {
      this.vmService.powerOff(this.getId())
        .subscribe(() => {
          this.vmService.get(this.getId())
          .subscribe(data => {
            this.vm = data;
          });
        });
        console.log('Power Off');
    }

    onClickPowerReset() {
      this.vmService.powerReset(this.getId())
        .subscribe(() => {
          this.vmService.get(this.getId())
          .subscribe(data => {
            this.vm = data;
          });
        });
        console.log('Reset');
    }

    isPoweredOn() {
      return this.vm.power_state === 'POWERED_ON';
    }
}
