import { LibraryItem } from './../model/library-item.model';
import { ContentLibraryService } from './../services/content-library.service';
import { Library } from './../model/library.model';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class LibraryItemsResolverGuard implements Resolve<Array<LibraryItem>> {

  constructor(
    private router: Router,
    private contentLibraryService: ContentLibraryService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Array<LibraryItem>> {
    if (!route.params['id']) {
      return this.contentLibraryService.listAllLibraryItems()
        .catch(error => {
          this.router.navigate(['/dashboard']);
          return Observable.of(error);
        });
    } else {
        return this.contentLibraryService.listLibraryItems(route.params['id'])
          .catch(error => {
            this.router.navigate(['/dashboard']);
            return Observable.of(error);
          });
      }
  }

}
