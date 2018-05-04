import { Subscription } from 'rxjs/Subscription';
import { InventoryService } from './../../../../shared/services/inventory.service';
import { VmService } from './../../../../shared/services/vm.service';
import { Router, ActivatedRoute, UrlTree, PRIMARY_OUTLET, UrlSegmentGroup, UrlSegment } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Vm } from './../../../../shared/model/vm.model';
import { TaskService } from '../../../../shared/services/task.service';
import { Task } from '../../../../shared/model/task.model';

@Component({
  selector: 'app-vm',
  templateUrl: './vm.component.html',
  styleUrls: ['./vm.component.css']
})
export class VmComponent implements OnInit, OnDestroy {
  vm: Vm;
  vmSubscription: Subscription;
  error: Object;
  private task: Task = new Task();
  private date: Date = new Date();

  constructor(
    private router: Router,
    private routes: ActivatedRoute,
    private vmService: VmService,
    private taskService: TaskService
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
    this.task.id = this.taskService.assignTaskId();
    this.task.text = `Power On VM: ${this.getId()}`;
    this.task.timestamp = new Date().toISOString();
    this.taskService.addTask(this.task);
  }

  onClickPowerOff() {
    this.vmService.powerOff(this.getId()).subscribe();
    this.task.id = this.taskService.assignTaskId();
    this.task.text = `Power Off VM: ${this.getId()}`;
    this.task.timestamp = new Date().toISOString();
    this.taskService.addTask(this.task);
  }

  onClickPowerReset() {
    this.vmService.powerReset(this.getId()).subscribe();
    this.task.id = this.taskService.assignTaskId();
    this.task.text = `Power Reset VM: ${this.getId()}`;
    this.task.timestamp = new Date().toISOString();
    this.taskService.addTask(this.task);
  }

  onClickDelete() {
    this.vmService.delete(this.getId()).subscribe();
    this.task.id = this.taskService.assignTaskId();
    this.task.text = `Delete VM: ${this.getId()}`;
    this.task.timestamp = new Date().toISOString();
    this.taskService.addTask(this.task);
  }

  isPoweredOn() {
    return this.vm.power_state === 'POWERED_ON';
  }

  showConsole() {
    // this.router.navigate(['/dashboard/vm/mks']);
    this.vmService.getConsoleUrl(this.getId()).subscribe(
      url => {
        console.log(`URL OBTENIDA: ${url}`);
        window.open(`/assets/console.html?url=${url}`);
      }
    );
    //window.open('/assets/console.html');
  }

}
