import { LibraryItem } from './../model/library-item.model';
import { Router } from '@angular/router';
import { InventoryService } from './inventory.service';
import { Subject } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BaseApiService } from './base-api.service';
import { SessionService } from './session.service';
import { Injectable } from '@angular/core';
import { Library } from '../model/library.model';

@Injectable()
export class ContentLibraryService extends BaseApiService {
  protected static readonly VM_API = `${BaseApiService.BASE_API}/content/library/`;

  private library: Library;
  private libraries: Array<Library> = [];
  private item: LibraryItem;
  private items: Array<LibraryItem> = [];
  private librarySubject: Subject<Library> = new Subject();
  private librariesSubject: Subject<Array<Library>> = new Subject();
  private libraryItemSubject: Subject<LibraryItem> = new Subject();
  private libraryItemsSubject: Subject<Array<LibraryItem>> = new Subject();

  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    private router: Router ) {
      super();
     }


  list(): Observable<Array<Library>> {
    return this.http.get<Array<String>>(ContentLibraryService.VM_API)
      .map(res => {
        return this.setLibraries(res);
      })
      .catch(error => {
        if (error.status === 401) {
          this.sessionService.removeSession();
          this.router.navigate(['/login']);
        }
        return this.handleError(error);
      });
  }

  get(id: string): Observable<Library> {
    return this.http.get<Library>(`${ContentLibraryService.VM_API}/${id}`)
      .map(res => {
        return this.setLibrary(res);
      })
      .catch(error => this.handleError(error));
  }

  getItem(id: string): Observable<LibraryItem> {
    return this.http.get<LibraryItem>(`${ContentLibraryService.VM_API}/item/${id}`)
      .map(res => {
        return this.setLibraryItem(res);
      })
  }

  listAllLibraryItems(): Observable<Array<LibraryItem>> {
    return;
  }

  listLibraryItems(id: string): Observable<Array<LibraryItem>> {
    return this.http.get<Array<String>>(`${ContentLibraryService.VM_API}/${id}/items`)
      .map(res => {
        return this.setLibraryItems(res);
      })
      .catch(error => this.handleError(error));

  }

  getLibrary(): Library {
    return this.library;
  }

  // getVms(): Array<Vm> {
  //   return this.vms;
  // }

  onLibraryChange() {
    return this.librarySubject.asObservable();
  }

  onLibrariesChanges(): Observable<Array<Library>> {
    return this.librariesSubject.asObservable();
  }

  private notifyLibraryChange(): void {
    this.librarySubject.next(this.library);
  }

  private notifyLibrariesChanges(): void {
    this.librariesSubject.next(this.libraries);
  }

  private notifyLibraryItemChange(): void {
    this.libraryItemSubject.next(this.item);
  }

  private notifyLibraryItemsChange(): void {
    this.libraryItemsSubject.next(this.items);
  }

  setLibrary(library: Library): Library {
    this.library = library;
    this.notifyLibraryChange();
    return this.library;
  }

  setLibraries(libraries: Array<String>): Array<Library> {
    this.libraries = [];
    libraries.forEach(library => {
      this.get(library.toString()).subscribe(
        lib => {
          this.libraries.push(lib);
        }
      );
    });
    this.notifyLibrariesChanges();
    return this.libraries;
  }

  setLibraryItem(item: LibraryItem): LibraryItem {
    this.item = item;
    this.notifyLibraryItemChange();
    return this.item;
  }

  setLibraryItems(items: Array<String>): Array<LibraryItem> {
    this.items = [];
    items.forEach(item => {
      this.getItem(item.toString()).subscribe(
        it => {
          this.items.push(it);
        }
      );
    });
    this.notifyLibraryItemsChange();
    return this.items;
  }

}
