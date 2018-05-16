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
  private librarySubject: Subject<Library> = new Subject();
  private librariesSubject: Subject<Array<Library>> = new Subject();

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

  // private update(id: string) {
  //   if (id !== null) {
  //     this.get(id).subscribe(() => {
  //       this.notifyVmChange();
  //     });
  //   }
  //   this.list().subscribe(() => {
  //     this.notifyVmsChanges();
  //   });
  // }

  // powerOn(id: string): Observable<string> {
  //   return this.http.post(`${VmService.VM_API}/${id}/power/start`, null)
  //     .map(() => {
  //       return this.update(id);
  //     })
  //     .catch(error => this.handleError(error));
  // }

  // powerOff(id: string): Observable<string> {
  //   return this.http.post(`${VmService.VM_API}/${id}/power/stop`, null)
  //   .map(() => {
  //     return this.update(id);
  //   })
  //   .catch(error => this.handleError(error));
  // }

  // powerReset(id: string): Observable<string> {
  //   return this.http.post(`${VmService.VM_API}/${id}/power/reset`, null)
  //   .map(() => {
  //     return this.update(id);
  //   })
  //   .catch(error => this.handleError(error));
  // }

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
      // console.log('setLibraries: LIBRARY = ' + library);
      // const libraryTmp = new Library();
      // libraryTmp.id = library.toString();
      // this.libraries.push(libraryTmp);
    });
    //this.libraries = libraries;
    this.notifyLibrariesChanges();
    return this.libraries;
  }

  // // returns "value": "vm-65"
  // create(spec: VmSpec): Observable<Vm> {
  //   return this.http.post(`${VmService.VM_API}`, spec)
  //     .map((vm) => {
  //       console.log(vm);
  //       console.log(typeof(vm));
  //       this.update(null);
  //       return this.getVm();
  //     });
  // }

  // delete(id: string): Observable<void> {
  //   return this.http.delete(`${VmService.VM_API}/${id}`)
  //     .map(() => {
  //       return this.update(null);
  //     });
  // }

  // getConsoleUrl(id: string): Observable<Vm> {
  //   return this.http.get<Vm>(`${VmService.VM_API}/${id}/console`)
  //     .map(res => {
  //       console.log(res);
  //       return res;
  //     })
  //     .catch(error => this.handleError(error));
  // }

  // getConsolePythonUrl(id: string): Observable<Vm> {
  //   return this.http.get<Vm>(`${VmService.VM_API}/${id}/consolePython`)
  //     .map(res => {
  //       console.log(res);
  //       return res;
  //     })
  //     .catch(error => this.handleError(error));
  // }

}
