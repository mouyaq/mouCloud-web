import { SessionService } from './session.service';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from './base-api.service';
import { Subject, Observable } from 'rxjs/Rx';
import { Folder } from './../model/folder.model';
import { Injectable } from '@angular/core';

@Injectable()
export class FolderService extends BaseApiService {
  protected static readonly FOLDER_API = `${BaseApiService.BASE_API}/folder`;

  private folders: Array<Folder> = [];
  private foldersSubject: Subject<Array<Folder>> = new Subject();

  constructor(
    private http: HttpClient,
    private sessionService: SessionService ) {
      super();
  }

  list(): Observable<Array<Folder>> {
    return this.http.get<Array<Folder>>(FolderService.FOLDER_API)
  }

  private notifyDatastoresChanges(): void {
    this.foldersSubject.next(this.folders);
  }

  private setVms(folders: Array<Folder>): Array<Folder> {
    this.folders = folders;
    this.notifyDatastoresChanges();
    return this.folders;
  }

}
