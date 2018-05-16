import { ContentLibraryService } from './../services/content-library.service';
import { Library } from './../model/library.model';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class ContentLibraryDetailsResolverGuard implements Resolve<Library> {

  constructor(
    private router: Router,
    private contentLibraryService: ContentLibraryService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Library> {
    if (!route.params['id']) {
      return this.contentLibraryService.list()
        .catch(error => {
          this.router.navigate(['/dashboard']);
          return Observable.of(error);
        });
    }
    else {
      return this.contentLibraryService.get(route.params['id'])
        .catch(error => {
          this.router.navigate(['/dashboard']);
          return Observable.of(error);
        });
    }
  }

}
