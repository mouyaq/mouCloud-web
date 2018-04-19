import { Observable, Subject } from 'rxjs/Rx';
import { Datastore } from './../model/datastore.model';
import { SessionService } from './session.service';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from './base-api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class DatastoreService extends BaseApiService {
  protected static readonly DATASTORE_API = `${BaseApiService.BASE_API}/datastore`;

  private datastores: Array<Datastore> = [];
  private datastoresSubject: Subject<Array<Datastore>> = new Subject();

  constructor(
    private http: HttpClient,
    private sessionService: SessionService ) {
      super();
  }

  list(): Observable<Array<Datastore>> {
    return this.http.get<Array<Datastore>>(DatastoreService.DATASTORE_API)
  }

  private notifyDatastoresChanges(): void {
    this.datastoresSubject.next(this.datastores);
  }

  private setVms(datastores: Array<Datastore>): Array<Datastore> {
    this.datastores = datastores;
    this.notifyDatastoresChanges();
    return this.datastores;
  }

}
