import { TaskService } from './../../../shared/services/task.service';
import { ResourcePoolService } from './../../../shared/services/resource-pool.service';
import { ResourcePool } from './../../../shared/model/resource-pool.model';
import { Folder } from './../../../shared/model/folder.model';
import { Datastore } from './../../../shared/model/datastore.model';
import { Vm } from './../../../shared/model/vm.model';
import { VmService } from './../../../shared/services/vm.service';
import { Component, OnInit } from '@angular/core';
import { VmSpec } from '../../../shared/model/vmSpec.model';
import { DatastoreService } from '../../../shared/services/datastore.service';
import { FolderService } from '../../../shared/services/folder.service';
import { Task } from '../../../shared/model/task.model';

declare var $: any;

@Component({
  selector: 'app-vm-create',
  templateUrl: './vm-create.component.html',
  styleUrls: ['./vm-create.component.css']
})
export class VmCreateComponent implements OnInit {
  vm: Vm = new Vm();
  datastores: Array<Datastore> = [];
  folders: Array<Folder> = [];
  resourcePools: Array<ResourcePool> = [];
  private task: Task = new Task();
  private date: Date = new Date();

  constructor(
    private vmService: VmService,
    private datastoreService: DatastoreService,
    private folderService: FolderService,
    private resourcePoolService: ResourcePoolService,
    private taskService: TaskService) { }

  ngOnInit() {
    // Load datastores
    this.datastoreService.list().subscribe(
      datastores => {
        this.datastores = datastores;
      });
    // Load Folders
    this.folderService.list().subscribe(
      folders => {
        this.folders = folders;
      });
    // Load Resource Pools
    this.resourcePoolService.list().subscribe(
      resourcePools => {
        this.resourcePools = resourcePools;
      });
  }

  onSubmit(newVmForm, modalID) {
    const vmSpec = {
      spec: {
        name: this.vm.name,
        guest_OS: this.vm.guest_OS,
        placement: {
          datastore: this.vm.datastore,
          folder: this.vm.folder,
          resource_pool: this.vm.resource_pool
        },
        cpu: {
          count: this.vm.cpu_count
        },
        memory: {
          size_MiB: this.vm.memory_MB
        }
      }
    };

    this.vmService.create(vmSpec).subscribe(
      (vm) => {
        console.log(vm);
        newVmForm.reset();
        $(modalID).modal('toggle');
        // this.task.text = `Create VM: ${vm.name} with id ${vm.vm}`;
        this.task.id = this.taskService.assignTaskId();
        this.task.text = 'VM Created';
        this.task.timestamp = new Date().toISOString();
        this.taskService.addTask(this.task);
      }
    );
  }

}
