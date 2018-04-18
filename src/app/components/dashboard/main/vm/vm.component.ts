import { Subscription } from 'rxjs/Subscription';
import { InventoryService } from './../../../../shared/services/inventory.service';
import { VmService } from './../../../../shared/services/vm.service';
import { Router, ActivatedRoute, UrlTree, PRIMARY_OUTLET, UrlSegmentGroup, UrlSegment } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Vm } from './../../../../shared/model/vm.model';

@Component({
  selector: 'app-vm',
  templateUrl: './vm.component.html',
  styleUrls: ['./vm.component.css']
})
export class VmComponent implements OnInit, OnDestroy {
  vm: Vm;
  vmSubscription: Subscription;
  error: Object;

  constructor(
    private router: Router,
    private routes: ActivatedRoute,
    private vmService: VmService
  ) { }

  ngOnInit() {
    this.routes
      .data
      .subscribe(data => {
        this.vm = data['VmDetailsResolverGuard'];
      });

    this.vm = this.vmService.getVm();
    this.vmSubscription = this.vmService.onVmChange()
      .subscribe(vm => {
        this.vm = vm;
      });
  }

  ngOnDestroy() {
    this.vmSubscription.unsubscribe();
  }

  private getId() {
    const urlTree: UrlTree = this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = urlTree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    return s[2].path;
  }

  onClickPowerOn() {
    this.vmService.powerOn(this.getId()).subscribe();
    console.log('Power On');
  }

  onClickPowerOff() {
    this.vmService.powerOff(this.getId()).subscribe();
      console.log('Power Off');
  }

  onClickPowerReset() {
    this.vmService.powerReset(this.getId()).subscribe();
      console.log('Reset');
  }

  isPoweredOn() {
    return this.vm.power_state === 'POWERED_ON';
  }

}
