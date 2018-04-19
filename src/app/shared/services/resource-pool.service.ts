import { ResourcePool } from './../model/resource-pool.model';
import { SessionService } from './session.service';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from './base-api.service';
import { Subject, Observable } from 'rxjs/Rx';
import { Folder } from './../model/folder.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ResourcePoolService extends BaseApiService {
  protected static readonly RESOURCE_POOL_API = `${BaseApiService.BASE_API}/resource-pool`;

  private resourcePools: Array<ResourcePool> = [];
  private resourcePoolsSubject: Subject<Array<ResourcePool>> = new Subject();

  constructor(
    private http: HttpClient,
    private sessionService: SessionService ) {
      super();
  }

  list(): Observable<Array<ResourcePool>> {
    return this.http.get<Array<ResourcePool>>(ResourcePoolService.RESOURCE_POOL_API)
  }

  private notifyResourcePoolsChanges(): void {
    this.resourcePoolsSubject.next(this.resourcePools);
  }

  private setVms(resourcePools: Array<ResourcePool>): Array<ResourcePool> {
    this.resourcePools = resourcePools;
    this.notifyResourcePoolsChanges();
    return this.resourcePools;
  }

}
