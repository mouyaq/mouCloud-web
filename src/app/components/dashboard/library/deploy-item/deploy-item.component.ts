import { Item } from './../../../../shared/model/item.model';
import { Router, UrlTree, PRIMARY_OUTLET, UrlSegmentGroup, UrlSegment } from '@angular/router';
import { ContentLibraryService } from './../../../../shared/services/content-library.service';
import { LibraryItemSpec } from './../../../../shared/model/libraryItemSpec.model';
import { HostService } from './../../../../shared/services/host.service';
import { Host } from './../../../../shared/model/host.model';
import { TaskService } from './../../../../shared/services/task.service';
import { ResourcePoolService } from './../../../../shared/services/resource-pool.service';
import { ResourcePool } from './../../../../shared/model/resource-pool.model';
import { Folder } from './../../../../shared/model/folder.model';
import { Datastore } from './../../../../shared/model/datastore.model';
import { Component, OnInit } from '@angular/core';
import { DatastoreService } from '../../../../shared/services/datastore.service';
import { FolderService } from '../../../../shared/services/folder.service';
import { Task } from '../../../../shared/model/task.model';

declare var $: any;

@Component({
  selector: 'app-deploy-item',
  templateUrl: './deploy-item.component.html',
  styleUrls: ['./deploy-item.component.css']
})
export class DeployItemComponent implements OnInit {
  item: Item = new Item();
  datastores: Array<Datastore> = [];
  folders: Array<Folder> = [];
  resourcePools: Array<ResourcePool> = [];
  hosts: Array<Host> = [];
  private task: Task = new Task();
  private date: Date = new Date();

  constructor(
    private router: Router,
    private contentLibraryService: ContentLibraryService,
    private datastoreService: DatastoreService,
    private folderService: FolderService,
    private resourcePoolService: ResourcePoolService,
    private hostService: HostService,
    private taskService: TaskService) { }

  ngOnInit() {
    // Load hosts
    this.hostService.list().subscribe(
      hosts => {
        this.hosts = hosts;
      });
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

  private getId() {
    const urlTree: UrlTree = this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = urlTree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    return s[3].path;
  }

  onSubmit(newVmForm) {
    const itemSpec = {
      deployment_spec: {
        accept_all_EULA: true,
        default_datastore_id: this.item.datastore,
      },
      target: {
        folder_id: this.item.folder,
        host_id: this.item.host,
        resource_pool_id: this.item.resourcePool
      }
    };
console.log(JSON.stringify(itemSpec));
    this.contentLibraryService.deployItem(this.getId(), itemSpec).subscribe(
      (result) => {
        console.log(result);
        newVmForm.reset();
        this.task.id = this.taskService.assignTaskId();
        this.task.text = 'Library item deployed';
        this.task.timestamp = new Date().toISOString();
        this.taskService.addTask(this.task);
      }
    );
  }

}
